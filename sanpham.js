const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Sanpham');
const Schema = mongoose.Schema;
const sanpham = new Schema({
    tensp: { type: String, unique: true, require: true },
    giasp: { type: String, unique: true, require: true },
    soluong: { type: String, unique: true, require: true },
    khuyenmai:{type:String}
}, { collection: 'sanphams', });
const AccountModel = mongoose.model('sanphams', sanpham)
module.exports = AccountModel
