//企业基本养老保险费申报表

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()

export class premiumreturn {
    //Id
    @PrimaryGeneratedColumn()
    premiumreturnId:number;

    //单位名称
    @Column({
        nullable: true
    })
    premiumreturnUnitName:string;

    // 申报日期
    @Column({
        nullable: true
    })
    premiumreturnDateOfDeclaration:string;

    // 代码
    @Column({
        nullable: true
    })
    premiumreturnCode:string;

    // 全称
    @Column({
        nullable: true
    })
    premiumreturnFullName:string;

    // 开户银行
    @Column({
        nullable: true
    })
    premiumreturnDepositBank:string;

    // 账号
    @Column({
        nullable: true
    })
    premiumreturnAccountNumber:string;

    // 缴费方式
    @Column({
        nullable: true
    })
    premiumreturnPaymentMethod:string;

    // 上月数
    @Column("decimal",{
        nullable: true
    })
    premiumreturnLastMonth:number;

    // 本月增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnThisMonthToIncrease:number;

    // 本月减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnThisReduceThisMonth:number;

    // 单位缴费上月数
    @Column({
        nullable: true
    })
    premiumreturnMonthlyPaymentPerUnit:number;

    // 单位缴费增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnIncreaseInUnitPayment:number;

    // 单位缴费减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnReductionInUnitPayment:number;

    // 单位缴费单位
    @Column("decimal",{
        nullable: true
    })
    premiumreturnUnitPayingUnit:number;

    // 单位缴费缴费金额
    @Column("decimal",{
        nullable: true
    })
    premiumreturnTheAmountPaidByTheUnit:number;

    // 单位缴费上月数
    @Column("decimal",{
        nullable: true
    })
    premiumreturnMonthlyPersonalPayment:number;

    // 个人缴费增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnIncreaseInPersonalContributions:number;

    // 个人缴费减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnReductionInPersonalContributions:number;

    // 个人缴费个人
    @Column("decimal",{
        nullable: true
    })
    premiumreturnIndividualPayment:number;

    // 个人缴费缴费金额
    @Column("decimal",{
        nullable: true
    })
    premiumreturnIndividualPaymentAmount:number;

    // 补缴上月数
    @Column("decimal",{
        nullable: true
    })
    premiumreturnMakeUpMonth:number;

    // 补缴增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnPaymentOfIncreased:number;

    // 补缴减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnPaymentOfreducing:number;

    // 补缴单位
    @Column("decimal",{
        nullable: true
    })
    premiumreturnPaymentOfTheUnit:number;

    // 补缴个人
    @Column("decimal",{
        nullable: true
    })
    premiumreturnPaymentOfPersonal:number;

    // 补缴缴费金额
    @Column("decimal",{
        nullable: true
    })
    premiumreturnPaymentAmount:number;

    // 利息上月数
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestLastMonth:number;

    // 利息增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestAdd:number;

    // 利息减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestReduce:number;

    // 利息单位
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestUnit:number;

    // 利息个人
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestPersonage:number;

    // 利息缴费金额
    @Column("decimal",{
        nullable: true
    })
    premiumreturnInterestPaymentAmount:number;

    // 滞纳金上月数
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFineLastMonth:number;

    // 滞纳金增加
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFineAdd:number;

    // 滞纳金减少
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFineReduce:number;

    // 滞纳金单位
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFineUnit:number;

    // 滞纳金个人
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFinePersonage:number;

    // 滞纳金缴费金额
    @Column("decimal",{
        nullable: true
    })
    premiumreturnOverdueFinePaymentAmount:number;

    // 费宽限缴日期
    @Column({
        nullable: true
    })
    premiumreturnDateOfPaymentExtension:string;

    // 申报单位经办人
    @Column({
        nullable: true
    })
    premiumreturnPersonHandlingDeclarationUnit:string;

    // 社会保险机构审核人
    @Column({
        nullable: true
    })
    premiumreturnAuditorSocialInsuranceInstitution:string;

}