const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const assert = require("assert");
const { loadFixture, deployContract } = waffle;

describe("GuildNFT tests", function () {
  it("Should create a guild", async function () {
    [deployer, user, ...addrs] = await ethers.getSigners();

    const GuildNFT = await ethers.getContractFactory("GuildNFT");
    const guildNFTContract = await GuildNFT.deploy();
    await guildNFTContract.deployed();

    const createGuildTx = await guildNFTContract
      .connect(user)
      .createGuild("test", "www.google.com", 99);

    await guildNFTContract
      .connect(user)
      .createGuild("guild2", "www.google.com", 100);

    const mintNFT = await guildNFTContract
      .connect(user)
      .mintNFT(user.address, 0);

    await guildNFTContract.connect(user).mintNFT(user.address, 1);
    await guildNFTContract.connect(user).mintNFT(user.address, 0);

    const balanceOf = await guildNFTContract
      .connect(user)
      .balanceOf(user.address);

    const returnGuilds = await guildNFTContract.connect(user).returnGuilds();
    const tokenIds = await guildNFTContract.connect(user).tokenIdsToGuildId(3);
    const tokenURI = await guildNFTContract.connect(user).tokenURI(1);
    console.log(tokenIds);

    expect(returnGuilds[0].guildMasterAddress).to.equal(user.address);
  });
});
