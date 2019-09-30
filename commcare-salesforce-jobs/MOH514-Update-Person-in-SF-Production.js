alterState((state) =>{
  if(dataValue("$.form.TT5.Child_Information.Clinical_Services")(state)!==undefined){
    const clinical=state.data.form.TT5.Child_Information.Clinical_Services;
    if(!Array.isArray(clinical)){
      state.data.form.TT5.Child_Information.Clinical_Services=[clinical];
    }
  }


  if(dataValue("$.form.HAWI.Clinical_Services_Rendered")(state)!==undefined){
    const clinical1=state.data.form.HAWI.Clinical_Services_Rendered;
    if(!Array.isArray(clinical1)){
      state.data.form.HAWI.Clinical_Services_Rendered=[clinical1];
    }
  }

  return state;
});



//Evaluates client status and how to upsert Person records
steps(
combine( function(state) {
  if(dataValue("$.form.Status.Client_Status")(state)=="Active"){
  //Deliveries
         upsert("Person__c", "CommCare_ID__c", fields(
          field("Source__c",1),
          field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
          relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
          field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
          field("Client_Status__c", dataValue("$form.Status.Client_Status")),
          /*field("Name",function(state){
            var name1=dataValue("$.form.Person_Name")(state);
          //  var name2=name1.replace(/\w\S*///g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          //  return name2;
          //}),
          /*relationship("RecordType","Name",function(state){
              return(dataValue("$.form.RecordType")(state).toString().replace(/_/g," "));
          }),*/
          field("Individual_birth_plan_counseling__c", dataValue("$.form.TT5.Child_Information.pregnancy_danger_signs.individual_birth_plan")),
          field("Pregnancy_danger_signs__c", dataValue("$.form.TT5.Child_Information.pregnancy_danger_signs.pregnancy_danger_signs")),
          field("Other_danger_signs__c", dataValue("$.form.TT5.Child_Information.Danger_Signs.Other_Danger_Signs")),
          field("Child_Status__c", dataValue("$.form.TT5.Child_Information.Delivery_Information.child_status")),
          field("Current_Malaria_Status__c", dataValue("$.form.Malaria_Status")),
          field("Counselled_on_Exclusive_Breastfeeding__c", dataValue("$.form.TT5.Child_Information.Exclusive_Breastfeeding.counseling")), //multiselect?
          field("Unique_Patient_Code__c", dataValue("$.form.case.update.Unique_Patient_Code")),
          field("Active_in_Support_Group__c", dataValue("$.form.case.update.Active_in_Support_Group")),
          field("Preferred_Care_Facility__c",dataValue("$.form.HAWI.Preferred_Care_F.Preferred_Care_Facility")),
          field("HAWI_Defaulter__c",dataValue("$.form.HAWI.Preferred_Care_F.default")), //TRANSFORM to true/false
          field("Date_of_Default__c",dataValue("$.form.HAWI.Preferred_Care_F.date_of_default")),
          field("Persons_temperature__c",dataValue("$.form.treatment_and_tracking.temperature")),
          field("Days_since_illness_start__c",dataValue("$.form.treatment_and_tracking.duration_of_sickness")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.malaria_test")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.malaria_test_date")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.malaria_test_results")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.symptoms_check_other")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.diarrhea_treatment_check")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.symptoms_check_fever")),
          //field("TBD__c",dataValue("$.form.treatment_and_tracking.fever")),
          //field("Symptoms_check_cough__c",dataValue("$.form.treatment_and_tracking.symptoms_check_cough")),

          field("Date_of_Birth__c",dataValue("$.form.TT5.Child_Information.Delivery_Information.DOB")),
          field("Child_Status__c","Born"),
          field("Place_of_Delivery__c",dataValue("$.form.TT5.Child_Information.Delivery_Information.Delivery_Type")),
          field("Deliver_Facility__c",dataValue("$.form.TT5.Child_Information.Delivery_Information.Delivery_Facility")),
        /*  field("Immediate_Breastfeeding__c",function(state){
            var var1=dataValue("form.TT5.Child_Information.Delivery_Information.Breastfeeding_Delivery")(state);
            if(var1=="---"){
              var1=undefined;
            }
            else if(var1=="yes"){
              var1="Yes";
            }
            return var1;
          }),*/
          field("Exclusive_Breastfeeding__c",dataValue("form.TT5.Child_Information.Exclusive_Breastfeeding.Exclusive_Breastfeeding"))
        ))(state);

    }

