// 保险缴纳信息
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  insurancepaymentinformation{

    @PrimaryGeneratedColumn()
    insurancepaymentinformationEUID: number;  //档案编号

    @Column()
    insurancepaymentinformationName :string; //姓名

    @Column()
    insurancepaymentinformationUnit :string; //单位

    @Column("decimal",{
        nullable: true
    })
    insurancepaymentinformationPersonage :number; //证卡费

    @Column("decimal",{
        nullable: true
    })
    insurancepaymentinformationTheCardFee :number; //管理费

    @Column("decimal",{
    nullable: true
    })
    insurancepaymentinformationTotal :number; //合计

    @Column({
        nullable: true
    })
    insurancepaymentinformationTradeName :string; //企业名称
}