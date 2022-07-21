// 代理合同信息表
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agencycontractinformation{

    @PrimaryGeneratedColumn()
    agencycontractinformationId: number;// Id

    @Column()
    agencycontractinformationFileNumber: string;// 档案编号

    @Column()
    agencycontractinformationName: string;// 姓名

    @Column()
    agencycontractinformationCraft: string;// 工种

    @Column()
    agencycontractinformationWorkSite: string;// 工作地点

    @Column()
    agencycontractinformationCDOC: string;// 合同开始日期

    @Column()
    agencycontractinformationDOT: string;// 合同终止日期
}