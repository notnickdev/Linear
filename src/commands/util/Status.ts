import { Run } from "../../interfaces/Event";

export const run: Run = async (client) => {
  client.user?.setActivity("!help | Linear", {
    type: "WATCHING",
  });
};

export const name: string = "status";