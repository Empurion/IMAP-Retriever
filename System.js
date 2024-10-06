const Mailbox = require('./mailbox')
require('dotenv').config()

module.exports = class System {

    constructor(){

    }
    async build(){

    }
    async run(){

        global.empurion = new Mailbox(
            process.env[`MAILBOX_1_EMAIL`],
            process.env[`MAILBOX_1_PASSWORD`], 
            process.env[`MAILBOX_1_HOST`], 
            process.env[`MAILBOX_1_PORT`]
        )
        global.dylan = new Mailbox(
            process.env[`MAILBOX_0_EMAIL`], 
            process.env[`MAILBOX_0_PASSWORD`], 
            process.env[`MAILBOX_0_HOST`], 
            process.env[`MAILBOX_0_PORT`]
        )

        await global.empurion.build()

        await global.dylan.build()
        await global.empurion.run()
        await global.dylan.run()
    }
}