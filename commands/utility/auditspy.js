import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'auditspy',
    description: "Fetch recent administrative server audit log entries",
    aliases: ['auditlogs', 'serveraudit'],
    usage: '',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message) {
        if (!message.guild) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Audit Spy'),
                style('Error: Must be run inside a guild server.', THEME.ACCENT_COLOR)
            ]));
        }

        try {
            const logs = await message.guild.fetchAuditLogs({ limit: 5 });
            const entries = logs.entries.map(e => `${style(e.action, THEME.LABEL_COLOR)} by ${style(e.executor.tag, THEME.ACCENT_COLOR)}`);

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Audit Spy')],
                entries.length ? entries : [style('No recent audit log entries available.', THEME.ACCENT_COLOR)]
            ]));
        } catch (err) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Audit Spy'),
                style(`Error fetching audit logs: ${err.message}`, THEME.ACCENT_COLOR)
            ]));
        }
    }
};
