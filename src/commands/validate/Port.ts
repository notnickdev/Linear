import { Run } from '../../interfaces/Command';
import validator from "validator";

export const run: Run = async (client, message, args) => {
  const port: string = args[0];

  if (!port) {
    await message.channel.send("❌ Please provide a port number. Example: >isport `<port number>`");
    return;
  }

  const isValidPort: boolean = validator.isPort(port);

  if (isValidPort) {
    await message.channel.send("✅ This is a valid port number.");
    return;
  }

  await message.channel.send("❌ This isn't a valid port number.");
};

export const name: string = "isport";