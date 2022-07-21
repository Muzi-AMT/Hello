// 失业保险
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  unemploymentinsurance{

    @PrimaryGeneratedColumn()
    unemploymentinsuranceID: number;  // 失业保险ID

    @Column({
        nullable:true
    })
    unemploymentinsuranceBase :string; //基数

    @Column({
        nullable:true
    })
    unemploymentinsuranceUnit :string; //单位

    @Column({
        nullable:true
    })
    unemploymentinsurancePersonage :string; //个人

    @Column({
        nullable:true
    })
    corporateInformationTradeName :string; //企业名称

    @Column({
        nullable:true
    })
    unemploymentinsuranceInsuranceNumber :string; //失业保险保险编号

    @Column({
        nullable:true
    })
    unemploymentinsuranceToDate :string; //失业保险参加日期

    @Column({nullable:true})
    unemploymentinsurancegoDate :string //失业保险转入日期

    @Column()
    employeeregistrationformIDNumber:string;//身份证号

}
