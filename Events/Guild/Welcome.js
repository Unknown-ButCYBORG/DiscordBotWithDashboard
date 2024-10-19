const { Client, GuildMember, EmbedBuilder } = require('discord.js')
const DB =require('../../Structures/Schemas/Welcome')
const EditReply = require('../../Systems/EditReply')


module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     * @param {Client} client 
     */
    async execute(member , client) {
        const { user, guild } = member
        const Data = await DB.findOne({ Guild: guild.id}).catch(err => { })
        if(!Data) return
        const Message = `Hey ${user}, Welcome To **${guild.name}**`
        if(Data.Channel !== null) {
            const Channel = guild.channels.cache.get(Data.Channel)
            if(!Channel) return
            const Embed = new EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({name: user.tag, iconURL: userAvatar })
            .setDescription(`Welcome ${member} To The Server!\n\nAccount Created At <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMember Count: \`${guild.memberCount}\``)
            .setThumbnail(userAvatar)
            .setFooter({ text: "Welcome by Cyborg"})
            .setTimestamp()
            Channel.send({ content: `${Message}`, embeds: [Embed]})
        }

    
    }
}