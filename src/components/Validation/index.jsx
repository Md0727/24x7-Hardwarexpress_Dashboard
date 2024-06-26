import { toast } from "react-toastify";

export const nameValidation = (name) => {
    // let nameReg = /^[a-zA-Z]+( [a-zA-Z]+)+$/  //validated name 
    // let nameReg = /^[a-zA-Z]+$/;  //validated name 
    // let nameReg = /^[a-zA-Z\s]+$/;
    if (name === '') {
        toast.error(`Name is a mandatory field.`)
        return false;
    }
    // else if (!nameReg?.test(name)) {
    //     toast.error(`Enter Your Full Name`);
    //     return false;
    // }
    return true;
}

export const mobileNoValidation = (mobileNo) => {
    let mobileNoReg = /^[0-9]{10}$/  //validated name 
    if (mobileNo === '') {
        toast.error(`Mobile no is a mandatory field.`)
        return false;
    }else if (!mobileNoReg?.test(mobileNo)) {
        toast.error(`Please enter a valid 10 digit mobile number`);
        return false;
    }
    return true;
}

export const dateValidation = (date) => {
    if (date === '') {
        toast.error(`Date is a mandatory field.`)
        return false;
    }
    return true;
}

export const street1Validation = (street1) => {
    if (street1 === '') {
        toast.error(`Street 1 is a mandatory field.`)
        return false;
    }
    return true;
}

export const street2Validation = (street2) => {
    if (street2 === '') {
        toast.error(`Street 2 is a mandatory field.`)
        return false;
    }
    return true;
}

export const countryValidation = (countryName) => {
    if (countryName === '') {
        toast.error(`Country Name is a mandatory field.`)
        return false;
    }
    return true;
}

export const cityValidation = (cityName) => {
    if (cityName === '') {
        toast.error(`City Name is a mandatory field.`)
        return false;
    }
    return true;
}

export const companyNameValidation = (companyName) => {
    if (companyName === '') {
        toast.error(`Company Name is a mandatory field.`)
        return false;
    }
    return true;
}

export const ownerNameValidation = (ownerName) => {
    if (ownerName === '') {
        toast.error(`Owner Name is a mandatory field.`)
        return false;
    }
    return true;
}

export const registrationNoValidation = (registrationNo) => {
    if (registrationNo === '') {
        toast.error(`Registration No is a mandatory field.`)
        return false;
    }
    return true;
}

export const vatNoValidation = (vatNo) => {
    if (vatNo === '') {
        toast.error(`Vat No is a mandatory field.`)
        return false;
    }
    return true;
}

export const aboutValidation = (about) => {
    if (about === '') {
        toast.error(`About is a mandatory field.`)
        return false;
    }
    return true;
}

export const serviceTypeValidation = (serviceType, moverAndPackerService) => {
    if (moverAndPackerService) {
        if (serviceType === 0) {
            toast.error(`Choose Any one service from the (Select Company Type) dropdown`)
            return false;
        }
        return true;
    }
    return true;
}

export const TypeofServicValidation = (moverAndPackerService, furnitureService, appliancesService) => {
    if (moverAndPackerService === false && furnitureService === false && appliancesService === false) {
        toast.error(`Choose Any one service from the (Type of Service) dropdown.`)
        return false;
    }
    return true;
}

export const permitStateValidation = (permitState) => {
    if (permitState) {
        toast.error(`Permit State is a mandatory field.`)
        return false;
    }
    return true;
}

export const permitTypeValidation = (permitType) => {
    if (permitType) {
        toast.error(`Permit Type is a mandatory field.`)
        return false;
    }
    return true;
}

export const permitNoValidation = (permitNo) => {
    if (permitNo) {
        toast.error(`Permit No Type is a mandatory field.`)
        return false;
    }
    return true;
}
export const permitCityValidation = (permitCity) => {
    if (permitCity) {
        toast.error(`Permit City is a mandatory field.`)
        return false;
    }
    return true;
}
export const termsAndCondition = (checked) => {
    if (checked === false) {
        // toast.error(`Terms & Conditions: Essential Guidelines`)
        toast.error(`Please add term & conditions`)
        return false;
    }
    return true;
}


export const emailValidation = (email) => {
    let emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/  //validated name 
    if (email === '') {
        toast.error(`Email is a mandatory field.`)
        return false;
    }else if (!emailReg?.test(email)) {
        toast.error(`Please enter a valid email id`);
        return false;
    }
    return true;
}

