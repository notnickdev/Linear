import { Run } from "../../interfaces/Event";
import fetch from "node-fetch";

export const run: Run = async (client, message) => {
  const url: string = "https://no-api-key.com/api/v1/facts";
  const response: { fact: string } = await fetch(url).then((res: any) => res.json());

  await message.channel.send(
    client
      .embed(
        {
          title: "📚 Fun Random Fact",
          url,
          color: "GREEN",
          description: `Fact: ${response.fact}`,
        },
        message
      )
      .setFooter(
        `${client.user?.username} | Random Fact`,
        client.user?.displayAvatarURL()
      )
  );
};

export const name: string = "randomfact";
