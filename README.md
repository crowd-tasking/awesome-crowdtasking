# Brief

No-code tools for crowd-tasking volunteer management system (for cities).

## Demo

This is just a demo repository (if anyone needs help setting it up on ground, please feel free to get in touch.)

Screenshots of demo are on this twitter thread [https://twitter.com/navalsaini/status/1243488318341271552]. Feel free to RT.

Information about demo is also available under 'whatsapp-twilio-bot' directory [https://github.com/crowd-tasking/awesome-crowdtasking/tree/master/whatsapp-twilio-bot].

## Goals

Anyone with a college degree and computer exposure should be able to deploy these.

1. Easy to deploy or implement
2. No or low-code

## Requirements

1. It should scale to up to 1000 volunteers.
2. If should use existing communication apps like email, whatsapp, etc to communicate with volunteers & requestors


## Tools used

1. Google Sheets (data is kept here)
2. Google Forms (data is collected here)
3. Trello (for task management)
4. Twilio (Functions and Programmable SMS for whatsapp sandbox)
5. WhatsApp (for user interface)

# Identified Workflows

## Signup

1. Signup and approve volunteers
2. Induct volunteers online
3. Signup and approve requestors
4. Induct requestors

See under folder "signup-workflow".

## Volunteering

1. Task creation
2. Task assignment
3. Task tracking

To be done

## Role management

Any admins are to be added as Editors for google sheets.

## Bot

A Whatsapp bot will be the interface with the users.

See under folder "bot"

## Other tasks

1. Creation of local WhatsApp groups for volunteers (for notifications about new approved tasks)
2. Analytics dashboard 
  a. Heatmap tracking volunteers and requestors (with area location) over a map
3. Templates for generating websites from Google sheets
4. We genereate a list of approved, rejected and completed tasks at EoD and send it to all admin volunteers

