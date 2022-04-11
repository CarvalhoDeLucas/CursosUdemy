const fs = require('fs'); 

fs.readFileSync('arquivo.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});