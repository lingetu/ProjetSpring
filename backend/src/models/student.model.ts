import { Schema, model } from "mongoose";

export interface Student{
    id: string;
    name: string;
    numberStudent:number;
    password: string;
    typeProfile: string;
    
    

}

export const StudentSchema = new Schema<Student>({


    name:{ type:String, required: true},
    numberStudent:{ type:Number, required: true},
    password:{ type:String, required: true},
    typeProfile:{type :String ,required:true},
    
    
},{
    timestamps : true,

    toJSON:{
        virtuals : true
    },
    toObject:{
        virtuals : true
    }
}
) ;


export const StudentModel = model<Student>('student', StudentSchema);