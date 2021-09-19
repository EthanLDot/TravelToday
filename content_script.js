
const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')


function textCheck(myQuery)
{
    count = 0;
    for(let i = 0; i < text.length; i++)
    {
        //causes severe usability issues if the html replace happens too often, but i dont think we need to worry about that too much for now. Just don't use a high frequency term like 'a'
        if(text[i].innerHTML.includes(myQuery)){
            //console.log(text[i].innerHTML)
            //text[i].innerHTML = text[i].innerHTML.replaceAll(new RegExp(myQuery, "g"), "MEV1")
            count++;
        }
    }
    return count;
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getCount":
                worldData = [];
                message.myQuery.forEach(function(countryData) {
                    var result = textCheck(countryData.CountryName);
                    if(result > 0)
                    {
                        worldData.push(countryData.CountryName);   
                    }
                });
                sendResponse(JSON.stringify(worldData));
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);