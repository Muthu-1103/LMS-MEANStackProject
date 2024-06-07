export class Users{
    public id:Number | undefined ;
    public uname:string | undefined;
    public ps:string | undefined;
    public ph:Number | undefined;
    public em_id:string | undefined;
    constructor(id:number,uname:string,
        ps:string,ph:number,em_id:string)
        {
            this.id=id;
            this.uname=uname;
            this.ps=ps;
            this.ph=ph;
            this.em_id=em_id;

        }
}