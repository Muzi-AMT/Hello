// 医疗保险
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  medicalinsurance{

    @PrimaryGeneratedColumn()
    medicalinsuranceID: number;  // 医疗保险ID

    @Column({nullable:true})
    medicalinsuranceCardinality: number;// 基数

    @Column({
        nullable:true
    })
    BasicMedicalUnit :string; //基本医疗单位

    @Column({
        nullable:true
    })
    BasicMedicalPersonage :string; //基本医疗个人

    @Column({
        nullable:true
    })
    BasicMedicalInsuranceNumber :string; //基本医疗保险编号

    @Column({
        nullable:true
    })
    BasicMedicalToDate :string; //基本医疗参加日期

    @Column({
        nullable:true
    })
    BasicMedicalgoDate :string; //基本医疗转入日期

    @Column({
        nullable:true
    })
    SPFCDUnit :string; //大病统筹单位

    @Column({
        nullable:true
    })
    SPFCDPersonage :string; //大病统筹个人

    @Column({
        nullable:true
    })
    SPFCDInsuranceNumber :string; //大病统筹保险编号

    @Column({
        nullable:true
    })
    SPFCDToDate :string; //大病统筹参加日期

    @Column({
        nullable:true
    })
    SPFCDgoDate :string; //大病统筹转入日期

    @Column({
        nullable:true
    })
    MaternityInsuranceUnit :string; //生育保险单位

    @Column({
        nullable:true
    })
    MaternityInsuranceInsuranceNumber :string; //生育保险保险编号

    @Column({
        nullable:true
    })
    MaternityInsuranceToDate :string; //生育保险参加日期

    @Column({
        nullable:true
    })
    MaternityInsurancegoDate :string; //生育保险转入日期

    @Column({
        nullable:true
    })
    EIIUnit :string; //工伤保险单位

    @Column({
        nullable:true
    })
    EIIInsuranceNumber :string; //工伤保险保险编号

    @Column({
        nullable:true
    })
    EIIToDate :string; //工伤保险参加日期

    @Column({
        nullable:true
    })
    EIITgoDate :string; //工伤保险传入日期

    @Column()
    employeeregistrationformIDNumber:string;//身份证号

    @Column({
        nullable: true
    })
    corporateInformationTradeName :string; //企业名称
}