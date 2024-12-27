const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },
        cinema: {
            type: String,
        },
        dateTime: {
            type: Date,
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Showtime = mongoose.model("Showtime", showtimeSchema);

module.exports = Showtime;
