const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
router.post("/make-payment", authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token as been assigned to the user",
            confirm: true,
        });
        const transactionId = paymentIntent.id;
        res.send({
            success: true,
            data: transactionId,
            message:
                "Payment processing. You will receive a confirmation email shortly.",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
router.post("/book-show", authMiddleware, async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedBookedSeats,
        });
        res.send({
            success: true,
            message: "Show booked successfully",
            data: newBooking,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
router.get("/get-all-bookings/:userId", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres",
                },
            });
        // booking -> show -> movie
        // booking -> show -> theatre
        res.send({
            success: true,
            data: bookings,
            message: "Bookings fetched successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
module.exports = router;