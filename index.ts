import DiscordJS, { Intents } from "discord.js";
import db from "mongoose";
import testSchema from "./schemas/test-schema";
import { logger } from "./shared/logger";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const mongoPass = process.env.MONGOCONNECTION;
if (!mongoPass) {
    logger.error("Missing MongoDB Database Password");
    process.exit(1);
}

client.once("ready", async () => {
    client.user?.setActivity("g-help | @Giorno", { type: "WATCHING" });

    logger.info("GiornoBot is Online!");

    db.connect(mongoPass, async (err: any) => {
        err ? logger.error(err) : logger.info("Connected to MongoDB");
    });

    // await new testSchema({
    //     message: "Hello"
    // }).save();
});

client.on("messageCreate", message => {
    if (message.content === "g-ping") {
        message.reply({
            content: `🏓Pong! Latency is ${Math.round(client.ws.ping)}ms`
        });
    }
});

client.login(process.env.TOKEN);
