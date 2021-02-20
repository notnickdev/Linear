import { Run } from "../../interfaces/Command";
import validator from "validator";

export const run: Run = async (client, message, args) => {
  if (!args[0]) {
    await message.channel.send(
      "❌ Please provide an email. Exmaple: >email `<email>`"
    );
    return;
  }

  const email = args[0];

  const emailValid: boolean = validator.isEmail(email);

  if (emailValid) {
    await message.channel.send("✅ This email is valid.");
    return;
  }

  await message.channel.send("❌ This email isn't valid.");
};

export const name: string = "email";
