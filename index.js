
const Discord = require('discord.js');
const bot = new Discord.Client()
const figlet = require('figlet');
const sleep = require('system-sleep');
const colors = require('colors');
const discordtools = require('discordtools');

const {prefix, token, owner} = require('./config.json');

bot.login(token);



bot.on('ready', () => {
    console.log("");
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);
    
    if (command === "pub") {
      if(owner.includes(message.author.id) == true){
        let arg1 = args[0]
        let arg2 = args.slice(1).join(' ');
      if(!arg1){
        message.channel.send("Erreur **!**: Veuillez insérer un argument (msg/embed)");

      } else {

        if(arg1 === "msg"){
          if (arg2.length > 0){
            console.log("**Informations publicité**" + `: \n ${bot.guilds.cache.size} serveurs \n Total de message:  ${bot.users.cache.size} \n Message : ${arg2}`);
            message.react('🆗');
            let serveurliste = bot.guilds.cache.map(m => `\n> - ${m.name} - **${m.memberCount}** membres`);
            message.channel.send(`**SaphirBot** \nLa publicité est envoyé sur les serveurs suivant  : \n ${serveurliste}`);
            let fait = 0
            bot.users.cache.array().forEach(member => {
              if (member.bot) { //Verification bot ou user
                console.log(`Passe le tour du bot ${member.username}`)
                fait++;
              } else { //ducoup je dm un membre
				let timeout = Math.floor((Math.random() * (1 - 0.01)) * 100) + 10;
				sleep(timeout);
                fait++;
                member.send(arg2).catch(e => {});
                console.log(`• ${fait}/ ${bot.users.size} | message envoyé à ${member.username}`);
              if(fait == bot.users.cache.size){
                console.log(`Publicité terminé, veuillez patienter 2-3 minutes avant de fermer la console`);
                message.channel.send(`Publicité terminé ✅`);
                }
              }
              if(fait == bot.users.cache.size/2){
                message.channel.send(`Publicité en cours | fait/bot.users.size`);
              }
            });
          }
          if (arg2.length == 0) return message.channel.send("Erreur **!**: Veuillez insérer un message.");;
        }

        if(arg1 === "embed"){
		  let arg3 = args.slice(1).join(' ');
          console.log(`Informations publicité` + `: \n ${bot.guilds.cache.size} serveurs \n Total de message:  ${bot.users.cache.size} `);
          let serveurliste = bot.guilds.cache.map(m => `\n> - ${m.name} - **${m.memberCount}** membres`);
          message.channel.send(`**Publicité** \nLa publicité est envoyé sur les serveurs suivant  : \n ${serveurliste}`);
          let fait = 0
          bot.users.cache.array().forEach(member => {

            let embeda = JSON.parse(arg3);
            if (member.bot) { //Verification bot ou user
                      console.log(`Passe le tour du bot ${member.username}`)
            fait++;
            } else { //ducoup je dm un joueur
            fait++;
            let timeout = Math.floor((Math.random() * (1 - 0.01)) * 100) + 10;
			sleep(timeout);  
            member.send({embed: embeda}).catch(e => {});
            console.log(`• ${fait}/ ${bot.users.cache.size} | message envoyé à ${member.username}`);

            if(fait == bot.users.cache.size){
				console.log(`Publicité terminé, veuillez patienter 2-3 minutes avant de fermer la console`);
			};
			if(fait == bot.users.cache.size/2){
                console.log(`Publicité en cours | ${fait}/ ${bot.users.size}`);
            };
            }
          });
        }
      }
    }
	}		
	if (command === "status") {
		message.delete()
        let args = message.content.split(" ").slice(1).join(" ");
		
		if(!args){
			message.channel.send("Erreur **!**");
		} else {
		message.channel.send('Changement du statut en cours.')
			.then((m) => m.edit("> **Le statut du bot a bien été actualisé** :white_check_mark:"))
			bot.user.setActivity(`${args}`, {url:"https://www.twitch.tv/nitro", type: "STREAMING"})
			message.channel.send('Veuillez patientez..')
			.then((m) => m.edit(`Mon statut est maintenant  ➟  **${args}** ! `)

        )};
	}
})


bot.on("ready", () => {
  clear();
  console.log('_________________________________________________________________')
});


function clear() {
  console.log('__________________________________________________________________')
  console.log(figlet.textSync("\n         SaphirBot Lite  ( :").green);
  console.log("\n\n SaphirBot est un bot visant un contenu publicitaire, vous avez la version LITE".white);
  console.log(`\n \n Prefix: ${prefix}`.bold.red);
  console.log("\n Owner : e.#2300".bold.blue);
}
