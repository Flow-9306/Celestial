const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	// new SlashCommandBuilder().setName('server-info').setDescription('Want to get info about your universe'),
	// new SlashCommandBuilder().setName('user-info').setDescription('what you want to know about yourself?').addStringOption(option => option.setName('user').setRequired(false).setDescription('want to know someone\'s info click here!')),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Commands registered.'))
	.catch(console.error);