/* eslint-disable no-console */
var { Depense } = require("../Model/DepenseModel");

exports.getDepenses = async (res) => {
  try {
    let data = await Depense.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getDepense = async (id) => {
  try {
    let data = await Depense.findOne({ _id: id });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.createDepense = async (depense) => {
  try {
    let data = await Depense.create(depense);
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
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
    res.status(404).json({ msg: er.message });
  }
};

exports.deleteDepense = async (id, res) => {
  try {
    let data = await Depense.findOneAndDelete({
      _id: id,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
