import { Router } from "express";
import asynchandller from 'express-async-handler';
import jwt from "jsonwebtoken";
import { HTTP_BAD_REQUEST } from "../constants/http.status";
import { ProfileCardDataStudent } from "../data";
import { Student, StudentModel } from '../models/student.model';

const router = Router();


//to connect to the database 


router.get("/seed", asynchandller(
   async (req ,res)=>{
   const studentCount = await  StudentModel.countDocuments();
   if(studentCount > 0){
    res.send("Seed is already done !!");
    return;
   }

   await StudentModel.create(ProfileCardDataStudent);
    res.send(" Seed is Done !");     
}))




/**------------------------Test-------------------------------- */
router.get("/", asynchandller(
    async(req ,res)=>{

        const students = await StudentModel.find();
       // console.log(students);

         res.send(students);     // to accede to the student's data.
}))



router.get("/search/:searchTerm", (req ,res)=>{  // to accede to the students data by a searchTerm

  const searchTerm = req.params.searchTerm;
  const students = ProfileCardDataStudent.filter(student => student.name.toLowerCase()
  .includes(searchTerm.toLowerCase()));
   res.send(students);       
});


router.get("/company/:entry", (req,res)=>{         // to accede to the students company by an entry .
 const  entry = req.params.entry;
 const students = ProfileCardDataStudent.filter(student => student.company.toLowerCase()
 .includes(entry.toLowerCase()));
 
 res.send(students);


});



  
  /**--------------------------STUDENT -----------------------------*/


  
  
  router.post("/loginStudent", asynchandller(
     async (req, res)=>{
        
        let user =
        {
        numberStudent:req.body.number,
        password:req.body.password,
        }
        
        

       const student = await StudentModel.find(user);
        console.log(student);
        
        if(student[0]){
            res.send(generateTokenResponse(student[0]));
        }
        else{
        
            res.status(HTTP_BAD_REQUEST).send("numero etudiant ou mot de password invalide!!")
        }
  
       
  }

  ))
  

/*
router.post("/loginStudent", (req, res)=>{

    // to test the login methode
  console.log(req.body);

 let user =
 {
  mail: req.body.mail,
  password: req.body.password,
 };   // more simple than the first example  , called Destructuring Assignment 
 const find = ProfileCardDataStudent.find(data => data.mail === user.mail &&
  data.password === user.password);
  console.log(find);

  if (find){
    console.log("connexté")
      return res.send(generateTokenResponse(user));
  }else{
      console.log("Identifiant ou mot de passe pas valid!")
      return res.status(300).send("Identifiant ou mot de passe pas valid!")
  }


})
*/

//Registration methode 
  router.post("/registerStudent", asynchandller(
    async(req, res)=>{
        const { name, numberStudent,password} = req.body;
        const student =  await StudentModel.findOne({numberStudent});
        if(student){
            res.status(HTTP_BAD_REQUEST).send("Il existe déjà un compte pour ce numéro d'étudiant!!");
            return;
        }
       // const encryptedPassword = await bcrypt.hash(password,10); //  hache the password 

        const newStudent:Student={
            id:'',
            name,
            password : password,
            numberStudent,
            typeProfile :'Student',
        }
        
        const dbStudent = await StudentModel.create(newStudent);
        res.send(generateTokenResponse(dbStudent));


  
     
  
  
  }))

  const generateTokenResponse = (user :any )=>{

    const token = jwt.sign({
        number:user.number 
    } ,
    "ThisWouldRepresenteASecretKey",
    {
        expiresIn:"30d"
    });

    user.token = token ;
    return user;

}
  
  export default router;