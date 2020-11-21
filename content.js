/*-------------------------------------Func---------------------------------------------*/


// Update Cart in storage
function update_cart_storage(item) {
    chrome.storage.local.get(["CartItem"], function(ret){
        // Get the local version
        temp_arr = ret.CartItem
        // Append the item we want to add
        temp_arr.push(item)
        //  Save it back
        chrome.storage.local.set({CartItem: temp_arr}, function(){})
    })
    
}

// Cart class
function Cart_item_obj(item_url, begin_time, begin_price){
    this.begin_time = begin_time;
    this.begin_price = begin_price;

    // Process the url, and slice out the id
    var left_idx = item_url.indexOf("/dp/")+4
    var right_idx = item_url.indexOf("?ref")
    this.item_id = item_url.slice(left_idx, right_idx)
}

// WHen ever user press the "add to cart button"
function add_to_cart(){
    try {
        // Get the price, time, and url
        var begin_price = document.getElementById("price_inside_buybox").innerText
        var begin_time = new Date
        // Url contains the item's id
        var url = document.URL
        
        // Create the object, and send it to update function
        update_cart_storage(new Cart_item_obj(url, begin_time, begin_price))
    } catch(ERROR){
        console.log(ERROR)
    }
}

function buy_btn_no(){
    price = parseFloat(document.getElementById("price_inside_buybox").innerText.slice(4))
    chrome.storage.local.get(["Saved_money"], function(ret){
        price += parseFloat(ret.Saved_money)
        change_point(Math.round(money) * 0.1)
        chrome.storage.local.set({Saved_money: price}, function() {})
    })  
}

function change_point(point){
    chrome.storage.local.get(["Point"], function(ret){
        loc_point = parseInt(ret.Point)
        loc_point += point
        console.log(loc_point, "ChangedPoint")
        chrome.storage.local.set({Point: loc_point}, function() {
        })
    })    

}


/*-------------------------------------Init---------------------------------------------*/

// Init function
function init(){
    chrome.storage.local.set({
        Point: 0,
        Saved_money: 0,
        CartItem: []
    },  function(){
        console.log("Init success")
    });
}

// Checks if this plugin have ben init before
try{
    chrome.storage.local.get(["Point"], function() {})
} catch(ERROR) {
    // If never init, it will throw an error, and when catched, run init()
    console.log(ERROR)
    init()
} finally {
    // Everyting is asynic so wait for 1 second after the init()
    setTimeout(function(){main()}, 1000)
}



/*-------------------------------------Main---------------------------------------------*/

function main() {
}
