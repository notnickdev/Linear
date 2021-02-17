import { Bot } from "../client/Client";

export interface Run {
  (client: Bot, ...args: any[]): Promise<void>;
}

export interface Event {
  name: string;
  run: Run;
}
