const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Sanpham');
const Schema = mongoose.Schema;
const sanpham = new Schema({
    tensp: { type: String },
    giasp: { type: String },
    soluong: { type: String },
    khuyenmai:{type:String}
}, { collection: 'sanphams', });
const AccountModel = mongoose.model('sanphams', sanpham)
module.exports = AccountModel
