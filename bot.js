const mineflayer = require('mineflayer');

const config = {
    host: 'shadowblox.aternos.me', 
    port: 34283,
    username: 'ShadowBot',
    version: false // On laisse mineflayer détecter la version 26.1.2 tout seul
};

function createBot() {
    const bot = mineflayer.createBot(config);

    bot.on('spawn', () => {
        console.log('--- Bot Shadow en ligne ---');
        
        // Anti-AFK : Saute toutes les 30 secondes
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!status') {
            bot.chat('Le bot est actif 24h/24.');
        }
    });

    // Indique pourquoi il y a une erreur si elle survient
    bot.on('error', (err) => {
        console.log('Erreur détectée :', err.message);
    });

    bot.on('end', () => {
        console.log('Connexion perdue. Reconnexion dans 1 minute...');
        setTimeout(createBot, 60000); 
    });
}

createBot();
