const mongoose = require('mongoose');

var Leads = mongoose.model('Leads', {
    name: { type: String },
    phoneNumber: { type: String },
    emailId: { type: String },
    message:{ type: String },
    organization: { type: String },
    scheduldedTime: { type: String },
    scheduldedDate: { type: String },
    remarks: { type: String },
    markas: { type: String },
    leadStatus: { type: String },
    followupTime:{ type: String },
    followupDate: { type: String },
    information: { type: String },
    dealsize: { type: String },
    flag:{type:String},
    flagSchedulded:{type:String} 

// flag=0 lead | flag=1 followup | flag=2 customer | flag=3 unqualfied
 //flagSchedulded=1 schedulded  | flagSchedulded=0 not-schedulded
});

module.exports = { Leads };