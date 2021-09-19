var myData;

fetch('countryName.json')
  .then(response => response.json())
  .then(data => {
      myData = data;
      //console.log(myData);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getCount", myQuery: myData}, function(count) 
        {
            var count = count.split(",")
            var myList = document.getElementById("nationsList");
            count.forEach(function(nation)
            {
                var node = document.createElement('li');
                var anchor = document.createElement("a");
                nation = nation.replace(/[^a-zA-Z ]/g,"")
                anchor.href = "https://www.kayak.com/travel-restrictions/" + (nation.toLowerCase()).replace(/ /g, "-");
                node.appendChild(anchor);
                anchor.appendChild(document.createTextNode(nation));
                myList.appendChild(node); 
            })
        });
    });
    }
  )
  .catch(error => console.log(error));

document.addEventListener('DOMContentLoaded', function(){
    var changeFontButton = document.getElementById('changeFont');
    changeFontButton.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            /*var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, {
                file: 'inject.js'
            });*/
            chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://www.kayak.com/travel-restrictions"});
        });
    }, false);
}, false);
