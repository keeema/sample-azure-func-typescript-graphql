import {
  getModelForClass,
  ModelOptions,
  prop as Property,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ModelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class User {
  @Property()
  @Field(() => ID)
  readonly _id: string;

  @Property({ index: true })
  @Field()
  fullName: string;

  @Property()
  @Field()
  readonly createdAt: Date;

  @Property()
  @Field()
  readonly updatedAt: Date;
}

export const UserModel = getModelForClass(User);
