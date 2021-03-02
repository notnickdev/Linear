import { Run } from "../../interfaces/Event"
import { VoiceState, VoiceChannel } from "discord.js";

export const run: Run = async (client: any, oldState: VoiceState | any, newState: VoiceChannel) => {
  if (!oldState || !oldState.channel?.members.has(client.user.id)) return;
  if (newState.member.id === client.user.id) return;
}