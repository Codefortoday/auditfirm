const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestimonialSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true }, // Retrieved from User schema
    image: { type: String }, // User's profile picture
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema,"Testimonal");
