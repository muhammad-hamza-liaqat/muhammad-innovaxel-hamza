const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        showTime: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Showtime",
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        customerName: {
            type: String,
            trim: true,
        },
        customerEmail: {
            type: String,
            trim: true,
        },
        seats: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to ensure showtime and movie relationship consistency
reservationSchema.pre("save", async function (next) {
    const Showtime = mongoose.model("Showtime");
    const Movie = mongoose.model("Movie");

    const showtime = await Showtime.findById(this.showtime);
    if (!showtime) {
        throw new Error("Associated showtime not found");
    }

    if (this.movie.toString() !== showtime.movie.toString()) {
        throw new Error("The movie ID does not match the showtime's associated movie");
    }

    next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
