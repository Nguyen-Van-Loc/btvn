const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Sanpham');
const Schema = mongoose.Schema;
const sanpham = new Schema({
    tensp: { type: String, require: true},
    giasp: { type: Number },
    soluong: { type: Number },
    khuyenmai:{type:Number}
}, { collection: 'sanpham', });
const AccountModel = mongoose.model('sanpham', sanpham)
module.exports = AccountModel
