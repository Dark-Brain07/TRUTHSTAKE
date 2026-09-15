import fs from "fs";
import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

async function main() {
  const account = createAccount();
  console.log("Generated Deployer Account:", account.address);
  const client = createClient({ chain: studionet, account });

  console.log("Funding account on StudioNet via sim_fundAccount...");
  await client.request({ method: "sim_fundAccount", params: [account.address, 5000] });

  const balance = await client.getBalance({ address: account.address });
  console.log("Account Balance:", balance.toString(), "GEN");

  const contractCode = fs.readFileSync("contracts/truthstake/contract.py", "utf8");
  console.log(`Deploying contracts/truthstake/contract.py (${contractCode.length} bytes)...`);

  const txHash = await client.deployContract({
    code: contractCode,
    args: [],
  });
  console.log("Deploy Transaction Hash:", txHash);

  console.log("Waiting for transaction receipt (FINALIZED)...");
  await client.waitForTransactionReceipt({
    hash: txHash,
    status: TransactionStatus.FINALIZED,
    retries: 200,
    interval: 3000,
  });

  console.log("Transaction Finalized!");
  const tx = await client.getTransaction({ hash: txHash });
  
  // Look for contract address in various possible fields returned by StudioNet
  let contractAddress = null;
  if (tx.contract_address) contractAddress = tx.contract_address;
  else if (tx.to_address && tx.to_address !== "0x0000000000000000000000000000000000000000") contractAddress = tx.to_address;
  else if (tx.data?.contract_address) contractAddress = tx.data.contract_address;
  else if (tx.consensus_data?.leader_receipt?.execution_result) {
    contractAddress = tx.consensus_data.leader_receipt.execution_result;
  }
  
  // Also check validators array
  if (!contractAddress && tx.consensus_data?.validators) {
    for (const val of tx.consensus_data.validators) {
      if (val.result && typeof val.result === "string" && val.result.startsWith("0x")) {
        contractAddress = val.result;
        break;
      }
    }
  }

  console.log("==================================================");
  console.log("TRUTHSTAKE DEPLOYED SUCCESSFULLY!");
  console.log("Contract Address:", contractAddress || "(inspect tx details below)");
  console.log("Deploy Tx Hash:", txHash);
  console.log("==================================================");
  console.log("Full Transaction JSON:\n", JSON.stringify(tx, null, 2));

  // Save to deployment output file
  fs.writeFileSync(
    "deploy-latest.json",
    JSON.stringify({ contractAddress, txHash, deployer: account.address, timestamp: new Date().toISOString(), tx }, null, 2),
    "utf8"
  );
}

main().catch((err) => {
  console.error("Deploy failed:", err);
  process.exit(1);
});
