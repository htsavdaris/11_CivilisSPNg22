import { vwCase } from "./vwcase";
export class Case {
    public fldcaseid: number = 0; 
    public fldcasetitle: string = "";
    public fldcasetypeid: number = 0;
    public fldcasedescription: string = "";
    public fldcaseopendate: Date = new Date();
    public fldcasestatusid: number = 0; 
    public fldcomments: string = ""; 
    public fldintermediateid: number = 0;
    public fldintermediaterdetails: string = "";
    public fldbeneficiaryid: number = 0;
    public fldbeneficiarydetails:string = "";
    public fldmanagerid: number = 0;
    public fldconfidential: boolean = false;
    public fldentityid: number = 0;
    public fldentitycontactid: number = 0;
    public fldreceptionid :number = 0;
    public fldcreatedby: number = 0;
    public fldupdatedby: number = 0;
    public fldcreatedat: Date = new Date();
    public fldupdatedat: Date = new Date();

    constructor(){
      this.fldcaseid = 0;
        this.fldcasetitle =  "";
        this.fldcasetypeid =  0;
        this.fldcasedescription = "";
        this.fldcaseopendate =  new Date();
        this.fldcasestatusid =  0 ;
        this.fldcomments = "" ;
        this.fldintermediateid = 0 ;
        this.fldintermediaterdetails ="" ;
        this.fldbeneficiaryid =  0 ;
        this.fldbeneficiarydetails ="" ;
        this.fldmanagerid = 0 ;
        this.fldconfidential =false ;
        this.fldentityid =  0 ;        
        this.fldentitycontactid =0 ;
        this.fldreceptionid =0 ;
        this.fldcreatedby =  0;
        this.fldupdatedby =  0;
        this.fldcreatedat =  new Date();
        this.fldupdatedat =  new Date();
    }
    
    public setValuesFromViewCase(caseView: vwCase) :void {
        this.fldcaseid = caseView.fldcaseid;
        this.fldcasetitle = caseView.fldcasetitle || "";
        this.fldcasetypeid = caseView.fldcasetypeid || 0;
        this.fldcasedescription = caseView.fldcasedescription  || "";
        this.fldcaseopendate = caseView.fldcaseopendate || new Date();
        this.fldcasestatusid = caseView.fldcasestatusid || 0 ;
        this.fldcomments = caseView.fldcomments || "" ;
        this.fldintermediateid = caseView.fldintermediateid || 0 ;
        this.fldintermediaterdetails = caseView.fldintermediaterdetails || "" ;
        this.fldbeneficiaryid = caseView.fldbeneficiaryid || 0 ;
        this.fldbeneficiarydetails = caseView.fldbeneficiarydetails || "" ;        
        this.fldmanagerid = caseView.fldmanagerid || 0 ;
        this.fldconfidential = caseView.fldconfidential || false ;
        this.fldentityid = caseView.fldentityid || 0 ;        
        this.fldentitycontactid = caseView.fldentitycontactid || 0 ;
        this.fldreceptionid = caseView.fldreceptionid || 0 ;
        this.fldcreatedby = caseView.fldcreatedby || 0;
        this.fldupdatedby = caseView.fldupdatedby || 0;
        this.fldcreatedat = caseView.fldcreatedat || new Date();
        this.fldupdatedat = caseView.fldupdatedat || new Date();
       
      }

}
