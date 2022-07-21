// 接口表

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()

export class ipconfig {

    //Id
    @PrimaryGeneratedColumn()
    interfaceId:number;

    @Column()
    interfaceName:string;// 访问路由路径

    @Column({
        nullable:true
    })
    interfaceDescribe:string;// ip地址

    @Column({
        nullable:true
    })
    time:string;// 时间
}