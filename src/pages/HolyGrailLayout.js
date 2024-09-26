import './HolyGrailLayout.css';

const HolyGrailLayout = () => {
  return (
    <div className="holy-container">
      <header>Header</header>
      <div className="body">
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default HolyGrailLayout;