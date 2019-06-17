const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Leads } = require('../models/leads');

//flag=0 lead | flag=1 followup | flag=2 customer | flag=3 unqualified

router.get('/followupCount', (req, res) => {
    let counts = Leads.find({"flag" : "1"}).exec(function (err, results) {
        var count = results.length
      res.json({'followup':count});
      });
});

router.get('/customersCount', (req, res) => {
    let counts = Leads.find({"flag" : "2"}).exec(function (err, results) {
        var count = results.length
      res.json({'customer':count});
      });
});
router.get('/unqualfiedCount', (req, res) => {
    let counts = Leads.find({"flag" : "3"}).exec(function (err, results) {
        var count = results.length
      res.json({'unqualfied':count});
      });
});
router.get('/leadsCount', (req, res) => {
    let counts = Leads.find({$and:[{"flag" : "0"},{ $or : [{"flagSchedulded":"0"},{"flagSchedulded":null}]} ]}).exec(function (err, results) {
        var count = results.length
      res.json({'leads':count});
      });
});






 //flagSchedulded=1 schedulded  | flagSchedulded=0 not-schedulded
 router.get('/schedulded', (req, res) => {
    Leads.find({"flagSchedulded" : "1"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/leads/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/schedulded/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving schedulded :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/followup/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving followup :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/unqualified/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving unqualified :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/leads', (req, res) => {
   
    //console.log('body: ' + JSON.stringify(req.body));
    var emp = new Leads({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    });

    emp.save((err, doc) => {
        if (!err) {
            res.send(doc); }
        else { console.log('Error in Leads Save :' + JSON.stringify(err, undefined, 2)); }
    });

});

router.post('/schedulded', (req, res) => {
    var emp = new Leads({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in schedulded Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/followup', (req, res) => {
    var emp = new Leads({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in schedulded Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/customers', (req, res) => {
    var emp = new Leads({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
      //  message:req.body.message,
        organization: req.body.organization,
       // scheduldedTime: req.body.scheduldedTime,
       // scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
     //   followupTime: req.body.followupTime,
     //   followupDate: req.body.followupDate,
     //   information: req.body.information,
     //     dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in schedulded Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.put('/leads/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    };
    Leads.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Leads Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/schedulded/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    };
    Leads.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in schedulded Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/followup/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    };
    Leads.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in followup Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/customers/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
        scheduldedTime: req.body.scheduldedTime,
        scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
        followupTime: req.body.followupTime,
        followupDate: req.body.followupDate,
        information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    };
    Leads.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in customers Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/unqualified/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        message:req.body.message,
        organization: req.body.organization,
      //  scheduldedTime: req.body.scheduldedTime,
      //  scheduldedDate: req.body.scheduldedDate,
        remarks: req.body.remarks,
        markas: req.body.markas,
        leadStatus: req.body.leadStatus,
      //  followupTime: req.body.followupTime,
      //  followupDate: req.body.followupDate,
      //  information: req.body.information,
        dealsize: req.body.dealsize,
        flag:req.body.flag,
        flagSchedulded:req.body.flagSchedulded
    };
    Leads.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in unqualified Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/leads/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Leads Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/schedulded/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in schedulded Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/followup/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in followup Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.delete('/customers/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in customers Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/unqualified/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Leads.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in unqualified Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});









// => localhost:3000/Leads/ 
router.get('/leads', (req, res) => {
    Leads.find({$and:[{"flag" : "0"},{ $or : [{"flagSchedulded":"0"},{"flagSchedulded":null}]} ]},(err, docs) => {
       // Leads.find({"flag" : "0"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/followup', (req, res) => {
    Leads.find({"flag" : "1"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/customers', (req, res) => {
    Leads.find({"flag" : "2"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.get('/unqualified', (req, res) => {
    Leads.find({"flag" : "3"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Leads :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;