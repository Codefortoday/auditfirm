const express = require("express");
const multer = require("multer");
const ServiceRequest = require("../models/Service");
const Notification = require("../models/Notification");
const User = require("../models/User");

const router = express.Router();

// Multer Storage Configuration for Document Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Get Client Type from Email
router.get("/client-type/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const clientType = user.Client_Type // || "Individual"; // Default to Individual if not set
        res.json({ clientType });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Submit Service Request
router.post("/request", upload.single("document"), async (req, res) => {
    try {
        const { email, clientType, service, additionalInfo } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const newRequest = new ServiceRequest({
            clientId: user._id,
            email,
            service,
            documentPath: req.file ? req.file.path : null,
            additionalInfo
        });

        await newRequest.save();

        // Send notification to client
        const notification = new Notification({
            userId: user._id,
            message: `Your service request for ${service} has been submitted successfully and is pending review.`
        });
        await notification.save();

        res.status(201).json({ message: "Service request submitted successfully.", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Service Requests (Admin View)
router.get("/all", async (req, res) => {
    try {
        const requests = await ServiceRequest.find().populate("clientId", "name email");
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Mark Service as Completed
router.put("/complete/:id", async (req, res) => {
    try {
        const request = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: "Completed" }, { new: true });

        // Send notification to client
        const notification = new Notification({
            userId: request.clientId,
            message: `Your service request for ${request.service} has been completed.`
        });
        await notification.save();

        res.json({ message: "Service marked as completed.", request });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const Service = require("../models/Service");
// const Notification = require("../models/Notification");
// const User = require("../models/User"); // Import your User model
// const fetchUser = require("../middleware/fetchUser");


// // Function to fetch user data and create a service
// // async function createServiceForUser(userId, serviceName) {
// //   try {
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       console.log("User not found");
// //       return;
// //     }

// //     // Creating a service linked to the user
// //     const newService = new Service({
// //       name: serviceName,
// //       Client_type: user.Client_type, // Ensure this matches
// //       assignedUser: user._id, // Linking service to user
// //     });

// //     await newService.save();
// //     console.log("Service created successfully:", newService);
// //   } catch (error) {
// //     console.error("Error fetching user or creating service:", error);
// //   }
// // }

// // Example usage
// //createServiceForUser();


// // Client selects a service
// router.post("/select-service", async (req, res) => {
//     const { serviceName, Client_type, userId } = req.body;
//     console.log("Incoming request data:", req.body); // Log incoming request data


//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//       console.log("User not found for ID:", userId); // Log user not found

//     }

//     const service = new Service({ name: serviceName, Client_type, assignedUser: user._id });

//     await service.save();
//     res.json({ message: "Service selected successfully", service });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Admin marks a service as completed
// router.put("/complete-service/:serviceId", async (req, res) => {
//   try {
//     const service = await Service.findByIdAndUpdate(req.params.serviceId, { status: "Completed" }, { new: true });

//     if (!service) return res.status(404).json({ message: "Service not found" });

//     // Create a notification for the client
//     const notification = new Notification({
//       user: service.assignedUser,
//       message: `Your service "${service.name}" has been completed.`,
//     });

//     await notification.save();
//     res.json({ message: "Service marked as completed", service });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Fetch notifications for a user
// router.get("/notifications/:userId", async (req, res) => {
//   try {
//     const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;