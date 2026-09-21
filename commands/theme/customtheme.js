import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'customtheme',
    description: "Export current theme palette or set custom hex colors",
    aliases: ['exporttheme', 'themebuilder'],
    usage: 'view | export',
    category: 'theme',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message) {
        return message.channel.send(formatAnsiBlocks([
            [formatHeaderTitle('Barro Custom Theme')],
            [style('Accent Color: ', THEME.LABEL_COLOR) + style(THEME.ACCENT_COLOR, THEME.ACCENT_COLOR)],
            [style('Header Color: ', THEME.LABEL_COLOR) + style(THEME.HEADER_BOLD_COLOR, THEME.ACCENT_COLOR)],
            [style('Text Color: ', THEME.LABEL_COLOR) + style(THEME.TEXT_COLOR, THEME.ACCENT_COLOR)]
        ]));
    }
};
