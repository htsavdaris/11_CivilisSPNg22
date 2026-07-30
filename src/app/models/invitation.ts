import { InvitationView } from "./invitationview";

export class Invitation {

    public fldinvitationid:number = 0;
    public fldtitle : string = "";
    public fldlocation : string = "";
    public flddatetime :Date = new Date();
    public fldhost : string = "";
    public fldentityid: number = 0;
    public fldreplied : number = 0;
    
    public fldhostpersonid : number = 0;
    public fldgopersonid : number = 0;
    public fldcomments : string = "";

    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();

    constructor() {
       this.fldinvitationid = 0
        this.fldtitle = "" ;
        this.fldlocation ="" ;
        this.flddatetime =  new Date();
        this.fldhost =  "";
        this.fldentityid = 0 ;
        this.fldreplied = 0;
        this.fldhostpersonid =  0 ;
        this.fldcomments = ""
        this.fldgopersonid =  0 ;
        this.fldcreatedby =  0 ;
        this.fldupdatedby =  0 ;
        this.fldcreatedat =  new Date();
        this.fldupdatedat =  new Date();
    }

    setValuesFromInvitationView(invitationView: InvitationView) {
        this.fldinvitationid = invitationView.fldinvitationid;
        this.fldtitle = invitationView.fldtitle ||"" ;
        this.fldlocation = invitationView.fldlocation ||"" ;
        this.flddatetime = invitationView.flddatetime || new Date();
        this.fldhost = invitationView.fldhost || "";
        this.fldentityid = invitationView.fldentityid || 0 ;
        this.fldreplied = invitationView.fldreplied || 0;
        this.fldhostpersonid = invitationView.fldhostpersonid  || 0 ;
        this.fldcomments = invitationView.fldcomments;
        this.fldgopersonid = invitationView.fldgopersonid  || 0 ;
        this.fldcreatedby = invitationView.fldcreatedby  || 0 ;
        this.fldupdatedby = invitationView.fldupdatedby  || 0 ;
        this.fldcreatedat = invitationView.fldcreatedat || new Date();
        this.fldupdatedat = invitationView.fldupdatedat || new Date();
      }

}
