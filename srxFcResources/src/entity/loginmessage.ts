// 登录信息
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()
export class loginmessage {

    @PrimaryGeneratedColumn() //登录ID
    loginMessageId: number;

    @Column()
    loginMessageLoginName: string;  //登录名

    @Column()
    loginMessageLoginPassword:string; //登录密码

    @Column({default:0})
    loginMessageLoggingStatus:number;

    @Column()
    corporateInformationTradeName: string;// 公司名称
}
