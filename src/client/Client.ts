import consola, { Consola } from "consola";
import {
  Client,
  MessageEmbedOptions,
  Message,
  MessageEmbed,
  Collection,
} from "discord.js";
import glob from "glob";
import { promisify } from "util";

import { Command } from "../interfaces/Command";
import { Event } from "../interfaces/Event";
import { Config } from "../interfaces/Config";

const globPromise = promisify(glob);

class Bot extends Client {
  public logger: Consola = consola;
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config | undefined;

  public constructor() {
    super({
      messageCacheLifetime: 180,
      messageCacheMaxSize: 200,
      messageEditHistoryMaxSize: 200,
      messageSweepInterval: 180,
    });
  }

  public async start(config: Config): Promise<void> {
    this.config = config;
    this.login(config.token);

    // Commands
    const commandFiles: string[] = await globPromise(
      `${__dirname}/../commands/**/*{.ts,.js}`
    );
    commandFiles.map(async (value: string) => {
      const file: Command = await import(value);
      this.commands.set(file.name, file);
    });

    // Events
    const eventFiles: string[] = await globPromise(
      `${__dirname}/../events/**/*{.ts,.js}`
    );
    eventFiles.map(async (value: string) => {
      const file: Event = await import(value);
      this.events.set(file.name, file);
      this.on(file.name, file.run.bind(null, this));
    });
  };

  public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
    return new MessageEmbed({ ...options });
  }
}

export { Bot };
