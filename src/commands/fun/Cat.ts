import { Run } from "../../interfaces/Command";
import { color } from "../../config.json";
import fetch from "node-fetch";

export const run: Run = async (client, message) => {
  const urlSource: string = "https://api.thecatapi.com/v1/images/search";
  const response: any = await fetch(urlSource).then((res: any) => res.json());

  const catData: { url: string } = { ...response };
  console.log(catData.url);

  await message.channel.send(
    client.embed(
      {
        title: "🐱 Cat",
        color,
        image: {
          url: catData.url
        },  
      },
      message
    )
  );
};

export const name: string = "cat";
