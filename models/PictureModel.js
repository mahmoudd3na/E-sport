const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    picture: {
        type: String,
        required: true
    }
}
);

module.exports = mongoose.model("Picture", pictureSchema); 