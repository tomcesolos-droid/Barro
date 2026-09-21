import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import fs from 'fs';
import path from 'path';

export default {
    name: 'selfwipe',
    description: "Emergency 1-click wipe of local logs, caches, and tracking histories",
    aliases: ['panicwipe', 'emergencywipe'],
    usage: 'confirm',
    category: 'settings',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 10,

    async execute(client, message, args) {
        if (args[0]?.toLowerCase() !== 'confirm') {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro SelfWipe Panic'),
                style(`WARNING: Clears all local logs, tracking history, and caches.`, THEME.ACCENT_COLOR),
                style(`Type "${client.prefix}selfwipe confirm" to proceed.`, THEME.LABEL_COLOR)
            ]));
        }

        const dataDir = path.resolve('./data');
        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir);
            for (const file of files) {
                if (file.endsWith('.json') || file.endsWith('.txt') || file.endsWith('.log')) {
                    try {
                        fs.writeFileSync(path.join(dataDir, file), file.endsWith('.json') ? '{}' : '');
                    } catch {}
                }
            }
        }

        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro SelfWipe Panic'),
            style('✅ Emergency wipe complete! All local state reset.', THEME.ACCENT_COLOR)
        ]));
    }
};
