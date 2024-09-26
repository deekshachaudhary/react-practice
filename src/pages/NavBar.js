import React from 'react';
import withAuthentication from './withAuthentication';

// Write a functional component called Navbar that renders a navigation bar with links.
// It should receive an array of links as a prop, and each link should be displayed as an anchor tag within a list item.
const NavBar = ({ links, isAuthenticated }) => {
  console.log('isAuthenticated in NavBar: ', isAuthenticated);

  return (
    <div className='NavBar'>
      <header className='header'>Nav Bar</header>
      <nav>
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.target}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default withAuthentication(NavBar);