import { log, formatHeaderTitle, formatAnsiBlock, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'bypassnsfw',
    description: "Force selfbot client properties to bypass NSFW channel age lock checks",
    aliases: ['nsfwbypass', 'unblocknsfw'],
    usage: '',
    category: 'settings',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message) {
        if (client.user) {
            client.user.nsfwAllowed = true;
        }

        return message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro BypassNSFW'),
            style('✅ NSFW Age Verification Lock Bypassed!', THEME.ACCENT_COLOR)
        ]));
    }
};
