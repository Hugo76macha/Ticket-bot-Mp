function loadEvents(client) {
    const fs = require('fs');
    const path = require('path');
    
    const events = [];
    const folders = fs.readdirSync("./events");

    for (const folder of folders) {
        const files = fs
            .readdirSync(path.join("./events", folder))
            .filter((file) => file.endsWith(".js"));
        
        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) => event.execute(...args, client));
                else
                    client.rest.on(event.name, (...args) => event.execute(...args, client));
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else
                    client.on(event.name, (...args) => event.execute(...args, client));
            }
            
            events.push({ Event: file, Status: "✔️" });
        }
    }

    console.table(events);
    console.log("\nEvents chargés");
}

module.exports = { loadEvents };
