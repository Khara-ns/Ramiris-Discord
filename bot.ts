import { sqlClient } from './deps.ts';
import { Client, Message, GatewayIntents , CommandClient, Embed , MessageAttachment,GuildChannel,Channel} from './deps.ts';
const client = await new Client();
const sqlclient = await new sqlClient().connect({
    hostname: Deno.env.get("SQL_HOSTNAME"),
    username: Deno.env.get("SQL_USER"),
    db: Deno.env.get("SQL_DB"),
    password: Deno.env.get("SQL_PASSWORD"),
    idleTimeout: 604800000,
  });;
  
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];
  
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }
const token = Deno.env.get("BOT_TOKEN");
const prefix = '.';
client.on('ready', () => {

  console.log(`Ready! User: ${client.user?.tag}`)
})
async function charfetch() {
  const { rows: categoriestotales } = await sqlclient.execute(`SELECT * FROM CATEGORIE WHERE categorie_nom LIKE 'char_%';`);
  console.log("yo"+categoriestotales[0])
  const result = categoriestotales.map(a => a.categorie_nom);
  console.log(result)
  return result;
}
async function catfetch() {
  const { rows: categoriestotales } = await sqlclient.execute(`SELECT * FROM CATEGORIE WHERE NOT categorie_nom LIKE 'char_%';`);
  console.log("yo"+categoriestotales[0])
  const result = categoriestotales.map(a => a.categorie_nom);
  console.log(result)
  return result;
}
async function artistefetch(artiste : string) {
  const { rows: categoriestotales } = await sqlclient.execute(`SELECT * FROM ARTISTE WHERE artiste_nom = ?;`,[artiste[0]]);
  console.log("yo"+categoriestotales[0])
  if (categoriestotales.length != 0){
    const result = categoriestotales[0];
    return result;} else {

  const result = ""
  return result;
}
}

async function catdescription(categorie : string) {
  const { rows: categoriestotales } = await sqlclient.execute(`SELECT categorie_description FROM CATEGORIE WHERE categorie_nom = ?;`,[categorie[0]]);
  if (categoriestotales.length === 0){
    const result = "";
    return result;
  } else {
    const result = categoriestotales[0];
    return result;
  }
  //Not used for now , will in the future
}
async function spe1cat(categorie: string[]){
  let categorieprincipale = categorie[0]
  const { rows: images } = await sqlclient.execute(`SELECT image_nomfichier , image_id , image_description , artiste_nom FROM IMAGE
  INNER JOIN CATEGORIE AS MainCategorie ON IMAGE.catprincipale_fk = MainCategorie.categorie_id
  INNER JOIN ARTISTE ON ARTISTE.artiste_id = IMAGE.artiste_fk
  WHERE MainCategorie.categorie_nom = ?`,[categorieprincipale])
  console.log(images)
  const randomvalue = Math.floor(Math.random() * images.length)
  let answer = images[randomvalue] 
  if (images.length === 0){
    let result ="Non"
    return result;
  } else { 
  let result = answer;
  return result;
  }
}

async function imageclassic(categorie: string[]) {
  console.log("je met "+categorie[0])
  console.log(categorie)
  const { rows: images } = await sqlclient.execute(`SELECT image_nomfichier , image_id , image_description , artiste_nom FROM IMAGE
  LEFT JOIN CATEGORIEIMAGE ON CATEGORIEIMAGE.image_fk = IMAGE.image_id
  INNER JOIN CATEGORIE ON CATEGORIE.categorie_id = CATEGORIEIMAGE.categorie_fk
  INNER JOIN ARTISTE ON ARTISTE.artiste_id = IMAGE.artiste_fk
  WHERE CATEGORIE.categorie_nom IN ?`,[[categorie[0],categorie[1], categorie[2], categorie[3], categorie[4],categorie[5],categorie[6],categorie[7],categorie[8],categorie[9],categorie[10] ]]);
  
  const imagesgroupee = groupBy(images, "image_id");;
  const superTableau = Object.entries(imagesgroupee);
  const imagesgagnantes : any[] = [];
  function triage(image_id) { 
   if(image_id[1].length >= categorie.length){
    imagesgagnantes.push(image_id[1][0]);
   } else {
    return;
   }
 }
 superTableau.filter(triage);
 console.log(imagesgagnantes);
  const randomvalue = Math.floor(Math.random() * imagesgagnantes.length)
  let answer = imagesgagnantes[randomvalue] 
  
  if (imagesgagnantes.length === 0){
    let result ="Non"
    return result;
  } else { 
  let result = answer;
  return result;
  }
   }

