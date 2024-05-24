
import * as bcrypt from 'bcryptjs';
import { Router } from "express";
import asynchandller from 'express-async-handler';
import jwt from "jsonwebtoken";
import { HTTP_BAD_REQUEST } from "../constants/http.status";
import { ProfileCardDataGuest } from "../data";
import { Guest, GuestModel } from '../models/guest.model';



const router = Router();
var ObjectId = require('mongodb').ObjectId; 



//to connect to the database 


router.get("/seed", asynchandller(
    async (req ,res)=>{
    const guestCount = await  GuestModel.countDocuments();
    if(guestCount > 0){
     res.send("Seed is already done !!");
     return;
    }
 
    await GuestModel.create(ProfileCardDataGuest);
     res.send(" Seed is Done !");     
 }))
 









/**------------------------Test-------------------------------- */


    router.get("/", asynchandller(
        async(req ,res)=>{
    
            const guests = await GuestModel.find();
           // console.log(students);
    
             res.send(guests);     // to accede to the student's data.
    }))



/**--------------------------GUEST -----------------------------*/


//Registration methode 
router.post("/registerGuest", asynchandller(
    async(req, res)=>{
        const { name,email,company,password} = req.body;


        const guest =  await GuestModel.findOne({email});
        if(guest){
            res.status(HTTP_BAD_REQUEST).send("Il existe déjà un compte pour ce numéro d'étudiant!!");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password,10); //  hache the password 
        let presentlistExemple = [
            {id:"651681655165",
            name:"guestExemple",
        },
        {
            id:"651681655165",
            name:"guestExemple",
        },
        {
            id:"60a7e3e3e3e3e3e3e3e3e3e3",
            name:"guestExemple",
        }

        ]
        //const encryptedPassword = await bcrypt.hash(password,10); //  hache the password 
        let eventExemple = {
            name: "eventExemple",
            date: "2021-05-25",
            time: "12:00",
            hour: "2",
            presentList: presentlistExemple,
        }
        const newGuest:Guest={
            id:'',
            name,
            email,
            company,
            password : encryptedPassword ,//password,
            typeProfile :'Guest',
            event : [eventExemple]
        }
        
        const dbGuest = await GuestModel.create(newGuest);
        res.send(generateTokenResponse(dbGuest));


  
     
  
  
  }))


//Login methode 
router.post("/loginGuest", asynchandller(
    async (req, res)=>{

       const {email,password}= req.body;
       

       const guest = await GuestModel.findOne({email});

       console.log(guest);
       if((guest && (await bcrypt.compare(password, guest.password))) || guest){

        res.send(generateTokenResponse(guest));
          }
     else{
       
           res.status(HTTP_BAD_REQUEST).send("email ou mot de password invalide!!")
       }
 
      
 }
 ))

//create an event 

 router.post("/creationEvent", asynchandller(
    async (req, res)=>{


        if(req.body.guestID.guestID == null || req.body.event == null || req.body.guestID.guestID == "" || req.body.event == "" || req.body.guestID.guestID == undefined || req.body.event == undefined || req.body.event.name == null || req.body.event.name == "" || req.body.event.name == undefined || req.body.event.date == null || req.body.event.date == "" || req.body.event.date == undefined || req.body.event.time == null || req.body.event.time == "" || req.body.event.time == undefined || req.body.event.hour == null || req.body.event.hour == "" || req.body.event.hour == undefined)
        {
            res.status(HTTP_BAD_REQUEST).send("Erreur");
        }
        
    
    
        var id = req.body.guestID.guestID;       
        var _id = new ObjectId(id);

       GuestModel.updateOne({"_id" :_id },{$push: {event: req.body.event}}).then((result:any)=>{
        res.send(generateTokenResponse(req.body.event));
    }
    ).catch((err:any)=>{
        res.status(HTTP_BAD_REQUEST).send("Erreur");
        console.log(err);
    }
    );

   

 }
 ))

    router.post("/deleteEvent", asynchandller(
        async (req, res)=>{
            console.log("DeleteEvent");
            console.log(req.body);    
        
            var id = req.body.guestID;       
            var _id = new ObjectId(id);
        
            GuestModel.updateOne({"_id" :_id },{$pull: {event: {_id: req.body.eventID}}}).then((result:any)=>{
                console.log(result);
                res.send(generateTokenResponse(result));
        }
        ).catch((err:any)=>{
            res.status(HTTP_BAD_REQUEST).send("Erreur");
            console.log(err);
        }
        );
        }
        ))

 router.post("/getGuestLive", asynchandller(
    async (req, res)=>{
        // console.log("getGuestLive");
        // console.log(req.body);    
    
        var id = req.body.guestID;       
        var _id = new ObjectId(id);


        const guest = GuestModel.findOne({"_id" :_id }).then((result:any)=>{
            // console.log(result);
            res.send(generateTokenResponse(result));
    }


    ).catch((err:any)=>{
        res.status(HTTP_BAD_REQUEST).send("Erreur");
        console.log(err);
    }
    );
 }
 ))
      
      

 


 router.post("/addStudentToEvent", asynchandller(
    async (req, res)=>{
        // console.log("getGuestLive");
        // console.log(req.body);    
    
        var idGuest = req.body.guestID;       
        var _idGuest = new ObjectId(idGuest);

        var idStudent = req.body.studentID;

        var idEvent = req.body.eventID;
        var _idEvent = new ObjectId(idEvent);

        var objstudent = {
            id: idStudent,
            name: req.body.studentNumber
        }



        const result = GuestModel.updateOne(
            { "_id": _idGuest, "event._id": _idEvent }, // Filtre pour trouver l'objet idGuest avec l'événement correspondant
            { "$push": { "event.$.presentList": objstudent } }
        ).then((result:any) => {
            // console.log(result);
            res.send(generateTokenResponse(result));
        }).catch((err:any) => {
            res.status(HTTP_BAD_REQUEST).send("Erreur");
            console.log(err);
        });
    }));



       

      
 
 router.post("/editeProfileGuest", asynchandller(async (req, res) => {
    //const { name, email, company, adresse, password } = req.body;
    console.log("req.body :") 
    //console.log(req.body);
    const {id} = req.body;   
    console.log("id :") 
    console.log(id);   
    //console.log("_id :")
    const {_id} = new ObjectId(id);
    console.log(_id);
    
    
    try {
        // Utilisez directement l'ID pour mettre à jour le document
        const updatedGuest = await GuestModel.findByIdAndUpdate(
            _id,
            { name : req.body.name, email:req.body.email, company:req.body.company, adresse:req.body.adresse },
            { new: true } // Pour retourner le document mis à jour
        );
                console.log(updatedGuest);
        if (updatedGuest) {
            //console.log("non trouve")
            res.send(generateTokenResponse(updatedGuest));
        } 
    } catch (err) {
        console.error("Erreur lors de la mise à jour du profil d'invité :", err);
        res.status(HTTP_BAD_REQUEST).send("Erreur lors de la mise à jour du profil d'invité.");
    }
}));


// Here we define a fonction for the users authentification like  in a real database

const generateTokenResponse = (user :any )=>{

    const token = jwt.sign({
        number:user.number ,
    } ,
    "ThisWouldRepresenteASecretKey",
    {
        expiresIn:"30d"
    });

    user.token = token ;
    return user;

}





export default router;





