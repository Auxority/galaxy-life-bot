import { config } from 'dotenv';
import { GalaxyBot as GalaxyBot } from './GalaxyBot.js';

config();

new GalaxyBot(process.env.BOT_TOKEN as string);