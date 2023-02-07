// ValidateUserInputs.ts helps with certain actions that need to happen in order to ensure valid input
// in both login and signup process. The following methods perform one of TWO major tasks
// TASK A: Perform a regular expression check on the inputs given and return true on success
// TASK B: display/hide additional "helper" texts present in Login.tsx and Signup.tsx that are used
// to inform users of valid inputs.


// Methods that help "decide" which helper methods to call
export function CheckLoginInputs(inputName: string, inputValue: string){
    if (inputName === "userEmail"){
        ValidateEmailFormat(inputValue)
    }else if (inputName === "userPass"){
        ValidatePasswordFormat(inputValue)
    }
}

export function ValidateLoginInputs(email: string, password: string){
    return ValidateEmailFormat(email) && ValidatePasswordFormat(password);
}

export function CheckCitizenSignupInputs(inputName: string, inputValue: string){
    if (inputName === "userFirstName" || inputName === "userLastName"){
        ValidateNameFormat(inputValue);
    }else if (inputName === "userEmail"){
        ValidateEmailFormat(inputValue)
    }else if (inputName === "userPass"){
        ValidatePasswordFormat(inputValue)
    }
}

export function ValidateCitizenSignupInputs(firstName: string, lastName: string, email: string, password: string){
    return ValidateNameFormat(firstName) && ValidateNameFormat(lastName) && ValidateEmailFormat(email) && ValidatePasswordFormat(password);
}

export function CheckOrganizationSignupInputs(inputName: string, inputValue: any){
    if (inputName === "organizationName"){
        ValidateNameFormat(inputValue);
    }else if(inputName === "organizationTIN"){
        ValidateTINFormat(inputValue);
    }else if (inputName === "organizationEmail"){
        ValidateEmailFormat(inputValue)
    }else if (inputName === "organizationPass"){
        ValidatePasswordFormat(inputValue)
    }
}

export function ValidateOrganizationSignupInputs(orgName: string, orgTIN: number, email: string, password: string){
    return ValidateNameFormat(orgName) && ValidateTINFormat(orgTIN) && ValidateEmailFormat(email) && ValidatePasswordFormat(password);
}

// The following methods are used by the function above whenever needed.
// These methods perform the two tasks described at the top of the file.

function ValidateNameFormat(inputValue: string){
    let nameREGEX = /^[a-zA-Z ]+$/

    if (nameREGEX.test(inputValue)){
        // @ts-ignore
        document.getElementById("name-validation-msg").style.display="none";
        // @ts-ignore
        document.getElementById("name-validation-msg-org").style.display="none";
        return true;
    }else{
        // Display error message
        // @ts-ignore
        document.getElementById("name-validation-msg").style.display="inline";
        // @ts-ignore
        document.getElementById("name-validation-msg-org").style.display="inline";
        return false;
    }
}

function ValidateEmailFormat(inputValue: string){
    let emailREGEX = /^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9-]+\.([.a-zA-Z])+[^.]$/

    if (emailREGEX.test(inputValue)){
        // @ts-ignore
        document.getElementById("email-validation-msg").style.display="none";
        // @ts-ignore
        document.getElementById("email-validation-msg-org").style.display = "none";

        return true;
    }else{
        // Display error message
        // @ts-ignore
        document.getElementById("email-validation-msg").style.display="inline";
        // @ts-ignore
        document.getElementById("email-validation-msg-org").style.display="inline";
        return false;
    }
}

function ValidatePasswordFormat(inputValue: string){
    // Minimum eight characters, at least one letter, one number and one special character
    let passREGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (passREGEX.test(inputValue)){
        // @ts-ignore
        document.getElementById("pass-validation-msg").style.display="none";
        // @ts-ignore
        document.getElementById("pass-validation-msg-org").style.display="none";
        return true;
    }else{
        // Display error message
        // @ts-ignore
        document.getElementById("pass-validation-msg").style.display="inline";
        // @ts-ignore
        document.getElementById("pass-validation-msg-org").style.display="inline";
        return false;
    }
}

function ValidateTINFormat(inputValue: number){
    try {
        let tinNumberStr = inputValue.toString()
        if (tinNumberStr.length === 9){
            // @ts-ignore
            document.getElementById("tin-validation-msg").style.display="none";
            return true;
        }else{
            // Display error message
            // @ts-ignore
            document.getElementById("tin-validation-msg").style.display="inline";
            return false;
        }

    }catch (error){
        // Display error message
        // @ts-ignore
        document.getElementsByClassName("tin-validation-msg").style.display="inline";
        return false;
    }
}
