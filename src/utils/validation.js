import _ from "underscore";
import { VALIDATION_MESSAGES } from "../constants";
import { dynamicRequiredMsz } from "./index";

export const validation = {
  validate_bulk_lead(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    if (element.name === "name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["name_error"] = VALIDATION_MESSAGES.NAME_IS_INVALID;
        } else {
          validation_error["name_error"] = null;
        }
      } else {
        validation_error["name_error"] = VALIDATION_MESSAGES.NAME_IS_REQUIRED;
      }
    } else if (element.name === "email") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["email_error"] =
            VALIDATION_MESSAGES.EMAIL_IS_INVALID;
        } else {
          validation_error["email_error"] = null;
        }
      } else {
        validation_error["email_error"] = VALIDATION_MESSAGES.EMAIL_IS_REQUIRED;
      }
    } else if (element.name === "mobile") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error["mobile_error"] =
            VALIDATION_MESSAGES.MOBILE_IS_INVALID;
        } else {
          validation_error["mobile_error"] = null;
        }
      } else {
        validation_error["mobile_error"] = VALIDATION_MESSAGES.NAME_IS_REQUIRED;
      }
    } else if (element.name === "school_name") {
      if (_.isEmpty(element.value)) {
        validation_error["school_name_error"] =
          VALIDATION_MESSAGES.SCHOOL_NAME_IS_REQUIRED;
      } else {
        validation_error["school_name_error"] = null;
      }
    } else if (element.name === "education") {
      if (_.isEmpty(element.value)) {
        validation_error["education_error"] =
          VALIDATION_MESSAGES.EDUCATION_IS_REQUIRED;
      } else {
        validation_error["education_error"] = null;
      }
    } else if (element.name === "date_of_birth") {
      if (_.isEmpty(element.value)) {
        validation_error["date_of_birth_error"] =
          VALIDATION_MESSAGES.DATE_OF_BIRTH_IS_REQUIRED;
      } else {
        validation_error["date_of_birth_error"] = null;
      }
    } else if (element.name === "city") {
      if (_.isEmpty(element.value)) {
        validation_error["city_error"] = VALIDATION_MESSAGES.CITY_IS_REQUIRED;
      } else {
        validation_error["city_error"] = null;
      }
    } else if (element.name === "state") {
      if (_.isEmpty(element.value)) {
        validation_error["state_error"] = VALIDATION_MESSAGES.STATE_IS_REQUIRED;
      } else {
        validation_error["state_error"] = null;
      }
    }
    return validation_error;
  },
  validate_personal_lead(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;
    if (element.name === "firstname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["name_error"] = "Name only Accept Character";
        } else {
          validation_error["name_error"] = null;
        }
      } else {
        validation_error["name_error"] = "Name Required";
      }
    } else if (element.name === "middlename") {
      if (!regex_name.test(element.value)) {
        validation_error["middle_error"] = "Middle Name only Accept Character";
      } else {
        validation_error["middle_error"] = null;
      }
    } else if (element.name === "lastname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["last_error"] = "Last Name only Accept Character";
        } else {
          validation_error["last_error"] = null;
        }
      } else {
        validation_error["last_error"] = "Last Name Required";
      }
    } else if (element.name === "useremail") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["email_error"] = "Invalid Email Id ";
        } else {
          validation_error["email_error"] = null;
        }
      } else {
        validation_error["email_error"] = "Email id Required";
      }
    } else if (element.name === "usermobile") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error["mobile_error"] = "Invalid Mobile No";
        } else {
          validation_error["mobile_error"] = null;
        }
      } else {
        validation_error["mobile_error"] = "Mobile No Required";
      }
    } else if (element.name === "domicile") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["domicile_error"] =
            "Domicile State only Accept Character";
        } else {
          validation_error["domicile_error"] = null;
        }
      } else {
        validation_error["domicile_error"] = " Domicile  Required";
      }
    } else if (element.name === "nationality") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["nation_error"] =
            "Nationality only Accept Character";
        } else {
          validation_error["nation_error"] = null;
        }
      } else {
        validation_error["nation_error"] = " Nationality  Required";
      }
    } else if (element.name === "aadhar_card") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["aadhar_error"] =
            "Aadhar Card no only Accept Number";
        } else {
          validation_error["aadhar_error"] = null;
        }
      } else {
        validation_error["aadhar_error"] = " Aadhar Card no Required";
      }
    } else if (element.name === "dateofbirth") {
      if (!_.isEmpty(element.value)) {
        validation_error["dateofbirth_error"] = null;
      } else {
        validation_error["dateofbirth_error"] = " Date of Birth Required";
      }
    } else if (element.name === "applied_course") {
      if (!_.isEmpty(element.value)) {
        validation_error["apply_error"] = null;
      } else {
        validation_error["apply_error"] = " Select Course Required";
      }
    } else if (element.name === "state") {
      if (!_.isEmpty(element.value)) {
        validation_error["state_error"] = null;
      } else {
        validation_error["state_error"] = " Select State Required";
      }
    } else if (element.name === "city") {
      if (!_.isEmpty(element.value)) {
        validation_error["city_error"] = null;
      } else {
        validation_error["city_error"] = " Select City Required";
      }
    } else if (element.name === "corre_state") {
      if (!_.isEmpty(element.value)) {
        validation_error["corrstate_error"] = null;
      } else {
        validation_error["corrstate_error"] = " Select State Required";
      }
    } else if (element.name === "corre_city") {
      if (!_.isEmpty(element.value)) {
        validation_error["corrcity_error"] = null;
      } else {
        validation_error["corrcity_error"] = " Select City Required";
      }
    } else if (element.name === "pincode") {
      if (!_.isEmpty(element.value)) {
        if (!regex_pin.test(element.value)) {
          validation_error["pincode_error"] =
            "Pincode only Accept Number Between 4 or 6";
        } else {
          validation_error["pincode_error"] = null;
        }
      } else {
        validation_error["pincode_error"] = "Pincode Required";
      }
    } else if (element.name === "corre_pincode") {
      if (!_.isEmpty(element.value)) {
        if (!regex_pin.test(element.value)) {
          validation_error["pincode_corr_error"] =
            "Pincode only Accept Number Between 4 or 6";
        } else {
          validation_error["pincode_corr_error"] = null;
        }
      } else {
        validation_error["pincode_corr_error"] = "Pincode Required";
      }
    } else if (element.name === "corr_address") {
      if (!_.isEmpty(element.value)) {
        validation_error["corrcadd_error"] = null;
      } else {
        validation_error["corrcadd_error"] = "Address Required";
      }
    } else if (element.name === "address") {
      if (!_.isEmpty(element.value)) {
        validation_error["address_error"] = null;
      } else {
        validation_error["address_error"] = " Address Required";
      }
    } else if (element.name === "status") {
      if (!_.isEmpty(element.value)) {
        validation_error["status_error"] = null;
      } else {
        validation_error["status_error"] = "Select Marital Status";
      }
    } else if (element.name === "category") {
      if (!_.isEmpty(element.value)) {
        validation_error["category_error"] = null;
      } else {
        validation_error["category_error"] = " Select Category";
      }
    } else if (element.name === "gender") {
      if (!_.isEmpty(element.value)) {
        validation_error["gender_error"] = null;
      } else {
        validation_error["gender_error"] = "Select Gender";
      }
    } else if (element.name === "seat") {
      if (!_.isEmpty(element.value)) {
        validation_error["seat_error"] = null;
      } else {
        validation_error["seat_error"] = " Select Seat";
      }
    }
    return validation_error;
  },
  validateUpdate(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;
    if (element.name === "first_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["name_error"] = " Only Character Allow";
        } else {
          validation_error["name_error"] = null;
        }
      } else {
      }
    } else if (element.name === "middle_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["middle_error"] = " Only Character Allow";
        } else {
          validation_error["middle_error"] = null;
        }
      } else {
      }
    } else if (element.name === "last_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["last_error"] = "Only Character Allow";
        } else {
          validation_error["last_error"] = null;
        }
      } else {
      }
    } else if (element.name === "nationality") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["nation_error"] = " Only Character Allow";
        } else {
          validation_error["nation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "domicile_state") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["domi_error"] = "Only Character Allow";
        } else {
          validation_error["domi_error"] = null;
        }
      } else {
      }
    } else if (element.name === "aadhar_card_no") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["aadhar_error"] = " Only Number Allow";
        } else {
          validation_error["aadhar_error"] = null;
        }
      } else {
      }
    } else if (element.name === "landline_number") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["landline_error"] = " Only Number Allow";
        } else {
          validation_error["landline_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mobile_number") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error["mobile_error"] = "Invalid Mobile No";
        } else {
          validation_error["mobile_error"] = null;
        }
      } else {
      }
    } else if (element.name === "email_address") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["email_error"] = "Invalid Email ID";
        } else {
          validation_error["email_error"] = null;
        }
      } else {
      }
    } else if (element.name === "pincode") {
      if (!_.isEmpty(element.value)) {
        if (!regex_pin.test(element.value)) {
          validation_error["pincode_error"] = "Invalid Pincode";
        } else {
          validation_error["pincode_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mother_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["mother_error"] = "Only Character Allow";
        } else {
          validation_error["mother_error"] = null;
        }
      } else {
      }
    } else if (element.name === "designation") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["designation_error"] = "Only Character Allow";
        } else {
          validation_error["designation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "relation_with_student") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["relation_error"] = "Only Character Allow";
        } else {
          validation_error["relation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "name_of_exam") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["class_error"] = " Only Character Allow";
        } else {
          validation_error["class_error"] = null;
        }
      } else {
      }
    } else if (element.name === "board_university") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["board_error"] = "Only Character Allow";
        } else {
          validation_error["board_error"] = null;
        }
      } else {
      }
    } else if (element.name === "school_college") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["schoolname_error"] = " Only Character Allow";
        } else {
          validation_error["schoolname_error"] = null;
        }
      } else {
      }
    } else if (element.name === "starting_year") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["startingyear_error"] = "Only Number Allow";
        } else {
          validation_error["startingyear_error"] = null;
        }
      } else {
      }
    } else if (element.name === "passing_year") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["passiingyear_error"] = "Only Number Allow";
        } else {
          validation_error["passiingyear_error"] = null;
        }
      } else {
      }
    } else if (element.name === "subject") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["subject_error"] = "Only Character Allow";
        } else {
          validation_error["subject_error"] = null;
        }
      } else {
      }
    } else if (element.name === "score") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["percentage_error"] = "Only Number Allow";
        } else {
          validation_error["percentage_error"] = null;
        }
      } else {
      }
    } else if (element.name === "exam_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["exam_error"] = " Only Character Allow";
        } else {
          validation_error["exam_error"] = null;
        }
      } else {
      }
    } else if (element.name === "roll_no") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["rollno_error"] = "Only Number Allow";
        } else {
          validation_error["rollno_error"] = null;
        }
      } else {
      }
    } else if (element.name === "rank_score") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["rank_error"] = " Only Number Allow";
        } else {
          validation_error["rank_error"] = null;
        }
      } else {
      }
    } else if (element.name === "category_rank") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error["score_error"] = "Only Number Allow";
        } else {
          validation_error["score_error"] = null;
        }
      } else {
      }
    }

    return validation_error;
  },
  validate_Parent_lead(element, validation_error_Parent) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;

    if (element.name === "fathername") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["fname_error"] = " Only Character Allow";
        } else {
          validation_error_Parent["fname_error"] = null;
        }
      } else {
      }
    } else if (element.name === "flastname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["flast_error"] = "Only Character Allow";
        } else {
          validation_error_Parent["flast_error"] = null;
        }
      } else {
      }
    } else if (element.name === "organisation") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["organisation_error"] =
            " Only Character Allow";
        } else {
          validation_error_Parent["organisation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "designation") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["designation_error"] = "Only Character Allow";
        } else {
          validation_error_Parent["designation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mothername") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["mothername_error"] = "Only Character Allow";
        } else {
          validation_error_Parent["mothername_error"] = null;
        }
      } else {
      }
    } else if (element.name === "aadhar_card_no") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_Parent["aadhar_error"] = " Only Number Allow";
        } else {
          validation_error_Parent["aadhar_error"] = null;
        }
      } else {
      }
    } else if (element.name === "landline_number") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_Parent["landline_error"] = " Only Number Allow";
        } else {
          validation_error_Parent["landline_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mobileno") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error_Parent["mobileno_error"] = "Invalid Mobile No";
        } else {
          validation_error_Parent["mobileno_error"] = null;
        }
      } else {
      }
    } else if (element.name === "emailidfather") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error_Parent["emailidfather_error"] = "Invalid Email ID";
        } else {
          validation_error_Parent["emailidfather_error"] = null;
        }
      } else {
      }
    } else if (element.name === "pincodef") {
      if (!_.isEmpty(element.value)) {
        if (!regex_pin.test(element.value)) {
          validation_error_Parent["pincodef_error"] = "Invalid Pincode";
        } else {
          validation_error_Parent["pincodef_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mother_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["mother_error"] = "Only Character Allow";
        } else {
          validation_error_Parent["mother_error"] = null;
        }
      } else {
      }
    } else if (element.name === "relation_with_student") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_Parent["relation_error"] = "Only Character Allow";
        } else {
          validation_error_Parent["relation_error"] = null;
        }
      } else {
      }
    }
    return validation_error_Parent;
  },
  validate_local_lead(element, validation_error_local) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;

    if (element.name === "lfistname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["lname_error"] = " Only Character Allow";
        } else {
          validation_error_local["lname_error"] = null;
        }
      } else {
      }
    } else if (element.name === "llastname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["lflast_error"] = "Only Character Allow";
        } else {
          validation_error_local["lflast_error"] = null;
        }
      } else {
      }
    } else if (element.name === "loragnisation") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["lorganisation_error"] =
            " Only Character Allow";
        } else {
          validation_error_local["lorganisation_error"] = null;
        }
      } else {
      }
    } else if (element.name === "ldesginnation") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["ldesgination_error"] = "Only Character Allow";
        } else {
          validation_error_local["ldesgination_error"] = null;
        }
      } else {
      }
    } else if (element.name === "mothername") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["mothername_error"] = "Only Character Allow";
        } else {
          validation_error_local["mothername_error"] = null;
        }
      } else {
      }
    } else if (element.name === "landline_number") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_local["landline_error"] = " Only Number Allow";
        } else {
          validation_error_local["landline_error"] = null;
        }
      } else {
      }
    } else if (element.name === "lmoileno") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error_local["lmobileno_error"] = "Invalid Mobile No";
        } else {
          validation_error_local["lmobileno_error"] = null;
        }
      } else {
      }
    } else if (element.name === "lemailid") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error_local["lemailidfather_error"] = "Invalid Email ID";
        } else {
          validation_error_local["lemailidfather_error"] = null;
        }
      } else {
      }
    } else if (element.name === "lpincode") {
      if (!_.isEmpty(element.value)) {
        if (!regex_pin.test(element.value)) {
          validation_error_local["lpincodef_error"] = "Invalid Pincode";
        } else {
          validation_error_local["lpincodef_error"] = null;
        }
      } else {
      }
    } else if (element.name === "relationwithStudent") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_local["relation_error"] = "Only Character Allow";
        } else {
          validation_error_local["relation_error"] = null;
        }
      } else {
      }
    }
    return validation_error_local;
  },
  validate_Exam_lead(element, validation_error_exam) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;

    if (element.name === "exam_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_exam["exam_error"] = " Only Character Allow";
        } else {
          validation_error_exam["exam_error"] = null;
        }
      } else {
      }
    } else if (element.name === "upsee") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["rollno_error"] = "Only Number Allow";
        } else {
          validation_error_exam["rollno_error"] = null;
        }
      } else {
      }
    } else if (element.name === "general_rank") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["rank_error"] = " Only Number Allow";
        } else {
          validation_error_exam["rank_error"] = null;
        }
      } else {
      }
    } else if (element.name === "category_rank") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["score_error"] = "Only Number Allow";
        } else {
          validation_error_exam["score_error"] = null;
        }
      } else {
      }
    }
    if (element.name === "exam_name0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_exam["exam_error0"] = " Only Character Allow";
        } else {
          validation_error_exam["exam_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "upsee0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["rollno_error0"] = "Only Number Allow";
        } else {
          validation_error_exam["rollno_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "general_rank0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["rank_error0"] = " Only Number Allow";
        } else {
          validation_error_exam["rank_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "category_rank0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_exam["score_error0"] = "Only Number Allow";
        } else {
          validation_error_exam["score_error0"] = null;
        }
      } else {
      }
    }
    return validation_error_exam;
  },
  validate_Qualification_lead(element, validation_error_qualification) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    let regex_pin = /^(\d{4}|\d{6})$/;
    let regex_number = /^[0-9]*$/;

    if (element.name === "class") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["class_error"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["class_error"] = null;
        }
      } else {
      }
    } else if (element.name === "boardtenth") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["board_error"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["board_error"] = null;
        }
      } else {
      }
    } else if (element.name === "schoolname") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["schoolname_error"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["schoolname_error"] = null;
        }
      } else {
      }
    } else if (element.name === "fromtenth") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["startingyear_error"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["startingyear_error"] = null;
        }
      } else {
      }
    } else if (element.name === "passingyear") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["passiingyear_error"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["passiingyear_error"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthsubject") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["subject_error"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["subject_error"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthpercentage") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["percentage_error"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["percentage_error"] = null;
        }
      } else {
      }
    } else if (element.name === "class0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["class_error0"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["class_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "boardtenth0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["board_error0"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["board_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "schoolname0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["schoolname_error0"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["schoolname_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "fromtenth0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["startingyear_error0"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["startingyear_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "passingyear0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["passiingyear_error0"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["passiingyear_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthsubject0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["subject_error0"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["subject_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthpercentage0") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["percentage_error0"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["percentage_error0"] = null;
        }
      } else {
      }
    } else if (element.name === "class1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["class_error1"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["class_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "boardtenth1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["board_error1"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["board_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "schoolname1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["schoolname_error1"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["schoolname_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "fromtenth1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["startingyear_error1"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["startingyear_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "passingyear1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["passiingyear_error1"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["passiingyear_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthsubject1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["subject_error1"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["subject_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthpercentage1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["percentage_error1"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["percentage_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "class2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["class_error2"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["class_error2"] = null;
        }
      } else {
      }
    } else if (element.name === "boardtenth1") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["board_error1"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["board_error1"] = null;
        }
      } else {
      }
    } else if (element.name === "schoolname2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["schoolname_error2"] =
            " Only Character Allow";
        } else {
          validation_error_qualification["schoolname_error2"] = null;
        }
      } else {
      }
    } else if (element.name === "fromtenth2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["startingyear_error2"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["startingyear_error2"] = null;
        }
      } else {
      }
    } else if (element.name === "passingyear2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["passiingyear_error2"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["passiingyear_error2"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthsubject2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error_qualification["subject_error2"] =
            "Only Character Allow";
        } else {
          validation_error_qualification["subject_error2"] = null;
        }
      } else {
      }
    } else if (element.name === "tenthpercentage2") {
      if (!_.isEmpty(element.value)) {
        if (!regex_number.test(element.value)) {
          validation_error_qualification["percentage_error2"] =
            "Only Number Allow";
        } else {
          validation_error_qualification["percentage_error2"] = null;
        }
      } else {
      }
    }
    return validation_error_qualification;
  },
  validate_lead_followup(element, validation_error) {
    if (element.name === "follow_up_subject") {
      if (_.isEmpty(element.value)) {
        validation_error["follow_up_subject_error"] =
          dynamicRequiredMsz("Subject");
      } else {
        validation_error["follow_up_subject_error"] = null;
      }
    } else if (element.name === "follow_up_body") {
      if (_.isEmpty(element.value)) {
        validation_error["follow_up_body_error"] =
          dynamicRequiredMsz("Summary");
      } else {
        validation_error["follow_up_body_error"] = null;
      }
    } else if (element.name === "status") {
      if (_.isEmpty(element.value)) {
        validation_error["status_error"] = dynamicRequiredMsz("Status");
      } else {
        validation_error["status_error"] = null;
      }
    }
    return validation_error;
  },
  validate_lead_followup_date(date, validation_error) {
    if (date === null) {
      validation_error["follow_up_date_error"] = dynamicRequiredMsz(
        "Date time for followup"
      );
    } else {
      validation_error["follow_up_date_error"] = null;
    }
    return validation_error;
  },
  validate_new_contact_from(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{10}$/;
    if (element.name === "client_email_address") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["contact_person_email"] = "Invalid Email Address";
        } else {
          validation_error["contact_person_email"] = null;
        }
      } else {
        validation_error["contact_person_email"] = "Email id Required";
      }
    } else if (element.name === "client_contact_number") {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value)) {
          validation_error["client_contact_number"] = "Invalid Mobile No";
        } else {
          validation_error["client_contact_number"] = null;
        }
      } else {
        validation_error["client_contact_number"] = "Mobile No Required";
      }
    }
    return validation_error;
  },
  validate_new_client_from(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex_mobile = /^[0-9]{1,15}$/;

    if (element.name === "company_name") {
      if (_.isEmpty(element.value)) {
        validation_error["company_name_error"] = "Can't be empty";
      } else {
        validation_error["company_name_error"] = null;
      }
    }
    // else if (element.name === 'address') {
    //     if (!regex_name.test(element.value)) {
    //         validation_error['middle_name_error'] = "Only characters accepted.";
    //     } else {
    //         validation_error['middle_name_error'] = null;
    //     }
    // }
    else if (element.name === "contact_person_name") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["contact_person_name"] = "Only characters accepted.";
        } else {
          validation_error["contact_person_name"] = null;
        }
      } else {
        validation_error["contact_person_name"] =
          "Contact Person Name Required";
      }
    } else if (
      element.name === "contact_person_email" ||
      element.name === "employee_email"
    ) {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["contact_person_email"] = "Invalid Email Address";
        } else {
          validation_error["contact_person_email"] = null;
        }
      } else {
        validation_error["contact_person_email"] = "Email id Required";
      }
    } else if (
      element.name === "contact_person_mobile" ||
      element.name === "employee_mobile"
    ) {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value.replace(/ /g, ""))) {
          validation_error["contact_person_mobile"] = "Invalid Mobile No";
        } else {
          validation_error["contact_person_mobile"] = null;
        }
      } else {
        validation_error["contact_person_mobile"] = "Mobile No Required";
      }
    } else if (
      element.name === "contact_person_alternate_mobile" ||
      element.name === "employee_mobile" //contact_person_alternate_mobile
    ) {
      if (!_.isEmpty(element.value)) {
        if (!regex_mobile.test(element.value.replace(/ /g, ""))) {
          validation_error["contact_person_alternate_mobile"] =
            "Invalid Mobile No";
        } else {
          validation_error["contact_person_alternate_mobile"] = null;
        }
      } else {
        validation_error["contact_person_alternate_mobile"] =
          "Mobile No Required";
      }
    } else if (element.name === "type") {
      if (_.isEmpty(element.value)) {
        validation_error["type"] = dynamicRequiredMsz("type");
      } else {
        validation_error["type"] = null;
      }
    } else if (element.name === "category") {
      if (_.isEmpty(element.value)) {
        validation_error["category"] = dynamicRequiredMsz("category");
      } else {
        validation_error["category"] = null;
      }
    }
    // else if (element.name === 'follow_up_body') {
    //     if (_.isEmpty(element.value)) {
    //         validation_error['follow_up_body_error'] = dynamicRequiredMsz('Summary');
    //     } else {
    //         validation_error['follow_up_body_error'] = null;
    //     }
    // }
    // else if (element.name === 'follow_up_date') {
    //     if (!_.isEmpty(element.value)) {
    //             validation_error['follow_up_date_error'] = null;
    //     } else {
    //         validation_error['follow_up_date_error'] = "Required Field";
    //     }
    // }

    return validation_error;
  },
  validate_followup_lead_selection(lead_unique_id, validation_error) {
    if (_.isEmpty(lead_unique_id)) {
      validation_error["lead_unique_id_error"] =
        dynamicRequiredMsz("Lead selection");
    } else {
      validation_error["lead_unique_id_error"] = null;
    }

    return validation_error;
  },
  validate_followup_from_calendar(element, validation_error) {
    if (element.name === "follow_up_subject") {
      if (_.isEmpty(element.value)) {
        validation_error["follow_up_subject_error"] =
          dynamicRequiredMsz("Subject");
      } else {
        validation_error["follow_up_subject_error"] = null;
      }
    } else if (element.name === "follow_up_body") {
      if (_.isEmpty(element.value)) {
        validation_error["follow_up_body_error"] =
          dynamicRequiredMsz("Context");
      } else {
        validation_error["follow_up_body_error"] = null;
      }
    }

    return validation_error;
  },
  validate_sib_email_template_selection(element, validation_error) {
    let regex_name = /^[a-zA-Z ]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (element.name === "replyToName") {
      if (!_.isEmpty(element.value)) {
        if (!regex_name.test(element.value)) {
          validation_error["replyToNameError"] =
            VALIDATION_MESSAGES.NAME_IS_INVALID;
        } else {
          validation_error["replyToNameError"] = null;
        }
      } else {
        validation_error["replyToNameError"] =
          VALIDATION_MESSAGES.NAME_IS_REQUIRED;
      }
    } else if (element.name === "replyToEmail") {
      if (!_.isEmpty(element.value)) {
        if (!regex_email.test(element.value)) {
          validation_error["replyToEmailError"] =
            VALIDATION_MESSAGES.EMAIL_IS_INVALID;
        } else {
          validation_error["replyToEmailError"] = null;
        }
      } else {
        validation_error["replyToEmailError"] =
          VALIDATION_MESSAGES.EMAIL_IS_REQUIRED;
      }
    }

    return validation_error;
  },
};