//  }
  //Transfer Outs
  else if(dataValue("$.form.Status.Client_Status")(state)=="Transferred_Out"){
    upsert("Person__c","CommCare_ID__c",fields(
      field("Source__c",1),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Client_Status__c","Transferred Out"),
      field("Active_in_Thrive_Thru_5__c","No"),
      field("Inactive_Date__c",dataValue("$.form.Date")),
      field("Active_in_HAWI__c","No"),
      field("Active_TT5_Mother__c","No"),
      field("Date_of_Transfer_Out__c",dataValue("$.form.Status.Date_of_Transfer_Out"))

    ))(state);
  }
  //Lost to Follow Up
  else if(dataValue("$.form.Status.Client_Status")(state)=="Lost_to_Follow_Up"){
    upsert("Person__c","CommCare_ID__c",fields(
      field("Source__c",1),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Client_Status__c","Lost to Follow-Up"),
      field("Active_in_Thrive_Thru_5__c","No"),
      field("Active_in_HAWI__c","No"),
      field("Active_TT5_Mother__c","No"),
      field("Date_Last_Seen__c",dataValue("$.form.Status.Date_Last_Seen")),
      field("Inactive_Date__c",dataValue("$.form.Date"))

    ))(state);
  }
  //Graduated from Thrive Thru 5
  else if(dataValue("$.form.Status.Client_Status")(state)=="Graduated_From_TT5"){
    upsert("Person__c","CommCare_ID__c",fields(
      field("Source__c",1),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Client_Status__c","Graduated From TT5"),
      field("Active_in_Thrive_Thru_5__c","No"),
      field("Active_in_HAWI__c","No"),
      field("Active_TT5_Mother__c","No"),
      field("Date_Last_Seen__c",dataValue("$.form.Status.Date_Last_Seen")),
      field("Inactive_Date__c",dataValue("$.form.Date"))

    ))(state);
  }
  //Data entry error
  else if(dataValue("$.form.Status.Client_Status")(state)=="Data_Entry_Error"){
    upsert("Person__c","CommCare_ID__c",fields(
      field("Source__c",1),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Client_Status__c","Data Entry Error"),
      field("Active_in_Thrive_Thru_5__c","No"),
      field("Active_TT5_Mother__c","No"),
      field("Active_in_HAWI__c","No"),
      field("Inactive_Date__c",dataValue("$.form.Date"))


    ))(state);
  }
  //Deceased
  else if(dataValue("$.form.Status.Client_Status")(state)=="Deceased"){
    upsert("Person__c","CommCare_ID__c",fields(
      field("Source__c",1),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Client_Status__c","Deceased"),
      field("Active_in_Thrive_Thru_5__c","No"),
      field("Active_in_HAWI__c","No"),
      field("Active_TT5_Mother__c","No"),
      field("Date_of_Death__c",dataValue("$.form.Status.Date_of_Death")),
      field("Cause_of_Death__c",function(state){
        return dataValue("$.form.Status.Cause_of_Death")(state).toString().replace(/_/g," ");
      }),
      field("Inactive_Date__c",dataValue("$.form.Date"))

    ))(state);
  }

}),
//TO EDIT AND COMMENT BACK IN?
/* Replace Sx with S*
  //Need to update CHWs
combine(function(state){
  //Person is added to TT5 (this can only happen to a mother, a child wouldn't be in HAWI before joining TT5)
  if(dataValue("$.form.Basic_Information.Basic_Information.Add_to_TT5")(state)=="Yes"){
    upsert("Person__c","CommCare_ID__c",fields(
      //field("Name",dataValue("$.form.Basic_Information.Basic_Information.final_name")),
      field("Source__c",1),
      //field("Name",dataValue("$.form.final_name")),
      field("Name",function(state){
        var name1=dataValue("$.form.final_name")(state);
        var name2=name1.replace(/\w\Sx/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        return name2;
      }),
      field("Active_TT5_Mother__c","Yes"),
      field("TT5_Mother_Registrant__c","Yes"),
      field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
      relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
      field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
      field("Active_in_Support_Group__c",dataValue("$.form.HAWI.Support_Group")),
      field("Preferred_Care_Facility__c",dataValue("$.form.HAWI.Preferred_Care_F.Preferred_Care_Facility"))

    ))(state);
  }
  else{
  //Person is added to HAWI
    if(dataValue("$.form.Basic_Information.Basic_Information.Add_to_HAWI")(state)=="Yes"){
      upsert("Person__c","CommCare_ID__c",fields(
        //field("Name",dataValue("$.form.Basic_Information.Basic_Information.final_name")),
        field("Source__c",1),
        //field("Name",dataValue("$.form.final_name")),
        field("Name",function(state){
          var name1=dataValue("$.form.final_name")(state);
          var name2=name1.replace(/\w\Sx/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          return name2;
        }),
        field("Active_in_HAWI__c","Yes"),
        field("HAWI_Registrant","Yes"),
        field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
        relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
        field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
        field("Follow_Up_By_Date__c", dataValue("$.form.Follow-Up_By_Date")),
        field("Active_in_Support_Group__c",dataValue("$.form.HAWI.Support_Group")),
        field("Preferred_Care_Facility__c",dataValue("$.form.HAWI.Preferred_Care_F.Preferred_Care_Facility")),
        field("Immediate_Breastfeeding__c",function(state){
            var var1=dataValue("form.TT5.Child_Information.Delivery_Information.Breastfeeding_Delivery")(state);
            if(var1=="---"){
              var1=undefined;
            }
            else if(var1=="yes"){
              var1="Yes";
            }
            return var1;
          }),
        field("Exclusive_Breastfeeding__c",dataValue("form.TT5.Child_Information.Exclusive_Breastfeeding.Exclusive_Breastfeeding"))
      ))(state);
    }
    else{
      if(dataValue("form.@xmlns")(state)!="http://openrosa.org/formdesigner/60AF0A3E-A8A1-425B-B86B-35E0C65C8BC4"){
        upsert("Person__c","CommCare_ID__c",fields(
          field("Name",function(state){
            var name1=dataValue("$.form.final_name")(state);
            var name2=name1.replace(/\w\Sx/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            return name2;
          }),
          //field("Name",dataValue("$.form.final_name")),
          field("Source__c",1),
          field("CommCare_ID__c", dataValue("$.form.case.@case_id")),
          relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
          field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
          field("Active_in_Support_Group__c",dataValue("$.form.HAWI.Support_Group")),
          field("Preferred_Care_Facility__c",dataValue("$.form.HAWI.Preferred_Care_F.Preferred_Care_Facility")),
          field("Immediate_Breastfeeding__c",function(state){
            var var1=dataValue("form.TT5.Child_Information.Delivery_Information.Breastfeeding_Delivery")(state);
            if(var1=="---"){
              var1=undefined;
            }
            else if(var1=="yes"){
              var1="Yes";
            }
            return var1;
          }),
          field("Exclusive_Breastfeeding__c",dataValue("form.TT5.Child_Information.Exclusive_Breastfeeding.Exclusive_Breastfeeding"))
        ))(state);
      }
    }
  }
}) */
//,
///////UPSERT SERVICE RECORDS ///////
  //ANC1
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.ANCs.copy-1-of-anc_1")(state)=="click_to_enter_anc_1"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "anc_1"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","ANC 1"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_1")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.ANCs.Facility1")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //ANC2
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.ANCs.copy-1-of-anc_2")(state)=="click_to_enter_anc_2"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "anc_2"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Reason_for_Service__c","ANC 2"),
      field("Date__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_2")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.ANCs.Facility2"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.ANCs.Facility2")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //ANC3
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.ANCs.copy-1-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "anc_3"
        return serviceId
      })(state),
      field("Source__c",true),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","ANC 3"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_3")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.ANCs.Facility3"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.ANCs.Facility3")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //ANC4
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.ANCs.copy-2-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "anc_4"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","ANC 4"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_4")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.ANCs.Facility4"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.ANCs.Facility4")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //ANC5
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.ANCs.copy-3-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "anc_5"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","ANC 5"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_5")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.ANCs.Facility5"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.ANCs.Facility5")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //BCG REVIEWED
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-3-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "bcg"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","BCG"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.BCG")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_BCG"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_BCG")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //OPV0 REVIEWED
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "opv0"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","OPV0"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_0")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_0"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_0")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //OPV1 REVIEWED
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-1-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "opv1"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","OPV1"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_1")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
     // relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_1"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_1")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //OPV2
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-2-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "opv2"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","OPV2"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_2")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_2"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_2")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //OPV3
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-4-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "opv3"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","OPV3"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_3")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_3"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_OPV_3")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //Measles 6
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-5-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "measles6"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","Measles 6"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_6")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_6"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_6")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
  //Measles 9
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-6-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "measles9"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","Measles 9"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_9")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_9"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_9")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),

