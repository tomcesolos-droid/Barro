import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export const autoLeaveBlacklist = new Set();

export default {
    name: 'autoleave',
    description: "Blacklist server IDs to automatically leave if joined",
    aliases: ['blacklistguild', 'guildautoleave'],
    usage: 'add <guildID> | remove <guildID> | list',
    category: 'settings',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        const sub = args[0]?.toLowerCase();
        const guildId = args[1];

        if (sub === 'add' && guildId) {
            autoLeaveBlacklist.add(guildId);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro AutoLeave'),
                style(`Added guild ${guildId} to AutoLeave blacklist.`, THEME.ACCENT_COLOR)
            ]));
        }

        if (sub === 'remove' && guildId) {
            autoLeaveBlacklist.delete(guildId);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro AutoLeave'),
                style(`Removed guild ${guildId} from blacklist.`, THEME.ACCENT_COLOR)
            ]));
        }

        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro AutoLeave'),
            style(`Blacklisted Guilds Count: ${autoLeaveBlacklist.size}`, THEME.ACCENT_COLOR)
        ]));
    }
};
