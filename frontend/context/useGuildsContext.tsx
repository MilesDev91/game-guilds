import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants";
import Moralis from "moralis";

interface IGuildsContext {
  guildData: any | undefined;
  createGuild: (
    Guildname: string,
    NFTPicture: File,
    maxMembers: number
  ) => void;
}

export const GuildsContext = createContext<IGuildsContext>({
  guildData: undefined,
  createGuild: () => null,
});

export const GuildsProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [guildData, setGuildData] = useState<any>();
  const { isInitialized } = useMoralis();

  console.log(Moralis.isWeb3Enabled());
  const Web3Api = useMoralisWeb3Api();
  const getGuilds = async () => {
    const sendOptions = {
      abi: NFT_CONTRACT_ABI,
      contractAddress: NFT_CONTRACT_ADDRESS,
      functionName: "returnGuilds",
    };

    const transaction = await Moralis.executeFunction(sendOptions);

    const receipt = transaction;
    console.log(receipt);
  };

  const createGuild = async (
    guildName: string,
    NFTPicture: File,
    maxMembers: number
  ) => {
    console.log(guildName, NFTPicture, maxMembers);
  };

  useEffect(() => {
    getGuilds();
  }, [Moralis.isWeb3Enabled]);

  console.log(guildData);

  return (
    <GuildsContext.Provider value={{ guildData, createGuild }}>
      {children}
    </GuildsContext.Provider>
  );
};

export function useGuilds(): IGuildsContext {
  return useContext(GuildsContext);
}
