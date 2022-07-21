// 社保收费信息
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class socialchargeinformation {

    //Id
    @PrimaryGeneratedColumn()
    socilchargeId:number;

    @Column()
    monthofexpense:string;// 费用所属月

    @Column()
    invoiceinformation :string;// 开票时间

    @Column()
    arrivaltime:string;// 到费时间

    @Column({nullable:true})
    provide:number //养老

    @Column({nullable:true})
    health:number //医保

    @Column({nullable:true})
    unemployment:number //失业


    @Column({nullable:true})
    accumulation:number //公积金


    @Column({nullable:true})
    occupational:number //工伤


    @Column({nullable:true})
    salary:number //工资

    @Column({nullable:true})
    administrative:number //管理费

    @Column({nullable:true})
    remark:string //备注

    @Column({nullable:true})
    treatment:number//待遇

    @Column()
    corporateInformationTradeName: string;//企业名称

    @Column({nullable:true})
    total:number  //合计

    @Column({nullable:true})
    social:number // 	社保小计
}