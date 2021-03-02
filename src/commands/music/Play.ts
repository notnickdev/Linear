
import { Run } from '../../interfaces/Command';
import { color } from "../../config.json";

export const run: Run = async (client, message, args) => {
  if (!args.length) {
    await message.channel.send(client.embed({
      description: "❌ Please specify song url!",
      color,
    }, message).setTimestamp())
    return;
  }
}

export const name: string = "play";