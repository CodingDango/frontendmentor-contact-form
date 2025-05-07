const fields_data = {

    "input_firstname" : {
        "input" : document.getElementById("first-name"), 
        "span" : document.getElementById("first-name-error"),
        "emptyMsg" : "This field is required"
    }, 

    "input_lastname" : {
      "input" : document.getElementById("last-name"), 
      "span" : document.getElementById("last-name-error"), 
      "emptyMsg" : "This field is required"
    },

    "input_email"  : {
      "input" : document.getElementById("email-address"), 
      "span" : document.getElementById("email-address-error"), 
      "emptyMsg" : "This field is required",
      "invalidMsg" : "Please input a valid email address",
    },

    "input_query_types"  : {
      "input" : document.querySelectorAll("input[name='query-type']"), 
      "span" : document.getElementById("query-types-error"), 
      "emptyMsg" : "Please select a query type.", 
    },

    "textarea_message"  : {
      "input" : document.getElementById("message"), 
      "span" : document.getElementById("message-error"), 
      "emptyMsg" : "This field is required",
    },

    "input_consent"  : {
      "input" : document.getElementById("terms-and-service"), 
      "span" : document.getElementById("terms-and-service-error"), 
      "emptyMsg" : "To submit this form, please consent to being contacted",
    },

}

function isValidEmail(emailString)
{ 
    // Source? google.
    if (typeof emailString !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailString);
}

function isEmpty(string)
{
    return string.trim() === "";
}

function validate_form()
{
    let isFormValid = true;

    for (const key in fields_data)
    { 
        const input = fields_data[key]["input"];
        const error_span = fields_data[key]["span"];

        error_span.innerText = "";
        error_span.style.display = "none";

        // Checks if it is a list
        if (input instanceof NodeList)
        { 
            let hasSelected = false;

            for (const element of input)
            {
                if (element.checked)
                {
                    hasSelected = true;
                    break;
                }
            }

            if (!hasSelected)
            {
                error_span.innerText = fields_data[key]["emptyMsg"]; 
                error_span.style.display = "block";
                isFormValid = false;
            }
        }

        else if (input instanceof HTMLTextAreaElement && isEmpty(input.value))
        {
            error_span.innerText = fields_data[key]["emptyMsg"];
            error_span.style.display = "block";
            isFormValid = false;
        }

        // If input type is plain old text.
        else if (input.type == "text" && isEmpty(input.value))
        {
            error_span.innerText = fields_data[key]["emptyMsg"];
            error_span.style.display = "block";
            isFormValid = false;
        }

        else if (input.type == "email")
        {
            if (isEmpty(input.value))
            {
                fields_data[key]["span"].innerText = fields_data[key]["emptyMsg"];
                error_span.style.display = "block";
                isFormValid = false;
            }

            else if (!isValidEmail(input.value))
            {
                fields_data[key]["span"].innerText = fields_data[key]["invalidMsg"];
                error_span.style.display = "block";
                isFormValid = false;
            }
        }

        else if (input.type == "checkbox")
        {
            if (!input.checked)
            {
                error_span.innerText = fields_data[key]["emptyMsg"];
                error_span.style.display = "block";
                isFormValid = false;
            }
        }
    }

    return isFormValid;
}

  // Our form
const contact_form = document.querySelector(".contact-form");

contact_form.addEventListener("submit", function(event) {
    if (!validate_form())
    {
        console.log("incorrect hmm..\n");
        event.preventDefault();
    }
});