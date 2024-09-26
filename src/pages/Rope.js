import { useEffect, useState } from 'react';
import './Rope.css';

const Rope = () => {
  const [segments, setSegments] = useState([
    { xVelocity: 0, yVelocity: 0, xPos: 0, yPos: 0 },
    { xVelocity: 0, yVelocity: 0, xPos: 5, yPos: 1 },
    { xVelocity: 0, yVelocity: 0, xPos: 10, yPos: 2 },
    { xVelocity: 0, yVelocity: 0, xPos: 15, yPos: 3 },
    { xVelocity: 0, yVelocity: 0, xPos: 20, yPos: 4 },
    { xVelocity: 0, yVelocity: 0, xPos: 25, yPos: 5 },
    { xVelocity: 0, yVelocity: 0, xPos: 30, yPos: 6 },
    { xVelocity: 0, yVelocity: 0, xPos: 35, yPos: 7 },
    { xVelocity: 0, yVelocity: 0, xPos: 40, yPos: 8 },
    { xVelocity: 0, yVelocity: 0, xPos: 45, yPos: 9 },
  ]);
  const [firstSegmentPos, setFirstSegmentPos] = useState({ x: 0, y: 0 });
  const gravity = 0.00098;
  const [velocityFactor, setVelocityFactor] = useState(0.01);
  const [dragFactor, setDragFactor] = useState(0.9);

  const onMouseMove = e => {
    setFirstSegmentPos({ x: firstSegmentPos.x + e.clientX - xPos, y: firstSegmentPos.y + e.clientY - yPos });
  }

  let xPos;
  let yPos;

  const onMouseDown = e => {
    xPos = e.target.children[0]?.getBoundingClientRect().x;
    yPos = e.target.children[0]?.getBoundingClientRect().y;
    setFirstSegmentPos({ x: firstSegmentPos.x + e.clientX - xPos, y: firstSegmentPos.y + e.clientY - yPos });
    
    e.target.addEventListener('mousemove', onMouseMove);
  }

  const onMouseUp = e => {
    // e.target.removeEventListener('mousemove', onMouseMove); // not working
  }

  // Add gravity to velocity of segments each update
  // One segment should be static, no changes done to it (attached somewhere)
  // Check x and y dist between curr and prev segment, if > seg.length, add velocity towards prev (up -, down +, left -, right +). Take both x and y into account
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedVal = [...segments];
      updatedVal[0].xPos = firstSegmentPos.x;
      updatedVal[0].yPos = firstSegmentPos.y;

      // Keep the first segment static
      for (let i = 1; i < segments.length; i++) {
        segments[i].yVelocity += gravity;

        segments[i].xPos += segments[i].xVelocity;
        segments[i].yPos += segments[i].yVelocity;

        const xDistDiff = segments[i-1].xPos - segments[i].xPos;
        const yDistDiff = segments[i-1].yPos - segments[i].yPos;

        // if (Math.sqrt(xyDistSq) > 10) {
          segments[i].xVelocity += xDistDiff * velocityFactor;
          segments[i].yVelocity += yDistDiff * velocityFactor;
        // }
        segments[i].xVelocity *= dragFactor;
        segments[i].yVelocity *= dragFactor;
      }
      setSegments(updatedVal);
    }, 10);

    return () => clearInterval(interval);
  }, [segments]);

  const styledSegment = segment => ({
    position: 'relative',
    top: `${segment.yPos}px`,
    left: `${segment.xPos}px`,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'grey',
  });

  return (
    <div className="Rope" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <header className="header">
        Rope
      </header>
      <div className="rope-segments-container">
        {segments.map((seg, i) => (
          <div key={i} style={styledSegment(seg)}></div>
        ))}
      </div>
      {/* <div>
        <div>
          <label>Velocity Factor</label>
          <input type="range" value={velocityFactor} min={0} max={0.5} step={0.01} onChange={e => setVelocityFactor(e.target.value)}></input>
          <label>{velocityFactor}</label>
        </div>
        <div>
          <label>Drag Factor</label>
          <input type="range" value={dragFactor} min={0} max={1} step={0.01} onChange={e => setDragFactor(e.target.value)}></input>
          <label>{dragFactor}</label>
        </div>
      </div> */}
    </div>
  );
}

export default Rope;