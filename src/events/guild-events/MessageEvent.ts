import { Run } from "../../interfaces/Event";
import { Message } from "discord.js";
import { Command } from "../../interfaces/Command";

export const run: Run = async (client, message: Message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(">")
  )
    return;

  const args: string[] = message.content.slice("!".length).trim().split(/ +/g);
  const cmd = args.shift();
  const command = client.commands.get(`${cmd}`);

  if (!command) return;

  command.run(client, message, args).catch((error: any) => {
    message.channel.send(
      client.embed(
        { description: `❌ Something went wrong. ${error}`, color: "RED" },
        message
      )
    );
  });
};

export const name: string = "message";
