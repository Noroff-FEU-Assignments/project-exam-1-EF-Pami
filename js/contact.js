
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementsByClassName("contact-form");
    const responseDiv = document.getElementById("response");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form input values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        //const subject = document.getElementById("subject").value;
        //const message = document.getElementById("message").value;

        // Simple email validation
        //const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (!email.value.match(/^[A-Za-z\._\-0-9]+[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
            responseDiv.innerText = "Invalid email address.";
            responseDiv.style.color = "red";
            return;
        }

        // Form is valid, you can send the data to a server here
        // For this example, we'll just display a success message
        responseDiv.innerText = `Thank you, ${name}! Your message has been sent.`;
        responseDiv.style.color = "green";

        // Clear the form
        contactForm.reset();
    });
});
