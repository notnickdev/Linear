import { Run } from '../../interfaces/Command';
import { color } from "../../config.json";
import fetch from "node-fetch";

export const run: Run = async (client, message) => {
  const url: string = "https://dog.ceo/api/breeds/image/random";

  const response: { message: string } = await fetch(url).then((res: any) => res.json());

  await message.channel.send(client.embed({
    title: "🐶 Dog",
    color,
    image: {
      url: response.message
    }
  }, message).setTimestamp().setFooter(`${client.user?.username} | Dog`, client.user?.displayAvatarURL()));
}

export const name: string = "dog";