import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("tag")
export class Tag {

    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(()=>[Post])
    @ManyToMany(()=>Post, (posts)=> posts.tags)
    posts: Post[]
}