import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'embedbuilder',
    description: "Construct custom ANSI formatted codeblock embeds",
    aliases: ['ansibuilder', 'customembed'],
    usage: '<title> | <label: value> | <label: value>',
    category: 'theme',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        const parts = args.join(' ').split('|').map(p => p.trim());
        const title = parts[0] || 'Barro Custom Embed';
        const rows = parts.slice(1).map(p => {
            const [label, val] = p.split(':').map(s => s?.trim());
            return `${style(label || 'Info', THEME.LABEL_COLOR)} | ${style(val || '', THEME.ACCENT_COLOR)}`;
        });

        return message.channel.send(formatAnsiBlocks([
            [formatHeaderTitle(title)],
            rows.length ? rows : [style('No details provided.', THEME.ACCENT_COLOR)]
        ]));
    }
};
