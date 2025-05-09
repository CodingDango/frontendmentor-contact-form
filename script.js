const fields_data = [

    {
        "input" : document.getElementById("first-name"), 
        "span" : document.getElementById("first-name-error"),
        "emptyMsg" : "This field is required"
    }, 

    {
      "input" : document.getElementById("last-name"), 
      "span" : document.getElementById("last-name-error"), 
      "emptyMsg" : "This field is required"
    },

    {
      "input" : document.getElementById("email-address"), 
      "span" : document.getElementById("email-address-error"), 
      "emptyMsg" : "This field is required",
      "invalidMsg" : "Please input a valid email address",
    },

    {
      "input" : document.querySelectorAll("input[name='query-type']"), 
      "span" : document.getElementById("query-types-error"), 
      "emptyMsg" : "Please select a query type.", 
    },

    {
      "input" : document.getElementById("message"), 
      "span" : document.getElementById("message-error"), 
      "emptyMsg" : "This field is required",
    },

    {
      "input" : document.getElementById("terms-and-service"), 
      "span" : document.getElementById("terms-and-service-error"), 
      "emptyMsg" : "To submit this form, please consent to being contacted",
    },
]

function getErrorClassString(input_elem)
{
    let error_class_str = "";

    if (input_elem instanceof HTMLTextAreaElement)
        error_class_str = "form-field__textarea--error";

    else if (input_elem.type == "text" || input_elem.type == "email")
        error_class_str = "form-field__input-text--error";
    
    else if (input_elem.type == "checkbox")
        error_class_str = "form-field__input-checkbox--error"; 
    
    else if (input_elem.type == "radio")
        error_class_str = "form-field__input-radio--error" ;

    else
        error_class_str = "form-field_input-element--error"; // Default to an error class

    return error_class_str;
}

function playSuccessAnimations()
{
    // Check if it already exists
    if (document.querySelector(".success-msg"))
        return;

    // Confetti
    confetti({
        particleCount: 100,
        angle: 270,
        spread: 180,
        origin: { y: -0.1 },
        startVelocity: 35
    });

    // Success message card
    let success_msg_card_html = `
    <aside class="success-msg">
      <span class="success-msg__head">
        <span class="success-msg__head-content">
          <img src="./assets/images/icon-success-check.svg">
          <p>Message Sent!</p>
        </span>
        <img class="success-msg__close" src="./assets/images/close.webp">
      </span>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
    </aside>`

    document.querySelector("main").insertAdjacentHTML("afterbegin", success_msg_card_html);

    document.querySelector("main")
    .querySelector(".success-msg__close")
    .addEventListener("click", function(){
        this.closest(".success-msg").remove();
    });
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

function showError(span, span_msg, input)
{
    if (span)
    {   
        if (span_msg)
            span.innerText = span_msg;
        else
            span.innerText = "This field is required.";
    
        span.style.display = "block";
    }
    
    if (input)
        input.classList.add(getErrorClassString(input));
}

function clearError(span, input)
{
    if (span)
    {
        span.innerText = "";
        span.style.display = "none";
    }

    if (input instanceof NodeList)
    {
        for (const elem of input)
        {   
            const error_class_str = getErrorClassString(elem);

            if (elem.classList.contains(error_class_str))
                elem.classList.remove(error_class_str);
        }
    }

    else if (input.classList.contains(getErrorClassString(input)))
        input.classList.remove(getErrorClassString(input));
}

function validateForm()
{
    let isFormValid = true;

    for (const field of fields_data)
    { 
        const input = field["input"];
        const error_span = field["span"];
        const empty_msg = field["emptyMsg"];
        const invalid_msg = field["invalidMsg"];

        clearError(error_span, input);

        if (!input || !error_span)
            return false;

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
                showError(error_span, empty_msg, null);
                isFormValid = false;
            }
        }

        else if (input instanceof HTMLTextAreaElement && isEmpty(input.value))
        {
            showError(error_span, empty_msg, input);
            isFormValid = false;
        }

        // If input type is plain old text.
        else if (input.type == "text" && isEmpty(input.value))
        {
            showError(error_span, empty_msg, input);
            isFormValid = false;
        }

        else if (input.type == "email")
        {
            if (isEmpty(input.value))
            {
                showError(error_span, empty_msg, input);
                isFormValid = false;
            }

            else if (!isValidEmail(input.value))
            {
                showError(error_span, invalid_msg, input);
                isFormValid = false;
            }
        }

        else if (input.type == "checkbox")
        {
            if (!input.checked)
            {
                showError(error_span, empty_msg, null);
                isFormValid = false;
            }
        }
    }

    return isFormValid;
}

  // Our form
const contact_form = document.querySelector(".contact-form");

contact_form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!validateForm())
    {
        event.preventDefault();
    }
    else
    {
        playSuccessAnimations();
    }
});

// playSuccessAnimations();