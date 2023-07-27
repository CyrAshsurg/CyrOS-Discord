const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
        
	async execute(interaction) {
		await interaction.reply('This is supposed to reply with pong but I want the bot to reply with Potato!');
	},
};