const express = require('express')
const authenRoutes = express.Router()
const  upload  = require('../middleware/multer')
const { companyInvite, inviteVerify, inviteAccept,  EmployeeOrHrInvite } = require('../controller/invite.controller')
const jwtVerify = require('../middleware/jwtVerify')
const { attendenceAdd, attendenceGet, approvalStatusChanged, attendenceRequestGet, markUnAttended } = require('../controller/attendence.controller')
const { fetchAllUsers, updatedSalary } = require('../controller/user.controller')
const { companiesGet, companiesNotInviteAccept } = require('../controller/campany.controller')
const { getUserLeave, createALeave, updateLeaveStatus, getLeavesRequests } = require('../controller/leave.controller')


// 1: ------------------------ Invites Routes --------------------------------

// This Route For Company Invite Create is Call By Owner;
authenRoutes.post('/companyCreateInvite', upload.single('companyLogo'), jwtVerify, companyInvite)

// This Route For Company Invite Create is Call By Owner;
authenRoutes.post('/HrOrEmployeeInvite', jwtVerify, EmployeeOrHrInvite)

// This Route chcek the Invite Token Is verify if yes to process the next step add in company
authenRoutes.get('/invite/verify/:id', inviteVerify)


// Invite Accept Every Role Admin Hr Employeee
authenRoutes.post('/invite/accept', inviteAccept)


// 2: ------------------------ Attendence Routes --------------------------------

// Attendence Add 
authenRoutes.post('/attendenceAdd', jwtVerify, attendenceAdd)

// Attendece Get
authenRoutes.get('/attendenceGet', jwtVerify, attendenceGet)

authenRoutes.get('/attendenceRequestGet', jwtVerify, attendenceRequestGet)

// attendence Approved Status Changed Admin / Hr
authenRoutes.post('/attendenceAppproval', jwtVerify, approvalStatusChanged )

// Mark UnAttended Attendence Throw Systen 
authenRoutes.get('/markUnAttended', jwtVerify, markUnAttended) 




// 3: ------------------ Manage Staff Routes ----------------------
//  fetch all Users collection print
authenRoutes.get('/fetchAllUsers', jwtVerify, fetchAllUsers)

// Updated Salary Route
authenRoutes.post('/updateSalary', updatedSalary)


// ------------------ Companies Routes ------------------------------ 

// 1: Get All comapnies and show the owner dashboard
authenRoutes.get('/getCompanies', companiesGet)

// 2: Get all Companies that Not Invite  Accept List
authenRoutes.get('/companyInviteNotAccept', companiesNotInviteAccept)


// ------------------- Leaves Routes --------------------------------
// get User Leaves 
authenRoutes.get('/getUserLeave', jwtVerify, getUserLeave)

// get Leaves Request 
authenRoutes.get('/getLeavesRequests', jwtVerify, getLeavesRequests)

// Create a  Leave
authenRoutes.post('/createALeave', jwtVerify, createALeave)


// Update Leave Status
authenRoutes.post('/updateALeave', jwtVerify, updateLeaveStatus)



module.exports = authenRoutes;