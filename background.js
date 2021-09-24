const validEmail = (email)  => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
     {
       return true
     }
       return false
   }

function onError(e) {
    alert("error: " + JSON.stringify(e))
  }

  function onLoad(e) {
    alert("success" + JSON.stringify(e))
  }

  async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch("https://readittome-admin.herokuapp.com/api/articles", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }



chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(['email'], function(result) {
        if(validEmail(result.email)) {
            postData({
                article: {
                    email: result.email,
                    url: tab.url,
                    send: false
                }
            })
            .then(data => {
                alert("Success!!!"); // JSON data parsed by `data.json()` call
            })
            .catch((error) => {
                alert("error" + error);
              })
        } else {       
            chrome.browserAction.setPopup({
                popup: "popup.html"
            }); 
        }
    });
 });

 chrome.storage.local.get(['email'], function(result) {
    if(validEmail(result.email)) {
        alert(JSON.stringify({
            email: result.email
        }))
    } else {       
        chrome.browserAction.setPopup({
            popup: "popup.html"
        }); 
    }
});