import { Run } from "../../interfaces/Command";
import fetch from "node-fetch";

require("dotenv").config();

const run: Run = async (client, message, args) => {
  const country: string = args[0];
  const url: string = `api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.OPENWEATHER_API_KEY}`;

  const response: any = fetch(url).then((res: any) => res.json());

  await message.channel.send(
    client
      .embed(
        {
          title: "",
        },
        message
      )
      .setTimestamp()
      .setFooter(
        `${client.user?.username} | Weather provided by openweathermap.org`,
        client.user?.displayAvatarURL()
      )
  );
};
