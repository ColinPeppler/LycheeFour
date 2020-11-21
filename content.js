function init(){
    chrome.storage.local.set({init_flag: false, Point: 0},  function(){
        console.log("set success")

    });
}

try{
    chrome.storage.local.get(["init_flag"], function(res) {console.log(res)})
} catch(ERROR) {
    console.log(ERROR)
    init()
    setTimeout(function(){main()}, 1000)
}

function main() {
    try{
        category = document.getElementById("nav-subnav").getAttribute("data-category")
        if (category != "grocery"){
            document.getElementById("buy-now-button").onclick = function() {
                if (confirm("r u sure u wanna buy this?")) {
                    localStorage.Points--
                }
                else{
                    localStorage.Point++
                }
                console.log(localStorage.Points)
                
            }
        } 
        else {
            console.log("Grocery")
        }
    } catch(ERROR) {
        console.log(ERROR)
    }
}

