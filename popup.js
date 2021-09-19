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
                var myUrl = "https://www.kayak.com/travel-restrictions/" + (nation.toLowerCase()).replace(/ /g, "-");
                anchor.href = myUrl;
                node.appendChild(anchor);
                //chrome.runtime.sendMessage({"message": "scrape_kayak", "keyword": nation});
                
                var xhr = new XMLHttpRequest();
                xhr.open("GET", myUrl, true);
                xhr.responseType = "document";
                xhr.onload = function() {
                    if(xhr.readyState == 4 && xhr.status == 200)
                    {
    
                        var response = xhr.responseXML.querySelectorAll("span.x5cZ");
                        nation = nation + ' - ' + response[0].textContent.toUpperCase();
                        anchor.appendChild(document.createTextNode(nation));
                        myList.appendChild(node); 
                    }
                }
    
                xhr.onerror = function() {
                    console.error(xhr.status, xhr.statusText);
                }
    
                xhr.send();
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
