const schema  = require('../../../Structures/Schemas/Welcome')
const {ChannelType} = require('discord.js')
let DBD = require('discord-dashboard')

const Wsys = {
    categoryId: "welcomesys",
    categoryName: "Welcome System",
    categoryDescription: "Set Welcome Channel",

     async getActualSet({ guild })  {
        let data = await schema.findOne({ Guild: guild.id })
         return [
            {optionId: 'setchannelchannel', data: data?.Channel || null }
         ]
    },
    async setNew({ guild, data})  {
        for(const option of data) {
            if (option.optionId === 'setchannelchannel') {
                schema.findOneAndUpdate({ Guild: guild.id}, {Channel: option.data}, {upsert: true}).exec()
            }
        }
        return
    },
    categoryOptionsList: [
        {
            optionId: 'setchannelchannel',
            optionName: 'Welcome System',
            optionDescription: 'Select Welcome Channel for your server',
            optionType: DBD.formTypes.channelsSelect(false, channelType = [ChannelType.GuildText])
        }
    ]
}

module.exports = Wsys