// 养老保险
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  oldageinsurance{

    @PrimaryGeneratedColumn()
    oldageinsuranceID: number;  // 养老保险ID

    @Column({default:0})
    oldageinsuranceBase :string; //基数

    @Column({nullable:true})
    oldageinsuranceUnit :string; //单位

    @Column({nullable:true})
    oldageinsurancePersonage :string; //个人

    @Column({
        nullable: true
    })
    corporateInformationTradeName :string; //企业名称

    @Column({
        nullable:true
    })
    oldageinsuranceInsuranceNumber :string; //养老保险保险编号

    @Column({
        nullable:true
    })
    oldageinsuranceToDate :string; //养老保险参加日期

    @Column({nullable:true})
    oldageinsuranceGoDate :string //养老保险转入日期

    @Column()
    employeeregistrationformIDNumber:string;//身份证号
}