async function imageold(categorie: string[]) {
  console.log("je met "+categorie[0])
  console.log(categorie)
  const { rows: images } = await sqlclient.execute(`SELECT image_nomfichier , image_id , image_description , artiste_nom FROM IMAGE
  LEFT JOIN CATEGORIEIMAGE ON CATEGORIEIMAGE.image_fk = IMAGE.image_id
  INNER JOIN CATEGORIE ON CATEGORIE.categorie_id = CATEGORIEIMAGE.categorie_fk
  INNER JOIN ARTISTE ON ARTISTE.artiste_id = IMAGE.artiste_fk
  WHERE CATEGORIE.categorie_nom IN (?)`,[categorie[0],categorie[1], categorie[2], categorie[3], categorie[4],categorie[5],categorie[6],categorie[7],categorie[8],categorie[9],categorie[10]]);
  
  const imagesgroupee = groupBy(images, "image_id");;
  const superTableau = Object.entries(imagesgroupee);
  const imagesgagnantes : any[] = [];
  function triage(image_id) { 
   if(image_id[1].length >= 1){
    imagesgagnantes.push(image_id[1][0]);
   } else {
    return;
   }
 }
 superTableau.filter(triage);
 console.log(imagesgagnantes);

  const randomvalue = Math.floor(Math.random() * imagesgagnantes.length)
  let answer = imagesgagnantes[randomvalue] 
  
  if (imagesgagnantes.length === 0){
    let result ="Non"
    return result;
  } else { 
  let result = answer;
  return result;
  }
   }

async function run(categorie: string[]) {
  console.log("je met "+categorie[0])
  console.log(categorie)
  let categorieprincipale = categorie[0]
  const { rows: images } = await sqlclient.execute(`SELECT image_nomfichier , image_id , image_description , artiste_nom FROM IMAGE
  LEFT JOIN CATEGORIE AS MainCategorie ON IMAGE.catprincipale_fk = MainCategorie.categorie_id
  LEFT JOIN CATEGORIEIMAGE ON CATEGORIEIMAGE.image_fk = IMAGE.image_id
  INNER JOIN CATEGORIE ON CATEGORIE.categorie_id = CATEGORIEIMAGE.categorie_fk
  INNER JOIN ARTISTE ON ARTISTE.artiste_id = IMAGE.artiste_fk
  WHERE MainCategorie.categorie_nom = ? AND CATEGORIE.categorie_nom IN ?;`,[categorieprincipale, [categorie[1], categorie[2], categorie[3], categorie[4],categorie[5],categorie[6],categorie[7],categorie[8],categorie[9],categorie[10]]]);
  
  const imagesgroupee = groupBy(images, "image_id");;
  const superTableau = Object.entries(imagesgroupee);
  const imagesgagnantes : any[] = [];
  function triage(image_id) { 
   if(image_id[1].length >= categorie.length -1){
    imagesgagnantes.push(image_id[1][0]);
   } else {
    return;
   }
 }
 superTableau.filter(triage);
 console.log(imagesgagnantes);

  const randomvalue = Math.floor(Math.random() * imagesgagnantes.length)
  let answer = imagesgagnantes[randomvalue] 
  
  if (imagesgagnantes.length === 0){
    let result ="Non"
    return result;
  } else { 
  let result = answer;
  return result;
  }
   }
  
async function imagechargement(nomimage:string) {
  const attachments = await MessageAttachment.load("./image/"+nomimage)
  return attachments;
}

