import { IUserSecure } from "./interfaces";
import { createHmac, createCipheriv, createDecipheriv } from "crypto";

const SECRET_KEY = "a1b2c3d4";
const KEY = "encrypted account number";
const IV = "555s5d55f5OPP__)";

const encryptUserData = (secureData: IUserSecure): IUserSecure => {
  const { accountNumber, password } = secureData;

  const passwordHashed = createHmac("sha256", SECRET_KEY) // Creates an HMC object configured with the algorithm and the used key
    .update(password) // updates it (append?) with the data to-be-hashed
    .digest("hex"); // This appears to parse the HMC object back to a string-like format

  const cipher = createCipheriv("aes-192-ccm", KEY, IV);
  let encryptedAccount = cipher.update(String(accountNumber), "utf8", "hex");
  encryptedAccount += cipher.final("hex");

  return {
    accountNumber: encryptedAccount,
    password: passwordHashed,
  };
};

const decryptUserData = (secureData: IUserSecure): IUserSecure => {
  const { accountNumber } = secureData;
  const decipher = createDecipheriv("aes-192-ccm", KEY, IV);
  let decryptedAccountNumber = decipher.update(accountNumber, "hex", "utf8");

  decryptedAccountNumber += decipher.final("utf8");

  return {
    accountNumber: decryptedAccountNumber,
  };
};

export { encryptUserData, decryptUserData };

// TODO: Research everything about the methods an theory behind the above implementation
