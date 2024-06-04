const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 9733;

let logMessages = [
    "lua-applets is running...",
];

app.get('/run-lua', (req, res) => {
    const luaCode = req.query.code || 'print("Hello from Lua!")';
    const safetyScriptPath = path.join(__dirname, 'safety.sh');
    exec(safetyScriptPath, (error, stdout, stderr) => {
        if (error) {
            if (error.code === 8) {
                logMessages.push("Forbidden");
                res.status(403).json({ error: "Forbidden" });
            } else {
                logMessages.push(`Forbidden`);
                res.status(500).json({ error: stderr });
            }
        } else {
            // Safety check passed
            const tempScriptPath = path.join(__dirname, 'temp_script.lua');
            fs.writeFileSync(tempScriptPath, luaCode);

            // Execute
            exec(`lua ${tempScriptPath}`, (error, stdout, stderr) => {
                fs.unlinkSync(tempScriptPath); // Remove the temporary script

                if (error) {
                    logMessages.push(`Error: ${stderr}`);
                    res.status(500).json({ error: stderr });
                } else {
                    logMessages.push(`Output: ${stdout}`);
                    res.json({ output: stdout });
                }
            });
        }
    });
});

app.get('/log', (req, res) => {
    res.json(logMessages);
});

app.listen(port, () => {
    console.log(`Daemon running at http://localhost:${port}`);
});
