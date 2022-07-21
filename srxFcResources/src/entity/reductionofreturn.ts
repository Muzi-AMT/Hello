//减少申报表
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class reductionofreturn   {

    @PrimaryGeneratedColumn()
    reductionofreturnId:number;   //id

    @Column({nullable:true})
    reductionofreturnUnitCode: string;  //单位代码

    @Column({nullable:true})
    reductionofreturnApplicationUnit:string //申报单位

    @Column({nullable:true})
    reductionofreturnDateOfDeclaration:string // 申报日期

    @Column({nullable:true})
    reductionofreturnName: string;   //姓名

    @Column({nullable:true})
    reductionofreturnIDNumber:string; //身份证号码

    @Column({nullable:true})
    reductionofreturnWorktime: string;   //参加工作时间

    @Column({nullable:true})
    reductionofreturnProfessionalTitles:string; //专业技术职称

    @Column({nullable:true})
    reductionofreturnReduceTheReason:number; //减少原因

    @Column({nullable:true})
    reductionofreturnToTheTime:string; //转入时间

    @Column({nullable:true})
    reductionofreturnStopPayingIn:string; //停缴时间（年）

    @Column({nullable:true})
    reductionofreturnStopPayingMonth:string; //停缴时间（月）

    @Column('decimal',{nullable:true})
    reductionofreturnPayMentBase:number; //缴费基数

    @Column({nullable:true})
    reductionofreturnYearOfPayMent:string; //缴费年限（连续工龄）

    @Column({nullable:true})
    reductionofreturnRemark:string; //备注

    @Column({nullable:true})
    reductionofreturnPersonWhoFillsInTheForm:string; //申报单位填表人

    @Column({nullable:true})
    reductionofreturnReviewer:string;//复核人

    @Column('bigint',{nullable:true})
    reductionofreturnPhone:number; //联系电话





}
