import { useState, useEffect } from 'react';
import './AdjectiveFiller.css';

const AdjectiveFiller = () => {
  const [items, setItems] = useState([
    { id: 1, value: 'Hilarious' },
    { id: 2, value: 'Filthy Heavenly' },
    { id: 3, value: 'Syncopated' },
    { id: 4, value: 'Substantial' },
    { id: 5, value: 'Foreign' }
  ]);
  const [draggingItem, setDraggingItem] = useState(null);

  const onDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  }

  const onDragEnd = e => {
    setDraggingItem(null);
  }

  const onDragOver = e => {
    e.preventDefault();
  }

  const onDrop = (e, targetItem) => {
    const updatedItems = [...items];
    const targetIndex = items.indexOf(targetItem);
    const currentIndex = items.indexOf(draggingItem);

    updatedItems.splice(currentIndex, 1);
    updatedItems.splice(targetIndex, 0, draggingItem);

    setItems(updatedItems);
  }

  return (
    <div className="AdjectiveFiller">
      <header className="header">
        Adjective Filler
      </header>
      <p>
        This was a 
        <input type="text" value={items[0].value} readOnly></input>
         set of events where we had something 
        <input type="text" value={items[1].value} readOnly></input>
         and made it 
        <input type="text" value={items[2].value} readOnly></input>
         so that we could have something 
        <input type="text" value={items[3].value} readOnly></input>
         on an earth full of
        <input type="text" value={items[4].value} readOnly></input>
         creatures.
      </p>
      <>
        {items.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={e => onDragStart(e, item)}
            onDragEnd={e => onDragEnd(e)}
            onDrop={e => onDrop(e, item)}
            onDragOver={e => onDragOver(e)}
          >
            {item.value}
          </div>
        ))}
      </>
    </div>
  );
}

export default AdjectiveFiller;