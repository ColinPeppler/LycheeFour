/*-------------------------------------Func---------------------------------------------*/

async function getValueFromStorage(key, callback) {
	chrome.storage.local.get([key], res => {
		callback(res)
	})
}

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
function Cart_item_obj(item_url, time, price){
    this.time = time;
    this.price = price;
    this.item_url = item_url
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
        update_cart_storage(new Cart_item_obj(url, begin_time.getTime(), begin_price))
    } catch(ERROR){
        console.log(ERROR)
    }
}

function buy_btn_no(callback){
    const priceStr = document.getElementById("price_inside_buybox")
			.innerText.slice(1).replace(',', '').split('.')[0]
		const price = parseInt(priceStr)	
    chrome.storage.local.get(["Saved_money"], function(ret){
				let savedMoney = ret.Saved_money
				change_point(Math.round(price) * 0.1, callback)
        savedMoney += price
        chrome.storage.local.set({Saved_money: savedMoney}, function() {})
				callback();
    })  
}

function change_point(point, callback){
		point = Math.floor(point);
    chrome.storage.local.get(["Point"], function(ret){
        let loc_point = parseInt(ret.Point)
        loc_point += point
        chrome.storage.local.set({Point: loc_point}, function() {
					callback()
        })
    })    
}


/*-------------------------------------Init---------------------------------------------*/

// Init function
async function initStorage(callback){
    chrome.storage.local.set({
        Point: 0,
        Saved_money: 0,
        CartItem: [],
				My_Pet: new Pet()
    },  function(){
        console.log("Init success")
				callback();
    });
}

async function init(callback) {
	// Checks if this plugin have ben init before
	chrome.storage.local.get(["Point"], function(ret) {
			if (Object.keys(ret).length === 0){
					initStorage(callback)
			}
	})

	if (chrome.runtime.lastError)
		initStorage(callback);
}


/*-------------------------------------Main---------------------------------------------*/
main()
function main() {
	add_to_cart()
}
