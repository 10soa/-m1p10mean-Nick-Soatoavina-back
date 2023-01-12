/* eslint-disable no-console */
var { Personne } = require('../Model/PersonneModel');
var ObjectID = require( 'mongoose'). Types.ObjectId;
 
exports.index = (req, res ) => {
  Personne.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.status(500).send(err)
    }
  })
};
 
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Personne.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.searchById = (req, res) => {
  const id = req.params.id;
  res.send(`Id found : ${id}`);
}
 
exports.insert = (req, res ) => {
  const nom = req.body.nom;
  const age = req.body.age;
  const newPersonne = new Personne({nom: nom,age: age});
  newPersonne.save((err, docs) => {
    if (!err) {
      res.status(201).send(docs)
    } else {
      res.status(500).send(err)
    }
  });
}
 
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(`update with given id: ${id}`);
 
  if(!ObjectID.isValid(id)){
    return res.send(400).send(`No record with given id: ${id}`)
  }
 
  const nom = req.body.nom;
  const newPersonne = {
    nom: nom
  };
 
  Personne.findByIdAndUpdate(id, {$set: newPersonne},{new: true},(err,docs )=>{
    if(!err){
      res.status(200).send(docs)
    } else {
      console.log('Error while updating the data' + JSON.stringify(err, undefined, 2))
    }
  })
}
 
exports.delete = (req, res ) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.send(400).send(`No record with given id: ${id}`)
  }
 
  Personne.findByIdAndRemove(id, (err, docs) => {
    const result = {
      data: docs,
      message: 'Cette personne est supprimer!',
      status: 200,
    }
 
    if (!err) {
      res.status(200).send(result)
    } else {
      res.status(500).send(err)
    }
  })
}