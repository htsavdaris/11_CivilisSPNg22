/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Person {
    public fldpersonid:number = 0;
    public fldpersonlastname : string = "";
    public fldpersonfirstname : string = "";
    public fldpersongender : string = "";
    public fldpersonprefix : string = "";
    public fldpersonstreet1: string = "";
    public fldpersonnumber1 : string = "";
    public fldpersontk1 : string = "";
    public fldpersonmobile : string = "";
    public fldpersonemail : string = "";

    public fldprofession : string = "";
    public fldxorikidomiid : string = "";
    public flddatasource : string = "";
    public fldcomment : string = "";
    public fldcity : string = "";
    public fldofficevisit : boolean = false;
    public fldcommunucationconsent : boolean = false;
    public fldmobilizationconsent : boolean = false;

    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();

    constructor(){
        this.fldpersonid= 0;
        this.fldpersonlastname  = "";
        this.fldpersonfirstname  = "";
        this.fldpersongender  = "";
        this.fldpersonprefix  = "";
        this.fldpersonstreet1 = "";
        this.fldpersonnumber1  = "";
        this.fldpersontk1  = "";
        this.fldpersonmobile  = "";
        this.fldpersonemail  = "";
    
        this.fldprofession  = "";
        this.fldxorikidomiid  = "";
        this.flddatasource  = "";
        this.fldcomment  = "";
        this.fldcity  = "";
        this.fldofficevisit   = false;
        this.fldcommunucationconsent   = false;
        this.fldmobilizationconsent   = false;
    
        this.fldcreatedby  = 0;
        this.fldupdatedby  = 0;
        this.fldcreatedat  = new Date();
        this.fldupdatedat  = new Date();
    }

}
