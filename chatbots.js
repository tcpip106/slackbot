'use strict';
const Botkit       = require('botkit');
const slack_token  = process.env.SLACK_TOKEN;
const slack_oauth  = process.env.SLACK_OAUTH;
exports.fn = {
    /**
     * Starts Slack-Bot
     *
     * @returns {*}
     */
    slackBot() {
        const slackController = Botkit.slackbot({
            require_delivery: true
        });
        const slackBot = slackController.spawn({
            token: slack_token
        });

        slackBot.startRTM((err, bot, payload) => {
            if (err) {
                throw new Error('Could not connect to Slack');
            }
            slackController.log('Slack connection established.');
        });

        // listener that handles incoming messages
        slackController.hears(['beer me'], ['direct_message', 'direct_mention'], (bot, message) => {
            slackController.log('Slack message received');
            bot.reply(message, {
                text: ':beer::beer::beer:',
                username: 'No Drunk Driving Please',
                icon_emoji: ':santa:'
            });
        });
        slackController.hears(['.*'], ['direct_message', 'direct_mention'], (bot, message) => {
            slackController.log('Slack message received');
            bot.reply(message, 'message received!');
        });
    }
};
