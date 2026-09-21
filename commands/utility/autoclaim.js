import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export let autoClaimEnabled = true;

export default {
    name: 'autoclaim',
    description: "Toggle auto-claiming of giveaways and drops",
    aliases: ['giveawaysniper', 'dropsniper'],
    usage: '<on | off>',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() === 'off') {
            autoClaimEnabled = false;
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro AutoClaim'),
                style('Status: AutoClaim Disabled.', THEME.ACCENT_COLOR)
            ]));
        }

        autoClaimEnabled = true;
        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro AutoClaim'),
            style('Status: AutoClaim Active (Sniping Giveaways & Drops).', THEME.ACCENT_COLOR)
        ]));
    }
};
