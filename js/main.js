const contactForm = document.getElementById("contact-form");
const message = document.querySelector(".message");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    formData.append("access_key", "f59013d0-ed9c-4a39-9ef6-ed8d651bb63e");

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data.success) {
            message.textContent = data.message || "Form submitted successfully!";
            message.classList.remove("error");
            message.classList.add("success");
            console.log(data.message);
        } else {
            message.textContent = "Oops! Something went wrong. Please try again later.";
            message.classList.remove("success");
            message.classList.add("error");
            console.log(data.message);
        }
    })
    .catch(error => {
        message.textContent = "Oops! Something went wrong. Please try again later.";
        message.classList.remove("success");
        message.classList.add("error");
        console.log(error.message);
    });
});