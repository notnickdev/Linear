import { Run } from "../../interfaces/Command";
import { color } from "../../config.json";

export const run: Run = async (client, message) => {
  let platform: string;

  if (process.platform === "darwin") {
    platform = "macOS";
  } else if (process.platform === "win32") {
    platform = "Windows";
  } else {
    platform = "Linux";
  }

  await message.channel.send(
    client
      .embed(
        {
          title: `${client.user?.username} | Info`,
          color,
          thumbnail: {
            url: client.user?.displayAvatarURL(),
          },
          fields: [
            {
              name: "**Name:**",
              value: client.user?.username,
              inline: true,
            },
            {
              name: "**Created At:**",
              value: client.user?.createdTimestamp,
              inline: true,
            },
            {
              name: "**Servers:**",
              value: client.guilds.cache.size,
              inline: true,
            },
            {
              name: "**Owner:**",
              value: message.guild?.owner?.user.tag,
              inline: true,
            },
            {
              name: "**ID:**",
              value: client.user?.id,
              inline: true,
            },
            {
              name: "**Node version:**",
              value: process.version,
              inline: true,
            },
            {
              name: "**Platform:**",
              value: platform,
              inline: true,
            },
            {
              name: "**Discriminator:**",
              value: client.user?.discriminator,
              inline: true,
            },
            {
              name: "**Tag:**",
              value: client.user?.tag,
              inline: true,
            },
          ],
        },
        message
      )
      .setTimestamp()
      .setFooter(
        `${client.user?.username} | Bot Info | Created by ${message.guild?.owner?.user.username}`,
        client.user?.displayAvatarURL()
      )
  );
};

export const name: string = "botinfo";
