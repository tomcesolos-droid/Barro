import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export const autoReplyRules = new Map(); // trigger -> replyText

export default {
    name: 'autoreply',
    description: "Manage rule-based automatic response triggers",
    aliases: ['ar', 'autorespond'],
    usage: 'add <keyword> <response> | remove <keyword> | list',
    category: 'settings',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        if (!args.length) {
            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Auto-Reply')],
                [
                    style('Usage', THEME.HEADER_BOLD_COLOR),
                    style(`${client.prefix}ar add <keyword> <response>`, THEME.LABEL_COLOR) + style(' | Add trigger rule', THEME.ACCENT_COLOR),
                    style(`${client.prefix}ar remove <keyword>`, THEME.LABEL_COLOR) + style(' | Remove trigger rule', THEME.ACCENT_COLOR),
                    style(`${client.prefix}ar list`, THEME.LABEL_COLOR) + style(' | List active auto-reply rules', THEME.ACCENT_COLOR)
                ]
            ]));
        }

        const subcommand = args[0].toLowerCase();

        if (subcommand === 'add') {
            const trigger = args[1]?.toLowerCase();
            const response = args.slice(2).join(' ');

            if (!trigger || !response) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-Reply'),
                    style('Error: Missing keyword or response text.', THEME.ACCENT_COLOR)
                ]));
            }

            autoReplyRules.set(trigger, response);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Auto-Reply'),
                style(`Rule Added: "${trigger}" -> "${response}"`, THEME.ACCENT_COLOR)
            ]));
        }

        if (subcommand === 'remove' || subcommand === 'del') {
            const trigger = args[1]?.toLowerCase();
            if (!trigger || !autoReplyRules.has(trigger)) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-Reply'),
                    style('Error: Trigger keyword not found.', THEME.ACCENT_COLOR)
                ]));
            }

            autoReplyRules.delete(trigger);
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Auto-Reply'),
                style(`Rule Removed: "${trigger}"`, THEME.ACCENT_COLOR)
            ]));
        }

        if (subcommand === 'list') {
            if (autoReplyRules.size === 0) {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Auto-Reply'),
                    style('No auto-reply rules active.', THEME.ACCENT_COLOR)
                ]));
            }

            const rows = [];
            for (const [key, val] of autoReplyRules.entries()) {
                rows.push(`${style(key, THEME.LABEL_COLOR)} -> ${style(val, THEME.ACCENT_COLOR)}`);
            }

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Auto-Reply')],
                rows
            ]));
        }
    }
};
