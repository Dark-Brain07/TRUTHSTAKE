import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

const NEW_CONTRACT_ADDRESS = "0x02e8ce1Eb09D689e51c555490BfDC6CAd922C8b3";
const ONE_GEN = 10n ** 18n;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("==================================================");
  console.log("EXECUTING ALL TRANSACTIONS ON TRUTHSTAKE");
  console.log("Contract Address:", NEW_CONTRACT_ADDRESS);
  console.log("==================================================\n");

  const claimant = createAccount();
  const challenger = createAccount();
  console.log("Claimant Address:", claimant.address);
  console.log("Challenger Address:", challenger.address);

  const claimantClient = createClient({ chain: studionet, account: claimant });
  const challengerClient = createClient({ chain: studionet, account: challenger });
  const readClient = createClient({ chain: studionet });

  console.log("\n1. Funding test accounts with 5000 GEN...");
  await claimantClient.request({ method: "sim_fundAccount", params: [claimant.address, 5000] });
  await challengerClient.request({ method: "sim_fundAccount", params: [challenger.address, 5000] });
  console.log("✅ Accounts funded successfully.");

  // Transaction 1: Register Protocol
  console.log("\n2. Executing register_protocol('Aave v3', 'DeFi / Lending')...");
  const regTxHash = await claimantClient.writeContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "register_protocol",
    args: ["Aave v3", "DeFi / Lending"],
    value: 0n,
  });
  console.log("   Submitted regTxHash:", regTxHash);
  await claimantClient.waitForTransactionReceipt({
    hash: regTxHash,
    status: TransactionStatus.FINALIZED,
    retries: 150,
    interval: 3000,
  });
  console.log("✅ register_protocol finalized successfully!");

  await sleep(1500);

  // Transaction 2: Create Claim (7 arguments: protocol, category, subject, source_statement, interpretation, difficulty, challenge_window_seconds)
  console.log("\n3. Executing create_claim with 10 GEN bond...");
  const claimTxHash = await claimantClient.writeContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "create_claim",
    args: [
      "Aave v3",
      "DeFi / Lending",
      "Isolation Mode Debt Ceiling Mechanism",
      "Assets listed in isolation mode can only be borrowed up to an isolated asset debt ceiling.",
      "The debt ceiling restricts protocol exposure so that newly collateralized assets cannot exceed total debt limits.",
      "EASY",
      3 * 24 * 60 * 60, // 3 days challenge window
    ],
    value: 10n * ONE_GEN,
  });
  console.log("   Submitted claimTxHash:", claimTxHash);
  await claimantClient.waitForTransactionReceipt({
    hash: claimTxHash,
    status: TransactionStatus.FINALIZED,
    retries: 150,
    interval: 3000,
  });
  console.log("✅ create_claim finalized successfully!");

  await sleep(1500);

  // Check claim count to get the claim id
  const claimCount = await readClient.readContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "get_claim_count",
    args: [],
  });
  console.log("   Current on-chain Claim Count:", claimCount);
  const claimId = String(claimCount);

  // Transaction 3: Submit Evidence (claim_id, evidence_type, url, description, side)
  console.log(`\n4. Executing submit_evidence for Claim #${claimId}...`);
  const evTxHash = await claimantClient.writeContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "submit_evidence",
    args: [
      claimId,
      "PROTOCOL_DOCUMENTATION",
      "https://raw.githubusercontent.com/aave/aave-v3-core/master/README.md",
      "Official Aave v3 technical specification regarding isolation mode and collateral risk.",
      "SUPPORT",
    ],
    value: 0n,
  });
  console.log("   Submitted evTxHash:", evTxHash);
  await claimantClient.waitForTransactionReceipt({
    hash: evTxHash,
    status: TransactionStatus.FINALIZED,
    retries: 150,
    interval: 3000,
  });
  console.log("✅ submit_evidence finalized successfully!");

  await sleep(1500);

  // Transaction 4: Submit Challenge (claim_id, argument)
  console.log(`\n5. Executing submit_challenge for Claim #${claimId} with 10 GEN stake...`);
  const chalTxHash = await challengerClient.writeContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "submit_challenge",
    args: [
      claimId,
      "Challenge: Isolation mode also restricts cross-collateral borrowing simultaneously, which was omitted from the claimant interpretation.",
    ],
    value: 10n * ONE_GEN,
  });
  console.log("   Submitted chalTxHash:", chalTxHash);
  await challengerClient.waitForTransactionReceipt({
    hash: chalTxHash,
    status: TransactionStatus.FINALIZED,
    retries: 150,
    interval: 3000,
  });
  console.log("✅ submit_challenge finalized successfully!");

  await sleep(1500);

  // Read verification
  console.log("\n6. Verifying Live On-Chain State:");
  const finalClaimCount = await readClient.readContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "get_claim_count",
    args: [],
  });
  console.log("   get_claim_count():", finalClaimCount);

  const rawClaim = await readClient.readContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "get_claim",
    args: [claimId],
  });
  const claimData = JSON.parse(rawClaim);
  console.log("   Claim ID:", claimData.id);
  console.log("   Claim Status:", claimData.status);
  console.log("   Claim Protocol:", claimData.protocol);
  console.log("   Claim Subject:", claimData.subject);
  console.log("   Claim Bond Deposited:", (BigInt(claimData.claim_bond_deposited) / ONE_GEN).toString(), "GEN");

  const rawEvidenceList = await readClient.readContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "list_evidence_for_claim",
    args: [claimId],
  });
  const evidenceList = JSON.parse(rawEvidenceList);
  console.log("   Evidence Items Count:", evidenceList.length);
  if (evidenceList.length > 0) {
    console.log("   Evidence #1 URL:", evidenceList[0].url);
    console.log("   Evidence #1 Side:", evidenceList[0].side);
  }

  const rawChallenge = await readClient.readContract({
    address: NEW_CONTRACT_ADDRESS,
    functionName: "get_challenge",
    args: [claimId],
  });
  const challengeData = JSON.parse(rawChallenge);
  console.log("   Challenge Challenger:", challengeData.challenger);
  console.log("   Challenge Stake:", (BigInt(challengeData.challenge_stake_deposited) / ONE_GEN).toString(), "GEN");
  console.log("   Challenge Status:", challengeData.status);

  console.log("\n==================================================");
  console.log("🎉 ALL TRANSACTIONS COMPLETED AND VERIFIED LIVE!");
  console.log("Contract Address:    ", NEW_CONTRACT_ADDRESS);
  console.log("register_protocol Tx:", regTxHash);
  console.log("create_claim Tx:     ", claimTxHash);
  console.log("submit_evidence Tx:  ", evTxHash);
  console.log("submit_challenge Tx: ", chalTxHash);
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
