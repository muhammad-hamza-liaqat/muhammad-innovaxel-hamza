const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
        },
        releaseDate: {
            type: Date,
        },
        genre: {
            type: [String],
        },
        director: {
            type: String,
            trim: true,
        },
        cast: [
            {
                name: {
                    type: String,
                    required: true,
                },
                role: {
                    type: String,
                },
            },
        ],
        rating: {
            type: Number,
            min: 0,
            max: 10,
        },
        duration: {
            type: Number,
        },
        posterUrl: {
            type: String,
        },
        trailerUrl: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        showtimes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Showtime",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
