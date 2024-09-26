import { useState } from 'react';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  }

  return (
    <div className="menu">
      <GiHamburgerMenu className="menu-button" onClick={toggleMenu} />
      {menuOpen && (
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/multiSearchReplace" onClick={toggleMenu}>Multi Search and Replace</Link>
            </li>
            <li>
              <Link to="/fuzzySearch" onClick={toggleMenu}>Fuzzy Search</Link>
            </li>
            <li>
              <Link to="/hangarooPuzzle" onClick={toggleMenu}>Hangaroo Puzzle</Link>
            </li>
            <li>
              <Link to="/spinner" onClick={toggleMenu}>Spinner</Link>
            </li>
            <li>
              <Link to="/rope" onClick={toggleMenu}>Rope</Link>
            </li>
            <li>
              <Link to="/adjectiveFiller" onClick={toggleMenu}>Adjective Filler</Link>
            </li>
            <li>
              <Link to="/clickCounter" onClick={toggleMenu}>Click Counter</Link>
            </li>
            <li>
              <Link to="/dateTimeFetcher" onClick={toggleMenu}>Date Timer Fetcher (Promise based)</Link>
            </li>
            <li>
              <Link to="/navBar" onClick={toggleMenu}>Nav Bar</Link>
            </li>
            <li>
              <Link to="/accordion" onClick={toggleMenu}>Accordion</Link>
            </li>
            <li>
              <Link to="/tabNavigation" onClick={toggleMenu}>Tab Navigation</Link>
            </li>
            <li>
              <Link to="/todoList" onClick={toggleMenu}>Todo List</Link>
            </li>
            <li>
              <Link to="/theme" onClick={toggleMenu}>Theme</Link>
            </li>
            <li>
              <Link to="/htmlForm" onClick={toggleMenu}>HTML Form</Link>
            </li>
            <li>
              <Link to="/holyGrailLayout" onClick={toggleMenu}>Holy Grail Layout</Link>
            </li>
            <li>
              <Link to="/mortgageCalculator" onClick={toggleMenu}>Mortgage Calculator</Link>
            </li>
            <li>
              <Link to="/paginatedDataTable" onClick={toggleMenu}>Paginated Data Table</Link>
            </li>
            <li>
              <Link to="/diceRoller" onClick={toggleMenu}>Dice Roller</Link>
            </li>
            <li>
              <Link to="/fileExplorer" onClick={toggleMenu}>File Explorer</Link>
            </li>
            <li>
              <Link to="/modalTest" onClick={toggleMenu}>Modal Test</Link>
            </li>
            <li>
              <Link to="/trafficLight" onClick={toggleMenu}>Traffic Light</Link>
            </li>
            <li>
              <Link to="/digitalClock" onClick={toggleMenu}>Digital Clock</Link>
            </li>
            <li>
              <Link to="/imageCarousel" onClick={toggleMenu}>Image Carousel</Link>
            </li>
            <li>
              <Link to="/jobBoard" onClick={toggleMenu}>Job Board</Link>
            </li>
            <li>
              <Link to="/officeManagement" onClick={toggleMenu}>Office Management</Link>
            </li>
            <li>
              <Link to="/test" onClick={toggleMenu}>Test</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
};

export default Layout;
