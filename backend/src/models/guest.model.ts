import { IEventCreation, IPresentList } from './../../../angular-QRCODE-website/src/app/shared/interfaces/IEventCreation';

import { Schema, model } from "mongoose";
export interface Guest{
    id: string;
    name: string;
    password: string;
    email: string;
    typeProfile: string;
    company : string;
    event : IEventCreation[];
}

const PresentListSchema = new Schema<IPresentList>({
    id:{ type:String, required: false},
    name:{ type:String, required: false},
   
  
  });


const EventCreationSchema = new Schema<IEventCreation>({
    name:{ type:String, required: true},
    date : {type : String, required : true},
    time : {type : String, required : true},
    hour : {type : String, required : true},
    presentList : [{
        type: PresentListSchema,
        required: false,
    }]
  
  });

export const GuestSchema = new Schema<Guest>({


    name:{ type:String, required: true},
    password:{ type:String, required: true},
    email:{ type:String, required: true},
    typeProfile:{type:String },
    company:{type:String,required: true},
    event : [{type : EventCreationSchema, required : false}]
    

},{
    toJSON:{
        virtuals : true
    },
    toObject:{
        virtuals : true
    }
}
) ;


export const GuestModel = model<Guest>('guest', GuestSchema);