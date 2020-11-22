function get_cart_item() {
    item_obj_arr = []
    data_name_node = null
    activeCartViewForm_node = document.getElementById("activeCartViewForm")
    for (let i = 0; i < activeCartViewForm_node.length; i++){
        child = activeCartViewForm_node.children[i]
        if (child.hasAttribute("data-name")){
            if (child.getAttribute("data-name") == "Active Items"){
                data_name_node = child
                break
            }
        }
    }
    try{
        for (let i = 0; i < activeCartViewForm_node.length; i++){
            child = data_name_node.children[i]
            if (child.hasAttribute("data-asin")){
                date = new Date
                item_obj_arr.push(new Cart_item_obj(
                    child.getAttribute("data-asin"),
                    date.getTIme(),
                    child.getAttribute("data-price")
                ))
            }
        }
    } catch(ERROR) {}

    console.log("cscs")
    chrome.storage.local.get(["CartItem"], function(ret){
        for (let i = 0; i < ret.CartItem.length; i++){
            item_storage = ret.CartItem[i]
            console.log(item_obj_arr.length)
            for (let q = 0; q < item_obj_arr.length; q++){
                item_local = item_obj_arr[q]
                if (item_storage.item_url.search(item_local.item_url) > -1){
                    console.log((item_local.time.getTime()-item_storage.time.getTIme())/1000)
                }
            }
        }
    })
}

function Cart_item_obj(item_url, time, price){
    this.item_url = item_url;
    this.time = time;
    this.price = price;
}

main()


function main() {
    cart_url = "https://www.amazon.ca/gp/cart/view.html?ref_=nav_cart"
    url = document.URL.slice(0, cart_url.length)
    if (url == cart_url){
        get_cart_item()
    }
}