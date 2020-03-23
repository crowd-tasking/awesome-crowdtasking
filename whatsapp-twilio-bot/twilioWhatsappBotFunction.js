// This is a twilio whatsapp bot.
// It accepts inputs from a Twilio Programmable SMS Sandobx and responds to user inputs.

const msgStartMenu = [
    "This is a demo. If you would like us to help you set up such a system (drop me a mail at navalnovel@gmail.com). Type:",
    "\"Seek\" (for seeking help)",
    "\"Register\" (for new volunteers)",
    "\"Tasks\" (for enrolled volunteer)",
    "\"Info\" (know about us)",
].join('\n\n');

const msgRegisterVoluneer = [
    'Thanks for offereing to volunteer. Please fill this registeration form and one of the admins will get in touch wtih you shortly.',
    'https://docs.google.com/forms/d/e/1FAIpQLSdrsZTIrdeBg4dmjug5kccTnV4rzkSFpP4PTKMyGHiwHkfK6A/viewform?usp=pp_url&entry.810595633=99999999',
    'You will receive a mail when you have been approved to volunteer.'
].join('\n\n');

const msgSeekHelp = [
    "Please fill out this form to seek help.",
    "https://docs.google.com/forms/d/e/1FAIpQLSfuStNbdShu7RxYlIjBhee50dPNeaR7vrtc7upEtSXdh1qxdQ/viewform?usp=pp_url&entry.1729264487=99999999"
].join('\n\n'); 

const msgTasks = [
    "The tasks are managed on Trello (you will need to login).",
    "Open below trello link and visit the board respective to your location.",
    "https://trello.com/demodelhicovidcommunityvolunteers/home"
].join("\n\n");

const msgInfoTitle = "Here our current status";
const msgInfoObj = {
    "East Delhi": [ "Total volunteers: 10", "Weekly tasks completed: 15" ],
    "West Delhi": [ "Total volunteers: 7", "Weekly tasks completed: 12" ],
    "North Delhi": [ "Total volunteers: 9", "Weekly tasks completed: 3" ],
    "South Delhi": [ "Total volunteers: 14", "Weekly tasks completed: 19" ],
    "Central Delhi": [ "Total volunteers: 2", "Weekly tasks completed: 5" ],
    "Noida": [ "Total volunteers: 5", "Weekly tasks completed: 12" ],
    "Gurgaon": [ "Total volunteers: 7", "Weekly tasks completed: 22" ],
    "Ghaziabad": [ "Total volunteers: 17", "Weekly tasks completed: 35" ],
}

const msgInfoArr = [msgInfoTitle];
Object.keys(msgInfoObj).forEach(key => {
    const value = msgInfoObj[key].join('\n');
    msgInfoArr.push(`• ${key}\n${value}`);
});
const msgInfo = msgInfoArr.join('\n\n');

exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.MessagingResponse();
    const query = escape(event.Body).toLowerCase();

    switch (query) {
        case 'help':
        case 'seek': {
            const phoneNumber = event.From.replace(/[^0-9]/g, '');
            const msg = msgSeekHelp.replace('99999999', phoneNumber);
            twiml.message(msg);
            break;
        }
        case 'volunteer':
        case 'register': {
            const phoneNumber = event.From.replace(/[^0-9]/g, '');
            const msg = msgRegisterVoluneer.replace('99999999', phoneNumber);
            twiml.message(msg);
            break;
        }
        case 'task':
        case 'tasks': {
            twiml.message(msgTasks);
            break;
        }
        case 'info': {
            twiml.message(msgInfo);
            break;
        }
        default: { // unknown
            twiml.message(msgStartMenu);
        }
    }

    callback(null, twiml);
};
