import { Run } from "../../interfaces/Command";
import validator from "validator";
import { color } from "../../config.json";

export const run: Run = async (client, message, args) => {
  const password: string = args[0];

  if (!password) {
    await message.channel.send(
      client
        .embed(
          {
            title: "❗️ Please provide a password",
            color,
            description:
              "Disclaimer: Please don't actually provide any of your passwords that you use.",
          },
          message
        )
        .setFooter(`${client.user?.username}`, client.user?.displayAvatarURL())
        .setTimestamp()
    );
    return;
  }

  const isStrongPassword: boolean = validator.isStrongPassword(password, {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 3,
    minSymbols: 2,
  });

  if (isStrongPassword) {
    await message.channel.send("✅ This is considered a strong password.");
    return;
  }

  await message.channel.send("❌ This isn't considered a strong password.");
};

export const name: string = "strongpassword";
