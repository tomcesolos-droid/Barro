import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export let aiModeratorActive = true;

export default {
    name: 'aimoderator',
    description: "Toggle automated AI filter for outgoing selfbot messages",
    aliases: ['aifilter', 'aisafety'],
    usage: '<on | off>',
    category: 'AI',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() === 'off') {
            aiModeratorActive = false;
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro AI Moderator'),
                style('Status: AI Content Filter Disabled.', THEME.ACCENT_COLOR)
            ]));
        }

        aiModeratorActive = true;
        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro AI Moderator'),
            style('Status: AI Content Filter Active.', THEME.ACCENT_COLOR)
        ]));
    }
};
