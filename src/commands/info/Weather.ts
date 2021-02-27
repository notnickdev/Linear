import { Run } from "../../interfaces/Command";
import { color } from "../../config.json";
import fetch from "node-fetch";

require("dotenv").config();

export const run: Run = async (client, message, args) => {
  let country: string;

  const countryArgs1: string = args[0];
  const countryArgs2: string = args[1];

  if (countryArgs1 && countryArgs2) {
    country = `${countryArgs1} ${countryArgs2}`;
  } else {
    country = countryArgs1;
  }

  if (!countryArgs1) {
    await message.channel.send(
      "❌ Please provide a location. Example >weather `<London>`"
    );
    return;
  }

  const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.OPENWEATHER_API_KEY}`;

  const response: any = await fetch(url).then((res: any) => res.json());
  const weatherCodeIconUrl: string = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

  await message.channel.send(
    client
      .embed(
        {
          title: response.name,
          color,
          thumbnail: {
            url: weatherCodeIconUrl,
          },
          fields: [
            {
              name: "**Temperature:**",
              value: response.main.temp,
            },
            {
              name: "**Pressure:**",
              value: response.main.pressure,
              inline: true,
            },
            {
              name: "**Description:**",
              value: response.weather[0].description,
              inline: true,
            },
            {
              name: "**Feels like:**",
              value: response.main.feels_like,
              inline: true,
            },
            {
              name: "**Country Code:**",
              value: response.sys.country,
              inline: true,
            },
            {
              name: "**Wind speed:**",
              value: response.wind.speed,
              inline: true,
            },
            {
              name: "**Humidity:**",
              value: response.main.humidity,
              inline: true,
            },
          ],
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

export const name: string = "weather";
