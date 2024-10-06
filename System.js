const Mailbox = require('./mailbox')
require('dotenv').config()

module.exports = class System {

    constructor(){

    }
    async build(){

        global.mailboxOne = new Mailbox(
            process.env[`MAILBOX_0_EMAIL`], 
            process.env[`MAILBOX_0_PASSWORD`], 
            process.env[`MAILBOX_0_HOST`], 
            process.env[`MAILBOX_0_PORT`]
        )
        global.mailboxTwo = new Mailbox(
            process.env[`MAILBOX_1_EMAIL`],
            process.env[`MAILBOX_1_PASSWORD`], 
            process.env[`MAILBOX_1_HOST`], 
            process.env[`MAILBOX_1_PORT`]
        )
        await global.mailboxOne.build()
        await global.mailboxTwo.build()
    }
    async run(){
        await global.mailboxOne.run()
        await global.mailboxTwo.run()
    }
}
