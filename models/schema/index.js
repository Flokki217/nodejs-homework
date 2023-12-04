const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please set the name of contact"],
        },
        email: { type: String, },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);
const Contact = model("contact", contactSchema);
module.exports = Contact;