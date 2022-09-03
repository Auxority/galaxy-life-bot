# Galaxy Life Status
Hi there!
This project was made to check the server status of the Galaxy Life game using a discord bot.

# Usage
Well then, how do you use this bot?

1. First of all, install [Docker Desktop](https://docs.docker.com/get-docker/)

![](https://cdn.discordapp.com/attachments/302318511764799488/1015524407608881192/unknown.png)

2. Now install [git](https://git-scm.com/)

![](https://cdn.discordapp.com/attachments/302318511764799488/1015524569731317870/unknown.png)

3. Use the git clone command to copy this repository.
`git clone https://github.com/Auxority/galaxy-life-bot`

![](https://cdn.discordapp.com/attachments/302318511764799488/1015524882559283210/unknown.png)

4. Copy the `.env.example` file and rename it to `.env`

![](https://media.discordapp.net/attachments/302318511764799488/1015525070057254942/unknown.png)

5. Create your bot application by following [these instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

6. Open discord and open your user settings.

![](https://cdn.discordapp.com/attachments/302318511764799488/1015525882028363787/unknown.png)

7. Under `App Settings` click on `Advanced`

![](https://cdn.discordapp.com/attachments/302318511764799488/1015525759084933160/unknown.png)

8. Enable developer mode

![](https://media.discordapp.net/attachments/302318511764799488/1015526061301317652/unknown.png)

9. Now return to the [developer portal](https://discord.com/developers/applications)

![](https://cdn.discordapp.com/attachments/302318511764799488/1011910536134393887/unknown.png)

10. Select your bot application

![](https://media.discordapp.net/attachments/302318511764799488/1015526637397356584/unknown.png?width=721&height=277)

11. Copy the client id from your new bot application and paste it in the `.env` file. The first line should look something like this: `CLIENT_ID=1010101010101010101010`

12. Click the `Bot` tab and copy the token, change the `BOT_TOKEN` value in the `.env` file to your token. It should end up looking something like this: `BOT_TOKEN=MTAxNA897sd7Ba2.Btas21.987SYigdugy987-jkh875sdgGsafa`

13. Now open discord and right click the server you want to add your bot to.

14. Copy the server's id.

![](https://cdn.discordapp.com/attachments/302318511764799488/1015533631516725309/unknown.png)

15. Change the value of `GUILD_ID` in the `.env` file to your server id. This should look similar to this: `GUILD_ID=10001582727624224`

16. Now save the `.env` file

17. Use [this website](https://discordapi.com/permissions.html) to invite your bot to your discord server.

18. Open a terminal and set the current directory to the project `discord-custom-rpc` . You can do this by typing `cmd` in this bar in file explorer and pressing Enter.

![](https://media.discordapp.net/attachments/302318511764799488/1015527240521494528/unknown.png?width=721&height=68)

19. Run `docker compose up --build` in your terminal.

![](https://cdn.discordapp.com/attachments/302318511764799488/1015533896819036170/unknown.png)

20. Your bot should now be online. It might take a few seconds for the status to show up :)

![](https://cdn.discordapp.com/attachments/302318511764799488/1015533998405066852/unknown.png)