/* eslint-disable no-console */
var { Reparation } = require("../Model/ReparationModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.countReparations = async (res) => {
  try {
    let data = await Reparation.find();
    return data.length;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getReparation = async (id, res) => {
  try {
    let data = await Reparation.findOne({ _id: ObjectID(id) });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.createReparation = async (reparation, res) => {
  try {
    let data = await Reparation.create(reparation);
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.updateReparation = async (id, reparation, res) => {
  try {
    let data = await Reparation.findOneAndUpdate({ _id: ObjectID(id) }, reparation, {
      new: true,
      runValidators: true,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.deleteReparation = async (id, res) => {
  try {
    let data = await Reparation.findOneAndDelete({
      _id: ObjectID(id),
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.reparationTypeVoiture = async (type) => {
  try {
    let data = await Reparation.find({
      type_voiture: type,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.getReparations = async (off,lim,res) => {
  try {
    let data = await Reparation.find().skip(Number(off)).limit(Number(lim));
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};