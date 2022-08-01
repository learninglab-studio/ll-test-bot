const log = require('../../utilities/mk-loggers')
const mk = require('../../utilities/mk-utilities')
const { findRecordByValue, getAllWithFields } = require('../../utilities/airtable-tools')
const fs = require('fs')
const path = require('path')

module.exports = async ({ payload, body, client, ack, logger }) => {
    await ack();
    log.magenta(log.divider, `ACTION PAYLOAD for get_all_actions_markdown`, log.divider, payload);
    log.yellow(body)
    const actionRecords = await getAllWithFields({
        baseId: process.env.AIRTABLE_22_23_BASE,
        table: "Actions",
        fields: [
            "Name",
            "Notes",
            "AssignedTo_Name",
            "TemporalStatus",
            "Created"
        ],
        view: "EVERYTHING_BY_TEMPORAL"
    })
    // log.blue(actionRecords)
    const filePath = path.join(ROOT_DIR, "_temp", "markdown", `actions-${mk.ts()}.md`)
    const theMarkdown = await markdownFromActionRecords(actionRecords)
    // log.yellow(theMarkdown)
    fs.writeFileSync(filePath, theMarkdown)
    try {
        const messageResult = await client.chat.postMessage({
            channel: body.user.id,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "We're working on putting together that markdown for you."
                    }
                }
            ],
            text: "We're working on putting together that markdown for you"
            
        })
        const uploadResult = await client.files.upload({
            file: fs.createReadStream(filePath),
            initial_comment: ("the actions you requested"),
            // filename: "your-tasks-filename.pdf",
            channels: body.user.id,
            title: "Actions Markdown",
            // thread_ts: ts
        })
        // log.yellow(log.divider, 'uploadResult', log.divider)
        // log.magenta(uploadResult)
    } catch (error) {
        log.red('get-all-actions-markdown', error)
    }
    
    // darkgray(divider, `ACTION BODY`, divider, body);
}

const markdownFromActionRecords = (records) => {
    var theMarkdown = `# YOUR ACTIONS\n`
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        theMarkdown+=`
## ${record.fields.Name}
**Notes:** ${record.fields.Notes}
**Assigned To:** ${record.fields.AssignedTo_Name}
#### TemporalStatus: ${record.fields.TemporalStatus}
Created: ${record.fields.Created}\n\n
`
    }
    return theMarkdown
}

const pre = (code) => {
    return `\`\`\`\n${code}\n\`\`\``
}