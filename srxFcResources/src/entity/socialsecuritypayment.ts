//代理企业社保缴费收纳表
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class socialsecuritypayment  {

    //Id
    @PrimaryGeneratedColumn()
    administratorId:number;

    @Column({nullable:true})
    pensioncontributionDate:string;// 养老缴费日期

    @Column("float", {default: 0, nullable: true})
    endowmentcontributionamount:number;// 养老缴费金额

    @Column({nullable:true})
    pensionpaymentmonth:string;// 养老缴费所属月

    @Column({nullable:true})
    pensioncontributiontmonth:string;// 养老缴费备注


    @Column({nullable:true})
    unemploymentcontributionDate:string;// 失业缴费日期

    @Column("float", {default: 0, nullable: true})
    unemploymentcontributionamount:number;// 失业缴费金额

    @Column({nullable:true})
    unemploymentpaymentmonth:string;// 失业缴费所属月

    @Column({nullable:true})
    unemploymentcontributiontmonth:string;// 失业缴费所备注



    @Column({nullable:true})
    medicalcontributionDate:string;// 医疗缴费日期

    @Column("float", {default: 0, nullable: true})
    medicalcontributionamount:number;// 医疗缴费金额

    @Column({nullable:true})
    medicalpaymentmonth:string;// 医疗缴费所属月

    @Column({nullable:true})
    medicalcontributiontmonth:string;// 医疗缴费备注


    @Column({nullable:true})
    accumulationcontributionDate:string;// 公积金缴费日期

    @Column("float", {default: 0, nullable: true})
    accumulationcontributionamount:number;// 公积金缴费金额

    @Column({nullable:true})
    accumulationpaymentmonth:string;// 公积金缴费所属月

    @Column({nullable:true})
    accumulationcontributiontmonth:string;// 公积金缴费备注


    @Column({nullable:true})
    occupationalcontributionDate:string;// 工伤缴费日期

    @Column("float", {default: 0, nullable: true})
    occupationalcontributionamount:number;// 工伤缴费金额

    @Column({nullable:true})
    occupationalpaymentmonth:string;// 工伤缴费所属月

    @Column({nullable:true})
    occupationalcontributiontmonth:string;// 工伤缴费备注


    @Column({nullable:true})
    salarycontributionDate:string;// 工资缴费日期

    @Column("float", {default: 0, nullable: true})
    salarycontributionamount:number;// 工资缴费金额

    @Column({nullable:true})
    salarypaymentmonth:string;// 工资缴费所属月

    @Column({nullable:true})
    salarycontributiontmonth:string;// 工资缴费备注

    @Column()
    corporateInformationTradeName: string;//企业名称

    @Column("float", { nullable: true})
    security:number // 	社保小计

    @Column("float", { nullable: true})
    balance:number // 	本月社保余额

    @Column("float", { nullable: true})
    Pay:number // 	本月工资余额

    @Column("float", { nullable: true})
    cumulative:number // 	本月累计余额

}