chrome.commands.onCommand.addListener((shortcut) => {
  if (shortcut.includes("+M")) {
      chrome.runtime.reload();
  }
})

const validEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
  }
  return false
}

chrome.storage.local.get(['email'], function(result) {
  if (validEmail(result.email)) {
      console.log("Logged")
  } else {
      chrome.browserAction.setPopup({
          popup: "popup.html"
      });
  }
});