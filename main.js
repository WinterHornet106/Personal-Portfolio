
document.addEventListener('DOMContentLoaded', function(){
  
  const y = new Date().getFullYear();
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = y;
  const yEl2 = document.getElementById('year2');
  if(yEl2) yEl2.textContent = y;

  
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        alert('Please fill in name, email, and message before sending.');
        return;
      }
    });
  }
});
