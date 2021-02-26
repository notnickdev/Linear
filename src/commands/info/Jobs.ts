import { Run } from "../../interfaces/Command";
import { color } from "../../config.json";
import fetch from "node-fetch";

export const run: Run = async (client, message, args) => {
  const category: string = args[0];

  if (!category) {
    await message.channel.send(
      "❌ Please provide a job category. Example: >jobs `<category>`"
    );
    return;
  }

  const url: string = `https://remotive.io/api/remote-jobs?category=${category}`;
  const response: any = await fetch(url).then((res: any) => res.json());

  const fetchRandomJobData = Math.floor(
    Math.random() * response.jobs.length + 1
  );
  
  const job: any = response.jobs[fetchRandomJobData];

  await message.channel.send(
    client
      .embed(
        {
          title: `${client.user?.username} | ${job.title} | Remote Jobs`,
          url: job.url,
          thumbnail: {
            url:
              "https://pbs.twimg.com/profile_images/1151480302721744896/LzBas_bj_400x400.png",
          },
          color,
          fields: [
            {
              name: "**Company:**",
              value: job.company_name,
            },
            {
              name: "**Job Type:**",
              value: job.job_type,
              inline: true,
            },
            {
              name: "**Category:**",
              value: job.category,
              inline: true,
            },
            {
              name: "**Location:**",
              value: job.candidate_required_location,
              inline: true,
            },
            {
              name: "**Salary:**",
              value: !job.salary ? "Not specified" : job.salary,
              inline: true,
            },
            {
              name: "**Published Date:**",
              value: job.publication_date,
              inline: true,
            },
          ],
        },
        message
      )
      .setTimestamp()
      .setFooter(
        `${client.user?.username} | Data provided by Remoteive.io`,
        client.user?.displayAvatarURL()
      )
  );
};

export const name: string = "jobs";
