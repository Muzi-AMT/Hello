//住房公积金
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  housingprovidentfund{

    @PrimaryGeneratedColumn()
    housingprovidentfundID: number;  // 住房公积金ID

    @Column({
        nullable:true
    })
    housingprovidentfundBase :string; //基数

    @Column({
        nullable:true
    })
    housingprovidentfundUnit :string; //单位

    @Column({
        nullable:true
    })
    housingprovidentfundPersonage :string; //个人

    @Column({
        nullable:true
    })
    housingprovidentfundTradeName :string; //企业名称

    @Column({
        nullable:true
    })
    housingprovidentfundInsuranceNumber :string; //公积金保险编号

    @Column({
        nullable:true
    })
    housingprovidentfundToDate :string; //公积金参加日期


    @Column({nullable:true})
    housingproyvidentfundgoDate :string; //公积金转入日期

    @Column()
    employeeregistrationformIDNumber:string;//身份证号

}

