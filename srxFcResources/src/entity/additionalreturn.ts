//增加申报表

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()

export class additionalreturn {

    //Id
    @PrimaryGeneratedColumn()
    additionalreturnId:number;

    //单位代码
    @Column({
        nullable: true
    })
    additionalreturnUnitCode:string;

    //申报单位
    @Column({
        nullable: true
    })
    additionalreturnApplicationUnit:string;

    //申报日期
    @Column({
        nullable: true
    })
    additionalreturnDateOfDeclaration:string;

    //社保编号
    @Column({
        nullable: true
    })
    additionalreturnSocialSecurityNumber:string;

    //姓名
    @Column({
        nullable: true
    })
    additionalreturnName:string;

    //身份证号码
    @Column({
        nullable: true
    })
    additionalreturnIDNumber:string;

    //参加工作时间
    @Column({
        nullable: true
    })
    additionalreturnWorktime:string;

    //增加原因
    @Column({
        nullable: true
    })
    additionalreturnIncreaseTheReason:string;

    //转入时间
    @Column({
        nullable: true
    })
    additionalreturnToTheTime:string;

    //停缴时间（年）
    @Column({
        nullable: true
    })
    additionalreturnStopPayingIn:string;

    //停缴时间（月）
    @Column({
        nullable: true
    })
    additionalreturnStopPayingMonth:string;

    //缴费基数
    @Column("decimal",{
        nullable: true
    })
    additionalreturnPayMentBase:number;

    //缴费年限（连续工龄）
    @Column({
        nullable: true
    })
    additionalreturnYearOfPayMent:number;

    //备注
    @Column({
        nullable: true
    })
    additionalreturnRemark:string;

    //申报单位填表人
    @Column({
        nullable: true
    })
    additionalreturnPersonWhoFillsInTheForm:string;

    //复核人
    @Column({
        nullable: true
    })
    additionalreturnReviewer:string;

    //联系电话
    @Column({
        nullable: true
    })
    additionalreturnPhone:string;


}