function init(){
    chrome.storage.sync.set({init_flag: false, Point: 0},  function(){
        console.log("set success")
    });
}

try{
    if (chrome.storage.sync.get("init_flag"), function(res) {
    console.log(res)
}); 
} catch(ERROR) {
    console.log(ERROR)
    init()
}


try{
    console.log("This is Lychess")
    category = document.getElementById("nav-subnav").getAttribute("data-category")
    if (category != "grocery"){
        console.log("None grocery")
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
