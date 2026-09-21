import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';

export default {
    name: 'relationshipradar',
    description: "Monitor and list real-time friend & relationship stats",
    aliases: ['relradar', 'friendsradar'],
    usage: '',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message) {
        try {
            const relationships = client.relationships?.cache || new Map();
            let friends = 0, blocked = 0, pending = 0;

            relationships.forEach(rel => {
                if (rel.type === 1) friends++;
                else if (rel.type === 2) blocked++;
                else if (rel.type === 3 || rel.type === 4) pending++;
            });

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Relationship Radar')],
                [style('Friends: ', THEME.LABEL_COLOR) + style(friends, THEME.ACCENT_COLOR)],
                [style('Blocked: ', THEME.LABEL_COLOR) + style(blocked, THEME.ACCENT_COLOR)],
                [style('Pending Requests: ', THEME.LABEL_COLOR) + style(pending, THEME.ACCENT_COLOR)]
            ]));
        } catch (err) {
            log(`RelationshipRadar error: ${err.message}`, 'error');
        }
    }
};
