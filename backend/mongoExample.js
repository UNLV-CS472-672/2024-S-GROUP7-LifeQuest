const mongoose=require("mongoose")
const User = require("./server/models/user")

mongoose.connect("mongodb+srv://LifeQuestDev:triangleDev@lifequest.1aoc4no.mongodb.net/?retryWrites=true&w=majority&appName=LifeQuest")
.then(() => {
    console.log("Connected!");
})
.catch(() => {
    console.log("Connection Failed!");
})

run()
async function run(){
    const user = new User({username:"fern",password:"test"})
    await user.save()
    console.log(user)
}

