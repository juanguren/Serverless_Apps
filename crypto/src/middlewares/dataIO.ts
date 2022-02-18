import { data } from "@serverless/cloud";
import { nanoid } from "nanoid";
import { IUser, IUserSecure } from "../interfaces";
import { encryptUserData, decryptUserData } from "../(de)tokenizer";

const handleInputData = async (req, res) => {
  try {
    const user = req.body;
    const userId = nanoid();
    const { secure: userCredentials } = user;

    const tokenizedUserData: IUserSecure = encryptUserData(userCredentials);
    user["secure"] = tokenizedUserData;
    user.id = userId;
    user.birth = String(new Date());

    const savedUser = await data.set(`${userId}`, user);

    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleOutputData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = (await data.get(userId)) as IUser;
    const { secure: userCredentials } = user;
    const deTokenizedUserData: IUserSecure = decryptUserData(userCredentials);

    user["secure"] = deTokenizedUserData;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { handleInputData, handleOutputData };
