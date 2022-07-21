// 接口表

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()

export class interfacetable {

    //Id
    @PrimaryGeneratedColumn()
    interfaceId:number;

    @Column()
    interfaceName:string;// 接口名称

    @Column({
        nullable:true
    })
    interfaceDescribe:string;// 接口描述

}