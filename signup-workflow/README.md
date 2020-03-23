# Signup Workflow

## Brief description

An approve/reject workflow for volunteer registeration.

## Assumptions

* The demo takes example of Delhi (location).
* The admin's are users who have been added as editors to the google sheet.

## What is included

* Two forms : (a) Volunteer Registration (long one), (b) Approval Form (approve/reject)
* Google spreadsheet linked to the forms (one spreadsheet is linked to both the forms)
* Code for google spreadsheet

## Demo form

Vounteer registration form: https://docs.google.com/forms/d/e/1FAIpQLSdrsZTIrdeBg4dmjug5kccTnV4rzkSFpP4PTKMyGHiwHkfK6A/viewform

Volunteer approval form: https://docs.google.com/forms/d/e/1FAIpQLSduPXCw_t_SlLrvwNtsqnXirzGR8V4T7_SbxreGqGTOoop6Xw/viewform

## Workflow

The workflow consists of two forms.

* In form one, the volunteer registers him/herself.
* On submission, a mail is sent to the editors of the form (or admin's)
* The mail to approver has an edit link. Clicking the edit link, takes them to an approval form.
* Here the approver (or admin), approves or rejects the volunteer's request.
* The result is updated in spread sheet and a mail is sent to the volunteer about the status of their application.

## Installation

1. Copy both the forms to google drive and the google sheet
2. Open Volunteer management forms :-
    a. Go to responses and link it to the provided google sheet
    b. Other recommended optional settings are as follows,
    c. Go to settings on top button on top of the form
    d. Enable collect email addresses
    e. Enable 'Limit to 1 response' (under Requires sign-in section)
3. Go to the provided spreadsheet :-
    a. Copy headers from 'Volunteers' sheet to 'Form Responses 1'
    b. Rename 'Form Responses 1' to 'Volunteers'
    c. Rename 'Volunteers' to 'Empty Volunteers'
4. Open Approver form :-
    a. Go to responses and link it to the provided google sheet
    b. Generate a prefilled link (todo provide steps) and copy it somewhere for now
5. Go to the provided spreadsheet :-
    a. Copy headers from 'Approvals' sheet to 'Form Responses 2'
    b. Rename 'Form Responses 2' to 'Approvals'
    c. Rename 'Approvals' to 'Empty Approvals'
6. Copy code from code.gs (steps below)
    a. Open 'Tools -> Script Editor' from menu
    b. Copy code
    c. Update APPROVAL_URL variable with prefilled link from Step 4(b)
    d. Save file
    e. Go back to spreadsheet, open menu 'Volunteer Management System' (rightmost) and click 'Setup'
    f. You should see an alert message 'Successfully installed'
7. Now add editors to the spreadsheet (these are your admins)

Test the workflow by following next section.

## Testing your installation

1. Go to 'Volunteers Registration' form and click on preview form
2. Fill up the form
3. All admins should receive a mail with 'New Volunteer Registered' subject line.
4. From the mail, click on the link for approving the volunteers
5. Approve or reject the volunteer
6. The volunteer should receive an update and 'Volunteer' sheet will be updated

## TODO

1. Make installation easier
    a. Link forms to existing sheets in the spreadsheet (via code)
    b. Make it easier to add pre-filled links to code
2. Debugging
    a. Add Edit Urls to the forms
