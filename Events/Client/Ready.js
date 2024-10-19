const mongoose = require('mongoose')
const {Client} = require('discord.js')
const ms = require('ms')
const mongodbURL = process.env.MONGOURL

module.exports = {
    name: "ready",
    /**
     * @param {Client} Client
     */
    async execute(client) {
        const { user, ws } = client
        console.log(`${user.tag} Is Ready To Roll`)

        setInterval(() => {
           const ping = ws.ping
           user.setActivity({
            name: `Ping: ${ping} ms`,
           }) 
        }, ms("5s"));
        if(!mongodbURL) return
        mongoose.connect(mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected To The DataBase')
        }).catch(err => console.log(err))
    }
}