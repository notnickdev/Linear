import { Run } from "../../interfaces/Event";

export const run: Run = async (client, message, args) => {
  const firstNumber: number = parseInt(args[0]);
  const secondNumber: number = parseInt(args[1]);

  if (!firstNumber || !secondNumber) {
    await message.channel.send(
      "❌ Please provide both numbers. Example: >add `<firstNumber>` `<secondNumber>`"
    );
    return;
  }

  const sum: number = firstNumber + secondNumber;

  await message.channel.send(`✅ ${firstNumber} + ${secondNumber} = *${sum}*`);
};

export const name: string = "add";
