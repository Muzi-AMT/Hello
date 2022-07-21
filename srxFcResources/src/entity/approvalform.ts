//审批表
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class approvalform {

    @PrimaryGeneratedColumn()
    approvalformId: number;  //审批ID

    @Column()
    approvalformLoginName: string;  //登录名

    @Column()
    approvalformLoginPassword:string //登录密码

    @Column("int",{ default:0})
    approvalformLoggingStatus:number //登录状态 0未授权  1授权

    @Column()
    approvalformHRContactPerson: string;   //人力资源联系人

    @Column()
    approvalformHRTelephone:string; //人力资源电话

    @Column()
    approvalformTradeName: string;   //企业名称

    @Column()
    approvalformBusinessLicenseCode:string; //营业执照编码

    @Column()
    approvalformLawPerson:string; //法人代表

    @Column()
    approvalformOfficeTel:string; //办公电话

    @Column()
    approvalformRegisteredAddress:string; //注册地址

    @Column()
    approvalformBusinessAddress:string; //经营地址

    @Column()
    approvalformSubordinateToTheBlock:string; //所属区块

    @Column()
    approvalformRegisterDate:string; //成立日期

    @Column()
    approvalformRegisterMoney:string; //注册资金

    @Column()
    approvalformCurrentHeadcount:number; //员工人数

    @Column("int")
    approvalformWagesPaying:number;//代发工资 0否  1是

    @Column()
    approvalformGinsengIsPlanted:string; //参保险种

    @Column({nullable:true})
    approvalformMail:string; //企业邮箱

    @Column()
    approvalformBankOfDeposit:string; //开户银行

    @Column("bigint")
    approvalformBankAccount:number; //银行账号

    @Column("text")
    approvalformEnterpriseProfile:string; //企业简介

    @Column({nullable:true})
    approvalformMedicalInsuranceFileNo:string;// 医保档案号

    @Column({nullable:true})
    approvalformEnterpriseNumber:string;// 企业序号

    @Column({nullable:true})
    approvalformPensionNumber:string;// 养老编号

    @Column({nullable:true})
    approvalformMedicareNumber:string;// 医保编号

    @Column({nullable:true})
    approvalformProvidentFundAccount:string;// 公积金账号

    @Column({nullable:true})
    approvalformUnemploymentNumber:string;// 失业编号

    @Column({nullable:true})
    approvalformLogistics:string;// 企业简称

    @Column({nullable:true,default:0})
    approvalformOverdueUnit:string;// 过期单位  0不过期
    //
    // @Column({default:0})
    // approvalformPermissionAssignment:number;// 权限赋值  0无权

    @Column({default:0})
    approvalformReportsPreliminary:number;// 波表初值

    @Column({default:0})
    approvalformApprovalStatus:number; //审批状态 1以审批  0未审批  默认0

    @Column({nullable:true})
    fileremarks:string; //取档案备注

    @Column({nullable:true})
    unitime:string; //解除该单位时间

    @Column({nullable:true})
    liftreason:string; //解除原因


}
