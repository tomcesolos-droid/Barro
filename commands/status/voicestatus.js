import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export let voiceStatusSync = true;

export default {
    name: 'voicestatus',
    description: "Auto-update status based on active voice channel state",
    aliases: ['vcstatus', 'voicepresencesync'],
    usage: '<on | off>',
    category: 'status',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() === 'off') {
            voiceStatusSync = false;
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro VoiceStatus'),
                style('Status: Voice Status Sync Disabled.', THEME.ACCENT_COLOR)
            ]));
        }

        voiceStatusSync = true;
        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro VoiceStatus'),
            style('Status: Voice Status Sync Active.', THEME.ACCENT_COLOR)
        ]));
    }
};
