/* eslint-disable no-console */
var { Reparation } = require('../Model/ReparationModel');

exports.getReparations = async (res) => {
    try {
      let data = await Reparation.find();
      return data;
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  };
  
  exports.getReparation = async (id) => {
    try {
      let data = await Reparation.findOne({ _id: id });
      return data;
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  };
  
  exports.createReparation = async (reparation) => {
    try {
      let data = await Reparation.create(reparation);
      return data;
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  };
  
  exports.updateReparation = async (id, reparation , res) => {
    try {
      let data = await Reparation.findOneAndUpdate(
        { _id: id},
        reparation,
        {
          new: true,
          runValidators: true,
        }
      );
      return data;
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  };
  
  exports.deleteReparation = async (id , res) => {
    try {
      let data = await Reparation.findOneAndDelete({
        _id: id,
      });
      return data;
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  };