// import React, { useEffect, useRef, useState } from 'react';
// import Muuri from 'muuri';

// const initialColumns = [
//   {
//     id: 'todo',
//     title: 'To Do',
//     tasks: [
//       { id: 'task1', content: 'Create project plan' },
//       { id: 'task2', content: 'Write documentation' },
//     ],
//   },
//   {
//     id: 'inprogress',
//     title: 'In Progress',
//     tasks: [{ id: 'task3', content: 'Design UI' }],
//   },
// ];

// export default function MuuriKanban() {
//   const [columns, setColumns] = useState(initialColumns);
//   const gridRefs = useRef({});

//   // Initialize Muuri grids
//   useEffect(() => {
//     columns.forEach(({ id }) => {
//       if (!gridRefs.current[id]) {
//         gridRefs.current[id] = new Muuri(`#${id}`, {
//           dragEnabled: true,
//           dragSort: true,
//           dragSortHeuristics: {
//             sortInterval: 50,
//             minDragDistance: 10,
//             minBounceBackAngle: 1,
//           },
//           dragContainer: document.body,
//           dragAutoScroll: {
//             targets: [
//               {
//                 element: window,
//                 priority: 0,
//               },
//             ],
//           },
//         });

//         // Update state on drag end to reflect order changes
//         gridRefs.current[id].on('move', () => {
//           const newTasks = gridRefs.current[id]
//             .getItems()
//             .map((item) => ({
//               id: item.getElement().dataset.id,
//               content: item.getElement().textContent,
//             }));

//           setColumns((cols) =>
//             cols.map((col) =>
//               col.id === id ? { ...col, tasks: newTasks } : col
//             )
//           );
//         });
//       }
//     });

//     // Cleanup Muuri grids on unmount
//     return () => {
//       Object.values(gridRefs.current).forEach((grid) => grid.destroy());
//       gridRefs.current = {};
//     };
//   }, [columns]);

//   return (
//     <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
//       {columns.map(({ id, title, tasks }) => (
//         <div
//           key={id}
//           id={id}
//           style={{
//             flex: '1 1 0',
//             minWidth: '200px',
//             background: '#f0f0f0',
//             padding: '10px',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>{title}</h3>
//           <div>
//             {tasks.map(({ id: taskId, content }) => (
//               <div
//                 key={taskId}
//                 data-id={taskId}
//                 style={{
//                   padding: '10px',
//                   marginBottom: '8px',
//                   background: 'white',
//                   borderRadius: '4px',
//                   cursor: 'grab',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 {content}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }







// import React, { useEffect, useRef, useState } from 'react';
// import Muuri from 'muuri';

// const initialColumns = [
//   {
//     id: 'todo',
//     title: 'To Do',
//     tasks: [
//       { id: 'task1', content: 'Create project plan' },
//       { id: 'task2', content: 'Write documentation' },
//     ],
//   },
//   {
//     id: 'inprogress',
//     title: 'In Progress',
//     tasks: [{ id: 'task3', content: 'Design UI' }],
//   },
// ];

// export default function MuuriKanban() {
//   const [columns, setColumns] = useState(initialColumns);
//   const gridRefs = useRef({});

//   // Initialize grids once on mount
//   useEffect(() => {
//     initialColumns.forEach(({ id }) => {
//       if (!gridRefs.current[id]) {
//         gridRefs.current[id] = new Muuri(`#${id}`, {
//           dragEnabled: true,
//           dragSort: true,
//           dragSortHeuristics: {
//             sortInterval: 50,
//             minDragDistance: 10,
//             minBounceBackAngle: 1,
//           },
//           dragContainer: document.body,
//           dragAutoScroll: {
//             targets: [
//               {
//                 element: window,
//                 priority: 0,
//               },
//             ],
//           },
//         });

//         gridRefs.current[id].on('move', () => {
//           // Get current order of items and update state
//           const newTasks = gridRefs.current[id]
//             .getItems()
//             .map((item) => ({
//               id: item.getElement().dataset.id,
//               content: item.getElement().textContent,
//             }));

//           setColumns((cols) =>
//             cols.map((col) =>
//               col.id === id ? { ...col, tasks: newTasks } : col
//             )
//           );
//         });
//       }
//     });

//     return () => {
//       Object.values(gridRefs.current).forEach((grid) => grid.destroy());
//       gridRefs.current = {};
//     };
//   }, []); // Empty dependencies array - only run once

