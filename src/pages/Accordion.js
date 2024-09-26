import { useState } from 'react';
import './Accordion.css';
import classNames from 'classnames';

// Write a component called Accordion that renders an accordion-style UI. It should receive an array of items as a prop,
// and each item should have a title and content. Only one item should be expanded at a time.
// [{ id: '1', title: 'Title 1', content: 'This is the first title in this accordion list' }]
const Accordion = ({ items }) => {
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = id => {
    if (openItemId === id) {
      setOpenItemId(null);
    } else {
      setOpenItemId(id);
    }
  }

  return (
    <div className='Accordion'>
      <header>Accordion</header>
      <ul className='content'>
        {items.map((item, id) => (
          <li className={classNames('item', { open: openItemId === id })} key={id}>
            <h5 onClick={() => toggleItem(id)}>{item.title}</h5>
            {openItemId === id &&
              <p>{item.content}</p>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accordion;