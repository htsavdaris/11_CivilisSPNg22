export class User {
    public flduserid;
    public fldlastname;
    public fldfirstname;
    public fldlogin;
    public fldpassword;
    public fldemail;
    public fldmobile;
    public fldpersonid;
    public fldcreatedby;
    public fldupdatedby;
    public fldcreatedat;
    public fldupdatedat;

    constructor(){
        this.flduserid  = 0;
        this.fldlastname  = '';
        this.fldfirstname  = '';
        this.fldlogin  = '';
        this.fldpassword  = '';
        this.fldemail  = '';
        this.fldmobile  = '';
        this.fldpersonid  = 0;
        this.fldcreatedby  = 0;
        this.fldupdatedby  = 0;
        this.fldcreatedat  = new Date();
        this.fldupdatedat  = new Date();
    }

    setValues(flduserid: number, fldlastname: string, fldfirstname: string, fldlogin: string, fldpassword: string, fldemail: string, fldmobile: string, fldpersonid: number ): void {
        this.flduserid = flduserid;
        this.fldlastname = fldlastname;
        this.fldfirstname = fldfirstname;
        this.fldlogin = fldlogin;
        this.fldpassword = fldpassword;
        this.fldemail = fldemail;
        this.fldmobile = fldmobile;
        this.fldpersonid = fldpersonid;
    }
}