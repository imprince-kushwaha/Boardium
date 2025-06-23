// App.jsx or BoardExample.jsx
import React from 'react';
// import Board from 'react-trello';

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Write blog post about React',
        },
        {
          id: 'Card2',
          title: 'Fix Bugs',
          description: 'Resolve login issue on staging',
        },
      ],
    },
    {
      id: 'lane2',
      title: 'In Progress',
      label: '0/0',
      cards: [],
    },
  ],
};

export default function TrelloKanban() {
  return (
    <h1>hello bolo</h1>
    // <div style={{ padding: '20px' }}>
    //   <Board data={data} draggable />
    // </div>
  );
}
