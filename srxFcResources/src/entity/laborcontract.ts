//劳动合同
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export  class  laborcontract {

    @PrimaryGeneratedColumn()
    Id: number;  // 失业保险ID

    @Column({
        nullable: true
    })
    employeeregistrationformFileNumber:string;//档案编号

    @Column({
        nullable: true
    })
    PartyName: string;  //甲方名称

    @Column({
        nullable: true
    })
    Partylegalre: string;  //甲方法定代表人

    @Column({
        nullable: true
    })
    Partyaddress: string;  //甲方地址

    @Column({
        nullable: true
    })
    Partyoperateaddress: string;  //甲方经营地址

    @Column({
        nullable: true
    })
    PartySocialSec: string;  //甲方社会保险登记号：

    @Column({
        nullable: true
    })
    Partycontactnum: string;  //甲方联系电话

    @Column({
        nullable: true
    })
    PartyBName: string;  //乙方名称

    @Column({
        nullable: true
    })
    PartyBIdcar: string;  //乙方身份证

    @Column({
        nullable: true
    })
    PartyBOthervalid: string;  //乙方其他有效证件名称

    @Column({
        nullable: true
    })
    PartyBIdnum: string;  //乙方证件号码

    @Column({
        nullable: true
    })
    PartyBfamilyadd: string;  //乙方家庭地址

    @Column({
        nullable: true
    })
    PartyBhomeadd: string;  //乙方现住址

    @Column({
        nullable: true
    })
    PartyBnum: string;  //乙方联系电话

    @Column({
        nullable: true
    })
    adopsituation: string;  //采用形势

    @Column({
        nullable: true
    })
    fixedterm: string;  //固定期限起

    @Column({
        nullable: true
    })
    fixedtermtion: string;  //固定期限止

    @Column({
        nullable: true
    })
    Probationterm: string;  //试用期起

    @Column({
        nullable: true
    })
    Probationtermtion: string;  //试用期止

    @Column({
        nullable: true
    })
    Nofixed: string;  //无固定期限

    @Column({
        nullable: true
    })
    NofixedProbaterm: string;  //无固定期限试用期起

    @Column({
        nullable: true
    })
    NofixedProbatermtion: string;  //无固定期限试用期止

    @Column({
        nullable: true
    })
    missionaccompterm: string;  //完成任务期限起

    @Column({
        nullable: true
    })
    missionaccomptermtion: string;  //完成任务期限止

    @Column({
        nullable: true
    })
    Partyserve: string;  //乙方担任

    @Column({
        nullable: true
    })
    PartyBworkplace: string;  //乙方工作地点

    @Column({
        nullable: true
    })
    workinghours: string;  //工时制度

    @Column({
        nullable: true
    })
    LaborPartycertainmonth: string;  //劳动报酬甲方某月

    @Column({
        nullable: true
    })
    LaborPartycertainday: string;  //劳动报酬甲方某日

    @Column({
        nullable: true
    })
    monthlysalary: string;  //月工资

    @Column({
        nullable: true
    })
    implement: string;  //按某某执行

    @Column({
        nullable: true
    })
    Probationarysalary: string;  //试用期工资

    @Column({
        nullable: true
    })
    Welfaretreatment: string;  //福利待遇

    @Column({
        nullable: true
    })
    somethingelse: string;  //其他事项

    @Column({
        nullable: true
    })
    PartyAsignature: string;  //甲方签字

    @Column({
        nullable: true
    })
    PartyBsignature: string;  //乙方签字


}