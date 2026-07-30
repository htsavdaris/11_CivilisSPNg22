export class EklogikiDomi {
    public flddomiid: string = ""; 
    public fkddomitypeid: number = 0;
    public fldperigrafi: string = "";

    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();

    constructor(){
        this.flddomiid = "";
        this.fkddomitypeid = 0;
        this.fldperigrafi = "";
    }
}
