import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import axios from 'axios';

export default {
    name: 'activityspoofer',
    description: "Spoof custom game activity presence (e.g. GTA VI)",
    aliases: ['gameactivity', 'spoofgame'],
    usage: '<game_name>',
    category: 'status',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const game = args.join(' ') || 'Grand Theft Auto VI';

        try {
            await axios.patch(
                `https://discord.com/api/v9/users/@me/settings`,
                { custom_status: { text: `🎮 Playing ${game}`, emoji_name: '🎮' } },
                { headers: { Authorization: client.token, 'Content-Type': 'application/json' } }
            );

            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Activity Spoofer'),
                style(`Active Game Spoofed: ${game}`, THEME.ACCENT_COLOR)
            ]));
        } catch (err) {
            log(`Activity Spoofer error: ${err.message}`, 'error');
        }
    }
};
