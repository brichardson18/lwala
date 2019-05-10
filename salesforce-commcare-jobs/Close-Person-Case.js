submit(
  fields(
    field("@", function(state) {
      return {
        "xmlns:jrm":"http://dev.commcarehq.org/jr/xforms", 
        "xmlns":"http://openrosa.org/formdesigner/980c10cdb3b140101225e25c6e8aff48f471b3d",
        "uiVersion":"1",
        "version":"46",
        "name":"Update Person"
      };
    }),
    
    field("n0:case", function(state){
      return{
        "@": {
            "case_id": dataValue("new[0].Commcare_ID__c")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e298884bfb6ee2d2b38591a6e8ae0228",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
        "n0:close":""
      };
    }),
    field("n1:meta",function(state){
      return{
        "@": {"xmlns:n1":"http://openrosa.org/jr/xforms"},
        "n1:deviceID": "Formplayer",
        "n1:timeStart": new Date().toISOString(),
        "n1:timeEnd": new Date().toISOString(),
        "n1:userID":"e298884bfb6ee2d2b38591a6e8ae0228"
      };
    })
  )
);