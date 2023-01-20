/* eslint-disable no-console */
var { Voiture } = require("../model/VoitureModel");
var ObjectID = require("mongoose").Types.ObjectId;
var repositoryProformat = require("../repository/Proformat");

exports.getVoitures = async (res) => {
  try {
    let data = await Voiture.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* FindOne : voir si cette voiture est déjà dans la base de donné */
exports.getVoiture = async (marque,modele,numero,type_voiture,client_id,res) => {
  try{
    var unwind={$unwind: "$reparation"};
    var match ={$match : {"marque":marque,"modele":modele,"numero":numero,"type_voiture":type_voiture,"client_id": Number(client_id),"reparation.date_recuperation": null}};
    let data=await Voiture.aggregate([unwind,match]);
    return data;
  }catch(err){
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* Dépôt voiture */
exports.depotVoiture = async (marque,modele,numero,type_voiture,client_id,reparation,res) => {
    let data= await this.getVoiture(marque,modele,numero,type_voiture,client_id,res);
    if(data.length!==0){
      return "Vous n'avez pas encore récupérer la voiture :"+marque+" "+modele+" "+numero+"!";
    }
    else{
      reparation.date_deposition=new Date(Date.now());
      reparation.date_reception=null;
      reparation.montant_paye=0.0;
      console.log( reparation.liste_reparation);
      reparation.liste_reparation.map((el,index)=>{
        reparation.liste_reparation[index].avancement=0.0
      });
      var newVoiture = await Voiture({
        marque: marque,
        modele: modele,
        numero: numero,
        type_voiture: type_voiture,
        client_id: client_id,
        reparation: reparation,
      });
      newVoiture.save(function (err) {
        if (err) throw err;
      });
  }
  repositoryProformat.deleteProformat(marque,modele,numero,type_voiture,client_id,res);
};

/* liste des voiture deposées */
exports.listeVoitureDeposer= async(req,res) =>{
  try{
    var unwind={$unwind: "$reparation"};
    var match ={$match : {"reparation.date_reception": null}};
    var sort = { $sort : { "reparation.date_deposition" : 1 } }
    let data=await Voiture.aggregate([unwind,match,sort]);
    return data;
  }catch(err){
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};


/*exports.receptionVoiture= async(body,res) =>{
  try{
    let data =await Voiture.findOneAndUpdate(
      { marque: body.marque,modele: body.modele,numero: body.numero,type_voiture:body.type_voiture,client_id: body.client_id,'reparation.date_deposition':"2023-01-19T18:47:17.508+00:00"},
      {
        $set: {
          'reparation.$.date_reception': new Date(Date.now())
        }
      },{ 
        new: true
      }
     );
     return data;
  }catch(err){}
};*/

