// 社保差费表
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
    export class socialsecurityfee{

    @PrimaryGeneratedColumn()
    socialsecurityfeeID: number; // ID

    @Column()
    employeeregistrationformFileNumber:string;//档案编号

    @Column()
    employeeregistrationformName:string;//姓名

    //---------------------------五险一金一费补差个人部分---------------------------

    @Column("float",{nullable: true})
    makeupPersonalOldage: number;// 补差个人部分养老

    @Column("float",{nullable: true})
    makeupPersonalMedical: number;// 补差个人部分医疗

    @Column("float",{nullable: true})
    makeupPersonalSeriousIllness: number;// 补差个人部分大病

    @Column("float",{nullable: true})
    makeupPersonalUnemployment: number;// 补差个人部分失业

    @Column("float",{nullable: true})
    makeupPersonalProvidentfund: number;// 补差个人部分公积金

    @Column("float",{nullable: true})
    makeupPersonalSubtotal: number;// 补差个人部分小计

    //---------------------------五险一金一费补差单位部分---------------------------

    @Column("float",{nullable: true})
    makeupUnitOldage: number;// 补差单位部分养老

    @Column("float",{nullable: true})
    makeupUnitMedical: number;// 补差单位部分医疗

    @Column("float",{nullable: true})
    makeupUnitSeriousIllness: number;// 补差单位部分大病

    @Column("float",{nullable: true})
    makeupUnitGivebBirth: number;// 补差单位部分生育

    @Column("float",{nullable: true})
    makeupUnitUnemployment: number;// 补差单位部分失业

    @Column("float",{nullable: true})
    makeupUnitWorkInjury: number;// 补差单位部分工伤

    @Column("float",{nullable: true})
    makeupUnitProvidentfund: number;// 补差单位部分公积金

    @Column("float",{nullable: true})
    makeupUnitSubtotal: number;// 补差单位部分小计

    @Column("float",{nullable: true})
    differencestatement: number;// 补差合计



    // 身份证号
    @Column()
    employeeregistrationformIDNumber: string;

    //企业名称
    @Column()
    corporateInformationTradeName: string;

    //日期
    @Column({nullable: true})
    socialsecurityexpenseDate: string;


}
