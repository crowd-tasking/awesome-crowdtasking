var VOLUNTEER_PAGE = "Volunteers";
var APPROVER_PAGE = "Approvals";

var UNIQUE_APPROVE_FORM_FIELD = 'Approval status';
var VOLUNTEER_APPROVAL_COLUMN = 'AC';

var APPROVAL_URL = "https://docs.google.com/forms/d/e/1FAIpQLSduPXCw_t_SlLrvwNtsqnXirzGR8V4T7_SbxreGqGTOoop6Xw/viewform?usp=pp_url&entry.1323369208=ROW_NUM&entry.1647813175=EMAIL_ADDRESS&continue=continue";
var MENU_NAME = 'Volunteer Management System';
var MAX_VOLUNTEER_SHEET_COLUMNS = 50; // actually there are 29

/**
 * Register 
 */

function onOpen() {
  var menu = [{name: 'Setup Volunteer Management System', functionName: 'registerOnSubmitTrigger'}];
  SpreadsheetApp.getActive().addMenu(MENU_NAME, menu);
}


function registerOnSubmitTrigger() {
  // check if an existing trigger is set
  var existingTriggerId = PropertiesService.getUserProperties().getProperty('onFormSubmitTriggerID')
  if (existingTriggerId) {
    var foundExistingTrigger = false
    ScriptApp.getProjectTriggers().forEach(function (trigger) {
      if (trigger.getUniqueId() === existingTriggerId) {
        foundExistingTrigger = true
      }
    })
    if (foundExistingTrigger) {
      SpreadsheetApp.getUi().alert("Script pre-installed");
      return
    }
  }
 
  var trigger = ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create()
  
  PropertiesService.getUserProperties().setProperty('onFormSubmitTriggerID', trigger.getUniqueId());
  SpreadsheetApp.getActive().removeMenu(MENU_NAME);
  SpreadsheetApp.getUi().alert("Script installed");
}

function onFormSubmit(event) {
  var isVolunteerForm = event.namedValues[UNIQUE_APPROVE_FORM_FIELD] === undefined;
  if (isVolunteerForm) {  
    onFormSubmitVolunteer(event);
  } else {
    onFormSubmitApprove(event);
  }
}

function onFormSubmitVolunteer(event) {
  const range = event.range;
  var rowNum = range.rowStart;
  
  var data = getVolunteerFormRowData(rowNum);
  notifyEditors(rowNum, data);
}

function onFormSubmitApprove(event) {
  const range = event.range;
  var rowNum = range.rowStart;
  
  var data = getApproverFormRowData(rowNum);
  const row = parseInt(data['Row']);
  const email = data['Volunteer Email'];
  const status = data['Approval status'];
  const explaination = data['Explanation'];
  
  const sheet = getVolunteerSheet();
  sheet.getRange(VOLUNTEER_APPROVAL_COLUMN + row).setValue(status);
  
  const subject = 'Your volunteer request has been ' + status + '.';
  const body = 'Volunteer Request Status : ' + status + '\n\n' + explaination;
  MailApp.sendEmail(email, subject, body);
}

/************************************************************************/


/**
 * Helper functions
 */

function getVolunteerSheet() {
  return SpreadsheetApp.getActive().getSheetByName(VOLUNTEER_PAGE);
}

function getApproverSheet() {
    return SpreadsheetApp.getActive().getSheetByName(APPROVER_PAGE);
}

function getVolunteerFormRowData(row) {
  var sheet = getVolunteerSheet();
  return getFormRowData(row, sheet);
}

function getApproverFormRowData(row) {
  var sheet = getApproverSheet();
  return getFormRowData(row, sheet);
}

function getFormRowData(row, sheet) { 
  var headerRange = sheet.getRange(1, 1, 1, MAX_VOLUNTEER_SHEET_COLUMNS);
  var headerValues = headerRange.getValues();
  var headers = headerValues[0];

  var rowRange = sheet.getRange(row, 1, 1, MAX_VOLUNTEER_SHEET_COLUMNS);
  var rowValues = rowRange.getValues();
  var row = rowValues[0];
  
  var data = {};
  for(var i = 0; i < MAX_VOLUNTEER_SHEET_COLUMNS && headers[i] !== ''; i++) {
    const key = headers[i];
    data[key] = row[i];
  }
  return data;
}

/**
 * Converts a JSON into a string message (for sending via an email).
 *
 * @param {Object} data   JSON values
 * @returns {String}      A multi-row string of format key: value 
 */
function getMessageFromData(data) {
  var keys = Object.keys(data);
  var message = [];
  keys.forEach(function (key) {
    var value = data[key];
    message.push(key + ': ' + value);
  });
  return message.join('\n');
}


/**
 * Sends emails with data from the current spreadsheet.
 *
 * @param {Object} data   Form values keyed by volunteer
 */

function notifyEditors(rowNum, data) {
  var emails = SpreadsheetApp.getActiveSpreadsheet().getEditors().map(user => user.getEmail());
  var toField = emails.join(', ');
  
  const fullName = data['First Name'] + ' ' + data['Last Name'];
  const email = data['Email address'];
  const message = getMessageFromData(data);
  
  var subject = 'New Volunteer Request - (' + fullName + ')';
  var responseUrl = APPROVAL_URL.slice().replace('ROW_NUM', rowNum).replace('EMAIL_ADDRESS', email);
  var body = [
    'Approval Link :-',
    responseUrl,
    'Volunteer Details :-',
    message
  ].join("\n\n");
  
  MailApp.sendEmail(toField, subject, body);
}
