import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "../user/user.entity";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Task {
  @Property()
  @Field(() => ID)
  readonly _id: string;

  @Property()
  @Field()
  title: string;

  @Property({
    ref: () => User,
    type: () => String,
    localField: "userId",
    foreignField: "_id",
    justOne: true,
  })
  @Field(() => User)
  user: User;

  @Property({ index: true })
  @Field({ nullable: true })
  userId?: string;

  @Property()
  @Field()
  readonly createdAt: Date;

  @Property()
  @Field()
  readonly updatedAt: Date;
}

export const TaskModel = getModelForClass(Task);
