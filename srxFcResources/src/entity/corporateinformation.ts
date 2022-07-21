// 企业信息
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class corporateinformation   {

    @PrimaryGeneratedColumn()  //企业信息ID
    corporateInformationId: number;

    @Column()
    corporateInformationTradeName: string;   //企业名称

    @Column()
    corporateInformationBusinessLicenseCode:string; //营业执照编码

    @Column()
    corporateInformationLawPerson:string; //法人代表

    @Column()
    corporateInformationOfficeTel:string; //办公电话

    @Column()
    corporateInformationRegisteredAddress:string; //注册地址

    @Column()
    corporateInformationBusinessAddress:string; //经营地址

    @Column()
    corporateInformationSubordinateToTheBlock:string; //所属区块

    @Column()
    corporateInformationRegisterDate:string; //成立日期

    @Column()
    corporateInformationRegisterMoney:string; //注册资金

    @Column()
    corporateInformationCurrentHeadcount:string; //员工人数

    @Column("int")
    corporateInformationWagesPaying:number;//代发工资 0否  1是

    @Column()
    corporateInformationGinsengIsPlanted:string; //参保险种

    @Column({nullable:true})
    corporateInformationMail:string; //企业邮箱

    @Column()
    corporateInformationBankOfDeposit:string; //开户银行

    @Column("bigint")
    corporateInformationBankAccount:number; //银行账号

    @Column("text")
    corporateInformationEnterpriseProfile:string; //企业简介

    //社保企业登记号
    @Column({
        nullable: true
    })
    SocialSecurity:string;

    @Column({nullable:true})
    fileremarks:string; //取档案备注

    @Column({nullable:true})
    unitime:string; //解除该单位时间

    @Column({nullable:true})
    liftreason:string; //解除原因

}
