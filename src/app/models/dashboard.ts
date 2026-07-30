export class Dashboard {
    public fldpersonid: number;
    public fldtotalcases: number;
    public fldtotalopen: number;
    public fldtotalclosed: number;
    public fldtotalsuccess: number;
    public fldtotalfail: number;
    public fldmycases: number;
    public fldmycasesopen: number;
    public fldmycasesclosed: number;
    public fldmycasessuccess: number;
    public fldmycasesfail: number;
    public fldtotalcaseslm: number;
    public fldtotalopenlm: number;
    public fldtotalclosedlm: number;
    public fldtotalsuccesslm: number;
    public fldtotalfaillm: number;
    public fldmycaseslm: number;
    public fldmycasesopenlm: number;
    public fldmycasesclosedlm: number;
    public fldmycasessuccesslm: number;
    public fldmycasesfaillm: number;
    public fldcreatedby: number;
    public fldupdatedby: number;
    public fldcreatedat: Date;
    public fldupdatedat: Date;


    constructor() {
        this.fldpersonid = 0;
		this.fldtotalcases = 0;
		this.fldtotalopen = 0;
		this.fldtotalclosed = 0;
		this.fldtotalsuccess = 0;
		this.fldtotalfail = 0;
		this.fldmycases = 0;
		this.fldmycasesopen = 0;
		this.fldmycasesclosed = 0;
		this.fldmycasessuccess = 0;
		this.fldmycasesfail = 0;
        this.fldtotalcaseslm = 0;
		this.fldtotalopenlm = 0;
		this.fldtotalclosedlm = 0;
		this.fldtotalsuccesslm = 0;
		this.fldtotalfaillm = 0;
		this.fldmycaseslm = 0;
		this.fldmycasesopenlm = 0;
		this.fldmycasesclosedlm = 0;
		this.fldmycasessuccesslm = 0;
		this.fldmycasesfaillm = 0;
		this.fldcreatedby = 0;
		this.fldupdatedby = 0;
		this.fldcreatedat =new Date();
		this.fldupdatedat = new Date();
    }
}
