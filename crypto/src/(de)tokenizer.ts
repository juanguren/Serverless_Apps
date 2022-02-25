import { IUserSecure } from "./interfaces";
import { createHmac, createCipheriv, createDecipheriv } from "crypto";

// ! Hashing
const SECRET_KEY = "a1b2c3d4";
const HASHING_ALGORITHM = "sha256"; // special algo 1

// ! Chiper-Decipher
const KEY = "encrypted account number"; // Private Key
const IV = "555s5d55f5OPP__)"; // Nonce or: random number used in combination with a secret key as a means to encrypt data
const CIPHER_DECIPHER_ALGORITHM = "aes192"; // // special algo 1

const encryptUserData = (secureData: IUserSecure): IUserSecure => {
  const { accountNumber, password } = secureData;

  const passwordHashed = createHmac(HASHING_ALGORITHM, SECRET_KEY) // Creates an HMC object configured with the algorithm and the used key
    .update(password) // updates it (append?) with the data to-be-hashed
    .digest("hex"); // This appears to parse the HMC object back to a string-like format

  const cipher = createCipheriv(CIPHER_DECIPHER_ALGORITHM, KEY, IV); // Cipher object

  // Feeds data to the cipher object **** update(DATA, DATATYPE, OUTPUT)
  let encryptedAccount = cipher.update(String(accountNumber), "utf8", "hex");

  encryptedAccount += cipher.final("hex"); // Completes the process somehow?

  return {
    accountNumber: encryptedAccount,
    password: passwordHashed,
  };
};

const decryptUserData = (secureData: IUserSecure): IUserSecure => {
  const { accountNumber, password } = secureData;
  const decipher = createDecipheriv(CIPHER_DECIPHER_ALGORITHM, KEY, IV);

  let decryptedAccountNumber = decipher.update(accountNumber, "hex", "utf8");

  decryptedAccountNumber += decipher.final("utf8");

  return {
    accountNumber: decryptedAccountNumber,
    password,
  };
};

export { encryptUserData, decryptUserData };

// TODO: Research everything about the methods an theory behind the above implementation
