const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imgur = require('imgur');
const fs = require('fs');
const path = require('path');
const app = express();

function logger(req, res, next) {
    console.log(`${(new Date()).toString()}: ${req.method} request -> ${req.path}`);
    next();
};

app.use(logger);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env['CLIENT_DOMAIN']);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

imgur.setClientId(process.env['CLIENT_ID'])

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/upload.html'));
})

app.post('/upload', upload.single('image'), (req, res) => {
    imgur.uploadFile(req.file.path)
        .then(json => {
            console.log(`${(new Date).toString()} image published -> ${json.data.link}`)
            res.send(req.query.html ? `<img src="${json.data.link}">` : json.data.link);
        })
        .catch(err => {
            res.send(err.message);
        })
        .finally(() => fs.unlinkSync(req.file.path))
})



const box = (inner_content, emoji_count = 0) => {
    const spaces = inner_content.length + 4 + emoji_count
    const line = '═'.repeat(spaces);
    const gap = ' '.repeat(spaces);
    return `╔${line}╗\n║${gap}║\n║  ${inner_content}  ║\n║${gap}║\n╚${line}╝`
}


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.clear()
    console.log(box(`✔ the server is listening on port: ${port}`, 1))
})