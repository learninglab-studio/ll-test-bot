const { findRecordByValue, findRecordById } = require('../utilities/airtable-tools')
const { red, magenta, gray, yellow, blue, divider } = require('../utilities/mk-loggers')

module.exports.main = async ({ event, client, logger }) => {
  try {
    const view = await appHomeViews.main(event.user)
    // magenta(view)
    const result = await client.views.publish({
      user_id: event.user,
      view: view
    });
    // yellow(result)
  } catch (error) {
    red(error)
  }
}

module.exports.userInfo = async ({ event, client, logger }) => {
  try {
    const personResult = await findRecordByValue({
      baseId: process.env.AIRTABLE_22_23_BASE,
      table: "Users",
      field: "SlackId",
      value: event.user,
      // view: "MAIN"
    })
    // blue(personResult)
    const view = await appHomeViews.userInfo(event.user, personResult.fields)
    // magenta(view)
    const result = await client.views.publish({
      user_id: event.user,
      view: view
    });
    // yellow(result)
  } catch (error) {
    red(error)
  }
}

module.exports.updateWithTasks = async ({ event, client }) => {
  try {
    const personResult = await findRecordByValue({
      baseId: process.env.AIRTABLE_22_23_BASE,
      table: "Users",
      field: "SlackId",
      value: event.user,
      // view: "MAIN"
    })
    // blue(personResult)
    const view = await appHomeViews.userInfo(event.user, personResult.fields)
    // magenta(view)
    // const result = await client.views.publish({
    //   user_id: event.user,
    //   view: view
    // });
  } catch (error) {
    red(error)
  }
}

const appHomeViews = {
  main: (userId) => {
    return {
      // Home tabs must be enabled in your app configuration page under "App Home"
      "type": "home",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Welcome to App Home <@${userId}>`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `insert data and buttons here`
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Get your Airtable `User` record",
                "emoji": true
              },
              action_id: "get_airtable_record"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Get all Actions as Markdown",
                "emoji": true
              },
              action_id: "get_all_actions_markdown"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Get a PDF of your actions",
                "emoji": true
              },
              action_id: "get_user_actions_pdf"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "See Your Tasks",
                "emoji": true
              },
              action_id: "get_tasks"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "See a Video Block",
                "emoji": true
              },
              action_id: "show_video"
            },
          ]
        }
      ],

    }
  },
  error: (error) => {
    return ({
      type: "home",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `There was an error:\n\`\`\`${JSON.stringify(error, null, 4)}\`\`\``
          }
        }
      ]
    })
  },
  message: (message) => {
    return ({
      "type": "home",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `here is your message:\n${message}`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `insert data and buttons here`
          }
        }
      ]
    })
  },
  userInfo: (userId, userData) => {
    return ({
      "type": "home",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `here is your userInfo:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `looked for ${userId}\n\`\`\`${JSON.stringify(userData, null, 4)}\`\`\``
          }
        }
      ]
    })
  },
  video: (video) => {
    return ({
      "type": "home",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "I think it's super cool",
            "emoji": true
          }
        },
        {
          "type": "video",
          "title": {
            "type": "plain_text",
            "text": "How to use Slack.",
            "emoji": true
          },
          "title_url": "https://www.youtube.com/watch?v=RRxQQxiM7AA",
          "description": {
            "type": "plain_text",
            "text": "Slack is a new way to communicate with your team. It's faster, better organized and more secure than email.",
            "emoji": true
          },
          "video_url": "https://www.youtube.com/embed/RRxQQxiM7AA?feature=oembed&autoplay=1",
          "alt_text": "How to use Slack?",
          "thumbnail_url": "https://i.ytimg.com/vi/RRxQQxiM7AA/hqdefault.jpg",
          "author_name": "Arcado Buendia",
          "provider_name": "YouTube",
          "provider_icon_url": "https://a.slack-edge.com/80588/img/unfurl_icons/youtube.png"
        }
      ]
    })
  },
}
