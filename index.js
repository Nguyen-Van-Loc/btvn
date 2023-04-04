const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
var AccountModel=require('./sanpham');
var methodOverride = require('method-override')
const { mongooestoObject,mutipleMongooesToObject } = require('./util/monggo');
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "main" }))
app.set('view engine', '.hbs');
app.set('views', './');

app.get('/',(req,res,next)=>{
    AccountModel.find({}).then(sanpham => {
        res.render('home', {sanpham:sanpham.map(item=>item.toObject())})
    }).catch(next);
})
app.get('/themsanpham',(req,res)=>{
    res.render('themsanpham')
})
app.post('/themsanpham',(req,res)=>{
    var ten=req.body.tensp;
    var gia=req.body.giasp;
    var soluong =req.body.soluong;
    var khuyenmai=req.body.khuyenmai;
    AccountModel.insertMany({
        tensp:ten,
        giasp:gia,
        soluong:soluong,
        khuyenmai:khuyenmai,
    }).then(data=>{
        res.redirect('/')
    })

})
app.get("/:id/edit", async (req, res) => {
    AccountModel.findById(req.params.id).then(sanpham => res.render('edit', { sanpham: sanpham.toObject() }))
});
app.put("/:id", async (req, res) => {
    // res.json(req.body)
    AccountModel.updateOne({ _id: req.params.id }, req.body).then(() => res.redirect('/'))
});
app.get('/:id', async (req, res) => {
    try {
        const user = await AccountModel.findByIdAndDelete(req.params.id, req.body)
        if (!user) {
            res.status(404).send('ko co file')
        } else {
            res.status(200).redirect('/')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(5000, () => {
    console.log(`Sever started on port`);
})