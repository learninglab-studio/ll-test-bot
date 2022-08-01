const { findRecordByValue, findRecordById, addRecord } = require('../utilities/airtable-tools')
const { magenta, gray, yellow, blue, divider, red, darkgray } = require('../utilities/mk-loggers')
const pdfkit = require('pdfkit')
const fs = require('fs')

module.exports = async ({ command, client, say, ack }) => {
    await ack()
    const filePath = "/Users/ll-studio/Development/ll-test-bot/_temp/3-21-2022-subway-map-union-square-branch.pdf"
    red(`user ${command.user_id} has requested a new action pdf 1\n${JSON.stringify(command, null, 4)}`)
    // const theView = await createView({
    //     user: command.user_id, 
    //     trigger_id: command.trigger_id,
    //     commandText: command.text
    // })
    // try {
    //     const result = await client.views.open(theView);
    // } catch (error) {
    //     red(error)
    // }
    try {
        const uploadResult = await client.files.upload({
            file: fs.createReadStream(filePath),
            initial_comment: ("new photo initial comment"),
            filename: "filename here",
            channels: command.user_id,
            title: "new still posted",
            // thread_ts: ts
        })
        yellow(divider, 'uploadResult', divider)
        magenta(uploadResult)
    } catch (error) {
        red('action-pdf error', error)
    }
}


const uploadFileToSlack = async (file, client) => {
    
    var messageBlocks = [];
}