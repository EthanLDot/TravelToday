chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    console.log(response)
    alert(response);
    chrome.runtime.sendMessage({
        msg: "something_completed", 
        data: {
            subject: "Loading",
            content: "Just completed!"
        }
    });
});
