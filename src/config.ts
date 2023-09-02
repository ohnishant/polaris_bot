import dotenv from "dotenv";

dotenv.config();

const { DISCORD_CLIENT, DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_CLIENT,
    DISCORD_TOKEN,
};
