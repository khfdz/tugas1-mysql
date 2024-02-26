require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');

const usersRoutes = require('./routes/users.js')

const middleWareLogRequest = require('./middleware/logs.js');
const upload = require('./middleware/multer.js');

const app = express();

app.use(middleWareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));

app.use('/users', usersRoutes);
app.post('/upload', upload.single('photo'),(req, res) => {
    res.json({
        message: 'Upload success',
        data: req.file
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})
   
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di port ${PORT}`);
})