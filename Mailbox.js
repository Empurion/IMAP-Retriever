const Imap = require('imap');
const {simpleParser} = require('mailparser');


module.exports = class Mailbox {

    imapConfig = {
        user: '',
        password: '',
        host: 'imap.transip.email',
        port: 993,
        tls: true,
        debug: console.log,  
        authTimeout: 25000,  
        connTimeout: 30000,  
        tlsOptions: {  
          rejectUnauthorized: false,  
          servername: 'imap.transip.email'  
        }  
      };

    constructor(address, password, host, port){

        this.imapConfig.user = address
        this.imapConfig.password = password
        this.imapConfig.host = host
        this.imapConfig.port = port
        console.log(this)

    }
    async build(){
        try {
            this.imap = new Imap(this.imapConfig)
            this.imap.once('ready', () => {
                this.onReady()
            })
            this.imap.once('error', err => {
                this.onError(err)
              });
          
            this.imap.once('end', () => {
                this.onEnd()
              });
            await this.run()
            } catch (ex) {
                console.log(ex)
            }
    }
    async run(){
        try {
            this.imap.connect();
        } catch (ex) {
            console.log('an error occurred');
            console.log('an error occurred' + ex);
        }
    }
    // EVENTS
    async onReady(){
        await this.getEmails()
    }
    async onError(){

    }
    async onEnd(){

    }
    async getUnreadEmailByInbox(mailbox){
    }
    async getEmails(){
        this.imap.openBox('INBOX', false, () => {
            this.imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
            if(err){
                console.log(err)
                return;
            }
            if(!results || !results.length){
                console.log('No unread mails')
                imap.end
                return;
            }
            const f = this.imap.fetch(results, {bodies: ''});
            f.on('message', msg => {
              msg.on('body', stream => {
                simpleParser(stream, async (err, parsed) => {
                  const {from, subject, textAsHtml, text} = parsed;
                  console.log(parsed);
                  /* Make API call to save the data
                     Save the retrieved data into a database.
                     E.t.c
                  */
                });
              });
              msg.once('attributes', attrs => {
                const {uid} = attrs;
                this.imap.addFlags(uid, ['\\Seen'], () => {
                  // Mark the email as read after reading it
                  console.log('Marked as read!');
                });
              });
            });
            f.once('error', ex => {
              return Promise.reject(ex);
            });
            f.once('end', () => {
              console.log('Done fetching all messages!');
              this.imap.end();
            });
          });
        });
      };
}