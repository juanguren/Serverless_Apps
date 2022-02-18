import { api } from "@serverless/cloud";
import { handleInputData, handleOutputData } from "./src/middlewares/dataIO";

api.post("/users", handleInputData);
api.get("/users:userId", handleOutputData);
