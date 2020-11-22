function Pet(){
    this.level = 0
    this.exp = 0
    this.branch = "Default"
}

function rand_branch(){
    chrome.storage.local.get(["My_Pet"], function(ret){
        pet_struct = ret.My_Pet

        types = ["Cat", "Dog", "Rabbit", "Panda"]
        var date = new Date()
        rand_seed = Math.floor((date.getMilliseconds() / 100)/2.5)
        pet_struct.branch = types[rand_seed]
        chrome.storage.local.set({My_Pet: pet_struct}, function() {
        })
        console.log(ret)
    })
    
}


// feed pet
async function add_points(p, callback){
    chrome.storage.local.get(["My_Pet", "Point"], function(ret){
				point = ret.Point
        pet_struct = ret.My_Pet
        if (pet_struct.level == 2 || point < p){
            return
        }
        level_arr = [50, 100, 150]
        pet_struct.exp += p
        if (pet_struct.exp >= level_arr[pet_struct.level]){
            pet_struct.level++
        }
        console.log(pet_struct)
        chrome.storage.local.set({My_Pet: pet_struct}, function() {
            if (pet_struct.level == 1 && pet_struct.branch == 'Default'){
                rand_branch()
            }
        })
				change_point(-1 * p, callback)
    })

}

function get_petName(callback){
    chrome.storage.local.get(["My_Pet"], function(ret){
        pet_struct = ret.My_Pet
        var str = ""
        str = pet_struct.branch + Number(pet_struct.level)
        
        console.log(str)
        console.log('before')
				callback(str)
    })
}
