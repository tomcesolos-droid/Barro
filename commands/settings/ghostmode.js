import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export let ghostModeActive = true;

export default {
    name: 'ghostmode',
    description: "Toggle global privacy mode (suppress typing indicators and read receipts)",
    aliases: ['stealthmode', 'invisiblemode'],
    usage: '<on | off>',
    category: 'settings',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() === 'off') {
            ghostModeActive = false;
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro GhostMode'),
                style('Status: Global GhostMode Disabled.', THEME.ACCENT_COLOR)
            ]));
        }

        ghostModeActive = true;
        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro GhostMode'),
            style('Status: Global GhostMode Active (Invisible Stealth).', THEME.ACCENT_COLOR)
        ]));
    }
};
