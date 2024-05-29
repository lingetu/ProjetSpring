export interface IEventCreation{
    name: string;
    date: string;
    time: string;
    hour: string;
    presentList : IPresentList[];

}
export interface IPresentList{
  id:String;
  name: string;
}
export interface IEvent{
  _id:string;
  name: string;
  date: string;
  time: string;
  hour: string;
  presentList : IPresentList[];

}
