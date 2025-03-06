
function sendMail(){
    if (event) {
      event.preventDefault();
    }

    let params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        subject: document.getElementById('subject').value,
    }
    console.log(params);

    if (!validateParams(params)) {
        alert("Please fill out all fields before sending the message.");
        return;
      }

    $('#spinner').addClass('show');


    emailjs.send('service_rpu8nv5', 'template_071fksq', params).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          $('#successModal').css('display', 'block');
        },
        (error) => {
          console.log('FAILED...', error);
          $('#errorModal').css('display', 'block');
        },
      ).finally(() => {
        const form = document.getElementById('contact-form');
        form.reset();
        $('#spinner').removeClass('show');
      });


}

function validateParams(params) {
    for (const key in params) {
      if (!params[key] || params[key].trim() === '') {
        return false; 
      }
    }
    return true;
  }

// Close modals when the close button is clicked
document.querySelectorAll('.close').forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    closeButton.closest('.modal').style.display = 'none';
  });
});

// Close modals when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});