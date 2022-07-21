// 超级管理员

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()

export class administrator {


    @PrimaryGeneratedColumn()
    userId:number;  //Id

    @Column({nullable:true})
    userName:string;// 用户名

    @Column({nullable:true})
    userPwd:string;// 密码

    @Column("simple-array",{nullable:true})
    userPermission:string[];// 权限

    @Column("simple-array",{nullable:true})
    userModule:string[];// 模块

    @Column("simple-array",{nullable:true})
    userArray:string[];// 接口数组

    @Column({nullable:true})
    userDistinguishBAandD: string;// 区分代理与派遣

}