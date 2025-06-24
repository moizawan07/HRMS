let companiesModel = require('../models/company')

const companiesGet = async (req, res) => {
  try {
    const companiesData = await companiesModel.find().populate('adminId', 'firstName email');

    res.status(200).json({ message: 'Success', data: companiesData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {companiesGet}