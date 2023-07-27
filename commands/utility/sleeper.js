const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleeper')
		.setDescription('Disconnects a user who may be AFK')
		.addUserOption(option => 
			option
				.setName('target')
				.setDescription('Target user to disconnect.')
				.setRequired(true))
		.setDMPermission(false),
        
	async execute(interaction) {

		const targetUser = interaction.options.getUser('target')

		const confirm = new ButtonBuilder()
			.setCustomId('isStillPresent')
			.setLabel('I am still Awake')
			.setStyle(ButtonStyle.Primary)

		const row = new ActionRowBuilder()
			.addComponents(confirm)

		const response = await interaction.reply({
			content: `<@${targetUser.id}> you are reported as AFK. Are you still awake?`,
			components: [row]
		})

		const collectorFilter = i => i.user.id === targetUser.id;

		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 5_000 });

			if (confirmation.customId === 'isStillPresent') {
				await interaction.deleteReply()
			}
		} catch (e) {

				await interaction.guild.members.edit(targetUser, {channel: interaction.guild.afkChannelId})
				await interaction.editReply({ content: `<@${targetUser.id}> was disconnected`, components: [] });
				await new Promise((resolve) => setTimeout(resolve, 60000))
				await interaction.deleteReply()
			
		}
	},
};