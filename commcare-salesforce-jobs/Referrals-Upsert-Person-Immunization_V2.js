upsert(
  'Person__c',
  'CommCare_ID__c',
  fields(
    field('CommCare_ID__c', dataValue('case_id')),
    relationship(
      'Household__r',
      'CommCare_Code__c',
      dataValue('indices.parent.case_id')
    ),
    field('BCG__c', state => {
      var date = dataValue('properties.BCG')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('OPV_0__c',  state => {
      var date = dataValue('properties.OPV_0')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('OPV_1__c', state => {
      var date = dataValue('properties.OPV_PCV_Penta_1')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('OPV_2__c',  state => {
      var date = dataValue('properties.OPV_PCV_Penta_2')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('OPV_3__c',  state => {
      var date = dataValue('properties.OPV_PCV_Penta_3')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('Measles_6__c', state => {
      var date = dataValue('properties.Measles_6')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('Measles_9__c', state => {
      var date = dataValue('properties.Measles_9')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('Measles_18__c', state => {
      var date = dataValue('properties.Measles_18')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('ANC_1__c', state => {
      var date = dataValue('properties.ANC_1')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('ANC_2__c', state => {
      var date = dataValue('properties.ANC_2')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('ANC_3__c', state => {
      var date = dataValue('properties.ANC_3')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('ANC_4__c', state => {
      var date = dataValue('properties.ANC_4')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('ANC_5__c', state => {
      var date = dataValue('properties.ANC_5')(state); 
      return date && date !=='' ? date : undefined; 
    }),
     field('Date_of_Birth__c', state => {
      var date = dataValue('properties.DOB')(state); 
      return date && date !=='' ? date : undefined; 
    }),
    field('Place_of_Delivery__c',dataValue('properties.Delivery_Status')),
    field('Child_Status__c', dataValue('properties.Child_Status')),
    field('Gender__c', dataValue('properties.Gender')),
    field('Last_Modified_Date_CommCare__c', dataValue('server_date_modified')),
    field('Case_Closed_Date__c', state => {
      var closed = dataValue('closed')(state); 
      var date =  dataValue('server_date_modified')(state); 
      return closed && closed == true ? date : undefined; 
    })
  )
);
