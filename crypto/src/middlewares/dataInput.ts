import { data } from "@serverless/cloud";
import { nanoid } from "nanoid";
import { IUserSecure } from "../interfaces";
import { encryptUserData } from "../tokenize";

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
    return res.send(error);
  }
};

export { handleInputData };

// TODO: Research everything about the methods an theory behind the above implementation
