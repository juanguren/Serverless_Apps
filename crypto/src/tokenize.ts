import { IUserSecure } from "./interfaces";
import { createHmac, createCipheriv, createDecipheriv } from "crypto";

const encryptUserData = (secureData: IUserSecure): IUserSecure => {
  const { accountNumber, password } = secureData;
  const secret = "a1b2c3d4";
  const key = "encrypted account number";
  const iv = "555s5d55f5OPP__)";

  const passwordHashed = createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  const cipher = createCipheriv("aes192", key, iv);
  let encryptedAccount = cipher.update(String(accountNumber), "utf8", "hex");
  encryptedAccount += cipher.final("hex");

  return {
    accountNumber: encryptedAccount,
    password: passwordHashed,
  };
};

const decryptUserData = () => {};

export { encryptUserData, decryptUserData };
