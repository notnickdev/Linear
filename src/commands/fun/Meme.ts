import { Run } from '../../interfaces/Command';
import fetch from "node-fetch";

export const run: Run = async (client, message) => {
  const url: string = "http://alpha-meme-maker.herokuapp.com/";
  const response: any = await fetch(url).then((res: any) => res.json()); 
};

export const name: string = "meme";