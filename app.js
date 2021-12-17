require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}+`)
});

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + "-" + data[0]["a"]
    })
}
const word = "pls"; 
// When a discord user types message
client.on("message", (msg) => {
    let tempword = msg.content; 
    if(tempword.slice(0,3)==word){
        msg.reply("You just wrote pls here "); 
    }
  if (msg.author.bot) return
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
  if (msg.content === "ping") {
    msg.reply("pong");
    
    msg.react("❤️");
  }

  if(msg.content.slice(0,6) === "delete"){
    if (!msg.member.roles.cache.some(r=>["Admin", "Moderators", "Moderator", "CR"].includes(r.name)) ) {
        return;
      }
      const string = msg.content.slice(7, msg.content.length)
      const number = parseInt(string);
      if(number>100) {
          msg.reply("Per 100 items are allowed at once")
          return
      }
      console.log(string, number);
    setTimeout(() => {
     
        msg.channel.bulkDelete(number)
    }, 1000 );
  }
})


client.login(process.env.TOKEN); 