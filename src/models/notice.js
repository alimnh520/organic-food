const { default: mongoose } = require("mongoose");

const noticeSchemas = new mongoose.Schema({
    text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.notice || mongoose.model('notice', noticeSchemas);