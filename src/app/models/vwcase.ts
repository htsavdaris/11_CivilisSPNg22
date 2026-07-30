export class vwCase {
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
        public fldentityname : string = ""; 
        
        public fldentitycontactid: number = 0;
        public fldentitycontactlastname : string = "";
        public flddentitycontacfirstname : string = ""; 
        public fldentitycontactmobile : string = ""; 

        public fldreceptionid: number = 0;
       
        public fldcasetypedesc: string = ""; 
        public fldcasestatusdesc: string = "";  
        public fldlastname : string = ""; 

        public fldbeneficiarylastname : string = ""; 
        public fldbeneficiaryfirstname : string = ""; 
        public fldbeneficiarymobile : string = ""; 

        public fldintermediatelastname : string = ""; 
        public fldintermediatefirstname : string = ""; 
        public fldintermediatemobile : string = ""; 

        public fldmanagerlastname : string = ""; 
        public fldmanagerfirstname : string = ""; 
        public fldmanagermobile : string = ""; 

        public fldreceptionlastname : string = ""; 
        public fldreceptionfirstname : string = ""; 
        public fldreceptionmobile : string = ""; 

        public fldcreatedby: number = 0;
        public fldupdatedby: number = 0;
        public fldcreatedat: Date = new Date();
        public fldupdatedat: Date = new Date();
}
