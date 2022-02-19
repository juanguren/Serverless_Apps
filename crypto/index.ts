import { api } from "@serverless/cloud";
import { handleInputData, handleOutputData } from "./src/middlewares/dataIO";

api.get("/users/:userId", handleOutputData);
api.post("/users", handleInputData);
