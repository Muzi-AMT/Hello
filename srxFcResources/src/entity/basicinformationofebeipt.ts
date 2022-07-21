//养老保险人员基本情况申报表
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class basicinformationofebeipt {
    @PrimaryGeneratedColumn()
    basicinformationOfEBEIPTId:number //Id

    @Column({nullable:true})
    basicinformationOfEBEIPTSocialSecurityNumber:string //社保编号

    @Column({nullable:true})
    basicinformationOfEBEIPTUnit:string //申报单位

    @Column({nullable:true})
    basicinformationOfEBEIPTTheReportTime:string //报表时间

    @Column({nullable:true})
    basicinformationOfEBEIPTName:string //姓名

    @Column({nullable:true})
    basicinformationOfEBEIPTIDCard:string  //身份证号码

    @Column({nullable:true})
    basicinformationOfEBEIPTSex:string//性别

    @Column({nullable:true})
    basicinformationOfEBEIPTNation:string //民族

    @Column({nullable:true})
    basicinformationOfEBEIPTStandardOfCulture:string//文化程度

    @Column({nullable:true})
    basicinformationOfEBEIPTDOB:string//出生日期

    @Column({nullable:true})
    basicinformationOfEBEIPTPIN:string //个人身份

    @Column({nullable:true})
    basicinformationOfEBEIPTYears:string //参保年月

    @Column("decimal",{nullable:true})
    basicinformationOfEBEIPTDeemedPayment:number//视同缴费

    @Column({nullable:true})
    basicinformationOfEBEIPTEmploymentForm:string //用工形式

    @Column({nullable:true})
    basicinformationOfEBEIPTCategory:string //户口性质

    @Column({nullable:true})
    basicinformationOfEBEIPTPresentAddress:string //现住址

    @Column({nullable:true})
    basicinformationOfEBEIPTIMW:string//农民工标识

    @Column({nullable:true})
    basicinformationOfEBEIPTTime:string //建立个人账户时间
}