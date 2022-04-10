// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Card } from "web3uikit";
// TODO: Use guilds from back end
import Guilds from "../mock/guilds";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants";
import Moralis from "moralis";

const Home: NextPage = () => {
  const [guilds, setGuilds] = useState<any | null>();
  const router = useRouter();
  const { isInitialized, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (isInitialized && isWeb3Enabled) {
      const getGuilds = async () => {
        const sendOptions = {
          contractAddress: NFT_CONTRACT_ADDRESS,
          abi: NFT_CONTRACT_ABI,
          functionName: "returnGuilds",
          chain: "rinkeby",
        };
        const transaction = await Moralis.executeFunction(sendOptions);

        setGuilds(transaction);
      };
      getGuilds();
    }
  }, [isInitialized, isWeb3Enabled]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Guilds DAO</title>
        <meta
          name="description"
          content="Voting platform for gaming communities"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <h1 className={styles.appTitle}>Welcome to Game Guilds DAO</h1>
        <p>
          Want to create a new community?{" "}
          <Link href="/guild/create">
            <a style={{ textDecoration: "underline" }}>Click here</a>
          </Link>
        </p>
        <div className={styles.guildCardList}>
          {guilds &&
            guilds.map((guild) => (
              <div className={styles.guildCard} key={guild[1]}>
                <Card
                  onClick={() =>
                    router.push({
                      pathname: `/guild/${guild[1]}`,
                      query: { index: `${guild[4]}` },
                    })
                  }
                  description="Click to join this community!"
                >
                  <Image
                    src={guild[2]}
                    alt="Guild logo"
                    width="200"
                    height="200"
                  />
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
