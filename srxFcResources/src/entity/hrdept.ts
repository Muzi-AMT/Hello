// 人力资源管理部门信息
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";
@Entity()
export class hrdept   {

    @PrimaryGeneratedColumn()  //人力资源ID
    HRDeptId: number;

    @Column()
    HRDeptHRContactPerson: string;   //人力资源联系人

    @Column()
    HRDeptHRTelephone:string; //人力资源电话

    @Column()
    loginMessageLoginName: string;  //登录名

    @Column()
    corporateInformationTradeName: string;// 公司名称
}
