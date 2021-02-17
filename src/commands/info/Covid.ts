import { Run } from "../../interfaces/Command";
import fetch from "node-fetch";

export const run: Run = async (client, message, args) => {
  const countryArgs1 = args[0];
  const countryArgs2 = args[1];

  let country: string = `${countryArgs1} ${countryArgs2}`.toLowerCase();
  if (!countryArgs2) country = `${countryArgs1}`.toLowerCase();
  const url: string = "https://api.covid19api.com/summary";

  const response = await fetch(url).then((res: any) => res.json());

  let countryFlagUrl: string;

  response.Countries.forEach((countryDataResponse: any) => {
    if (
      country === countryDataResponse.Country.toLowerCase() ||
      country === countryDataResponse.CountryCode.toLowerCase()
    ) {
      countryFlagUrl = `https://www.countryflags.io/${countryDataResponse.CountryCode}/flat/64.png`;
      return;
    }
  });

  if (!countryArgs1 && !countryArgs2) {
    await message.channel.send(
      client
        .embed(
          {
            title: "Global Covid Cases",
            color: "RED",
            thumbnail: {
              url:
                "https://www.statnews.com/wp-content/uploads/2020/02/Coronavirus-CDC-645x645.jpg",
            },
            fields: [
              {
                name: "**New Confirmed:**",
                value: response.Global.NewConfirmed,
              },
              {
                name: "**Total Confirmed:**",
                value: response.Global.TotalConfirmed,
                inline: true,
              },
              {
                name: "**Total Deaths:**",
                value: response.Global.NewDeaths,
                inline: true,
              },
              {
                name: "**New Recovered:**",
                value: response.Global.NewRecovered,
                inline: true,
              },
              {
                name: "**Date:**",
                value: response.Global.Date,
                inline: true,
              },
            ],
            url: "https://documenter.getpostman.com/view/10808728/SzS8rjbc",
          },
          message
        )
        .setFooter(
          `${client.user?.username} | Covid Data | Provided by Postman`,
          client.user?.displayAvatarURL()
        )
    );
    return;
  }

  const foundCorrectData = response.Countries.forEach((responseData: any) => {
    return (
      country !== responseData.Country.toLowerCase() ||
      country !== responseData.CountryCode.toLowerCase()
    );
  });

  if (foundCorrectData) {
    await message.channel.send(
      "❌ This country is either not supported or your probably missed the country name. Please make sure to include the correct country name or country code."
    );
    return;
  }

  response.Countries.forEach((countryResponseData: any) => {
    if (
      country === countryResponseData.Country.toLowerCase() ||
      country === countryResponseData.CountryCode.toLowerCase()
    ) {
      message.channel.send(
        client
          .embed(
            {
              title: `Covid Data | ${countryResponseData.Country}`,
              thumbnail: {
                url: countryFlagUrl,
              },
              color: "RED",
              fields: [
                {
                  name: "**Country:**",
                  value: countryResponseData.Country,
                  inline: true,
                },
                {
                  name: "**New Confirmed:**",
                  value: countryResponseData.NewConfirmed,
                  inline: true,
                },
                {
                  name: "**Total Confirmed:**",
                  value: countryResponseData.TotalConfirmed,
                  inline: true,
                },
                {
                  name: "**New Deaths:**",
                  value: countryResponseData.NewDeaths,
                  inline: true,
                },
                {
                  name: "**Total Deaths:**",
                  value: countryResponseData.TotalDeaths,
                  inline: true,
                },
                {
                  name: "**New Recovered:**",
                  value: countryResponseData.NewRecovered,
                  inline: true,
                },
                {
                  name: "**Date:**",
                  value: countryResponseData.Date,
                }
              ],
            },
            message
          )
          .setFooter(
            `${client.user?.username} | Covid Data | Provided by Postman`,
            client.user?.displayAvatarURL()
          )
      );
    }
  });
};

export const name: string = "covid";
