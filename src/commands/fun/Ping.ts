import { Run } from '../../interfaces/Event';

export const run: Run = async (client, message) => {
  await message.channel.send('🏓 Pong!');
}

export const name: string = 'ping';