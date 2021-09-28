//Update CommCare case
alterState(state => {
  console.log(
    `Mapping HH code to CommCare: `,
    dataValue('Envelope.Body.notifications.Notification.sObject.Household_Code_Autonumber__c')(state)
  );
  
  let notifications = state.data.Envelope.Body.notifications
  notifications = Array.isArray(notifications) ? notifications : [notifications]
  return { ...state, notifications, values: []}; 
}); 

each("$.notifications[*]", state => {
  console.log(state.data)
  const value = {
    case_id: dataValue('Envelope.Body.notifications.Notification.sObject.Commcare_Code__c')(state), 
    name: dataValue('Envelope.Body.notifications.Notification.sObject.Household_Code_Autonumber__c')(state)
  }
  state.values.push(value)
  return state
})

alterState(state => {
  console.log(state.values)
  return state
})

submitXls(state => state.values, {
  case_type: 'Household',
  search_field: 'case_id',
  search_column: 'case_id',
  name_column: 'name',
  create_new_cases: 'off',
})