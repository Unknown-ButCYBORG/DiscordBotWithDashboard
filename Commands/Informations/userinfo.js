const { Client, ChatInputCommandInteraction, User, EmbedBuilder, GuildMember, Message } = require("discord.js")

module.exports = {
    name: "user",
    description: "Displays User Info",
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
            
            .setThumbnail(member.displayAvatarURL())
            .setAuthor({
                name: member.user.tag,
                iconURL: member.displayAvatarURL(),
            })
            .addFields(
                {
                    name: "Account Created At",
                    value: `${member.user.createdAt.toLocaleString()}`,
                    inline: true,
                },
                {
                    name: "Joined Created At",
                    value: `${interaction.guild.joinedAt.toLocaleString()}`,
                    inline: true,
                },
                {
                    name: "User ID",
                    value: `${member.user.id}`,
                    inline: true,
                },
                {
                    name: "User Tag",
                    value: `${member.user.tag}`,
                    inline: true,
                },
                {
                    name: "Username",
                    value: `${member.user.username}`,
                    inline: true,
                },
                {
                    name: "Is The User A Bot",
                    value: `${member.user.bot}`,
                    inline: true,
            },
            )
            .setFooter({ text: "UserInfo By Cyborg"})
            return interaction.editReply({embeds: [Embed]})
    
    }
}