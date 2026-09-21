import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'ghostping',
    description: "Send a ping to a target user and immediately delete it",
    aliases: ['gp', 'stealthping'],
    usage: '<@user/userID> [delay_ms]',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 3,

    async execute(client, message, args) {
        if (!args.length) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro GhostPing'),
                style('Usage: ', THEME.LABEL_COLOR) + style(`${client.prefix}ghostping <@user> [delay_ms]`, THEME.ACCENT_COLOR)
            ]));
        }

        const target = args[0];
        const delay = parseInt(args[1]) || 50;

        try {
            const pingMsg = await message.channel.send(`${target}`);
            setTimeout(async () => {
                try {
                    await pingMsg.delete();
                } catch {}
            }, delay);

            log(`Ghostping sent to ${target} with ${delay}ms delay`, 'debug');
        } catch (err) {
            log(`Ghostping failed: ${err.message}`, 'error');
        }
    }
};
