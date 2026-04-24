const mineflayer = require('mineflayer');

const config = {
    host: 'shadowblox.aternos.me', 
    port: 34283,
    username: 'ShadowBot',
    // On utilise 1.21 pour éviter le crash "No data available"
    // Ton serveur acceptera la connexion si tu as le plugin ViaVersion
    version: '1.21' 
};

function createBot() {
    const bot = mineflayer.createBot(config);

    // Message quand le bot entre sur le serveur
    bot.on('spawn', () => {
        console.log('--- [SUCCESS] Bot Shadow est en ligne ---');
        
        // Anti-AFK : Le bot saute toutes les 30 secondes pour ne pas être kické
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // Répondre à une commande simple dans le chat
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === '!info') {
            bot.chat('Je suis le bot de Shadow, actif 24h/24.');
        }
    });

    // Gestion des erreurs pour éviter que le script ne s'arrête
    bot.on('error', (err) => {
        console.log('--- [ERROR] ---');
        console.log(err.message);
    });

    // Tentative de reconnexion automatique si le serveur redémarre
    bot.on('end', () => {
        console.log('--- [DISCONNECT] Connexion perdue. Relance dans 60s ---');
        setTimeout(createBot, 60000); 
    });
}

// Lancement initial
createBot();
