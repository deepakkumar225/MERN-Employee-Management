const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

app.get("/", (req, res) => {
    res.send("Employee API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is Running in ${PORT}`);
});
