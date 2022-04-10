import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../constants";
import Moralis from "moralis";

// Retrieve guilds
export const getGuilds = async () => {
  await Moralis.enableWeb3();

  const sendOptions = {
    abi: NFT_CONTRACT_ABI,
    contractAddress: NFT_CONTRACT_ADDRESS,
    functionName: "returnGuilds",
  };

  const transaction = await Moralis.executeFunction(sendOptions);

  const receipt = transaction;
  console.log(receipt);
};
// Create guild nft

// Mint nft
