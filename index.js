const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const color = require('cli-color');
const { token, prefix } = require('./config/config.json');
const wait = require('node:timers/promises').setTimeout();

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_SCHEDULED_EVENTS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_WEBHOOKS] });

client.once('ready', () => {
	const log = color.cyanBright(`${client.user.username} is logged to the server`);
	console.log(log);
});


// command message
client.on('messageCreate', async msg => {
	const command = msg.content.replace(prefix, '').replace('/ /g', ' ');
	if (msg.author.id === client.user.id) return;

	if (command == 'server info') {
		const embed = new MessageEmbed()
			.setTitle('Command: Server Info')
			.setDescription('Please choose what you want')
			.setColor('AQUA');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('server-info-menu')
					.setPlaceholder('click me')
					.addOptions([
						{
							label: 'ID',
							description: 'click here to get server ID',
							value: 'server_id',
						},
						{
							label: 'Owner',
							description: 'click here to get owner namme as id',
							value: 'server_owner',
						},
						{
							label: 'Roles',
							description: 'click here to get list of all server roles',
							value: 'server_role',
						},
						{
							label: 'Created At',
							description: 'click here to know when server was created',
							value: 'server_at',
						},
					]),
			);
		await msg.reply({ embeds: [embed], components: [row] });
	}
	else if (command == 'user info') {
		const embed = new MessageEmbed()
			.setTitle('Command: User Info')
			.setDescription('Please choose what you want')
			.setColor('AQUA');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('user_info_menu')
					.setPlaceholder('Click Me')
					.addOptions([
						{
							label: 'ID',
							description: 'click here to get user ID',
							value: 'u_id',
						},
						{
							label: 'Joined server',
							description: 'click to know when you joined this server',
							value: 'u_js',
						},
						{
							label: 'Created At',
							description: 'click to know when your account was created',
							value: 'u_ct',
						},
						{
							label: 'Roles',
							description: 'click to see all your roles',
							value: 'u_r',
						},
					]),
			);
		msg.reply({ embeds: [embed], components: [row] });
	}
	else if (command.includes('clear')) {
		const args = command.split(' ');
		const amounts = parseInt(args[1], 10) + 1;
		if (!args[1]) return msg.reply('what you mean? don\'t want to give amount for deleting messages');
		if (isNaN(args[1])) return msg.reply('Man alphabet and numbers are different things');
		if (amounts < 3) return msg.reply(`Are you too lazy to delete ${amounts}`);
		if (amounts > 99) return msg.reply(`Sorry bro now I'm too lazy to delete ${amounts}`);
		// eslint-disable-next-line no-unused-vars
		msg.channel.bulkDelete(amounts).catch(err => {
			// msg.channel.send('Sorry dude but due to Discord limitations, I cannot delete messages older than 14 days');
			console.log(err);
		});
		const msgs = await msg.channel.send(`Deleted \`${amounts - 1}\` messages`);
		setTimeout(() => {
			msgs.delete();
		}, 2000);

	}
	else if (command == 'profile') {
		const embed = new MessageEmbed()
			.setTitle('What to know about me?')
			.setThumbnail(client.user.avatarURL('jpg'))
			.setDescription('**Name:** Celestial\n**Tag:**#1112\n**Version:** 0.0.1\n**Created by:** Celestial, Flow');
		msg.channel.send({ embeds: [embed] });
		msg.channel.send('https://tenor.com/view/ben10omniverse-alien-x-annihilaargh-universe-big-bang-gif-22319808');
	}
	else if (command == 'alienx reboot' || command == 'alienx restart') {
		if (!msg.author.id === '973525011488993290') return msg.reply('This command is only valid to Celestial');
		msg.reply('AlienX is restarting');
		wait;
		process.exit();
	}
	else if (command == 'cr') {
		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle('Color Roles');
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('color-role')
					.setPlaceholder('click me')
					.addOptions([
						{
							label: '🟥│Red',
							value: 'red',
						},
						{
							label: '🟧│Orange',
							value: 'orange',
						},
						{
							label: '🟨│Yellow',
							value: 'yellow',
						},
						{
							label: '🟩│Green',
							value: 'green',
						},
						{
							label: '🟦│Cyan',
							value: 'cyan',
						},
						{
							label: '🇧│Blue',
							value: 'blue',
						},
						{
							label: '🟪│Violet',
							value: 'violet',
						},
					]),
			);
		msg.channel.send({ embeds: [embed], components: [row] });
	}
});

