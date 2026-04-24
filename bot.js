const mineflayer = require('mineflayer');

const config = {
    host: 'shadowblox.aternos.me', // Remplace par ton adresse Aternos
    port: 34283,
    username: 'ShadowBot',
    version: '26.1.2' // La version que tu as demandée
};

function createBot() {
    const bot = mineflayer.createBot(config);

    bot.on('spawn', () => {
        console.log('--- Bot Shadow en ligne (26.1.2) ---');
        
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

    bot.on('error', (err) => console.log('Erreur :', err));

    bot.on('end', () => {
        console.log('Connexion perdue. Reconnexion dans 1 minute...');
        setTimeout(createBot, 60000); // Attend 1 min pour laisser le serveur respirer
    });
}

createBot();