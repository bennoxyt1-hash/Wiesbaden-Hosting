const express = require('express');
const app = express();
app.use(express.json());

let pendingCommands = []; // Hier werden Befehle geparkt

// Dieser Endpunkt ist für dein HTML Dashboard
app.post('/send-command', (req, res) => {
    const command = req.body; // z.B. { action: "kick", target: "SpielerName" }
    pendingCommands.push(command);
    res.send({ success: true, message: "Befehl eingereiht" });
});

// Dieser Endpunkt ist für das Roblox Spiel (Polling)
app.get('/get-commands', (req, res) => {
    // Schicke alle geparkten Befehle an Roblox und leere die Liste
    res.json(pendingCommands);
    pendingCommands = []; 
});

app.listen(3000, () => console.log("Website läuft auf Port 3000"));
