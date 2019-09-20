//MOH513 Enroll Person form
//Upserting person record based on CommCare ID
upsert("Person__c","CommCare_ID__c", fields(
  field("CommCare_ID__c",dataValue("$.form.case.@case_id")),
  field("Name",function(state){
    var name1=dataValue("$.form.Basic_Information.Person_Name")(state);
    if( name1!==undefined){
      return name1.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    return name1;
  }),
  relationship("RecordType","Name",function(state){
    var rt = dataValue("$.form.Basic_Information.Record_Type")(state);
    if(rt !==undefined){
      return(rt.toString().replace(/_/g," "));
    }
  }),
  field("Catchment__c",dataValue("catchment")),
  field("Relation_to_the_head_of_household__c",dataValue("$.form.Basic_Information.relation_to_hh")),
  field("Child_Status__c",dataValue("$.form.Basic_Information.Client_Status")),
  field("Date_of_Birth__c",dataValue("$.form.Basic_Information.DOB")),
  field("Gender__c",dataValue("$.form.Basic_Information.Gender")),
  field("Age_Based_on_Date_of_Birth__c",dataValue("$.form.Basic_Information.age")),
  field("Check_Unborn_Child__c",dataValue("$.form.Basic_Information.Check_Unborn_Child")),
  field("Birth_Certificate__c",dataValue("$.form.Basic_Information.birth_certificate")),
  field("Currently_enrolled_in_school__c",dataValue("$.form.Basic_Information.enrolled_in_school")),
  field("Education_Level__c", function(state){
    var education = dataValue("$.form.Basic_Information.Education_Level")(state);
    if(education !==undefined){
      return education.toString().replace(/_/g," ");
    }
    return education;
  }),
  field("Telephone__c",dataValue("$.form.Basic_Information.Contact_Info.contact_phone_number")),
  field("Family_Planning__c",dataValue("$.form.Basic_Information.family_planning.Currently_on_family_planning")),
  field("Family_Planning_Method__c",dataValue("$.form.Basic_Information.family_planning.Family_Planning_Method")),
  field("Use_mosquito_net__c",dataValue("$.form.Basic_Information.person_info.sleep_under_net")),
  field("Chronic_illness__c", function(state){
    var illness = dataValue("$.form.Basic_Information.person_info.chronic_illness")(state);
    if( illness !==undefined){
      return illness.toString().replace(/ /g,";");
    }
    return illness;
  }),
  field("Two_weeks_or_more_cough__c",dataValue("$.form.Basic_Information.person_info.cough_for_2wks")),
  field("Reason_for_a_referral__c",function(state){
    var cough = dataValue("$.form.Basic_Information.person_info.refer_for_cough")(state);
    var reason = '';
    if(cough !==undefined){
      if(cough === "Yes"){
       reason = "Coughing for more than 2 weeks";
     } else {
       reason = "Other reason"; //TO UPDATE !!
     }
    }
   return reason;
  }),
  field("Knowledge_of_HIV_Status__c",dataValue("$.form.Basic_Information.person_info.known_hiv_status")),
  field("HIV_Status__c",dataValue("$.form.Basic_Information.person_info.hiv_status")),
  field("Disability__c",function(state){
    var disability = dataValue("$.form.Basic_Information.person_info.disability")(state);
    const toTitleCase ='';
    if(disability !== undefined){
       toTitleCase = disability.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(';');
    }
    return toTitleCase;
  }),
  field("Other_disability__c",function(state){
    var disability = dataValue("$.form.Basic_Information.person_info.other_disability")(state);
    const toTitleCase ='';
    if(disability !== undefined){
       toTitleCase = disability.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(';');
    }
    return toTitleCase;
  }),
  field("LMP__c",dataValue("$.form.TT5.Child_Information.ANCs.LMP")),
  field("Source__c",true),
  field("ANC_1__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_1")),
  field("ANC_2__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_2")),
  field("ANC_3__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_3")),
  field("ANC_4__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_4")),
  field("ANC_5__c",dataValue("$.form.TT5.Child_Information.ANCs.ANC_5")),
  field("BCG__c",dataValue("$.form.TT5.Child_Information.Immunizations.BCG")),
  field("OPV_0__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_0")),
  field("OPV_1__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_1")),
  field("OPV_2__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_2")),
  field("OPV_3__c",dataValue("$.form.TT5.Child_Information.Immunizations.OPV_PCV_Penta_3")),
  field("Measles_6__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_6")),
  field("Measles_9__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_9")),
  field("Measles_18__c",dataValue("$.form.TT5.Child_Information.Immunizations.Measles_18")),
  field("Pregnant__c",function(state){
    if(dataValue("$.form.TT5.Mother_Information.Pregnant")(state)=="Yes") return 1;
  }),
  field("Gravida__c",dataValue("$.form.TT5.Mother_Information.Pregnancy_Information.Gravida")),
  field("Parity__c",dataValue("$.form.TT5.Mother_Information.Pregnancy_Information.Parity")),
  field("Unique_Patient_Code__c",dataValue("$.form.HAWI.Unique_Patient_Code")),
  field("Active_in_Support_Group__c",dataValue("$.form.HAWI.Active_in_Support_Group")),
  field("CommCare_HH_Code__c",dataValue("$.form.case.@case_id")),
  field("Currently_on_ART_s__c",dataValue("$.form.HAWI.ART")),
  field("ARV_Regimen__c",dataValue("$.form.HAWI.ARVs")),
  field("Exclusive_Breastfeeding__c",dataValue("$.form.TT5.Child_Information.Exclusive_Breastfeeding.Exclusive_Breastfeeding")),
  field("Vitamin_A__c",dataValue("$.form.TT5.Child_Information.nutrition.vitamin_a")),
  field("Food_groups_3_times_a_day__c",dataValue("form.TT5.Child_Information.nutrition.food_groups")),
  field("Initial_MUAC__c",dataValue("$.form.TT5.Child_Information.nutrition.MUAC")),
  field("MCH_booklet__c",dataValue("$.form.TT5.Mother_Information.mch_booklet")),
  field("Preferred_Care_Facility__c",dataValue("$.form.HAWI.Preferred_Care_Facility")),
  field("Delivery_Facility__c",dataValue("form.TT5.Child_Information.Delivery_Information.Birth_Facility")), //transform?
