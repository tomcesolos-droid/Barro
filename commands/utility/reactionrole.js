import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export let reactionRoleCollector = true;

export default {
    name: 'reactionrole',
    description: "Toggle auto reaction role collector",
    aliases: ['rrclaim', 'autoroleclaim'],
    usage: '<on | off>',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() === 'off') {
            reactionRoleCollector = false;
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro ReactionRole'),
                style('Status: Auto Reaction Role Collector Disabled.', THEME.ACCENT_COLOR)
            ]));
        }

        reactionRoleCollector = true;
        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro ReactionRole'),
            style('Status: Auto Reaction Role Collector Active.', THEME.ACCENT_COLOR)
        ]));
    }
};
