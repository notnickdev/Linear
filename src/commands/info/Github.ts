import { Run } from "../../interfaces/Event";
import { color } from "../../config.json";
import fetch from "node-fetch";

export const run: Run = async (client, message, args) => {
  const gitHubUser = args[0];
  const url: string = `https://api.github.com/users/${gitHubUser}`;

  const response = await fetch(url).then((res: any) => res.json());

  if (response.message === "Not Found") {
    await message.channel.send(
      `❌ Github user **${gitHubUser}** was not found. Try searching for a valid user.`
    );
    return;
  }

  await message.channel.send(
    client
      .embed(
        {
          title: `${
            !response.name ? response.login : response.name
          } | Github Profile`,
          url: response.html_url,
          thumbnail: {
            url: response.avatar_url,
          },
          color,
          fields: [
            {
              name: "**User:**",
              value: !response.name ? response.login : response.name,
              inline: true,
            },
            {
              name: "**Type:**",
              value: response.type,
              inline: true,
            },
            {
              name: "**Public repos:**",
              value: response.public_repos,
              inline: true,
            },
            {
              name: "**Public gists:**",
              value: response.public_gists,
              inline: true,
            },
            {
              name: "**Location:**",
              value: response.location,
              inline: true,
            },
            {
              name: "**Followers:**",
              value: response.followers,
              inline: true,
            },
            {
              name: "**Following:**",
              value: response.following,
              inline: true,
            },
            {
              name: "**Twitter:**",
              value: `@${response.twitter_username}`,
              inline: true,
            },
            {
              name: "**Site:**",
              value: response.blog,
              inline: true,
            },
            {
              name: "**Bio:**",
              value: response.bio,
            },
          ],
        },
        message
      )
      .setFooter(
        `${client.user?.username} | ${
          !response.name ? response.login : response.name
        } | Data provided by Github`,
        client.user?.displayAvatarURL()
      )
  );
};

export const name: string = "github";