//   // When columns state changes (tasks reordered), refresh the grids layout
//   useEffect(() => {
//     Object.values(gridRefs.current).forEach((grid) => {
//       grid.refreshItems().layout();
//     });
//   }, [columns]);

//   return (
//     <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
//       {columns.map(({ id, title, tasks }) => (
//         <div
//           key={id}
//           id={id}
//           style={{
//             flex: '1 1 0',
//             minWidth: '200px',
//             background: '#f0f0f0',
//             padding: '10px',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>{title}</h3>
//           <div>
//             {tasks.map(({ id: taskId, content }) => (
//               <div
//                 key={taskId}
//                 data-id={taskId}
//                 style={{
//                   padding: '10px',
//                   marginBottom: '8px',
//                   background: 'white',
//                   borderRadius: '4px',
//                   cursor: 'grab',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 {content}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }







// import React, { useLayoutEffect, useRef, useState } from 'react';
// import Muuri from 'muuri';

// const initialColumns = [
//   {
//     id: 'todo',
//     title: 'To Do',
//     tasks: [
//       { id: 'task1', content: 'Create project plan' },
//       { id: 'task2', content: 'Write documentation' },
//     ],
//   },
//   {
//     id: 'inprogress',
//     title: 'In Progress',
//     tasks: [{ id: 'task3', content: 'Design UI' }],
//   },
// ];

// export default function MuuriKanban() {
//   const [columns, setColumns] = useState(initialColumns);
//   const containerRefs = useRef({});
//   const gridRefs = useRef({});

//   useLayoutEffect(() => {
//     initialColumns.forEach(({ id }) => {
//       const container = containerRefs.current[id];
//       if (container && !gridRefs.current[id]) {
//         // Muuri wants direct children as grid items
//         gridRefs.current[id] = new Muuri(container, {
//           dragEnabled: true,
//           dragSort: true,
//           dragContainer: document.body,
//         });

//         gridRefs.current[id].on('move', () => {
//           const newTasks = gridRefs.current[id]
//             .getItems()
//             .map((item) => {
//               const el = item.getElement();
//               return {
//                 id: el.dataset.id,
//                 content: el.innerText,
//               };
//             });

//           setColumns((cols) =>
//             cols.map((col) =>
//               col.id === id ? { ...col, tasks: newTasks } : col
//             )
//           );
//         });
//       }
//     });
//   }, []);

//   return (
//     <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
//       {columns.map(({ id, title, tasks }) => (
//         <div
//           key={id}
//           style={{
//             flex: '1 1 0',
//             minWidth: '200px',
//             background: '#f0f0f0',
//             padding: '10px',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>{title}</h3>
//           <div
//             ref={(el) => (containerRefs.current[id] = el)}
//             style={{ minHeight: '50px' }}
//           >
//             {tasks.map(({ id: taskId, content }) => (
//               <div
//                 key={taskId}
//                 data-id={taskId}
//                 className="muuri-item"
//                 style={{
//                   padding: '10px',
//                   marginBottom: '8px',
//                   background: 'white',
//                   borderRadius: '4px',
//                   cursor: 'grab',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 {content}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }







import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Muuri from 'muuri';

const initialTasks = [
  { id: 'task1', content: 'Create project plan' },
  { id: 'task2', content: 'Write documentation' },
  { id: 'task3', content: 'Design UI' },
];

export default function MuuriKanban() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [tasks, setTasks] = useState(initialTasks);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Initialize only once
    gridRef.current = new Muuri(containerRef.current, {
      dragEnabled: true,
    });

    // On move, update task order in state
    gridRef.current.on('move', () => {
      const newOrder = gridRef.current.getItems().map((item) => {
        const el = item.getElement();
        return {
          id: el.dataset.id,
          content: el.innerText,
        };
      });
      setTasks(newOrder);
    });

    return () => {
      gridRef.current?.destroy();
    };
  }, []);

  // Prevent re-rendering Muuri items: render only once
  useEffect(() => {
    // On external task change, relayout
    if (gridRef.current) {
      gridRef.current.refreshItems().layout();
    }
  }, [tasks]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '10px',
        border: '1px solid #ddd',
        width: '300px',
        background: '#f8f8f8',
      }}
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          className="muuri-item"
          data-id={task.id}
          style={{
            background: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'grab',
          }}
        >
          {task.content}
        </div>
      ))}
    </div>
  );
}
