function is_double() {
    console.log("double tap")
    chrome.storage.local.get(["double_t"], function(ret){
        temp = ret.double_t
        contain_flag = false
        time = new Date
        storage_stuct = {url: document.URL, time: time.getTime()}
        console.log(storage_stuct, " ", temp)
        for (let i = 0; i < temp.length; i++){
            if ((storage_stuct.time - temp[i].time)/1000 >= 20/* 3600 */){
                delete temp[i]
                continue
            }
            try{
                if (storage_stuct.url == temp[i].url){
                    alert("Double tap")
                    contain_flag = true
                    console.log("Flag true")
                }
            } catch(ERROR){
                continue
            }
            
        }
        if (!contain_flag) {
            temp.push(storage_stuct)
        }
    
        chrome.storage.local.set({double_t: temp}, function() {
        })
    })
}

