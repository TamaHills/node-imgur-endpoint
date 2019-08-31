const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imgur = require('imgur');
const fs = require('fs');

const app = express();

<<<<<<< HEAD
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env['CLIENT_DOMAIN']);
=======
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
>>>>>>> e5ddc95e17a31dc617ff6669f18c5ed6c85e3b52
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

imgur.setClientId(process.env['CLIENT_ID'])

app.post('/upload', upload.single('image'), (req, res) => {
    imgur.uploadFile(req.file.path)
        .then((json) => {
            res.send(json.data.link);
        })
        .catch((err) => {
            res.send(err.message);
        })
        .finally(() => fs.unlinkSync(req.file.path))
})

app.get('/', (req, res) => {
    res.send('imgur upload')
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
<<<<<<< HEAD

app.listen(port);
=======
app.listen(port);
>>>>>>> e5ddc95e17a31dc617ff6669f18c5ed6c85e3b52
