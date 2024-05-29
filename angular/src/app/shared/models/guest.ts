import { IEvent } from "../interfaces/IEventCreation";
export class Guest{
    id!: number;
   company!:string;
    password!: string;
    email!: string;
    name!: string;
    adresse!:string;
    event !: IEvent[];

}
