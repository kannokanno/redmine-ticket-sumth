chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "vendor/jquery-1.11.2.min.js"}, function() {
        chrome.tabs.executeScript(null, {file: "main.js"}, function() {
            chrome.tabs.executeScript(null, { code: "sumth_run();"});
        });
    });
});
