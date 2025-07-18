import * as React from "react";
import { TaskBoard, TaskBoardToolbar } from "@progress/kendo-react-taskboard";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import { Column } from "./Column";
import { Card } from "./Card";
import { cards } from "./cards";
import { plusIcon } from "@progress/kendo-svg-icons";
const tasks = cards.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  status: c.status,
  priority: c.priority,
}));
const columns = [
  {
    id: 1,
    title: "To-Do",
    status: "todo",
  },
  {
    id: 2,
    title: "In Progress",
    status: "inProgress",
  },
  {
    id: 3,
    title: "Done",
    status: "done",
  },
];
const priorities = [
  {
    priority: "Low Priority",
    color: "green",
  },
  {
    priority: "High Priority",
    color: "blue",
  },
  {
    priority: "Urgent",
    color: "orange",
  },
];
const Kendo = () => {
  const [filter, setFilter] = React.useState("");
  const [taskData, setTaskData] = React.useState(tasks);
  const [columnsData, setColumnsData] = React.useState(columns);
  const onSearchChange = React.useCallback((event) => {
    setFilter(event.value);
  }, []);
  const resultTasks = React.useMemo(() => {
    const filterDesc = {
      logic: "and",
      filters: [
        {
          field: "title",
          operator: "contains",
          value: filter,
        },
      ],
    };
    return filter ? filterBy(taskData, filterDesc) : taskData;
  }, [filter, taskData]);
  const onChangeHandler = React.useCallback((event) => {
    if (event.type === "column") {
      setColumnsData(event.data);
    } else {
      // New Task has been added.
      if (event.item && event.item.id === undefined) {
        event.item.id = event.data.length + 1;
      }
      setTaskData(event.data);
    }
  }, []);
  const onAddColumn = () => {
    const newColumn = {
      id: columnsData.length + 1,
      title: "New Column",
      status: "new",
      edit: true,
    };
    setColumnsData([...columnsData, newColumn]);
  };
  return (
    <TaskBoard
      columnData={columnsData}
      taskData={resultTasks}
      priorities={priorities}
      onChange={onChangeHandler}
      column={Column}
      card={Card}
      style={{
        height: "100vh",
      }}
      tabIndex={0}
  //     columnData={columnsData}
  // taskData={resultTasks}
  // priorities={priorities}
  // onChange={onChangeHandler}
  // column={Column}
  // card={Card}
  // style={{
  //   height: '100vh',
  //   display: 'flex',
  //   alignItems: 'flex-start'
  // }}
  // taskBoardRef={(ref) => {
  //   if (ref?.element) {
  //     // Fix for layout spacing
  //     const content = ref.element.querySelector('.k-taskboard-content');
  //     if (content) content.style.justifyContent = 'flex-start';
  //   }
  // }}

    >
      <TaskBoardToolbar>
        <Button svgIcon={plusIcon} onClick={onAddColumn}>
          Add Column
        </Button>
        <span className="k-spacer" />
        <Input
          placeholder="Search..."
          onChange={onSearchChange}
          value={filter}
        />
      </TaskBoardToolbar>
    </TaskBoard>
  );
};
export default Kendo;
