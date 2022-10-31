/* eslint-disable */
/* prettier-disable */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("/api/graphql" as string, {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask: Task;
  deleteTask: Task;
};


export type MutationAddTaskArgs = {
  task: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  fullName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', _id: string, title: string, user: { __typename?: 'User', fullName: string } }> };

export type AddTaskMutationVariables = Exact<{
  userName: Scalars['String'];
  task: Scalars['String'];
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask: { __typename?: 'Task', _id: string, title: string, user: { __typename?: 'User', fullName: string } } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', _id: string } };


export const TasksDocument = `
    query tasks {
  tasks {
    _id
    title
    user {
      fullName
    }
  }
}
    `;
export const useTasksQuery = <
      TData = TasksQuery,
      TError = unknown
    >(
      variables?: TasksQueryVariables,
      options?: UseQueryOptions<TasksQuery, TError, TData>
    ) =>
    useQuery<TasksQuery, TError, TData>(
      variables === undefined ? ['tasks'] : ['tasks', variables],
      fetcher<TasksQuery, TasksQueryVariables>(TasksDocument, variables),
      options
    );

useTasksQuery.getKey = (variables?: TasksQueryVariables) => variables === undefined ? ['tasks'] : ['tasks', variables];
;

export const AddTaskDocument = `
    mutation addTask($userName: String!, $task: String!) {
  addTask(userName: $userName, task: $task) {
    _id
    title
    user {
      fullName
    }
  }
}
    `;
export const useAddTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddTaskMutation, TError, AddTaskMutationVariables, TContext>) =>
    useMutation<AddTaskMutation, TError, AddTaskMutationVariables, TContext>(
      ['addTask'],
      (variables?: AddTaskMutationVariables) => fetcher<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, variables)(),
      options
    );
export const DeleteTaskDocument = `
    mutation deleteTask($id: String!) {
  deleteTask(id: $id) {
    _id
  }
}
    `;
export const useDeleteTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>) =>
    useMutation<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>(
      ['deleteTask'],
      (variables?: DeleteTaskMutationVariables) => fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, variables)(),
      options
    );