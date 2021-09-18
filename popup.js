chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getCount"}, function(count) {
        document.getElementById("myText").innerHTML = count;
    });
});


document.addEventListener('DOMContentLoaded', function(){
    var changeFontButton = document.getElementById('changeFont');
    changeFontButton.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, {
                file: 'inject.js'
            });
            chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://www.kayak.com/travel-restrictions"});
        });
    }, false);
}, false);
