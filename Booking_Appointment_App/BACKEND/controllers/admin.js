const Appointment = require('../models/appointment');

exports.getAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json({allAppointments: appointments});
    }
    catch(err)  {
        console.log('Get User is failing', JSON.stringify(err));
        res.status(500).json({errorMessage: err});
    }
}

exports.postAppointment = async (req, res, next) => {
    const userName = req.body.userName;
    const emailID = req.body.emailID;
    const phoneNumber = req.body.phoneNumber;
    try {
        if(!userName)   {
            throw new Error("UserName is Incorrect")
        }
        const appointmentData = await Appointment.create({
            userName: userName,
            emailID: emailID,
            phoneNumber: phoneNumber
        })
        res.status(201).json({
            message: 'Appointement Booked',
            newUserDetail: appointmentData
            //redirect: 'http://localhost:5500/index.html'
        });
    }
    catch(err) {
        console.log(err.message);
        res.status(500).json({ errorMessage: err});
    }
}

exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointmentId = req.params.id;
        if(appointmentId === 'undefined') {
            console.log('No such Appointment present');
            return res.status(400).json({ message: `${appointmentId} No such Appointment present` });
        }
        const result = await Appointment.destroy({where: { id: appointmentId }});
        if(result) {
            res.status(200).json( {message: `${appointmentId} Appointment Deleted`} );
        }
        else {
            res.status(404).json({ message: `${appointmentId} No such Appointment present` });
        }
    }
    catch(err)  {
        console.log(err);
        res.status(500).json({ errorMessage: err});
    }
}