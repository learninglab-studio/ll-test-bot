const log = require('../../utilities/mk-loggers')
const { findRecordByValue } = require('../../utilities/airtable-tools')
const fs = require('fs')
const pdfFromUserRecord = require('../pdf-tools/pdf-from-user-actions')

module.exports = async ({ payload, body, client, ack, logger }) => {
    await ack();
    log.magenta(log.divider, `ACTION PAYLOAD`, log.divider, payload);
    log.yellow(body)
    const userRecord = await findRecordByValue({
        baseId: process.env.AIRTABLE_22_23_BASE,
        table: "Users",
        field: "SlackId",
        value: body.user.id,
    })
    log.blue(userRecord)
    const filePath = await pdfFromUserRecord(userRecord)
    // const filePath = "/Users/ll-studio/Development/ll-test-bot/_temp/3-21-2022-subway-map-union-square-branch.pdf"
    try {
        const messageResult = await client.chat.postMessage({
            channel: body.user.id,
            "blocks": [
                {
                    "type": "image",
                    "title": {
                        "type": "plain_text",
                        "text": "dani desk plan",
                        "emoji": true
                    },
                    "image_url": "https://files.slack.com/files-pri/T0HTW3H0V-F03QCAC7DHT/00000000_202.gif?pub_secret=a33b693903",
                    "alt_text": "marg"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "This is an image we'd like know more about."
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Click Me to Update",
                            "emoji": true
                        },
                        "value": "image-update",
                        "action_id": "button-action"
                    }
                }
            ],
            text: "text"
            
        })
        const uploadResult = await client.files.upload({
            file: fs.createReadStream(filePath),
            initial_comment: ("your pdf comments"),
            filename: "your-tasks-filename.pdf",
            channels: body.user.id,
            title: "your tasks title",
            // thread_ts: ts
        })
        log.yellow(log.divider, 'uploadResult', log.divider)
        log.magenta(uploadResult)
    } catch (error) {
        log.red('get-user-tasks-pdf', error)
    }
    
    // darkgray(divider, `ACTION BODY`, divider, body);
}