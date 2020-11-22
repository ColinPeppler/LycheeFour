cart_url = "https://www.amazon.ca/gp/cart/view.html?ref_=nav_cart"
url = document.URL.slice(0, cart_url.length)
if (url == cart_url){
    chrome.storage.local.get(["CartItem"], function(ret){
        for (let i = 0; i < ret.CartItem.length; i++){
            temp = ret.CartItem[i]
            if (!temp.prizes){
                continue
            }
            
            current_time = new Date
            
            diff = (current_time.getTime() - temp.time) / 1000
            if (diff >= 604800){
                    alert ("It's been 7 days")
            }
            else{
                alert ("It's less than 7 days")
            }
        }
    }) 
}