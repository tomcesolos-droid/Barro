import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export const activeRecordings = new Map();

export default {
    name: 'voicerecord',
    description: "Passively monitor and log voice channel audio events",
    aliases: ['vcrecord', 'vclog'],
    usage: '<start | stop>',
    category: 'general',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const action = args[0]?.toLowerCase();

        if (action === 'stop') {
            activeRecordings.delete(client.user.id);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Voice Record'),
                style('Status: Voice audio event logger stopped.', THEME.ACCENT_COLOR)
            ]));
        }

        const voiceChannel = message.member?.voice?.channel;
        if (!voiceChannel) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Voice Record'),
                style('Error: Must be connected to a voice channel.', THEME.ACCENT_COLOR)
            ]));
        }

        activeRecordings.set(client.user.id, {
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            startTime: Date.now()
        });

        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro Voice Record'),
            style('Status: Monitoring Voice Audio Streams', THEME.ACCENT_COLOR),
            style('Channel: ', THEME.LABEL_COLOR) + style(voiceChannel.name, THEME.ACCENT_COLOR)
        ]));
    }
};
