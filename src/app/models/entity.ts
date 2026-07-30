export class Entity {
    public fldentityid: number = 0; 
    public fldentityname: string = "";
    public fldentitytypeid: number = 0;
    public fldaddress: string = "";
    public fldnumber: string = "";    
    public fldtk: string = "";
    public fldcity: string = "";
    public fldcountry: string = "";
    public fldfixedphone: string = "";
    public fldmobile: string = "";
    public fldmail: string = "";
    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();


    constructor(){
        this.fldentityid = 0;
        this.fldentityname = "";
        this.fldentitytypeid = 0;
        this.fldaddress = "";
        this.fldnumber = "";
        this.fldtk = "";
        this.fldcity = "";
        this.fldcountry = "";
        this.fldfixedphone = "";
        this.fldmobile = "";
        this.fldmail = "";

        this.fldcreatedby = 0;
        this.fldupdatedby = 0;
        this.fldcreatedat = new Date();
        this.fldupdatedat = new Date();
    }
}
