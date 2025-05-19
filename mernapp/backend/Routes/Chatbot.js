const express = require("express");
const router = express.Router();
const stringSimilarity = require("string-similarity");

const responses = {
    // General Queries
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How can I help you?",
    "hey": "Hey! What can I do for you?",
    "how are you": "I'm just a bot, but I'm here to help! 😊",
    "bye": "Goodbye! Have a great day! 👋",
    "thank you": "You're welcome! Feel free to ask anything.",
    "thanks": "Glad to help! Let me know if you need anything else.",
    "help": "Sure! You can ask me about our services, pricing, appointments, or contact details.",
    "who are you": "I’m the AI chatbot of AuditFirm & Company, here to assist you with any queries!",

    // Service-Related Queries
    "services": "We offer financial audits, tax consultation, GST filing, and business advisory services.",
    "audit": "We provide financial audit services to help businesses maintain compliance.",
    "gst": "We assist with GST registration, filing, and compliance services.",
    "tax": "Our tax services include tax planning, return filing, and compliance management.",
    "income tax": "We provide tax planning and return filing assistance for individuals and businesses.",
    "business advisory": "We help businesses with financial planning, risk management, and compliance.",
    "loan": "We offer guidance on loan documentation, eligibility, and financial planning.",
    "investment": "We provide investment consulting to help you make informed financial decisions.",

    // Appointment & Booking
    "appointment": "You can book an appointment through our appointment system on the website.",
    "meeting": "To schedule a meeting, please use our online booking system.",
    "consultation": "We offer financial consultation sessions. You can book one online.",

    // Pricing & Payment
    "pricing": "Our pricing varies based on services. Please visit our Pricing page for details.",
    "price": "Our pricing varies based on services. Please visit our Pricing page for details.",
    "cost": "The cost depends on the service you need. Check our Pricing page for details.",
    "fees": "Our fees depend on the complexity of your requirements. Contact us for a quote.",

    // Location & Contact
    "location": "We are located at XYZ Street, Mumbai, India.",
    "located": "We are located at XYZ Street, Mumbai, India.",
    "address": "Our office is at XYZ Street, Mumbai. You can also reach us online.",
    "contact": "You can email us at support@auditfirm.com or call +91-1234567890.",
    "email": "You can reach us at support@auditfirm.com for any queries.",
    "phone": "Call us at +91-1234567890 for immediate assistance.",

    // About the Firm
    "about": "We are a professional audit firm with expert Chartered Accountants providing quality financial services.",
    "team": "Our team consists of experienced Chartered Accountants and financial experts.",
    "experience":"Our team consist of professional experts with decade long of experiences in accounting and financial services.",
    "audit type": "An audit is an independent review of financial statements to ensure accuracy and compliance with accounting standards.",
    "itr": "ITR (Income Tax Return) filing is mandatory for individuals earning above the exemption limit. The due date is usually July 31st for individuals and September 30th for companies.",
    "gst ": "GST filing is required monthly or quarterly based on turnover. Late filing may attract penalties.",
    "stock": "Stock markets fluctuate based on economic and business performance. We provide insights but recommend consulting a financial advisor before investing.",
    "insurance": "Insurance helps protect your assets and financial future. We can assist in understanding various types, including life, health, and business insurance.",
    "tax ": "Tax compliance is essential for businesses and individuals. Our team can assist in planning and filing your taxes efficiently.",

    // Default Response for Unknown Questions
    "default": "Sorry, I can only answer questions related to our firm. Try asking about services, pricing, or contact details."
};
// Function to find the closest keyword match
const findClosestMatch = (input) => {
    const keys = Object.keys(responses);
    for (let key of keys) {
        if (input.includes(key)) return key;
    }
    return null;
};


router.post("/chat", (req, res) => {
    const { message } = req.body;
    const lowerCaseMessage = message.toLowerCase();

    let matchedResponses = [];

    Object.keys(responses).forEach((key) => {
        // **Check for exact match**
        if (lowerCaseMessage.includes(key)) {
            matchedResponses.push(responses[key]);
        } else {
            // **Check for similar words
            let similarity = stringSimilarity.compareTwoStrings(lowerCaseMessage, key);
            if (similarity > 0.7) {  // 70% match threshold
                matchedResponses.push(responses[key]);
            }
        }
    });

    res.json({ reply: matchedResponses.length ? matchedResponses.join(" ") : responses["default"] });  



});

module.exports = router;