/*  field("Delivery_Facility__c",function(state){
    var val='';
    var placeholder=''
    if(dataValue("$.form.TT5.Child_Information.Delivery_Information.Birth_Facility")(state)!==undefined){
      placeholder=dataValue("$.form.TT5.Child_Information.Delivery_Information.Birth_Facility")(state);
      val=placeholder.toString().replace(/_/g," ");
    } else{ val = null}
    return val;
  }), */
field("Place_of_Delivery__c",dataValue("$.form.TT5.Child_Information.Delivery_Information.Skilled_Unskilled")) //Need transformation?
  /*field("Place_of_Delivery__c",function(state){
    var val='';
    var placeholder=''
    if(dataValue("$.form.TT5.Child_Information.Delivery_Information.Skilled_Unskilled")(state)!==undefined){
      placeholder=dataValue("$.form.TT5.Child_Information.Delivery_Information.Skilled_Unskilled")(state);
      if(placeholder=='Skilled'){
        val='Facility';
      }
      else if(placeholder=='Unskilled'){
        val='Home';
      }
    }
    return val;
  }),*/

)),
//Upserting Supervisor Visit records; checks if Visit already exists via CommCare Visit ID which = CommCare submission ID
upsert("Visit__c", "CommCare_Visit_ID__c", fields(
  field("CommCare_Visit_ID__c", dataValue("id")),
  relationship("Household__r", "MOH_household_code__c", dataValue("$.form.moh_code")),
  field("Name", "Supervisor Visit"),
/*  field("Supervisor_Visit__c",function(state){
    return dataValue("$.form.supervisor_visit")(state).toString().replace(/ /g,";");
  }),*/
  field("Date__c",dataValue("$.metadata.timeEnd")),
  //field("Household_CHW__c",dataValue("$.form.CHW_ID")),//NEED TO MAP CHW?
  //field("Household_CHW__c", "a031x000002S9lm"), //HARDCODED FOR SANDBOX TESTING --> To replace with line above
  relationship("Catchment__r","Name", dataValue("$.form.catchment")),
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
