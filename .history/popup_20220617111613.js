let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgoundColor into current page
changeColor.addEventListener("click", async () => {
 let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

 chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setPageBackgroundColor,
 });

 // The body of this function will be executed as a content script inside the current page
 function setPageBackgoundColor(){
    chrome.storage.sync.sync.get("color", ()=>{
        document.body.style.backgroundColor = color;
    })
 }
});