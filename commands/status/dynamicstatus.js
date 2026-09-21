import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import TaskManager from '../../utils/TaskManager.js';
import axios from 'axios';

export default {
    name: 'dynamicstatus',
    description: "Sync custom status with live system CPU/RAM metrics",
    aliases: ['ds', 'sysstatus'],
    usage: '<start | stop>',
    category: 'status',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const subcommand = args[0]?.toLowerCase();

        if (subcommand === 'stop') {
            const taskId = `dynamic_status:${client.user.id}`;
            if (TaskManager.hasTask('dynamic_status', client.user.id)) {
                TaskManager.destroyTask(taskId);
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Dynamic Status'),
                    style('Status: Stopped live status updates.', THEME.ACCENT_COLOR)
                ]));
            } else {
                return message.channel.send(formatAnsiBlock([
                    formatHeaderTitle('Barro Dynamic Status'),
                    style('Status: No active dynamic status running.', THEME.ACCENT_COLOR)
                ]));
            }
        }

        const taskId = `dynamic_status:${client.user.id}`;
        if (TaskManager.hasTask('dynamic_status', client.user.id)) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Dynamic Status'),
                style('Status: Dynamic status updates are already running.', THEME.ACCENT_COLOR)
            ]));
        }

        TaskManager.createTask('dynamic_status', client.user.id);
        TaskManager.createInterval(taskId, async () => {
            try {
                const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
                const uptimeMins = Math.floor(process.uptime() / 60);
                const statusText = `💻 Barro | RAM: ${memUsage}MB | Up: ${uptimeMins}m`;

                await axios.patch(
                    `https://discord.com/api/v9/users/@me/settings`,
                    { custom_status: { text: statusText, emoji_name: '⚡' } },
                    { headers: { Authorization: client.token, 'Content-Type': 'application/json' } }
                );
            } catch (err) {
                log(`Failed to update dynamic status: ${err.message}`, 'warn');
            }
        }, 60000);

        return message.channel.send(formatAnsiBlocks([
            [formatHeaderTitle('Barro Dynamic Status')],
            [style('Status: Started Live Status Sync', THEME.ACCENT_COLOR)],
            [style('Update Interval: ', THEME.LABEL_COLOR) + style('60 Seconds', THEME.ACCENT_COLOR)]
        ]));
    }
};
