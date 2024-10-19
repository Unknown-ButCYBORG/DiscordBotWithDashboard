const { Client, ChatInputCommandInteraction, User, EmbedBuilder, GuildMember, Message } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Displays A user Avatar",
    category: "Informations",
    options: [
        {
            name: "user",
            description: "Select A User",
            type: 6,
            required: true
        },
    ],
    /** 
    @param {Client} client
    @param {Message} message
    @param {GuildMember} member
    @param {ChatInputCommandInteraction} interaction
    */
    async execute(interaction,  client) {
        
        const { options, user, guild } = interaction
        await interaction.deferReply({ ephemeral: false})
        
        const member = options.getMember("user")
        
        const Embed = new EmbedBuilder()
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(`${member.displayAvatarURL()}`)
            .setTimestamp()
            return interaction.editReply({embeds: [Embed]})
    
    }
}