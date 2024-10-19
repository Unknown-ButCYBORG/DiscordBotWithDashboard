const { Client} = require('discord.js')
require('dotenv').config()
const DBD = require("discord-dashboard")
const SoftUI = require('dbd-soft-ui')
const licenseId = process.env.licenseId
const wsystem = require('./Systems/welcome')
const DBDLisences = process.env.licenseId
const CI = process.env.CLIENT_ID
const CS = process.env.CLIENT_SECRET


module.exports = {
  name: "ready",

  /** 
  @param {Client} client
  */
  async execute(client) {
    let Informations = []
    let Moderation = []
    const Handler = new DBD.Handler();
    const info = client.commands.filter(x => x.category === "Informations")
    const mod = client.commands.filter(x => x.category === "Moderation")
    CommandPush(info, Informations)
    CommandPush(mod, Moderation)

    await DBD.useLicense(DBDLisences)
    DBD.Dashboard = DBD.UpdatedClass()
    const Dashboard = new DBD.Dashboard({

      port: process.env.PORT,
      client: { id: CI, secret: CS},
      redirectUri: `http://localhost:8000/discord/callback`,
      domain: "http://localhost/",
      ownerIDs: process.env.OWNER_ID,
      useThemeMaintenance: true,
      useTheme404: true,
      bot: client,
      acceptPrivacyPolicy: true,
      useCategorySet: true,



      theme: SoftUI({
        storage: Handler,
        footer: {
          replaceDefault: true,
          text: "Bot developed by CYBORG"
        },

        customThemeOptions: {
          index: async ({ req, res, config }) => {
            return {
              values: [],
              graph: {}, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
              cards: [],
            }
          }
        },


        websiteName: "GamingZone Community",
        colorScheme: "blue",
        supporteMail: "your mail",
        icons: {
          // you can edit the links 
          favicon: "https://cdn.discordapp.com/attachments/1186437167375994901/1187768565898674217/minilogo.png?ex=659816ad&is=6585a1ad&hm=f330de0e1b521b5ced05d41cae8e00d8d2b691bdef35f80bb059790f8509701a&",
          noGuildIcon: "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
          sidebar: {
            darkUrl: "https://assistantscenter.com/api/user/avatar/63ad65e2d3f1b1b3acdff794",
            lightUrl: "https://assistantscenter.com/api/user/avatar/63ad65e2d3f1b1b3acdff794",
            hideName: true,
            borderRadius: false,
            alignCenter: true,
          },
        },
        index: {
          graph: {
            enabled: false,
            lineGraph: false,
            tag: 'Memory (MB)',
            max: 100
          },
        },
        sweetalert: {
          errors: {},
          success: {
            login: "Successfully logged in.",
          }
        },
        preloader: {
          image: "/img/soft-ui.webp",
          spinner: true,
          text: "Page is loading",
        },
        admin: {
          pterodactyl: {
            enabled: false,
            apiKey: "apiKey",
            panelLink: "https://panel.website.com",
            serverUUIDs: []
          }
        },
        commands: [
          {
            category: "Information",
            subTitle: "subTitle",
            categoryId: "information-cate", // No spaces or special characters

            hideAlias: true, // Optional - Default: false - Hides the alias from all commands in the category
            hideDescription: false, // Optional - Default: false - Hides the description from all commands in the category
            hideSidebarItem: false, // Optional - Default: false - Hides the category from the sidebar
            list: [
              {
                commandName: "ping",
                commandUsage: "/ping",
                commandDescription: "Displays the bot ping",
                commandAlias: "alias"
              },
              {
                commandName: "avatar",
                commandUsage: "/avatar",
                commandDescription: "Displays the user avatar",
                commandAlias: "alias"
              },
              {
                commandName: "userinfo",
                commandUsage: "/user",
                commandDescription: "Displays the user info",
                commandAlias: "alias"
              },
            ]
          },
          {
            category: "Moderation",
            subTitle: "subTitle",
            categoryId: "moderation-cate", // No spaces or special characters

            hideAlias: true, // Optional - Default: false - Hides the alias from all commands in the category
            hideDescription: false, // Optional - Default: false - Hides the description from all commands in the category
            hideSidebarItem: false, // Optional - Default: false - Hides the category from the sidebar
            list: [
              {
                commandName: "ban",
                commandUsage: "/ban",
                commandDescription: "Bans a user from the server",
                commandAlias: "alias"
              },
              {
                commandName: "kick",
                commandUsage: "/kick",
                commandDescription: "Kicks a user from the server",
                commandAlias: "alias"
              },
              {
                commandName: "verification",
                commandUsage: "/cverificaiton",
                commandDescription: "Setup Verification System",
                commandAlias: "alias"
              },
            ]
          }
        ],
      }),
      settings: [
        wsystem,
      ],
    });
    Dashboard.init();
  }
}



function CommandPush(filteredArray, CategoryArray) {
  filteredArray.forEach(obj => {
    let cmdObject = {
      commandName: obj.name,
      commandUsage: "/" + obj.name,
      commandDescription: obj.description,
      commandAlias: "None"
    }
    CategoryArray.push(cmdObject)
  })
}