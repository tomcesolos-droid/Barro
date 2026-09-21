import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export const autoReactTargets = new Map(); // userId -> emoji

export default {
    name: 'autoreact',
    description: "Automatically react to all messages from a specific user with an emoji",
    aliases: ['reactuser', 'reacttarget'],
    usage: 'add <@user/userID> <emoji> | remove <@user/userID> | list',
    category: 'troll',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        if (!args.length) {
            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Auto-React')],
                [
                    style('Usage', THEME.HEADER_BOLD_COLOR),
                    style(`${client.prefix}autoreact add <@user/userID> <emoji>`, THEME.LABEL_COLOR) + style(' | Auto-react to user', THEME.ACCENT_COLOR),
                    style(`${client.prefix}autoreact remove <@user/userID>`, THEME.LABEL_COLOR) + style(' | Stop auto-reacting', THEME.ACCENT_COLOR),
                    style(`${client.prefix}autoreact list`, THEME.LABEL_COLOR) + style(' | List target users', THEME.ACCENT_COLOR)
                ]
            ]));
        }

        const subcommand = args[0].toLowerCase();

        if (subcommand === 'add') {
            const userInput = args[1];
            const emoji = args[2];

            if (!userInput || !emoji) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-React'),
                    style('Error: Missing target user or emoji.', THEME.ACCENT_COLOR)
                ]));
            }

            let targetUser = message.mentions.users.first();
            if (!targetUser) {
                try {
                    targetUser = await client.users.fetch(userInput.replace(/[<@!>]/g, ''));
                } catch {}
            }

            if (!targetUser) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-React'),
                    style('Error: User not found.', THEME.ACCENT_COLOR)
                ]));
            }

            autoReactTargets.set(targetUser.id, emoji);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Auto-React'),
                style(`Target Added: ${targetUser.tag} -> ${emoji}`, THEME.ACCENT_COLOR)
            ]));
        }

        if (subcommand === 'remove' || subcommand === 'del') {
            const userInput = args[1];
            let targetId = userInput?.replace(/[<@!>]/g, '');

            if (!targetId || !autoReactTargets.has(targetId)) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-React'),
                    style('Error: Target user not found in auto-react list.', THEME.ACCENT_COLOR)
                ]));
            }

            autoReactTargets.delete(targetId);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Auto-React'),
                style(`Target Removed: ${targetId}`, THEME.ACCENT_COLOR)
            ]));
        }

        if (subcommand === 'list') {
            if (autoReactTargets.size === 0) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-React'),
                    style('No auto-react targets set.', THEME.ACCENT_COLOR)
                ]));
            }

            const rows = [];
            for (const [userId, emoji] of autoReactTargets.entries()) {
                rows.push(`${style(userId, THEME.LABEL_COLOR)} -> ${style(emoji, THEME.ACCENT_COLOR)}`);
            }

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Auto-React')],
                rows
            ]));
        }
    }
};
