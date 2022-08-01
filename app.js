const { App, LogLevel } = require('@slack/bolt');
const airtableTools = require(`./src/utilities/airtable-tools`);
const { blue, darkgray, gray, magenta, yellow, divider, red } = require('./src/utilities/mk-loggers')
const { appHome, projectProposal, projectHackMd, newActionView, handleActionViewSubmission } = require(`./src/show-tools`)
const mw = require('./src/utilities/slack-middleware')
const handleMessage = require('./src/show-tools/handle-message')
const handleReaction = require('./src/show-tools/handle-reaction')
const actionPdf = require('./src/show-tools/action-pdf')
const getAllActionsMd = require('./src/show-tools/action-handlers/get-all-actions-markdown')
const { getUserTasksPdf, getUserActionsPdf } = require('./src/show-tools/action-handlers')
var path = require('path');
global.ROOT_DIR = path.resolve(__dirname);

require('dotenv').config()

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN, // add this
    logLevel: LogLevel.DEBUG,
});

app.message('hello', async ({ message, say }) => {
    await say(`Hey there <@${message.user}>!`);
});

app.message(/.*/, mw.noBot, handleMessage.parseAllNonBot);

app.view(/action_submission/, handleActionViewSubmission)

app.view(/.*/, async ({ body, view, ack }) => {
    ack();
    yellow('got any view')
    darkgray(divider, "view", view)
    // darkgray(divider, "body", body)
});

app.event(/.*/, async ({ event }) => { darkgray(event) });
app.event("reaction_added", handleReaction);
app.event('app_home_opened', appHome.main);

app.action(/get_user_actions_pdf/, getUserActionsPdf)
app.action(/get_all_actions_markdown/, getAllActionsMd)

app.action(/.*/, async ({ payload, context, body, ack }) => {
    await ack();
    darkgray(divider, `ACTION PAYLOAD`, divider, payload);
    // darkgray(divider, `ACTION BODY`, divider, body);
})



app.command("/projectproposal", projectProposal);
app.command("/actionpdf", actionPdf);
app.command("/action", newActionView);

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    red('⚡️ Bolt app is running!');
})();