//Measles 18
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Immunizations.copy-7-of-anc_3")(state)=="click_to_enter_anc_3"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "measles18"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","Measles 18"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_18")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      //relationship("Site__r","Label__c",dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_18"))
      relationship("Site__r","Label__c",function(state){
        var facility=dataValue("$.form.TT5.Child_Information.Immunizations.Facility_Measles_18")(state);
        if(facility===''||facility===undefined){
          facility="unknown";
        }
        return facility;

      })
    ))(state);

  }
}),
//Deworming
combine( function(state) {
  if(dataValue("$.form.TT5.Child_Information.Deworming")(state)=="Yes"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "deworming"
        return serviceId
      })(state),
      field("Source__c",1),
      field("Reason_for_Service__c","Deworming"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.Date")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id"))
    ))(state);

  }
}),
//Home Based care for HAWI clients
combine( function(state) {
  if(dataValue("$.form.HAWI.Home_Based_Care.Home_Based_Care_Provided")(state)!==undefined&&dataValue("$.form.HAWI.Home_Based_Care.Home_Based_Care_Provided")(state)!==''){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "homecare"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Reason_for_Service__c","Home-Based Care"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("Date__c",dataValue("$.form.Date")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("RecordTypeID","01224000000YAuK"),
      //field("Home_Based_Care_Rendered__c",'A;B;B'),
      field("Home_Based_Care_Rendered__c",function(state){
        var care='';
        var str=dataValue("$.form.HAWI.Home_Based_Care.Home_Based_Care_Provided")(state);
        care=str.replace(/ /g,";");
        care=care.replace(/_/g," ");

        return care;

      }),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id"))

    ))(state);

  }
}),
//Malaria cases
//Child
combine( function(state) {
  if(dataValue("$.form.treatment_and_tracking.malaria_test")(state)=="yes"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "malaria"
        return serviceId
      })(state),
        field("Source__c",1),
        field("Date__c",dataValue("$.form.Date")),
        field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
        field("Referral_Date__c",dataValue("$.form.Referral_Date")),
        field("Referred__c",1),
        field("Type_of_Service__c","CHW Mobile Survey"),
        field("RecordTypeID","01224000000kOto"),
        field("Open_Case__c",1),
        field("Purpose_of_Referral__c","Malaria"),
        field("Malaria_Status__c",dataValue("$.form.treatment_and_tracking.malaria_test_results")),
        field("Home_Treatment_Date__c",dataValue("$.form.TT5.Child_Information.CCMM.Home_Treatment_Date")),
        field("Malaria_Home_Test_Date__c",dataValue("$.form.treatment_and_tracking.malaria_test_date")),
        field("CommCare_Code__c",dataValue("form.subcase_0.case.@case_id")(state)),
        relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id"))
      ))(state);
    }
  }
),

