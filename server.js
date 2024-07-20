const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appointments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    datetime: String,
    message: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Handle appointment booking
app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send({ success: true, message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error booking appointment', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
