//社保费用表
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class socialsecurityexpense {
    //Id
    @PrimaryGeneratedColumn()
    socialsecurityexpenseId: number;

    //日期
    @Column({nullable: true})
    socialsecurityexpenseDate: string;

    //年缴费工资基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseACWageBase: number;

    //年缴费后调基数
    @Column("float", {default: 0, nullable: true})
        socialsecurityexpenseBaseAdjustment: number;

    //养老保险缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseEICbase: number;

    //养老保险后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseEIALater: number;

    //养老保险标识
    @Column({nullable: true})
    socialsecurityexpenseEILabel: string;

    //养老保险单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseEIUPProportion: number;

    //养老保险单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAICEInsurance: number

    //养老保险后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAUAAEInsurance: number

    //养老保险个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePEIPIndividual: number;

    //养老保险个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAOICEOInsurance: number

    //养老保险后调个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAAIPAEInsurance: number

    //养老保险合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTPEInsurance: number

    //养老保险合计缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTCAEInsurance: number

    //养老保险后调合计金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPIAAdjustment: number

    //医疗保险缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseMICBase: number;

    //医疗保险后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseMIBAdjustment: number;

    //医疗保险单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseMIUPProportion: number;

    //医疗保险单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPMIUnit: number

    //医疗保险后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAUAAMInsurance: number

    //医疗保险个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseMIICRatio: number;

    //医疗保险个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAICMInsurance: number

    //医疗保险后调个人金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPAAMInsurance: number

    //医疗保险合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTPMInsurance: number

    //医疗保险合计缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTCMInsurance: number

    //医疗保险后调合计金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseMIATotal: number

    //大病统筹缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTOPBSBiseases: number;

    //大病统筹后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseASIOABase: number;

    //大病统筹单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePSIPUnit: number;

    //大病统筹单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPMDCUnit: number

    //大病统筹后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseASIOAUAmount: number

    //大病统筹个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseSIIPProportion: number;

    //大病统筹个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseMIPIPAmount: number

    //大病统筹后调个人金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPAASIWhole: number

    //大病统筹合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePOPSDiseases: number

    //大病统筹合计缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPSDiseases: number

    //大病统筹后调合计金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseATASIAOPlanning: number

    //生育保险缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseCBMInsurance: number;

    //生育保险后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseBIABAfter: number;

    //生育保险单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePMIUnits: number;

    //生育保险单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPBMIUnit: number

    //生育保险后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAUAABInsurance: number

    //生育保险个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePIPMInsurance: number;

    //生育保险个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseICMInsurance: number

    //生育保险后调个人金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAIAABInsurance: number

    //生育保险合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePOMInsurance: number

    //生育保险合计缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTPOMInsurance: number

    //生育保险后调合计金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAAMInsurance: number

    //工伤保险缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseBICIContributions: number;

    //工伤保险后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseICIBAdjustment: number;

    //工伤保险单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePICIUnits: number;

    //工伤保险单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPIIIIUnit: number;

    //工伤保险后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseIIIAUAmount: number;

    //工伤保险报表比例%
    @Column("float", {nullable: true})
    socialsecurityexpensePICIStatements: number;

    //工伤保险个人代缴比例%
    @Column("float", {nullable: true})
    socialsecurityexpenseICIICRatio: number;

    //工伤保险个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseIIIICAmount: number;

    //工伤保险后调个人金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPAAWIInsurance: number;

    //工伤保险合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTPIIInsurance: number;

    //工伤保险合计缴纳金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTPAIIInsurance: number;

    //工伤保险后调金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAAWIInsurance: number;

    //失业保险缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseUICBase: number;

    //失业保险后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseUIBWRBack: number;

    //失业保险单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseUIUPProportion: number;

    //失业保险单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPUIUnit: number;

    //失业保险后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAUAAUInsurance: number;

    //失业保险个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseUIICRatio: number;

    //失业保险个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseUIICAmount: number;

    //失业保险后调个人金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPAAUInsurance: number;

    //失业保险合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTPUInsurance: number;

    //失业保险合计缴费金额
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTCUInsurance: number;

    //失业保险后调合计缴费金额
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseATAUIPayment: number;

    //住房公积金缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseHAFPBase: number;
    //住房公积后调基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseHRBAdjustment: number;

    //住房公积单位代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePPHUnits: number;

    // 住房公积金单位带缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseHAFPAmount: number;

    //住房公积金后调单位金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseHAFAAUAmount: number;

    //住房公积个人代缴比例%
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpensePHRPIndividuals: number;

    //住房公积个人缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAPIHReserves: number;

    //住房公积个后调人金额
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseHRATAmount: number;

    //住房公积合计比例
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseTPHReserves: number;

    //住房公积合计合计缴费金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseHRTTAPayment: number;

    //住房公积合计后调合计金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAHRAATotal: number;
    //管理费缴费基数
    @Column("float", {default: 0, nullable: true})
    socialsecurityexpenseManagementFPBase: number;

    //管理费单位代缴金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseAMFPUnit: number;

    //管理费合计缴纳金额
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAMFPaid: number;

    //社保平均工资
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseASSWage: number;

    //公积金工资
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpensePFSalary: number;

    //单位代缴金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPUit: number;

    //后调单位金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTUALater: number;

    //个人缴费金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPIndividuals: number;

    //后调个人金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTPAALater: number;

    //合计缴费金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPTAPayment: number;

    //后调缴费金额合计
    @Column("float", {default: 0.00, nullable: true})
    socialsecurityexpenseTAPAAdjustment: number;

    // 身份证号
    @Column()
    employeeregistrationformIDNumber: string;

    //企业名称
    @Column()
    corporateInformationTradeName: string;

    //档案编号
    @Column()
    employeeregistrationformFileNumber:string;

    //姓名
    @Column()
    employeeregistrationformName:string;

    //医保
    @Column({nullable:true})
    medicalinsurance:number

    //合计
    @Column("float", { nullable: true})
    total: number;


}