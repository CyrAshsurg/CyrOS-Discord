const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleeper')
		.setDescription('Disconnects a user who may be AFK'),
        
	async execute(interaction) {

        




		await interaction.reply('This is supposed to reply with pong but I want the bot to reply with Potato!');
	},
};