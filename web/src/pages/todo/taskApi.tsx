import { useMutation, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQLClient } from "@/utils/graphQlClient";

export function useTasks() {
  return useQuery(["get-tasks"], async () => {
    const { tasks } = await graphQLClient.request(gql`
      query {
        tasks {
          _id
          title
          user {
            fullName
          }
        }
      }
    `);
    return tasks;
  });
}

export function useDeleteTask() {
  return useMutation(["delete-task"], async (variables: { id: string }) => {
    const { deleteTask } = await graphQLClient.request(
      gql`
        mutation deleteTask($id: String!) {
          deleteTask(id: $id) {
            _id
          }
        }
      `,
      variables
    );
    return deleteTask;
  });
}

export function useAddTask() {
  return useMutation(
    ["add-task"],
    async (variables: { userName: string; task: string }) => {
      const { deleteTask } = await graphQLClient.request(
        gql`
          mutation deleteTask($userName: String!, $task: String!) {
            addTask(userName: $userName, task: $task) {
              _id
              title
              user {
                fullName
              }
            }
          }
        `,
        variables
      );
      return deleteTask;
    }
  );
}
