chrome.commands.onCommand.addListener((shortcut) => {
    if(shortcut.includes("+M")) {
        chrome.runtime.reload();
    }
})

const validEmail = (email)  => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return true
  }
    return false
}

document.querySelector('#submit').addEventListener('click', () => {
    let email = $('#email').val()
    if(validEmail(email)) {
        chrome.storage.local.set({email: email});

          $('.form-message-warning').hide();
          setTimeout(function(){
             $('#contactForm').fadeOut();
         }, 100);
          setTimeout(function(){
             $('.form-message-success').fadeIn();   
         }, 500);
         setTimeout(function(){
            chrome.browserAction.setPopup({
                popup: ""
            }); 
        }, 1000);
    } else {       
        $('.invalid-feedback').show();
    }
});