//Malnutrition case
combine(function(state){
  if(dataValue("$.form.TT5.Child_Information.Nutrition2.Nutrition_Status")(state)!==undefined){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + "malnutrition"
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Date__c",dataValue("$.form.Date")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("RecordTypeID","01224000000YAuK"),
      field("Reason_for_Service__c","Nutrition Screening"),
      field("Clinical_Visit_Date__c",dataValue("$.form.TT5.Child_Information.Nutrition2.Clinical_Date")),
      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id")),
      field("Height__c",dataValue("$.form.TT5.Child_Information.Nutrition.Height")),
      field("Weight__c",dataValue("$.form.TT5.Child_Information.Nutrition.Weight")),
      field("MUAC__c",dataValue("$.form.TT5.Child_Information.Nutrition.MUAC")),
      field("Nutrition_Status__c",function(state){
        var status='';
        if(dataValue("$.form.TT5.Child_Information.Nutrition2.Nutrition_Status")(state)=='normal'){
          status='Normal';
        }
        else if(dataValue("$.form.TT5.Child_Information.Nutrition2.Nutrition_Status")(state)=='moderate'){
          status='Moderately Malnourished';
        }
        else if(dataValue("$.form.TT5.Child_Information.Nutrition2.Nutrition_Status")(state)=='severe'){
          status='Severely Malnourished';
        }
        return status;
      })
    ))(state);
  }
}),
//TURN INTO ARRAY --> FOR EACH
//All referrals are sent here (danger sign, malaria, malnutrition, other referral)
combine(function(state){
  if(dataValue("$.form.Referral")(state)=="Yes"){
    upsert("Service__c", "CommCare_Code__c", fields(
      field("CommCare_Code__c",function(state){
        var id = dataValue("$.id")(state);
        var serviceId = id + dataValue("$.form.Clinical_Services.Purpose")(state);
        return serviceId
      })(state),
      field("Source__c",1),
      //field("Catchment__c","a002400000pAcOe"),
      field("Date__c",dataValue("$.form.Date")),
      field("Type_of_Service__c","CHW Mobile Survey"),
      field("Household_CHW__c",dataValue("$.form.CHW_ID_Final")),
      field("RecordTypeID","01224000000kOto"),
      field("Referred__c",1),
      field("Follow_Up_By_Date__c",dataValue("$.form.Follow-Up_By_Date")),
      field("Reason_for_Service__c","Referral"),
      field("Clinic_Zinc__c",dataValue("$.form.TT5.Child_Information.Clinical_Services.diarrhea_clinic_treatment_zinc")),
      field("Clinic_ORS__c",dataValue("$.form.TT5.Child_Information.Clinical_Services.diarrhea_clinic_treatment_ORS")),
      field("Home_Zinc__c",dataValue("$.form.TT5.Child_Information.Referrals.diarrhea_home_treatment_zinc")),
      field("Home_ORS__c",dataValue("$.form.TT5.Child_Information.Referrals.diarrhea_home_treatment_ORS")),
      field("Open_Case__c",1),
      field("Malaria_Status__c",dataValue("$.form.Malaria_Status")),
      field("Home_Treatment__c",dataValue("$.form.TT5.Child_Information.CCMM.Home_Treatment")),
      field("Malaria_Home_Test_Date__c",dataValue("$.form.TT5.Child_Information.CCMM.test_date")),
      field("CommCare_Code__c",dataValue("$.form.subcase_0.case.@case_id")(state)),
      field("Purpose_of_Referral__c",function(state){   //********TO UPDATE REFERRAL REASONS
        var purpose='';
        var name=dataValue("$.form.Purpose_of_Referral")(state);
        if(name=="Adverse_Drug_Reaction_Side_Effect"){
          purpose="Adverse Drug Reaction/Side Effect";
        }
        else if(name=="Pregnancy_Care"){
          purpose="Pregnancy Care (ANC)";
        }
        else if(name=="Family_Planning"){
          purpose="Family Planning (FP)"
        }
        else if(purpose!==undefined){
          purpose=name.replace(/_/g," ");
        }
        return purpose;
      }),

      relationship("Person__r","CommCare_ID__c",dataValue("$.form.case.@case_id"))

    ))(state);

  }
}),
//TURN INTO ARRAY
//HAWI other clinical services received,
combine(function(state){
  if(dataValue("$.form.HAWI.Clinical_Service_Q")(state)==="yes"){
  //  each(dataPath("$.form.HAWI.Clinical_Services_Rendered[*]"), //CHECK IF ARRAY
    upsert("Service__c", "CommCare_Code__c", fields(
        field("CommCare_Code__c",function(state){
          var id = dataValue("$.id")(state);
          var serviceId = id + dataValue("$.form.Clinical_Services.Purpose")(state);
          return serviceId
        })(state),
        field("Source__c",1),
        //field("Catchment__c","a002400000pAcOe"),
        field("Household_CHW__c",dataValue("chw")),
        field("Reason_for_Service__c",function(state){
          var reason='';
          var name=dataValue("Purpose")(state);
          if(name=="Adverse_Drug_Reaction_Side_Effect"){
            reason="Adverse Drug Reaction/Side Effect";
          }
          else if(name=="Pregnancy_Care"){
            reason="Pregnancy Care (ANC)";
          }
          else if(name=="Family_Planning"){
            reason="Family Planning (FP)"
          }
          else{
            reason=name.replace(/_/g," ");
          }
          return reason;
        }),
        field("Date__c",dataValue("Date_of_Clinical_Service")),
        field("Type_of_Service__c","CHW Mobile Survey"),
        field("RecordTypeID","01224000000YAuK"),
        //relationship("Site__r","Label__c",dataValue("Facility_of_Clinical_Service")),
        relationship("Site__r","Label__c",function(state){
            var facility=dataValue("Facility_of_Clinical_Service")(state);
            if(facility===''||facility===undefined){
              facility="unknown";
            }
            else if(facility=='Other_Clinic'){
              facility="Other";
            }
            else if(facility=="Rongo_Sub-District_Hospital"){
              facility="Rongo_SubDistrict_Hospital";
            }
            return facility;

          }),
        relationship("Person__r","CommCare_ID__c",dataValue("Case_ID"))
      ))//)
    (state);
  }
}),
//TURN INTO ARRAY
// TT5 other clinical services received
combine(function(state){
  if(dataValue("$.form.TT5.Clinical_Service_Q")(state)==="yes"){
    //each(dataPath("$.form.TT5.Child_Information.Clinical_Services[*]"), //CHECK IF ARRAY
    upsert("Service__c", "CommCare_Code__c", fields(
        field("CommCare_Code__c",function(state){
          var id = dataValue("$.id")(state);
          var serviceId = id + dataValue("$.form.Clinical_Services.Purpose")(state);
          return serviceId
        })(state),
        field("Source__c",true),
        //field("Catchment__c","a002400000pAcOe"),
        field("Household_CHW__c",dataValue("chw")),
        field("Reason_for_Service__c",function(state){
          var reason='';
          var name=dataValue("Purpose")(state);
          if(name=="Adverse_Drug_Reaction_Side_Effect"){
            reason="Adverse Drug Reaction/Side Effect";
          }
          else if(name=="Pregnancy_Care"){
            reason="Pregnancy Care (ANC)";
          }
          else if(name=="Family_Planning"){
            reason="Family Planning (FP)"
          }
          else{
            reason=name.replace(/_/g," ");
          }
          return reason;
        }),
        field("Date__c",dataValue("Clinical_Date")),
        field("Type_of_Service__c","CHW Mobile Survey"),
        field("RecordTypeID","01224000000YAuK"),
        //relationship("Site__r","Label__c",dataValue("Clinical_Facility")),
        relationship("Site__r","Label__c",function(state){
            var facility=dataValue("Clinical_Facility")(state);
            if(facility===''||facility===undefined){
              facility="unknown";
            }
            return facility;

          }),
        relationship("Person__r","CommCare_ID__c",dataValue("Case_ID"))
      ))//)
      (state);
  }
}), //*/
upsert("Visit__c", "CommCare_Visit_ID__c", fields(
  field("CommCare_Visit_ID__c", dataValue("id")),
  relationship("Household__r","CommCare_Code__c",dataValue("$.form.HH_ID")),
  field("Name", "Supervisor Visit"),
  field("Household_CHW__c", "a031x000002S9lm"), //Hardcoded for sandbox testing
  //field("Household_CHW__c", dataValue("$.form.CHW_ID_Final")), //CHECK CHW ID !!
  field("Supervisor_Visit__c",function(state){
    var visit = dataValue("$.form.supervisor_visit")(state).toString().replace(/ /g,";")
    return visit.toString().replace(/_/g," ");
  }),
  field("Date__c",dataValue("$.metadata.timeEnd")),
  field("Location__latitude__s", function(state){
    var lat = state.data.metadata.location;
    lat = lat.substring(0, lat.indexOf(" "));
    return lat;
  }),
 field("Location__longitude__s", function(state){
    var long = state.data.metadata.location;
    long = long.substring(long.indexOf(" ")+1, long.indexOf(" ")+7);
    return long;
  })
))
);