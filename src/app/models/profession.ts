export class Profession {
     public fldprofessionid:number = 0;
    public fldprofessionname : string = "";
    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();


       constructor(){
        this.fldprofessionid= 0;
        this.fldprofessionname  = "";
        this.fldcreatedby  = 0;
        this.fldupdatedby  = 0;
        this.fldcreatedat  = new Date();
        this.fldupdatedat  = new Date();
       }
}
