// 社保差费表
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class socialsecuritydetail{

    @PrimaryGeneratedColumn()
    socialsecurityfeeID: number; // ID

    @Column()
    corporateInformationTradeName: string;//企业名称

    @Column({nullable: true})
    socialsecurityexpenseDate: string;//日期

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseEICbase:number;//养老保险基数

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAICEInsurance:number;//养老保险单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAOICEOInsurance: number;//养老保险个人缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAOICEOtotal: number;//养老保险合计缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseACWageBase: number;//年缴费基数

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseMICBase: number;// 医疗保险月缴费基数


    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPMIUnit: number;// 医疗保险单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAICMInsurance: number;// 医疗保险个人缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAICMIntotal: number;// 医疗保险合计缴费金额



    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPMDCUnit: number;// 大病单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseMIPIPAmount: number;// 大病个人缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseMIPIPtotal: number;// 大病合计缴费金额


    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPIIIIUnit: number;// 工伤单位缴费金额


    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPBMIUnit: number;// 生育单位缴费金额


    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseUICBase: number;// 失业保险基数

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPUIUnit: number;// 失业保险单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseUIICAmount: number;// 失业保险个人缴费金额
    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseUIICtotal: number;// 失业保险合计缴费金额




    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseHRBAdjustment: number;// 住房公积金基数

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseHAFPAmount: number;// 住房公积金单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPIHReserves: number;// 住房公积金个人缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAPIHtotal: number;// 住房公积金合计缴费金额



    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseTAPUit: number;// 小计单位缴费金额

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseTAPIndividuals: number;// 小计个人缴费金额



    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseASSWage: number;// 平均工资社保

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpensePFSalary: number;// 平均工资公积金

    @Column("decimal",{nullable:true,precision:10,scale:2})
    socialsecurityexpenseAMFPUnit: number;// 管理费


    @Column("decimal",{nullable:true,precision:10,scale:2})
    dettotal: number;// 合计

    //医保
    @Column("decimal",{nullable:true,precision:10,scale:2})
    medicalinsurance:number

    @Column("decimal",{nullable:true,precision:10,scale:2})
    chargetotal: number;// 收费合计
}
