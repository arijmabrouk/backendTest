import { CreateDateColumn , UpdateDateColumn , DeleteDateColumn } from "typeorm";



export class timestampEntity {
   

    @UpdateDateColumn() 
    updatedAt : Date ; 

    @DeleteDateColumn()
    deltedAt : Date ; 
}