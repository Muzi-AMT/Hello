import {Entity, Column,PrimaryGeneratedColumn} from "typeorm";
//家庭成员表
@Entity()
export class familymember{
    @PrimaryGeneratedColumn()
    familymemberId:number;//家庭成员id

    @Column({
        nullable:true
    })
    familymemberNameOne:string;//姓名

    @Column({
        nullable:true
    })
    familymemberNameTwo:string;//姓名2

    @Column({
        nullable:true
    })
    familymemberNameThree:string;//姓名3

    @Column({
        nullable:true
    })
    familymemberSexOne:string;//性别

    @Column({
        nullable:true
    })
    familymemberSexTwo:string;//性别2

    @Column({
        nullable:true
    })
    familymemberSexThree:string;//性别3
    @Column({
        nullable:true
    })
    familymemberAgeO:number;//年龄
    @Column({
        nullable:true
    })
    familymemberAgeT:number;//年龄2
    @Column({
        nullable:true
    })
    familymemberAgeThr:number;//年龄3
    @Column({
        nullable:true
    })
    familymemberRelationshipWithMyselfOne:string;//与本人关系
    @Column({
        nullable:true
    })
    familymemberRelationshipWithMyselfTwo:string;//与本人关系2
    @Column({
        nullable:true
    })
    familymemberRelationshipWithMyselfThree:string;//与本人关系3
    @Column({
        nullable:true
    })
    familymemberCurrentEmployerOne:string;//现工作单位

    @Column({
        nullable:true
    })
    familymemberCurrentEmployerTwo:string;//现工作单位2
    @Column({
        nullable:true
    })
    familymemberCurrentEmployerThree:string;//现工作单位3
    @Column({
        nullable:true
    })
    familymemberPostOne:string;//职务
    @Column({
        nullable:true
    })
    familymemberPostTwo:string;//职务2
    @Column({
        nullable:true
    })
    familymemberPostThree:string;//职务3
    @Column("text",{
        nullable:true
    })
    employeeregistrationformRemark:string;//备注

    @Column()
    employeeregistrationformIDNumber:string //职工身份证号

}