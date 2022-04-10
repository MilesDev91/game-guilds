import snapshot from "@snapshot-labs/snapshot.js";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { getAddress } from "@ethersproject/address";

export async function createProposal(data, currentBlock) {
  const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
  const client = new snapshot.Client712(hub);

  const timestamp = Math.round(new Date().getTime() / 1000);

  let choices = [];
  for (let i = 3; i < 7; i++) {
    choices.push(data[i].inputResult);
  }
  const title = data[0].inputResult;
  const body = data[1].inputResult;
  let toTimestamp = Date.parse(data[2].inputResult[0]);
  console.log(toTimestamp, data[2].inputResult[0]);
  const end = toTimestamp / 1000;
  const start = timestamp + 3600;

  const web3Modal = new Web3Modal({
    network: "rinkeby",
    cacheProvider: false,
  });

  const web3 = new Web3Provider(window.ethereum);
  web3Modal.clearCachedProvider();
  const provider_ = await web3Modal.connect();
  const account = provider_.accounts?.[0] || provider_.selectedAddress;

  const receipt = await client.proposal(web3, getAddress(account), {
    space: "dappchain.eth",
    type: "single-choice",
    title: title,
    body: `\t${body}\t\t`,
    choices: choices,
    start,
    end,
    timestamp,
    snapshot: currentBlock,
    network: "4",
    strategies:
      '[{"name":"erc721","network":"4","params":{"symbol":"GGD","address":"0x85214a5621c0EeE716bdC87748D865c197D2Cf0a"}}]',
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  console.log(receipt);
}
