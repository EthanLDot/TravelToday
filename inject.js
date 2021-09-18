var text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')

count = 0;
for(let i = 0; i < text.length; i++)
{
    //causes severe usability issues if the html replace happens too often, but i dont think we need to worry about that too much for now. Just don't use a high frequency term like 'a'
    if(text[i].innerHTML.includes('COVID')){
        //console.log(text[i].innerHTML)
        text[i].innerHTML = text[i].innerHTML.replace(/COVID/g, 'MEV1')
        count++;
    }
}

chrome.runtime.sendMessage('' + count)

/*var elems = document.body.getElementsByTagName("*");

for (const [key, value] of Object.entries(elems)) {
    var newFontSize = Math.floor(Math.random() * 40);
    value.style.fontSize = String(newFontSize) + 'px';
}*/
