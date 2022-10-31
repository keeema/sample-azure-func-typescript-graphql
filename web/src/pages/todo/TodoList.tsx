import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import {
  TasksQuery,
  useDeleteTaskMutation,
  useTasksQuery,
} from "@/api/graphql/generated";
import { useSubscription } from "@/api/subscriptions/useSubscription";

export function TodoList(): JSX.Element {
  const { data, isLoading, refetch } = useTasksQuery();
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();
  useSubscription("taskAdded", () => refetch());
  useSubscription("taskDeleted", () => refetch());

  return isLoading || !data?.tasks ? (
    <>Načítám</>
  ) : (
    <DataTable
      scrollable
      value={data.tasks}
      responsiveLayout="scroll"
      emptyMessage="Žádné úkoly"
      className="h-full w-full"
    >
      <Column
        header="Úkol"
        body={(item: TasksQuery["tasks"][0]) => item.title}
      ></Column>
      <Column
        header="Osoba"
        body={(item: TasksQuery["tasks"][0]) => item.user.fullName}
      ></Column>
      <Column
        header="Splnění"
        body={item => (
          <Button
            icon="pi pi-check"
            className="p-button-rounded p-button-success mr-2"
            onClick={async () => {
              try {
                await deleteTask({ id: item._id });
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
