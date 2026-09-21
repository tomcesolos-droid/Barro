import { log, formatHeaderTitle, formatAnsiBlock, formatAnsiBlocks, style } from '../../utils/functions.js';
import { THEME } from '../../utils/theme.js';
import AIProvider from '../../utils/AIProvider.js';

export default {
    name: 'translate',
    description: "Translate text or last message to a target language",
    aliases: ['tr', 'translator'],
    usage: '<targetLang> <text | reply to message>',
    category: 'utility',
    type: 'both',
    permissions: ['SendMessages'],
    cooldown: 5,

    async execute(client, message, args) {
        const isHelpRequest = args[0] && ['help', '--help', '-h'].includes(args[0].toLowerCase());

        if (!args.length || isHelpRequest) {
            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Translator')],
                [
                    style('Usage', THEME.HEADER_BOLD_COLOR),
                    style(`${client.prefix}translate <lang> <text>`, THEME.LABEL_COLOR) + style(' | Translate input text', THEME.ACCENT_COLOR),
                    style(`${client.prefix}tr <lang>`, THEME.LABEL_COLOR) + style(' | Translate replied message', THEME.ACCENT_COLOR)
                ],
                [
                    style('Examples', THEME.HEADER_BOLD_COLOR),
                    style(`${client.prefix}tr es Hello world`, THEME.LABEL_COLOR) + style(' -> Spanish', THEME.ACCENT_COLOR),
                    style(`${client.prefix}tr ja`, THEME.LABEL_COLOR) + style(' -> Japanese (reply to msg)', THEME.ACCENT_COLOR)
                ]
            ]));
        }

        const targetLang = args[0];
        let textToTranslate = args.slice(1).join(' ');

        if (!textToTranslate && message.reference) {
            try {
                const referencedMsg = await message.channel.messages.fetch(message.reference.messageId);
                textToTranslate = referencedMsg.content;
            } catch (err) {
                log(`Failed to fetch referenced message: ${err.message}`, 'warn');
            }
        }

        if (!textToTranslate) {
            return message.channel.send(formatAnsiBlock([
                formatHeaderTitle('Barro Translator'),
                style('Error: Please provide text or reply to a message to translate.', THEME.ACCENT_COLOR)
            ]));
        }

        const statusMsg = await message.channel.send(formatAnsiBlock([
            formatHeaderTitle('Barro') + style(` Translator | Translating...`, THEME.ACCENT_COLOR),
            style(`Target: `, THEME.LABEL_COLOR) + style(targetLang, THEME.DIVIDER_COLOR)
        ]));

        try {
            const prompt = `Translate the following text accurately into ${targetLang}. Return ONLY the translated text without extra comments or quotes:\n\n${textToTranslate}`;
            const translation = await AIProvider.request(prompt, {
                systemPrompt: 'You are a professional language translator. Translate text accurately without altering meaning.',
                signal: AbortSignal.timeout(20000)
            });

            await statusMsg.delete().catch(() => {});

            return message.channel.send(formatAnsiBlocks([
                [formatHeaderTitle('Barro Translator')],
                [style(`Target Language: `, THEME.LABEL_COLOR) + style(targetLang, THEME.ACCENT_COLOR)],
                [style(`Original: `, THEME.LABEL_COLOR) + style(textToTranslate, THEME.TEXT_COLOR)],
                [style(`Translation: `, THEME.LABEL_COLOR) + style(translation, THEME.ACCENT_COLOR)]
            ]));
        } catch (error) {
            log(`Translation error: ${error.message}`, 'error');
            return statusMsg.edit(formatAnsiBlock([
                formatHeaderTitle('Barro Translator'),
                style(`Error: ${error.message}`, THEME.ACCENT_COLOR)
            ]));
        }
    }
};
