
import { Run } from '../../interfaces/Event';

export const run: Run = async (client, message) => {
  await message.channel.send("🏓 Ping!");
}

export const name: string = "pong";