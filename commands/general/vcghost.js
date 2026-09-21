import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'vcghost',
    description: "Connect to voice channel in stealth ghost mode",
    aliases: ['vcstealth', 'ghostvc'],
    usage: '<channelID | join | leave>',
    category: 'general',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const isHelpRequest = args[0] && ['help', '--help', '-h'].includes(args[0].toLowerCase());

        if (!args.length || isHelpRequest) {
            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro VC Ghost')],
                [
                    style('Usage', THEME.HEADER_BOLD_COLOR),
                    style(`${client.prefix}vcghost <channelID>`, THEME.LABEL_COLOR) + style(' | Join voice channel in stealth mode', THEME.ACCENT_COLOR),
                    style(`${client.prefix}vcghost leave`, THEME.LABEL_COLOR) + style(' | Disconnect from active voice channel', THEME.ACCENT_COLOR)
                ]
            ]));
        }

        const subcommand = args[0].toLowerCase();

        if (subcommand === 'leave' || subcommand === 'disconnect') {
            if (message.guild?.me?.voice?.channel) {
                await message.guild.me.voice.disconnect();
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro VC Ghost'),
                    style('Status: Disconnected from voice channel.', THEME.ACCENT_COLOR)
                ]));
            } else {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro VC Ghost'),
                    style('Status: Not currently in a voice channel.', THEME.ACCENT_COLOR)
                ]));
            }
        }

        const channelId = args[0].replace(/[<#>]/g, '');
        const targetChannel = message.guild?.channels.cache.get(channelId) || message.member?.voice?.channel;

        if (!targetChannel || targetChannel.type !== 'GUILD_VOICE') {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro VC Ghost'),
                style('Error: Invalid voice channel or not in a voice channel.', THEME.ACCENT_COLOR)
            ]));
        }

        try {
            // Join voice channel muted and deafened silently
            await client.voice.joinChannel({
                channelId: targetChannel.id,
                guildId: targetChannel.guild.id,
                selfMute: true,
                selfDeaf: true,
            });

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro VC Ghost')],
                [style('Status: Connected in Stealth Mode', THEME.ACCENT_COLOR)],
                [style('Channel: ', THEME.LABEL_COLOR) + style(targetChannel.name, THEME.ACCENT_COLOR)],
                [style('Mute/Deafen: ', THEME.LABEL_COLOR) + style('Enabled (Silent)', THEME.ACCENT_COLOR)]
            ]));
        } catch (error) {
            log(`VC Ghost connection error: ${error.message}`, 'error');
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro VC Ghost'),
                style(`Error: ${error.message}`, THEME.ACCENT_COLOR)
            ]));
        }
    }
};
