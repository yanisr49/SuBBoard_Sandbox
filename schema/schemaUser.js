const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        lname: {
            type: String,
        },
        fname: {
            type: String,
        },
        birthdate: {
            type: Date,
        },
        gender: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        avatar_path: {
            type: String,
            default: "TODO"
        },
        role: {
            type: String,
            enum : ['Admin', 'Client'],
            default: 'Client'
        },
        subscriptions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subscription"
            }
        ]
    },
    { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
    authenticate: function(password) {
        return passwordHash.verify(password, this.password);
    },
    getToken: function() {
        return jwt.encode(this, config.secret);
    }
};

module.exports = mongoose.model("User", userSchema);