// normal interaction
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;

	if (commandName === 'server-info') {
		const embed = new MessageEmbed()
			.setTitle('Command: Server Info')
			.setDescription('Please choose what you want')
			.setColor('AQUA');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('server-info-menu')
					.setPlaceholder('click me')
					.addOptions([
						{
							label: 'ID',
							description: 'click here to get server ID',
							value: 'server_id',
						},
						{
							label: 'Owner',
							description: 'click here to get owner namme as id',
							value: 'server_owner',
						},
						{
							label: 'Roles',
							description: 'click here to get list of all server roles',
							value: 'server_role',
						},
						{
							label: 'Created At',
							description: 'click here to know when server was created',
							value: 'server_at',
						},
					]),
			);
		await interaction.reply({ embeds: [embed], components: [row] });
	}
	else if (commandName === 'user-info') {
		const embed = new MessageEmbed()
			.setTitle('Command: User Info')
			.setDescription('Please choose what you want')
			.setColor('AQUA');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('user_info_menu')
					.setPlaceholder('Click Me')
					.addOptions([
						{
							label: 'ID',
							description: 'click here to get user ID',
							value: 'u_id',
						},
						{
							label: 'Joined server',
							description: 'click to know when you joined this server',
							value: 'u_js',
						},
						{
							label: 'Created At',
							description: 'click to know when your account was created',
							value: 'u_ct',
						},
						{
							label: 'Roles',
							description: 'click to see all your roles',
							value: 'u_r',
						},
					]),
			);
		interaction.reply({ embeds: [embed], components: [row] });
	}
});

