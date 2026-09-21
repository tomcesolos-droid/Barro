import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style, saveJSONAsync } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import path from 'path';

export default {
    name: 'serverclone',
    description: "Export server structure (channels, categories, roles) to backup file",
    aliases: ['cloneguild', 'guildclone'],
    usage: '',
    category: 'main',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 10,

    async execute(client, message) {
        if (!message.guild) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Server Clone'),
                style('Error: Must be run inside a server guild.', THEME.ACCENT_COLOR)
            ]));
        }

        const guild = message.guild;
        const backupData = {
            id: guild.id,
            name: guild.name,
            clonedAt: new Date().toISOString(),
            roles: guild.roles.cache.map(r => ({ name: r.name, color: r.color, permissions: r.permissions.bitfield.toString() })),
            categories: guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').map(c => ({ name: c.name, position: c.position })),
            channels: guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').map(c => ({ name: c.name, type: c.type, parent: c.parent?.name || null }))
        };

        const backupPath = path.resolve(`./data/serverclone_${guild.id}.json`);
        await saveJSONAsync(backupPath, backupData);

        return message.channel.send(formatAnsiBlocks([
            [formatHeaderTitle('Barro Server Clone')],
            [style('Guild Cloned Successfully!', THEME.ACCENT_COLOR)],
            [style('Roles: ', THEME.LABEL_COLOR) + style(backupData.roles.length, THEME.ACCENT_COLOR)],
            [style('Channels: ', THEME.LABEL_COLOR) + style(backupData.channels.length, THEME.ACCENT_COLOR)],
            [style('Saved To: ', THEME.LABEL_COLOR) + style(`data/serverclone_${guild.id}.json`, THEME.DIVIDER_COLOR)]
        ]));
    }
};
