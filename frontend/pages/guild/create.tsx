// @ts-nocheck
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import { Button, Input } from "web3uikit";
import { createProposal } from "../../utils/snapshot/snapshot";
import styles from "../../styles/Guild.module.css";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../../constants";
import useWindowWidth from "../../helpers/hooks/useWindowWidth";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Moralis from "moralis";

interface FormValues {
  guildName: string;
  maxMembers: number;
  file: File;
}

const CreateGuild: NextPage = () => {
  const { user } = useMoralis();
  const windowWidth = useWindowWidth();

  const createGuild = async (
    guildName: string,
    NFTPicture: File,
    maxMembers: number
  ) => {
    const file = new Moralis.File(NFTPicture.name, NFTPicture);
    await file.saveIPFS();
    const fileURL = file._ipfs;

    const sendOptions = {
      contractAddress: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: "createGuild",
      chain: "rinkeby",
      params: {
        guildName: guildName,
        guildNFTURI: fileURL,
        maxGuildMembers: maxMembers,
      },
    };

    console.log("made it");
    const transaction = await Moralis.executeFunction(sendOptions);
    console.log(transaction);
  };

  const initialValues: FormValues = {
    guildName: "",
    maxMembers: 0,
    file: new File([""], "filename"),
  };

  const handleSubmit = (
    {
      guildName,
      maxMembers,
      file,
    }: { guildName: string; maxMembers: number; file: File },
    {
      setSubmitting,
    }: FormikHelpers<{ guildName: string; maxMembers: number; file: File }>
  ) => {
    console.log(guildName, file, maxMembers);
    if (!user) {
      // TODO: Implement error notifications
      console.error("You must have a connected wallet to continue.");
    } else {
      createGuild(guildName, file, maxMembers);
    }
  };

  return (
    <div className="main">
      <h2>Create Guild</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          guildName: Yup.string().required("Guild name is required"),
          maxMembers: Yup.number()
            .required("Max members is required")
            .min(1, "You must have at least one member")
            .max(10000, "You may not have more than 10000 members"),
        })}
      >
        {/* TODO: Errors */}
        {({ values, handleChange, setFieldValue, handleSubmit, errors }) => (
          <form
            className={styles.formCreateGuild}
            onSubmit={handleSubmit}
            noValidate
          >
            <Input
              label="Guild name"
              name="guildName"
              autoFocus
              id="guildName"
              placeholder="Guild name"
              type="text"
              width={windowWidth && windowWidth < 600 ? "80%" : "500px"}
              value={values.guildName}
              onChange={handleChange}
            />
            <Input
              label="Max members"
              name="maxMembers"
              id="maxMembers"
              placeholder="Max members"
              type="number"
              width={windowWidth && windowWidth < 600 ? "80%" : "500px"}
              value={values.maxMembers.toString()}
              onChange={(e) => {
                setFieldValue("maxMembers", parseInt(e.currentTarget.value));
              }}
            />
            <label className={styles.labelFile} htmlFor="file">
              Upload logo
            </label>
            <input
              id="file"
              className={styles.inputFile}
              type="file"
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files![0]);
              }}
            />
            <Button type="submit" text="Create" />
            <div>{errors ? errors.guildName : ""}</div>
            <div>{errors ? errors.maxMembers : ""}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateGuild;
