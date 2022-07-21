//解除劳动合同证明
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class certificatelaborcontract   {

    @PrimaryGeneratedColumn()
    certificatelaborcontractId:number;   //id

    @Column()
    employeeregistrationformFileNumber:string;//档案编号

    @Column()
    certificatelaborcontractName: string;  //姓名

    @Column()
    certificatelaborcontractSex: string;  //性别

    @Column()
    certificatelaborcontractBirthday:string //出生年月

    @Column()
    employeeregistrationformIDNumber:string // 身份证号

    @Column({nullable:true})
    certificatelaborcontractSSNumberContractTerm:string // 社会保障号

    @Column({nullable:true})
    certificatelaborcontractContractPeriodRise:string // 合同期限（起）

    @Column({nullable:true})
    certificatelaborcontractContractPeriodStop:string // 合同期限（止）

    @Column({nullable:true})
    certificatelaborcontractReasonTermination:string // 终止（解除）劳动合同原因的终止合同原因

    @Column({nullable:true})
    certificatelaborcontractBasisTermination:string // 终止（解除）劳动合同原因的终止合同依据

    @Column({nullable:true})
    certificatelaborcontractEdittime:string // 主要简历的参保时间

    @Column()
    certificatelaborcontractTerminationTime:string // 终止（解除）劳动合同时间

    @Column({nullable:true})
    certificatelaborcontractPartySignature:string // 甲方签章

    @Column({nullable:true})
    certificatelaborcontractVCSignature:string // 乙方签章

    @Column()
    certificatelaborcontractOperationTime:string // 操作记录（时间）

    @Column()
    certificatelaborcontractRemark:string // 备注

    @Column()
    corporateInformationTradeName: string; //公司名称

}
