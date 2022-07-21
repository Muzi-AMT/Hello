//增加申报表

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()

export class filler {

    //Id
    @PrimaryGeneratedColumn()
    filId:number;

    //填表人姓名
    @Column()
    filName:string;

    //所属区块
    @Column()
    filType:string;



}