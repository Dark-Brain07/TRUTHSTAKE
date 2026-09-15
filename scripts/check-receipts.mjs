import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const client = createClient({ chain: studionet });

const hashes = [
  { name: "register_protocol", hash: "0xca7c6995eb2afc3e290640d60d64dd38b80492c706a550ff27f9905e3060f496" },
  { name: "create_claim", hash: "0x5096f46ec3a6ec81d3eb31d1cf1501a8af468b4711debc03ecbbff3ab4a196e9" },
  { name: "submit_evidence", hash: "0x043ad991caa9f4671fc5d8cecda096095ae87cb64285f0b03b03d7fc7124ee7c" },
  { name: "submit_challenge", hash: "0x338999a01659cc1a1440617131184bf487014b9abd8e0afc8c89588a032e54f8" },
];

async function main() {
  for (const item of hashes) {
    console.log(`\nChecking receipt for ${item.name} (${item.hash})...`);
    try {
      const receipt = await client.getTransactionReceipt({ hash: item.hash });
      console.log("Status:", receipt.status);
      console.log("From:", receipt.from);
      console.log("To:", receipt.to);
      console.log("Consensus Data:", JSON.stringify(receipt.consensus_data, null, 2));
      console.log("Execution Result / Details:", receipt.execution_result ?? receipt.result ?? receipt);
    } catch (err) {
      console.error("Error fetching receipt:", err.message);
    }
  }
}

main();
