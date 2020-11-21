function Pet(){
    this.level = 0
    this.points = 0
    this.required_points = 25 * (this.level + 1)
    this.branch = undefined
    this.img = "res/init.png"
    this.types = ["Cat", "Dog", "Rabbit", "Panda"]

    function rand_branch(){
        var date = new Date()
        rand_seed = Math.floor((date.getMilliseconds / 100)/2.5)
        this.branch = rand_seed
        this.change_ing()
    }

    function change_ing(){
        img_str = ""
        this.img = img_str.concat("res/", this.types[this.branch], ".png")
    }

    function add_points(p){
        if (this.level == "MAX"){
            return
        }
        this.points += p
        if (this.points >= this.required_points) {
            this.points -= this.required_points
            this.level ++
            this.change_ing()
            if (this.level == 2){
                this.level = "MAX"
                return
            }
            else if (this.level == 1){
                this.rand_branch()
            }
            this.required_points = 25 * (this.level + 1)
        }
    }
}