import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import axios from 'axios';

export default {
    name: 'spotifyrpc',
    description: "Spoof custom animated Spotify activity status",
    aliases: ['spotifyspoof', 'fakespotify'],
    usage: '<song_title> | <artist> | <album>',
    category: 'status',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const input = args.join(' ').split('|').map(s => s.trim());
        const song = input[0] || 'Barro Theme';
        const artist = input[1] || 'Barro AI';
        const album = input[2] || 'Control The Noise';

        try {
            await axios.patch(
                `https://discord.com/api/v9/users/@me/settings`,
                {
                    custom_status: {
                        text: `🎵 Listening to ${song} by ${artist}`,
                        emoji_name: '🎧'
                    }
                },
                { headers: { Authorization: client.token, 'Content-Type': 'application/json' } }
            );

            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Spotify RPC'),
                style(`Song: ${song}`, THEME.ACCENT_COLOR),
                style(`Artist: ${artist}`, THEME.ACCENT_COLOR),
                style(`Album: ${album}`, THEME.DIVIDER_COLOR)
            ]));
        } catch (err) {
            log(`SpotifyRPC error: ${err.message}`, 'error');
        }
    }
};
