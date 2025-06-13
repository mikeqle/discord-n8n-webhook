const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const webhookUrl = process.env.N8N_WEBHOOK_URL; // Use environment variable

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const payload = {
    event: 'messageCreate',
    content: message.content,
    author: message.author.username,
    channelId: message.channelId,
    timestamp: message.createdTimestamp,
  };

  try {
    await axios.post(webhookUrl, payload);
    console.log('Event sent to n8n:', payload);
  } catch (error) {
    console.error('Error sending to n8n:', error.message);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN); // Use environment variable