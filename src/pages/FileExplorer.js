import { useState } from 'react';
import './FileExplorer.css';

const renderContent = ({ content, filterDirectory }) => {
  return (
    <>
      {content
        .filter(c => !!c.children === filterDirectory)
        .sort((a, b) => (a.name).localeCompare(b.name))
        .map(c => (
          <div className="content" key={c.id}>
            {c.children ? (
              <Expandable title={c.name} content={c.children} />
            ) : (
              <span className="file-name">{c.name}</span>
            )}
          </div>
        ))
      }
    </>
  );
}

const Expandable = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="expandable">
      <div className="directory" onClick={() => setExpanded(!expanded)}>
        <span className="expand-arrow">
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
        <span className="directory-name">{title}</span>
      </div>
      {expanded && renderContent({ content, filterDirectory: true })}
      {expanded && renderContent({ content, filterDirectory: false })}
    </div>
  );
}

const FileExplorer = ({ data }) => {
  return (
    <div className="file-explorer">
      <header>File Explorer</header>
      {renderContent({ content: data, filterDirectory: true })}
      {renderContent({ content: data, filterDirectory: false })}
    </div>
  );
}

export default FileExplorer;