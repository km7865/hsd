const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = express.Router()
const app = express()
const form_data = multer()

const port = 3001

const categoryRouter = require('./routes/category');
const menuRouter = require('./routes/menu');
const memberRouter = require('./routes/member');
const orderRouter = require('./routes/order');
const optionRouter = require('./routes/option');
const storeRouter = require('./routes/store');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: 'true'
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(form_data.array());
app.use(express.json());
app.use(cookieParser());


app.use('/category', categoryRouter);
app.use('/menu', menuRouter);
app.use('/member', memberRouter);
app.use('/store', storeRouter);
app.use('/order', orderRouter);
app.use('/option', optionRouter);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})