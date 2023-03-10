/* eslint-disable no-console */
var { Depense } = require("../Model/DepenseModel");

exports.getDepenses = async (page,pageNumber,res) => {
  try {
    pageNumber = pageNumber || 2;
    page = page || 0;
    let data = await Depense.find();
    const total = data.length;
    let totalPage = Math.floor(Number(total) / pageNumber);
    if (Number(total) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    return {
      totalPage : totalPage,
      page:page,
      pageNumber : pageNumber,
      depense : await Depense.find().skip(Number(page)*pageNumber).limit(Number(pageNumber))
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getDepense = async (id, res) => {
  try {
    let data = await Depense.findOne({ _id: id });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

exports.createDepense = async (depense, res) => {
  try {
    if (!depense.date) {
      depense.date = new Date(Date.now());
    }
    let data = await Depense.create(depense);
    return data;
  } catch (err) {
  }
};

exports.updateDepense = async (id, depense, res) => {
  try {
    let data = await Depense.findOneAndUpdate({ _id: id }, depense, {
      new: true,
      runValidators: true,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

exports.deleteDepense = async (id, res) => {
  try {
    let data = await Depense.findOneAndDelete({
      _id: id,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

// depense par mois
exports.depense = async (année) => {
  année = Number(année);
  const varMatchDepense = {
    $match: {
      year: année,
    },
  };
  const varProjectDepense = {
    $project: {
      year: { $year: "$date" },
      montant: 1,
      month: { $month: "$date" },
    },
  };
  const varGroupDepense = {
    $group: {
      _id: "$month",
      depense: {
        $sum: "$montant",
      },
    },
  };
  const depense = await Depense.aggregate([
    varProjectDepense,
    varMatchDepense,
    varGroupDepense,
  ]);
  return depense;
};
