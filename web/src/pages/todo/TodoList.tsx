import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { useDeleteTask, useTasks } from "./taskApi";

export function TodoList(): JSX.Element {
  const { data: tasks, isLoading, refetch } = useTasks();
  const { mutateAsync: deleteTask } = useDeleteTask();

  return isLoading ? (
    <>Načítám</>
  ) : (
    <DataTable
      scrollable
      value={tasks}
      responsiveLayout="scroll"
      emptyMessage="Žádné úkoly"
      className="h-full w-full"
    >
      <Column header="Úkol" body={item => item.title}></Column>
      <Column header="Osoba" body={item => item.user.fullName}></Column>
      <Column
        header="Splnění"
        body={item => (
          <Button
            icon="pi pi-check"
            className="p-button-rounded p-button-success mr-2"
            onClick={async () => {
              try {
                await deleteTask({ id: item._id });
                refetch();
              } catch (error) {
                alert(error);
              }
            }}
          />
        )}
      />
    </DataTable>
  );
}
