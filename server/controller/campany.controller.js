let companiesModel = require('../models/company')
let inviteModel = require('../models/invite')

const companiesGet = async (req, res) => {
  try {
    const companiesData = await companiesModel.find().populate('adminId', 'firstName email').sort({ createdAt: -1 });;

    res.status(200).json({ message: 'Success', data: companiesData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Companies Invites collection get (jis jis companies ne abhi tk invite accpet nhii ki)

const companiesNotInviteAccept = async (req, res) => {
  try{
    let data = await inviteModel.find({ companySize: { $exists: true } }).sort({ createdAt: -1 });

    res.status(200).json({message : 'Sucess', data})
  }
  catch(error){
    res.status(500).json({message : 'Server Error'})
  }
}


module.exports = {companiesGet, companiesNotInviteAccept}