//续订变更劳务合同表
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class renewchangelaborcontract   {

    @PrimaryGeneratedColumn()
    renewchangelaborcontract:number; //id

    @Column()
    employeeregistrationformName: string;// 姓名

    @Column({nullable:true})
    renewchangelaborcontractYear:string //续订合同年

    @Column()
    renewchangelaborcontractYue:string //日期年'

    @Column()
    renewchangelaborcontractRise:string//合同开始日期

    @Column()
    renewchangelaborcontractStop:string //续订合同止

    @Column({nullable:true})
    renewchangelaborcontractCCLContract:string //变更劳动合同内容

    @Column()
    renewchangelaborcontractTimeSigned:string //签订时间

    @Column({
        nullable:true
    })
    corporateInformationTradeName: string; //公司名称

    @Column()
    employeeregistrationformIDNumber:string;//身份证号

    @Column()
    employeeregistrationformFileNumber: string;// 档案编号



}
