// import React, { useState } from 'react';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
//   arrayMove,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// function Task({ id }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     padding: '8px',
//     marginBottom: '6px',
//     backgroundColor: 'white',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     cursor: 'grab',
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {id}
//     </div>
//   );
// }

// function Column({ title, tasks, setTasks }) {
//   return (
//     <div style={{ backgroundColor: '#f4f4f4', padding: 16, borderRadius: 6, minWidth: 200 }}>
//       <h3>{title}</h3>
//       <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
//         {tasks.map((taskId) => (
//           <Task key={taskId} id={taskId} />
//         ))}
//       </SortableContext>
//     </div>
//   );
// }

// export default function TaskBoard() {
//   const [columns, setColumns] = useState({
//     todo: ['Task 1', 'Task 2'],
//     inProgress: ['Task 3'],
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

// //   const onDragEnd = (event) => {
// //     const { active, over } = event;
// //     if (!over || active.id === over.id) return;

// //     const sourceColumn = Object.keys(columns).find((col) => columns[col].includes(active.id));
// //     const destinationColumn = Object.keys(columns).find((col) => columns[col].includes(over.id));

// //     if (!sourceColumn || !destinationColumn) return;

// //     const newSourceTasks = [...columns[sourceColumn]];
// //     const oldIndex = newSourceTasks.indexOf(active.id);
// //     newSourceTasks.splice(oldIndex, 1);

// //     const newDestinationTasks = [...columns[destinationColumn]];
// //     const newIndex = newDestinationTasks.indexOf(over.id);
// //     newDestinationTasks.splice(newIndex, 0, active.id);

// //     setColumns({
// //       ...columns,
// //       [sourceColumn]: sourceColumn === destinationColumn ? newDestinationTasks : newSourceTasks,
// //       [destinationColumn]: newDestinationTasks,
// //     });
// //   };
// const onDragEnd = (event) => {
//   const { active, over } = event;
//   if (!over || active.id === over.id) return;

//   const sourceColumn = Object.keys(columns).find((col) => columns[col].includes(active.id));
//   const destinationColumn = Object.keys(columns).find((col) => columns[col].includes(over.id));

//   if (!sourceColumn || !destinationColumn) return;

//   const sourceTasks = [...columns[sourceColumn]];
//   const destinationTasks = [...columns[destinationColumn]];

//   // Remove from source
//   const sourceIndex = sourceTasks.indexOf(active.id);
//   sourceTasks.splice(sourceIndex, 1);

//   // Add to destination at correct position
//   const destinationIndex = destinationTasks.indexOf(over.id);
//   destinationTasks.splice(destinationIndex, 0, active.id);

//   setColumns({
//     ...columns,
//     [sourceColumn]: sourceColumn === destinationColumn ? destinationTasks : sourceTasks,
//     [destinationColumn]: destinationTasks,
//   });
// };

//   return (
//     <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
//       <div style={{ display: 'flex', gap: '1rem' }}>
//         <Column title="To Do" tasks={columns.todo} setTasks={(t) => setColumns((c) => ({ ...c, todo: t }))} />
//         <Column title="In Progress" tasks={columns.inProgress} setTasks={(t) => setColumns((c) => ({ ...c, inProgress: t }))} />
//       </div>
//     </DndContext>
//   );
// }




import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Task({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    marginBottom: '6px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

function Column({ title, tasks }) {
  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: 16, borderRadius: 6, minWidth: 200 }}>
      <h3>{title}</h3>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((taskId) => (
          <Task key={taskId} id={taskId} />
        ))}
      </SortableContext>
    </div>
  );
}

export default function TaskBoard() {
  const [columns, setColumns] = useState({
    todo: ['Task 1', 'Task 2'],
    inProgress: ['Task 3'],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // dropped outside any droppable
    if (active.id === over.id) return;

    // Find source and destination columns
    const sourceColumn = Object.keys(columns).find((col) =>
      columns[col].includes(active.id)
    );
    const destinationColumn = Object.keys(columns).find((col) =>
      columns[col].includes(over.id)
    );

    if (!sourceColumn || !destinationColumn) return;

    if (sourceColumn === destinationColumn) {
      // Reorder in same column
      const items = Array.from(columns[sourceColumn]);
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setColumns({
        ...columns,
        [sourceColumn]: newItems,
      });
    } else {
      // Move between columns
      const sourceItems = Array.from(columns[sourceColumn]);
      const destItems = Array.from(columns[destinationColumn]);

      // Remove from source
      sourceItems.splice(sourceItems.indexOf(active.id), 1);

      // Find new index in destination
      const newIndex = destItems.indexOf(over.id);

      // Insert into destination
      destItems.splice(newIndex, 0, active.id);

      setColumns({
        ...columns,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destItems,
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Column title="To Do" tasks={columns.todo} />
        <Column title="In Progress" tasks={columns.inProgress} />
      </div>
    </DndContext>
  );
}

