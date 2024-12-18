
const {Events} = require('../Validation/EventNames')

module.exports = async(client, PG, Ascii) => {
    const Table = new Ascii("Events Loaded")
    const EventsFiles = await PG(`${process.cwd()}/Events/*/*.js`)
    EventsFiles.map(async file => {
        const event = require(file)
        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/")
            await Table.addRow(`${event.name || "MISSING"}`, `Event Name Is Either Invalid Or Missing ${L[6]+ `/` + L[7]}`)
            return
        }
        if(event.once) client.once(event.name, (...args) => event.execute(...args, client))
        else client.on(event.name, (...args) => event.execute(...args, client))
        await Table.addRow(event.name, "SUCCESSFUL")
    })
    console.log(Table.toString())
}