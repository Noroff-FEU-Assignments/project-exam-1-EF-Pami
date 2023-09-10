

const form = document.getElementsByClassName('contact-form');
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");



function checkInputs() {
    console.log(checkInputs)
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const subjectValue = subject.value.trim();
	const messageValue = message.value.trim();
	
	if(usernameValue.length <= 6) {
		setErrorFor(username, 'Username must be more than 5 characters');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(subjectValue.length <= 16) {
		setErrorFor(subject, 'subject must be more than 15 characters');
	} else {
		setSuccessFor(subject);
	}
	
	if(messageValue.length <= 26) {
		setErrorFor(message, 'subject must be more than 25 characters');
	
	} else{
		setSuccessFor(message);
	}
}

document.getElementById("contact-form")
.addEventListener("submit", function(event) {
	event.preventDefault();
	
	checkInputs();
});

function setErrorFor(input, message) {
	const formbox = input.parentElement;
	const small = formbox.querySelector('small');
	formbox.className = 'form-box error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formbox = input.parentElement;
	formbox.className = 'form-box success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

