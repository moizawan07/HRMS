const salaryModel = require("../models/salary");

// Salary Pay
const salaryPay = async (req, res) => {
  let { userId, companyId, baseSalary, date } = req.body;
  let salaryDate = new Date(date);
  let salaryMonth = salaryDate.getMonth();
  let salaryYear = salaryDate.getFullYear();

 

  try {
    // 1: Check already paid or not
    let alreadyPaid = await salaryModel.findOne({
      userId,
      companyId,
      $expr: {
        $and: [
          { $eq: [{ $month: "$salaryDate" }, salaryMonth + 1] },
          { $eq: [{ $year: "$salaryDate" }, salaryYear] },
        ],
      },
    });

   

    if (alreadyPaid) {
      return res.status(400).json({ message: "This Month Salary already You Paid" });
    }

    const salaryPaid = await salaryModel.create({
      userId,
      companyId,
      baseSalary,
      salaryDate: date,
      generated: req.user.userRole,
    });

    res.status(201).json({ message: "Sucessfully Paid" });
  } catch (error) {
    console.log("catch ==>", error);

    res.status(500).json({ message: "Server Error" });
  }
};

const getSalaries = async(req, res) => {
  let {companyId} = req.params
  try{
    let allSalaries = await salaryModel.find({companyId: companyId})

    console.log("moiz ==>", companyId);
    

    res.status(200).json({message : 'Sucess', data : allSalaries})
  }
  catch(error){
    res.status(500).json({message : 'Server error'})
  }
}

module.exports = { salaryPay, getSalaries };
