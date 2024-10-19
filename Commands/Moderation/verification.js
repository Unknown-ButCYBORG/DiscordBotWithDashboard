const { Client, ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const Reply = require("../../Systems/Reply")
const DB = require('../../Structures/Schemas/Verification')

const EditReply = require("../../Systems/EditReply")


module.exports = {
  name: "verification",
  description: "Verification System",
  UserPerms: ["ManageGuild"],
  category: "Moderation",
  options: [
    {
      name: "role",
      description: "Select Verified Members Role",
      type: 8,
      required: true
    },
    {
      name: 'channel',
      description: "Select The Channel Where The System Will Be Sent",
      type: 7,
      required: false,
    }
  ],
  /** 
  @param {Client} client
  @param {ChatInputCommandInteraction} interaction
  */
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true })
    const { options, guild, channel } = interaction
    const role = options.getRole("role")
    const Channel = options.getChannel("channel") || channel
    let Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
    if (!Data) {
      Data = new DB({
        Guild: guild.id,
        Role: role.id
      })
      await Data.save()
    } else {
      Data.Role = role.id
      await Data.save()
    }
    Channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Aqua")
          .setTitle("Verification")
          .setDescription("Click The Button To Be Verified")
          .setTimestamp(),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("verify")
            .setLabel("Verify")
            .setStyle(ButtonStyle.Secondary)
        )
      ]
    })
    return EditReply(interaction, `Successfully Send Verification To The ${Channel}`)
  }
}