const mongoose = require("mongoose");

const periodSchema = mongoose.Schema(
    {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        frequency: {
            type: String,
            enum : ['daily', 'weekly', 'monthly', 'yearly'],
            required: true
        },
        type: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Period", periodSchema);