client.on('messageCreate', (msg: Message,chan: Channel): void => {
  if (msg.content == undefined ) return;
  if (msg.author.bot) return;
  if (msg.content.indexOf(prefix) !== 0) return;
  const messagestring = msg.content.toString();
  const args = messagestring.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (args.length >= 11) return;
  if ((command === 'imagespe')||(command === 'is')) {
    if (args.length === 1){
      spe1cat(args).then((result) => {
        imagechargement(result.image_nomfichier).then((attachments) => { 
           
           const embed = new Embed()
           .setDescription(result.image_description)
           .setAuthor("Artist: "+result.artiste_nom)
           .attach(attachments);
           console.log(result)
           console.log(args[0],' ',args[1])
           if (result.image_nomfichier === undefined ){
             msg.channel.send(result)
           }else{
           msg.channel.send(embed);
           }  
         })

      })
    }else {
    run(args).then((result) => {
      imagechargement(result.image_nomfichier).then((attachments) => { 
      
      
      const embed = new Embed()
      .setDescription(result.image_description)
      .setAuthor("Artist: "+result.artiste_nom)
      .attach(attachments);
      console.log(result)
      console.log(args[0],' ',args[1])
      if (result.image_nomfichier === undefined ){
        msg.channel.send(result)
      }else{
      msg.channel.send(embed);  
      }  
    })})
  }
  }
  if ((command === 'imageadd')||(command === 'ia')) {
      imageold(args).then((result) => {
        imagechargement(result.image_nomfichier).then((attachments) => { 
        
        
        const embed = new Embed()
        .setDescription(result.image_description)
        .setAuthor("Artist: "+result.artiste_nom)
        .attach(attachments);
        console.log(result)
        console.log(args[0],' ',args[1])
        if (result.image_nomfichier === undefined ){
          msg.channel.send(result)
        }else{
        msg.channel.send(embed);
        }  
      })})
    }
    if ((command === 'imageclassic')||(command === 'ic')) {
        imageclassic(args).then((result) => {
          imagechargement(result.image_nomfichier).then((attachments) => { 
          
          
          const embed = new Embed()
          .setDescription(result.image_description)
          .setAuthor("Artist: "+result.artiste_nom)
          .attach(attachments);
          console.log(result)
          console.log(args[0],' ',args[1])
          if (result.image_nomfichier === undefined ){
            msg.channel.send(result)
          }else{
          msg.channel.send(embed);
          }  
        })})
      }
  if ((command === 'artist') || (command === 'artiste')) {
    artistefetch(args).then((result) => { 
      if (result === ""){
        msg.channel.send("Artist not in the database")
      }else{
        const artistembed = new Embed()
        .setTitle(result.artiste_nom)
        .setAuthor(".artist")
        .setDescription(`Artist Twitter : `+result.artiste_twitter+` \n
        Artist Pixiv : `+result.artiste_pixiv+`\n
        Artist Patreon : `+result.artist_patreon)
      msg.channel.send(artistembed) 
    }
    })
    
  }
  if (command === 'test'){
    const guildeID = msg.guildID;
    const channelID = msg.channelID;
    msg.channel.send('Id du serveur : '+guildeID+' \nId du channel : '+channelID)
  }
  if ((command === 'tags')||(command === 'tag')) {
    catfetch().then((catfinales) => {
      console.log(catfinales);
      const catfinalesalp = catfinales.sort();
      const catformatee = catfinalesalp.join("\n",catfinalesalp);
      const catembed = new Embed()
      .setTitle("Tags")
      .setDescription(catformatee)

      msg.channel.send(catembed);
    })
  }
  if ((command === 'personnages')||(command === 'character')) {
    charfetch().then((catfinales) => {
      console.log(catfinales);
      const catfinalesalp = catfinales.sort();
      const catformatee = catfinalesalp.join("\n",catfinalesalp);
      const catembed = new Embed()
      .setTitle("Categories")
      .setDescription(catformatee)

      msg.channel.send(catembed);
    })
  }
  if (command === 'credits') {
    const creditembed = new Embed()
    .setAuthor('Author: @Khara#0001')
    .setTitle('Credits');
    msg.channel.send(creditembed);
  }
  if (command === 'help') {
    const helpembed = new Embed()
    .setTitle('help')
    .setDescription(`
    .artist / .artiste {artist name} // Will show you artist networks\n
    .credits // Will show you credits of the bot\n
    .tags // Will list all tags (If you see a category that should be in but isn't DM me)\n
    .characters / .personnages // Will show you all characters (If you see some character on a picture that isn't in the list DM me)\n
    `);
    msg.channel.send(helpembed);
  }
})
 
client.connect(token, [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES
  ])