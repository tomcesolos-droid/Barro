import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style, loadJSONAsync } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import path from 'path';

export default {
    name: 'dmsaver',
    description: "View saved deleted DM messages vault",
    aliases: ['dmvault', 'deleteddms'],
    usage: '',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message) {
        const vaultPath = path.resolve('./data/dmsaver_vault.json');
        const vault = await loadJSONAsync(vaultPath);
        const entries = Object.values(vault);

        if (!entries.length) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro DM Saver'),
                style('DM Vault is currently empty.', THEME.ACCENT_COLOR)
            ]));
        }

        const rows = entries.slice(-5).map(e => `${style(e.authorTag, THEME.LABEL_COLOR)}: ${style(e.content || '[Media]', THEME.ACCENT_COLOR)}`);
        return message.channel.send(formatAnsiBlocks([
            [formatHeaderTitle('Barro DM Saver Vault')],
            [style(`Total Saved Deleted DMs: ${entries.length}`, THEME.ACCENT_COLOR)],
            rows
        ]));
    }
};
