import { api, data, schedule, params } from "@serverless/cloud";
import { nanoid } from "nanoid";
import { handleInputData } from "./src/middlewares/dataInput";

api.post("/users", handleInputData);
