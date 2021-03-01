import { Run } from "../../interfaces/Command";

export const run: Run = async (client, message, args) => {
  const firstNumber: number = parseInt(args[0]);
  const secondNumber: number = parseInt(args[1]);

  if (!firstNumber || !secondNumber) {
    await message.channel.send(
      "❌ Please provide both numbers. Example: >subtract `<firstNumber>` `<secondNumber>`"
    );
    return;
  }

  const sum: number = firstNumber - secondNumber;

  await message.channel.send(`✅ ${firstNumber} - ${secondNumber} = *${sum}*`);
};

export const name: string = "subtract";
