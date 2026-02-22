/*scroll reveal animations*/
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.1 // trigger when 10% is visible
  }
);

reveals.forEach(el => observer.observe(el));


//hamburger menu
const sidebarCheck = document.getElementById('sidebar-active');
const linksContainer = document.querySelector('links-container')

sidebarCheck.addEventListener('change', () => {
    linksContainer.style.display = sidebarCheck.checked ? 'flex' : 'none'; 
});


//Nav bar when scrolled
const nameBar = document.getElementById('nameBar');
window.addEventListener('scroll', ()=> {
    if(window.scrollY > 40) {
        nameBar.classList.add('scrolled');
    } else {
        nameBar.classList.remove('scrolled');
    }
}) 

//Show more btn
const paragraphMore = document.getElementById('paragraphMore');
const showMoreBtn = document.getElementById('showMoreBtn');

showMoreBtn.addEventListener('click', () => {
    if(showMoreBtn.innerText === 'show more') {
        paragraphMore.style.display = 'block';
        showMoreBtn.innerText = 'show less';
    } else {
        paragraphMore.style.display = 'none';
        showMoreBtn.innerText = 'show more'
    }
})



/*Email function*/
function sendMail (){
    let parms = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    }

    return emailjs.send("service_9g5glp7","template_0u2qo3c",parms)
}



/*Contact form submit*/
const contactForm = document.getElementById('contactForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // disable button + feedback
    submitBtn.disabled = true;
    submitBtn.textContent = 'sending...';

    sendMail()
        .then(() => {
            contactForm.reset();
            submitBtn.textContent = 'Sent!'
        })
        .catch(() => {
            submitBtn.textContent = 'Something went wrong. Please try again.'
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            }, 2000)
        })
})