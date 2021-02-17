import { Run } from "../../interfaces/Event";
import { color } from "../../config.json";

export const run: Run = async (client, message) => {
  const randomDiceNumber: number = Math.floor(Math.random() * 6) + 1;
  const diceImageUrl: string = `http://roll.diceapi.com/images/poorly-drawn/d6/${randomDiceNumber}.png`;

  await message.channel.send(
    client.embed(
      {
        title: "🎲 Rolled Dice",
        thumbnail: {
          url: diceImageUrl,
        },
        description: `Dice landed on a **${randomDiceNumber}**`,
        color,
      },
      message
    )
  );
};

export const name: string = "roll";
