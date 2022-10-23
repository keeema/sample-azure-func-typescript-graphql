import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function Todos(): JSX.Element {
  return (
    <div className="flex flex-column w-full m-2">
      <div className="flex flex-1 ">
        <TodoForm
          onSubmit={(title, username) => (
            alert(title + username), Promise.resolve(true)
          )}
        />
      </div>
      <div className="flex">
        <TodoList />
      </div>
    </div>
  );
}

export function TodoList(): JSX.Element {
  return (
    <DataTable
      scrollable
      value={[]}
      responsiveLayout="scroll"
      emptyMessage="Žádné úkoly"
      className="h-full"
    >
      <Column header="Úkol" field="title" align="left"></Column>
      <Column header="Osoba" field="user.fullName" align="center"></Column>
    </DataTable>
  );
}

export function TodoForm({
  onSubmit,
}: {
  onSubmit: (title: string, userName: string) => Promise<boolean>;
}): JSX.Element {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");

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
            if (await onSubmit(title.trim(), userName.trim())) {
              setTitle("");
              setUserName("");
            }
          }}
        />
      </div>
    </div>
  );
}
