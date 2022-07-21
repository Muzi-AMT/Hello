// 工资发放信息表
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()
export class payrollinformation {

    @PrimaryGeneratedColumn() // 档案编号
    payrollinformationEUID: number;

    @Column()
    payrollinformationName: string; // 姓名

    @Column("decimal")
    payrollinformationBasicWage: number; // 基本工资

    @Column("decimal")
    payrollinformationSalary: number; // 应发工资

    @Column("decimal",{
        nullable: true
    })
    payrollinformationShouldBeDeductPay: number; // 应扣工资

    @Column({
        nullable: true
    })
    payrollinformationTheUnitOfInsurance: string; // 单位保险

    @Column("decimal",{
        nullable: true
    })
    payrollinformationAdministrativeFee: number; // 管理费

    @Column()
    payrollinformationDate: string; // 日期

    @Column({
        nullable: true
    })
    corporateInformationTradeName: string; // 企业名称

}