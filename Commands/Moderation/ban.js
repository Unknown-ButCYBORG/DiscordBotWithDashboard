const { Client, ChatInputCommandInteraction,  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,  ComponentType } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")
module.exports = {
    name: "ban",
    description: "Ban A Member From The Server",
    UserPerms: ["BanMembers"],
    BotPerms: ["BanMembers"],
    category: "Moderation",
    options: [
        {
            name: "user",
            description: "Select A User",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "Provide A Reason",
            type: 3,
            required: false
        }
    ],
    /** 
    @param {Client} client
    @param {ChatInputCommandInteraction} interaction
    */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })
        const { options, user, guild } = interaction
        const member = options.getMember("user")
        const reason = options.getString("reason") || "No Reason Given"

        if (member.id === user.id) return EditReply(interaction, "**You Can Not Ban Yourself!**")
        if (guild.ownerId === member.id) return EditReply(interaction, "**You Can Not Ban The Server Owner**")
        if (guild.members.me.roles.highest.position <= member.roles.highest.postion) return EditReply(interaction, "I Can Not Ban This Member")
        const Embed = new EmbedBuilder()
            .setColor("Blue")
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId("ban-yes")
                .setLabel("yes"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ban-no')
                .setLabel("No")
        )
        const Page = await interaction.editReply({
            embeds: [
                Embed.setDescription(`**Do You Really Want To Ban This Member**`)
            ],
            components: [row]
        })
        const col = await Page.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms("15s")
        })

        col.on("collect", i => {
            if (i.user.id !== user.id) return
            switch (i.customId) {
                case "ban-yes": {
                    member.ban({ reason })
                    interaction.editReply({
                        embeds: [
                            Embed.setDescription(`**${member} Has Been Banned For : ${reason}**`)
                        ], components: []
                    }) 
                    member.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Blue")
                                .setDescription(`**You've Been Banned From ${guild.name} For : ${reason}**`)
                        ]
                    }).catch(err => {
                        if (err.code !== 50007) return console.log(err)
                    })
                }
                    break;
                case "ban-no":
                    interaction.editReply({
                        embeds: [
                            Embed.setDescription(`**Ban Request Cancelled**`)
                        ], components: []
                    })
            
            break;
        }
    })
    col.on("end", (collected) => {
        if(collected.size > 0) return
        interaction.editReply({
            embeds: [
                Embed.setDescription(`**You Didn't Provide A Valid Response On Time**`)
            ], components: []
        })
    })
    }
}