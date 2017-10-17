submit(
  fields(
    field("@", function(state) {
      return {
        "xmlns:jrm":"http://dev.commcarehq.org/jr/xforms", 
        "xmlns":"http://openrosa.org/formdesigner/980c10cdb3b140101225e25c6e8aff48f471b3d",
        "uiVersion":"1",
        "version":"46",
        "name":"Update Household"
      };
    }),
    field("Source",false),
    field("Household_Status",function(state){
      var str='';
      if(dataValue("new[0].Active_Household__c")(state)===false){
        str='No';
      }
      else{
        str='Yes';
      }
      return str;
    }),
    field("Run_Code","Household_Lwala"),
    field("name", dataValue("new[0].Name")),
    field("area",dataValue("new[0].Area__c")),
    
    field("Household_Information", function(state){
      return{
        "Active_Handwashing_Station": dataValue("new[0].Tippy_Tap__c")(state),
        "Drying_Rack": dataValue("new[0].Drying_Rack__c")(state),
        
        "WASH_Compliant": function(){
          var ans="";
          if(dataValue("new[0].WASH_Compliant__c")(state)===true){
            ans="Yes";
          }
          else{
            ans="No";
          }
          return ans;
        },
        "Functional_Latrine":dataValue("new[0].Pit_Latrine__c")(state),
        "Clothesline":dataValue("new[0].Clothe__c")(state),
        "ITNs":dataValue("new[0].Uses_ITNs__c")(state),
        "Improved_Cooking_Method":dataValue("new[0].Cookstove__c")(state),
        "Kitchen_Garden":dataValue("new[0].Kitchen_Garden__c")(state),
        "Number_of_Over_5_Males":dataValue("new[0].Number_of_Over_5_Males__c")(state),
        "Number_of_Over_5_Females":dataValue("new[0].Number_of_Over_5_Females__c")(state),
        "Number_of_Under_5_Males":dataValue("new[0].Number_of_Under_5_Males__c")(state),
        "Number_of_Under_5_Females":dataValue("new[0].Number_of_Under_5_Females__c")(state),
        "Rubbish_Pit":dataValue("new[0].Rubbish_Pit__c")(state),
        "Treats_Drinking_Water":dataValue("new[0].Treats_Drinking_Water__c")(state),
        "WASH_Trained":dataValue("new[0].WASH_Trained__c")(state),
        "Total_Under_5":dataValue("new[0].Total_Number_of_Under_5s__c")(state),
        "Total_Males":dataValue("new[0].Total_Number_of_Males__c")(state),
        "Total_Females":dataValue("new[0].Total_Number_of_Females__c")(state),
        "Total_Household_Members":dataValue("new[0].Total_Number_of_Members__c")(state),
        "Total_Over_5":function(){
          var num=0;
          num=dataValue("new[0].Total_Number_of_Members__c")(state)-dataValue("new[0].Total_Number_of_Under_5s__c")(state);
          return num;
        }
      };
    }),
    field("n0:case", function(state){
      return{
        "@": {
            "case_id": dataValue("new[0].Commcare_Code__c")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e298884bfb6ee2d2b38591a6e8ae0228",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:update": {
            "n0:case_name": dataValue("new[0].Name")(state),
            "n0:owner_id": function(){
               var id="";
               if(dataValue("new[0].chw_owner_id__c")(state)===undefined){
                 id="acf8595692c76095eb5afd809c628091";
               }
               else{
                 id=dataValue("new[0].chw_owner_id__c")(state);
               }
               return id;
            },
            "n0:case_type": "Household",
            "n0:WASH_Compliant": function(){
              var ans="";
              if(dataValue("new[0].WASH_Compliant__c")(state)===true){
                ans="Yes";
              }
              else{
                ans="No";
              }
              return ans;
            },
            "n0:Active_Handwashing_Station": dataValue("new[0].Tippy_Tap__c")(state),
            "n0:Drying_Rack": dataValue("new[0].Drying_Rack__c")(state),
            "n0:Functional_Latrine": dataValue("new[0].Pit_Latrine__c")(state),
            "n0:Clothesline":dataValue("new[0].Clothe__c")(state),
            "n0:ITNs":dataValue("new[0].Uses_ITNs__c")(state),
            "n0:Active_in_Nutrition_Program":dataValue("new[0].Active_in_Nutrition_Program__c")(state),
            "n0:Nutrition_Group":dataValue("new[0].Nutrition_Group__c")(state),
            "n0:seed_input_support":dataValue("new[0].Seed_Input_Support__c")(state),
            "n0:name_concat":dataValue("new[0].Name_Concatenation__c")(state),
            "n0:CHW_ID":dataValue("new[0].Household_CHW__c")(state),
            "n0:Improved_Cooking_Method": dataValue("new[0].Cookstove__c")(state),
            "n0:Kitchen_Garden": dataValue("new[0].Kitchen_Garden__c")(state),
            "n0:Number_of_Over_5_Males": dataValue("new[0].Number_of_Over_5_Males__c")(state),
            "n0:Number_of_Over_5_Females":dataValue("new[0].Number_of_Over_5_Females__c")(state),
            "n0:Number_of_Under_5_Males":dataValue("new[0].Number_of_Under_5_Males__c")(state),
            "n0:Number_of_Under_5_Females": dataValue("new[0].Number_of_Under_5_Females__c")(state),
            "n0:Rubbish_Pit": dataValue("new[0].Rubbish_Pit__c")(state),
            "n0:Treats_Drinking_Water": dataValue("new[0].Treats_Drinking_Water__c")(state),
            "n0:WASH_Trained": dataValue("new[0].WASH_Trained__c")(state),
            "n0:Total_Under_5":dataValue("new[0].Total_Number_of_Under_5s__c")(state),
            "n0:Total_Males":dataValue("new[0].Total_Number_of_Males__c")(state),
            "n0:Total_Females":dataValue("new[0].Total_Number_of_Females__c")(state),
            "n0:area":dataValue("new[0].Area__c")(state),
            "n0:Area_Name":dataValue("new[0].Area_Name__c")(state),
            "n0:Total_Household_Members":dataValue("new[0].Total_Number_of_Members__c")(state),
            "n0:Household_Status":function(){
              var str='';
              if(dataValue("new[0].Active_Household__c")(state)===false){
                str='No';
              }
              else{
                str='Yes';
              }
              return str;
            },
            "n0:Total_Over_5":function(){
              var num=0;
              num=dataValue("new[0].Total_Number_of_Members__c")(state)-dataValue("new[0].Total_Number_of_Under_5s__c")(state);
              return num;
            }
          },
          "n0:index":{
          "n0:parent":{
            "@":{
              "case_type":"Area"
            },
            "#":dataValue("new[0].Area_Case_ID__c")(state)
            
            
          }
        }
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
)

// Your job goes here.dfsjndaskjfndskfajndafsdafs