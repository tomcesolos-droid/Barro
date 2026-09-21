import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'massdm',
    description: "Send direct message broadcast across open DMs with rate limit delay",
    aliases: ['dmbroadcast'],
    usage: '<message_text>',
    category: 'general',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 10,

    async execute(client, message, args) {
        const text = args.join(' ');
        if (!text) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro MassDM'),
                style('Error: Please specify message text.', THEME.ACCENT_COLOR)
            ]));
        }

        const dms = client.channels.cache.filter(c => c.type === 'DM');
        let count = 0;

        message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro MassDM'),
            style(`Broadcasting DM to ${dms.size} channels...`, THEME.ACCENT_COLOR)
        ]));

        for (const [, channel] of dms) {
            try {
                await channel.send(text);
                count++;
                await new Promise(r => setTimeout(r, 2000));
            } catch (err) {
                log(`MassDM error on channel ${channel.id}: ${err.message}`, 'warn');
            }
        }

        log(`MassDM completed to ${count} channels`, 'info');
    }
};
