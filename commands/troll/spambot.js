import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'spambot',
    description: "Multi-message raid spam generator with customizable count & delay",
    aliases: ['raidspam', 'fastspam'],
    usage: '<count> <delay_ms> <text>',
    category: 'troll',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 10,

    async execute(client, message, args) {
        const count = parseInt(args[0]);
        const delay = parseInt(args[1]);
        const text = args.slice(2).join(' ');

        if (!count || !delay || !text) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro SpamBot'),
                style(`Usage: ${client.prefix}spambot <count> <delay_ms> <text>`, THEME.ACCENT_COLOR)
            ]));
        }

        for (let i = 0; i < Math.min(count, 50); i++) {
            try {
                await message.channel.send(text);
                await new Promise(r => setTimeout(r, Math.max(delay, 200)));
            } catch (err) {
                log(`Spambot error: ${err.message}`, 'warn');
                break;
            }
        }
    }
};
