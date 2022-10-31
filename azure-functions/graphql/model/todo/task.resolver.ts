import { DocumentType } from "@typegoose/typegoose";

import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";

import { v4 as uuid } from "uuid";
import { Task, TaskModel } from "./task.entity";
import { User, UserModel } from "../user/user.entity";

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<DocumentType<Task>[]> {
    return TaskModel.find().populate("user");
  }

  @Mutation(() => Task)
  async addTask(
    @Arg("task") title: string,
    @Arg("userName") userName: string,
    @PubSub("taskAdded") publish: Publisher<{ id: string }>
  ): Promise<DocumentType<Task>> {
    let user = await UserModel.findOne({ fullName: userName });

    if (!user) {
      user = await UserModel.create({ _id: uuid(), fullName: userName });
    }

    const result = await TaskModel.create({
      _id: uuid(),
      title,
      user,
      userId: user._id,
    });

    publish({ id: result._id });
    return result;
  }

  @Mutation(() => Task)
  async deleteTask(
    @Arg("id") id: string,
    @PubSub("taskDeleted") publish: Publisher<{ id: string }>
  ): Promise<DocumentType<Task>> {
    const result = await TaskModel.findByIdAndDelete(id);
    publish({ id });
    return result;
  }
}
