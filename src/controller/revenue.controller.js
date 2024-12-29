const mongoose = require("mongoose");
const statusCode = require("http-status-codes");
const { HTTPResponse, HTTPError } = require("../utils/response");

const Reservation = require("../models/reservation.model");

const getTotalRevenue = async (req, res) => {
    const result = await Reservation.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" }
            }
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1
            }
        }
    ]);
    const response = new HTTPResponse("Total revenue calculated successfully", result);
    return res.status(statusCode.OK).json(response);
};

const getTopMovieByTickets = async (req, res) => {
    const result = await Reservation.aggregate([
        {
            $group: {
                _id: "$movie",
                totalSeatsSold: { $sum: "$seats" },
                totalRevenue: { $sum: "$totalPrice" }
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "_id",
                as: "movieDetails"
            }
        },
        {
            $unwind: "$movieDetails"
        },
        {
            $lookup: {
                from: "showtimes",
                localField: "_id",
                foreignField: "movie",
                as: "showtimes"
            }
        },
        {
            $project: {
                _id: 0,
                movieTitle: "$movieDetails.title",
                totalSeatsSold: 1,
                totalRevenue: 1,
                showtimes: {
                    cinema: 1,
                    sold: 1
                }
            }
        },
        {
            $sort: { totalSeatsSold: -1 }
        }
    ]);
    const response = new HTTPResponse("Top movies fetched successfully", result);
    return res.status(statusCode.OK).json(response);
};

module.exports = {
    getTotalRevenue,
    getTopMovieByTickets
};
