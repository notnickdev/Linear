import { Run } from "../../interfaces/Event";

export const run: Run = async (client, message) => {
  client.user?.setActivity("!help | Linear", {
    type: "WATCHING",
  });

  await message.channel.send("✅ Changed status!");
};

export const name: string = "status";