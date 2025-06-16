const express = require('express')
const authenRoutes = express.Router()
const  upload  = require('../middleware/multer')
const { companyInvite, inviteVerify, inviteAccept } = require('../controller/invite.controller')




// This Route For Company Invite Create is Call By Owner;
authenRoutes.post('/companyCreateInvite', upload.single('companyLogo'), companyInvite)

// This Route chcek the Invite Token Is verify if yes to process the next step add in company
authenRoutes.get('/invite/verify/:id', inviteVerify)

authenRoutes.post('/invite/accept', inviteAccept)





module.exports = authenRoutes;