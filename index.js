const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const imgur = require('imgur');
const fs = require('fs');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

imgur.setClientId(process.env['CLIENT_ID'])

app.post('/upload', upload.single('image'), (req, res) => {
    imgur.uploadFile(req.file.path)
    .then( (json) => {
        res.send(json.data.link);
    })
    .catch( (err)  => {
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
app.listen(port);