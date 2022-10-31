import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

import { useAddTaskMutation, useTasksQuery } from "@/api/graphql/generated";

export function TodoForm(): JSX.Element {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const { mutateAsync: addTask } = useAddTaskMutation();
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-column w-full justify-content-start">
      <div className="flex flex-row text-left w-full">
        <div className="field mr-2">
          <label htmlFor="username" className="block">
            Jméno uživatele
          </label>
          <InputText
            id="username"
            value={userName}
            className="block"
            onChange={ev => setUserName(ev.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="todo-title" className="block">
            Nový úkol
          </label>
          <InputText
            id="todo-title"
            value={title}
            className="block"
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
      </div>
      <div className="flex">
        <Button
          label="Přidat"
          disabled={title.trim().length === 0 || userName.trim().length === 0}
          onClick={async () => {
            try {
              await addTask({ userName: userName.trim(), task: title.trim() });
              setTitle("");
              setUserName("");
              queryClient.refetchQueries(useTasksQuery.getKey());
            } catch (error) {
              alert(error);
            }
          }}
        />
      </div>
    </div>
  );
}
