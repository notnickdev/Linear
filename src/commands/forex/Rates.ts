import { Run } from "../../interfaces/Command";
import { color } from "../../config.json";
import fetch from "node-fetch";

export const run: Run = async (client, message, args) => {
  const baseCurrency: string = args[0];
  const quoteCurrency: string = args[1];

  if (!baseCurrency || !quoteCurrency) {
    await message.channel.send(
      "❌ Please provide both the base and quote currencies. Example >rates `<base>` `<quote>`"
    );
    return;
  }

  const currency: string = `${baseCurrency}/${quoteCurrency}`.toUpperCase();

  const url: string = "https://www.live-rates.com/rates";

  const response: any[] = await fetch(url).then((res: any) => res.json());

  response.forEach((rate) => {
    if (currency === rate.currency) {
      message.channel.send(
        client
          .embed(
            {
              title: `${rate.currency} | Rates`,
              url,
              color,
              thumbnail: {
                url: client.user?.displayAvatarURL(),
              },
              fields: [
                {
                  name: "**Currency:**",
                  value: rate.currency,
                  inline: true,
                },
                {
                  name: "**Rate:**",
                  value: rate.rate,
                },
                {
                  name: "**Bid:**",
                  value: rate.bid,
                  inline: true,
                },
                {
                  name: "**Ask:**",
                  value: rate.ask,
                  inline: true,
                },
                {
                  name: "**Low:**",
                  value: rate.low,
                  inline: true,
                },
                {
                  name: "**Open:**",
                  value: rate.open,
                  inline: true,
                },
                {
                  name: "**Low:**",
                  value: rate.low,
                  inline: true,
                },
                {
                  name: "**Timestamp:**",
                  value: rate.timestamp,
                  inline: true,
                },
              ],
            },
            message
          )
          .setFooter(
            `${client.user?.username} | ${rate.currency} | Rates`,
            client.user?.displayAvatarURL()
          )
      );
    }
  });
};

export const name: string = "rates";
