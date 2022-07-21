// 超级管理员
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class superadministrator {

    //Id
    @PrimaryGeneratedColumn()
    administratorId:number;

    @Column({nullable:true})
    administratorName:string;// 用户名

    @Column({nullable:true})
    administratorPwd:string;// 密码

    @Column({nullable:true})
    administratorMail:string;// 邮箱

}