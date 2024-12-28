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
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

// Middleware to ensure showTime and movie relationship consistency
reservationSchema.pre("save", async function (next) {
    try {
        const Showtime = mongoose.model("Showtime");

        const showtime = await Showtime.findById(this.showTime); // Use correct casing
        if (!showtime) {
            return next(new Error("Associated showtime not found"));
        }

        if (this.movie.toString() !== showtime.movie.toString()) {
            return next(new Error("The movie ID does not match the showtime's associated movie"));
        }

        next();
    } catch (err) {
        next(err); 
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