export const postalCodeValidation = (postalCode) => {
    let postalReg = /^[0-9]{5,6}$/; // Regex pattern for both 5 and 6 digit postal codes
    if (postalCode === '') {
        toast.error(`Postal Code is a mandatory field.`);
        return false;
    } else if (!postalReg.test(postalCode)) {
        toast.error(`Please enter a valid 5 or 6 digit Postal code.`);
        return false;
    }
    return true;
}

export const postalCodeValidationG = (postalCode) => {
    let postalReg = /^[0-9]{6}$/  //validated name 
    if (postalCode === '') {
        toast.error(`Pastal Code is a mandatory field.`)
        return false;
    }else if (!postalReg?.test(postalCode)) {
        toast.error(`Please enter a valid 6 digit Postal code.`);
        return false;
    }
    return true;
}

export const postalCodeValidation2 = (postalCode) => {
    let postalReg = /^[0-9]{6}$/  //validated name 
    if (postalCode === true) {
        toast.error(`Pastal Code is a mandatory field.`)
        return false;
    }else if (!postalReg?.test(postalCode)) {
        toast.error(`Please enter a valid 6 digit Postal code.`);
        return false;
    }
    return true;
}

export const stateValidation = (state) => {
    let stateReg = /^[A-Za-z\s]+$/  //validated name 
    if (state === '') {
        toast.error(`State is a mandatory field.`)
        return false;
    }else if (!stateReg?.test(state)) {
        toast.error(`Only alphabets and. are allowed`);
        return false;
    }
    return true;
}

export const AadhaarNoValidation = (aadhaarNo) => {
    let aadhaarReg = /^[0-9]{12}$/  //validated name 
    if (aadhaarNo === '') {
        toast.error(`Aadhaar no is a mandatory field.`)
        return false;
    }else if (!aadhaarReg?.test(aadhaarNo)) {
        toast.error(`Please enter a valid 12 digit Aadhaar number.`);
        return false;
    }
    return true;
}

export const PanNoValidation = (panNo) => {
    let panNoReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/  //validated name 
    if (panNo === '') {
        toast.error(`Pan no is a mandatory field.`)
        return false;
    }else if (!panNoReg?.test(panNo)) {
        toast.error(`Please enter a valid 10 digit pan card number.`);
        return false;
    }
    return true;
}


export const passwordValidation = (password) => {
    let passwordReg = /^.{8}$/  //validated name 
    if (password === '') {
        toast.error(`Password is a mandatory field.`)
        return false;
    }else if (!passwordReg?.test(password)) {
        toast.error(`Password is not valid. It should be 8 characters long.`);
        return false;
    }
    return true;
}

// const regexPatterns = {
//     name: /^[a-zA-Z_]+( [a-zA-Z_]+)+$/,  //validated name 
//     email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
//     mobile: /^[0-9]{10}$/,
//     postalCode: /^[0-9]{6}$/,
//     state: /^[A-Za-z\s]+$/,
//     district: /^[A-Za-z\s]+$/,
//     aadhaar: /^[0-9]{12}$/,
//     panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
// };

// if (name === '') {
//     toast.error(`Name feild is required`)
// }else if (!regexPatterns?.name?.test(name)) {
//     toast.error(`${name} Name is not valid`)
// }else if (mobileNo === '') {
//     toast.error(`Mobile no feild is required`)
// }else if (!regexPatterns?.mobile?.test(mobileNo)) {
//     toast.error(`${mobileNo} mobile no is not valid`)
// } else if (email === '') {
//     toast.error(`Email feild is required`)
// }else if (!regexPatterns?.email?.test(email)) {
//     toast.error(`${email} your email is not valid`)
// } else if (postalCode === '') {
//     toast.error(`Postal Code feild is required`)
// } else if (!regexPatterns?.postalCode?.test(postalCode)) {
//     toast.error(`${postalCode} your postal code is not valid min 6 digit`)
// } else if (stateValue === '') {
//     toast.error(`State feild is required`)
// }else if (!regexPatterns?.state?.test(stateValue)) {
//     toast.error(`${stateValue} your state is not valid`)
// }else if (aadhaarNo === '') {
//     toast.error(`Aadhaar no feild is required`)
// }else if (!regexPatterns?.aadhaar?.test(aadhaarNo)) {
//     toast.error(`${aadhaarNo} Aadhaar no is not valid, 12 digis`)
// }else if (panNo === '') {
//     toast.error(`Pan no feild is required`)
// }else if (!regexPatterns?.panCard?.test(panNo)) {
//     toast.error(`${panNo} Pan no is not valid`)
// }