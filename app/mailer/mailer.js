let helper = require('sendgrid').mail;

const envConfig = require('../config/env');

let sg = require('sendgrid')(envConfig.mailerAPIKey);

export default function mailer(body) {
    sg.API(createRequest(body))
        .then(response => {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        })
        .catch(error => {
            //error is an instance of SendGridError
            //The full response is attached to error.response
            console.log(error.response.statusCode);
        });
}

function createRequest(body) {
    let from_email = new helper.Email(body.email);
    let to_email = new helper.Email(body.email);
    let subject = 'Thanks for registering to someproject';
    let content = new helper.Content("text/html", getHtmlContent(body));
    let mail = new helper.Mail(from_email, subject, to_email, content);
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });
    return request
}

function getHtmlContent(body) {
    return (
        `<h1> User Details </h1>` +
        `<p>` +
        `Name: ${body.first_name} ${body.last_name || ``}</p>` +
        `</br>` +
        `<p>` +
        `Purpose: ${body.purpose}</p>` +
        `</br>` +
        `<p>` +
        `Storey: ${body.storey} </p>` +
        `</br>` +
        `<p>` +
        `Visit: ${body.visit}</p>` +
        `</br>` +
        `<p>` +
        `Battery: ${body.battery}</p>` +
        `</br>` +
        `<p>` +
        `Requested Size: ${body.size}</p>` +
        `</br>`
    )
}