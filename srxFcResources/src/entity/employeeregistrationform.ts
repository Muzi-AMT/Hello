import {Entity, Column,PrimaryGeneratedColumn} from "typeorm";
//职工登记表
@Entity()
export class employeeregistrationform{
    @PrimaryGeneratedColumn()
    employeeregistrationformId:number;//职工登记表id

    @Column()
    employeeregistrationformFileNumber:string;//档案编号

    @Column()
    employeeregistrationformName:string;//姓名

    @Column()
    employeeregistrationformSex:string;//性别

    @Column()
    employeeregistrationformDateOfBirth:string;//出生年月

    @Column({
        nullable:true
    })
    employeeregistrationformPhoto:string;// 照片

    @Column({
        nullable: true
    })
    employeeregistrationformFormerName:string;//曾用名

    @Column({
        nullable:true
    })
    employeeregistrationformNationality:string;//民族

    @Column({
        nullable:true
    })
    employeeregistrationformWorkTime:string;//参加工作时间

    @Column({
        nullable:true
    })
    employeeregistrationform:string;//文化程度

    @Column({
        nullable: true
    })
    employeeregistrationformMaritalStatus:string;//婚姻状况

    @Column({
        nullable:true
    })
    employeeregistrationformTypeOfWork:string;//工种

    @Column({
        nullable:true
    })
    employeeregistrationformNativePlace:string;//籍贯

    @Column({
        nullable: true
    })
    employeeregistrationformPersonalIdentity:string;//个人身份

    @Column({
        nullable: true
    })
    employeeregistrationformPersentAddress:string;//现住址

    @Column({
        nullable:true
    })
    employeeregistrationformPoliticsStatus:string;//政治面貌

    @Column({
        nullable: true
    })
    employeeregistrationformEmploymentForm:string;//用工形式

    @Column({
        nullable:true
    })
    employeeregistrationformPlaceOfDomicile:string;//户籍所在地

    @Column({
        nullable: true
    })
    employeeregistrationformIdentificationOfMigrantWorkers:string;//农民工标识

    @Column({
        nullable: true
    })
    employeeregistrationformThePartyTime:string;//入党时间

    @Column()
    employeeregistrationformIDNumber:string;//身份证号

    @Column({
        nullable:true
    })
    employeeregistrationformCategory:string;//户口性质

    @Column("bigint",{
        nullable: true
    })
    employeeregistrationfromPhone:number;//联系电话

    @Column({
        nullable: true
    })
    employeeregistrationformEU:string;//就业失业证编号

    @Column({
        nullable: true
    })
    employeeregistrationformOtherRelevantDocuments:string;//其他相关证件

    @Column("text",{
        nullable: true
    })
    employeeregistrationformMyResume:string;//本人简历

    @Column("text",{
        nullable: true
    })
    employeeregistrationformRemarks:string;//备注

    @Column("text",{
        nullable: true
    })
    employeeregistrationformWAWKOBATTWBABWD:string//何时何部门授予何种业务技术职称

    @Column("text",{
        nullable: true
    })
    employeeregistrationformWWAWKOR:string//何时何原因受过何种奖励

    @Column("text",{
        nullable: true
    })
    employeeregistrationformWWAWKP:string;//何时何原因受过何种处分

    @Column("text",{
        nullable: true
    })
    employeeregistrationformFWWKOBTWWAISRAAW:string;//熟悉何种业务技术有何工作成绩创造发明科研成果和著

    @Column("text",{
        nullable: true
    })
    employeeregistrationformOtherIssuesToBeExplained:string//其他需要说明的问题

    @Column({
        nullable: true
    })
    employeeregistrationformInjuryRecord:string//工伤记录

    @Column({
        nullable:true
    })
    employeeregistrationformInjuryRecorddata:string//工伤记录资料

    @Column({
        nullable:true
    })
    employeeregistrationformData: string// 操作记录

    @Column({
        nullable:true
    })
    corporateInformationTradeName: string; //公司名称

    @Column({default:0}) //职工状态码
    employe: string;

    //证件号码
    @Column({
        nullable: true
    })
    IDnum:string;

    // 工作年限
    @Column({nullable:true})
    workseniority: string;

    // 合同终止时间
    @Column({nullable:true})
    htzzsj: string;

    // 年龄
    @Column({nullable:true})
    empage: string;

    // 所学专业
    @Column({nullable:true})
    employeeregistrationformMajor: string;

    // 毕业院校
    @Column({nullable:true})
    employeeregistrationformSchool: string;
}
