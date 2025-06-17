const express = require('express')
const authenRoutes = express.Router()
const  upload  = require('../middleware/multer')
const { companyInvite, inviteVerify, inviteAccept,  EmployeeOrHrInvite } = require('../controller/invite.controller')
const jwtVerify = require('../middleware/jwtVerify')



// This Route For Company Invite Create is Call By Owner;
authenRoutes.post('/companyCreateInvite', upload.single('companyLogo'), companyInvite)

// This Route For Company Invite Create is Call By Owner;
authenRoutes.post('/HrOrEmployeeInvite', jwtVerify, EmployeeOrHrInvite)

// This Route chcek the Invite Token Is verify if yes to process the next step add in company
authenRoutes.get('/invite/verify/:id', inviteVerify)


// Invite Accept Every Role Admin Hr Employeee
authenRoutes.post('/invite/accept', inviteAccept)





module.exports = authenRoutes;