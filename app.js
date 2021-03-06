const validEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
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

document.querySelector('#submit').addEventListener('click', () => {
    let email = $('#email').val()
    if (validEmail(email)) {
        chrome.storage.local.set({
            email: email
        });
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            var activeTab = tabs[0];
            var activeTabUrl = activeTab.url; // or do whatever you need

            postData({
                    article: {
                        email: email,
                        url: activeTabUrl,
                        send: false
                    }
                })
                .then(data => {})
                .catch((error) => {})
        });
        setTimeout(function() {
            $('#contactForm').fadeOut();
        }, 100);
        setTimeout(function() {
            $('.success').fadeIn();
        }, 500);
        setTimeout(function() {
            chrome.browserAction.setPopup({
                popup: "confirmation.html"
            });
        }, 1000);
    } else {
        $('.invalid-feedback').show();
    }
});