// action row
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('server-info-menu')
				.setPlaceholder('click me')
				.addOptions([
					{
						label: 'ID',
						description: 'click here to get server ID',
						value: 'server_id',
					},
					{
						label: 'Owner',
						description: 'click here to get owner namme as id',
						value: 'server_owner',
					},
					{
						label: 'roles',
						description: 'click here to get list of all server roles',
						value: 'server_role',
					},
					{
						label: 'created at',
						description: 'click here to know when server was created',
						value: 'server_at',
					},
				]),
		);
	const row1 = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('user_info_menu')
				.setPlaceholder('Click Me')
				.addOptions([
					{
						label: 'ID',
						description: 'click here to get user ID',
						value: 'u_id',
					},
					{
						label: 'Joined server',
						description: 'click to know when you joined this server',
						value: 'u_js',
					},
					{
						label: 'Created At',
						description: 'click to know when your account was created',
						value: 'u_ct',
					},
					{
						label: 'Roles',
						description: 'click to see all your roles',
						value: 'u_r',
					},
				]),
		);

	if (interaction.customId === 'server-info-menu') {
		if (interaction.values == 'server_id') {
			const embed = new MessageEmbed()
				.setTitle('Command: Server Info')
				.setThumbnail(interaction.guild.iconURL('jpg'))
				.setColor('AQUA')
				.setFields({ name: 'Server Name', value: `${interaction.guild.name}`, inline: true },
					{ name: 'Server ID', value: `${interaction.guildId}` });

			await interaction.update({ embeds: [embed], components: [row] });
		}
		else if (interaction.values == 'server_owner') {
			const owner_id = interaction.guild.ownerId;
			const owner_name = interaction.guild.members.cache.get(owner_id).displayName;
			const embed = new MessageEmbed()
				.setTitle('Command: Server Info')
				.setThumbnail(interaction.guild.iconURL('jpg'))
				.setColor('AQUA')
				.setFields({ name: 'Owner Name', value: `${owner_name}`, inline: true },
					{ name: 'Owner ID', value: `${owner_id}`, inline: true });
			await interaction.update({ embeds: [embed], components: [row] });
		}
		else if (interaction.values == 'server_role') {
			const embed = new MessageEmbed()
				.setTitle('Command: Server Info')
				.setThumbnail(interaction.guild.iconURL('jpg'))
				.setColor('AQUA')
				.setFields({ name: 'Roles name', value: `${interaction.guild.roles.cache.map(roles => roles.name)}`, inline: true },
					{ name: 'Roles ID', value: `${interaction.guild.roles.cache.map(roles => roles.id)}`, inline: true });

			await interaction.update({ embeds: [embed], components: [row] });
		}
		else if (interaction.values == 'server_at') {
			const embed = new MessageEmbed()
				.setTitle('Command: Server Info')
				.setColor('AQUA')
				.setThumbnail(interaction.guild.iconURL('jpg'))
				.setFields({ name: 'Server', value: `${interaction.guild.name}`, inline: true },
					{ name: 'Created At', value: `${interaction.guild.createdAt}` });

			interaction.update({ embeds: [embed], components: [row] });
		}
	}
	else if (interaction.customId === 'user_info_menu') {
		if (interaction.values == 'u_id') {
			const embed = new MessageEmbed()
				.setTitle('Command: User Info')
				.setColor('AQUA')
				.setThumbnail(interaction.user.avatarURL('jpg'))
				.setFields({ name: 'Name', value: `${interaction.user.username}`, inline: true },
					{ name: 'ID', value: `${interaction.user.id}`, inline: true });

			await interaction.update({ embeds: [embed], components: [row1] });
		}
		else if (interaction.values == 'u_js') {
			const embed = new MessageEmbed()
				.setColor('AQUA')
				.setThumbnail(interaction.user.avatarURL('jpg'))
				.setTitle('Command: User Info')
				.setFields({ name: 'User', value: `${interaction.user.username}`, inline: true },
					{ name: 'Joined At', value: `${client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id).joinedAt}`, inline: true });
			await interaction.update({ embeds: [embed], components: [row1] });
		}
		else if (interaction.values == 'u_ct') {
			const embed = new MessageEmbed()
				.setColor('AQUA')
				.setTitle('Command: User Info')
				.setThumbnail(interaction.user.avatarURL('jpg'))
				.setFields({ name: 'User', value: `${interaction.user.username}`, inline: true },
					{ name: 'Created At', value: `${interaction.user.createdAt}`, inline: true });
			await interaction.update({ embeds: [embed], components: [row1] });
		}
		else if (interaction.values == 'u_r') {
			const embed = new MessageEmbed()
				.setTitle('Command: User Info')
				.setColor('AQUA')
				.setThumbnail(interaction.user.avatarURL('jpg'))
				.setFields({ name: 'Name', value: `${interaction.user.username}`, inline: true },
					{ name: 'Roles', value: `${client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id).roles.cache.map(roles => roles.name)}` });
			await interaction.update({ embeds: [embed], components: [row1] });
		}
	}
	else if (interaction.customId === 'color-role') {
		const user = interaction.user.id;
		const guild = interaction.guildId;
		if (interaction.values == 'red') {
			const role = '975333714944987156';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content: '# Red color role removed', ephemeral: true });
			}
			else {

				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Red color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'orange') {
			const role = '975333962543169577';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content: '# Orange color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Orange color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'yellow') {
			const role = '975334131674275840';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content:'# Yellow color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Yellow color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'green') {
			const role = '975334445668257832';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content:'# Green color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Green color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'cyan') {
			const role = '975335207827820544';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content:'# Cyan color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Cyan color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'blue') {
			const role = '975335123128041492';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content:'# Blue color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Blue color role added...', ephemeral: true });
			}
		}
		else if (interaction.values == 'violet') {
			const role = '975335214085705738';
			if (interaction.guild.members.cache.get(user).roles.cache.has(role)) {
				await interaction.guild.members.cache.get(user).roles.remove(role);
				await interaction.reply({ content:'# Violet color role removed', ephemeral: true });
			}
			else {
				await client.guilds.cache.get(guild).members.cache.get(user).roles.add(role);
				await interaction.reply({ content: '# Violet color role added...', ephemeral: true });
			}
		}
	}
});
client.login(token);
