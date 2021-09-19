var obj;
fetch('countryName2.json')
    .then(response => response.json())
    .then(data => {
            obj = data;
            //console.log(myData);
            chrome.contextMenus.onClicked.addListener(function (params, tab) {
            for (var i = 0; i < obj.length; i++){
                if (obj[i].name == params.selectionText){
                    chrome.tabs.create({url: 'https://www.kayak.com/travel-restrictions?&origin=' + obj[i].countryCode});
                }
            }
        });
        }
    )
    .catch(error => console.log(error));

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "open_new_tab") {
            chrome.tabs.create({"url": request.url});
        }
    }
);
chrome.contextMenus.create({
    id: "",
    title: 'Using TravelToday searching %s',
    contexts: ['selection'],
});


