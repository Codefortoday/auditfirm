
const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    clientType: { type: String, enum: ["Individual", "Company"], required: true },
    service: { type: String, required: true },
    documentPath: { type: String },
    additionalInfo: { type: String },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);

