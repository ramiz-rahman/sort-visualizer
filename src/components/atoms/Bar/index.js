import React from 'react';
import './style.css';

const Bar = ({
  width,
  height,
  val,
  comparing,
  compared,
  sorted,
  style
}) => {
  let classNames = 'Bar';
  if (comparing) classNames += ' Bar_comparing';
  if (compared) classNames += ' Bar_compared';
  if (sorted) classNames += ' Bar_sorted';

  let BarStyle = { ...style, width: `${width}%`, height: `${height}%` };
  if (comparing) BarStyle['marginRight'] = `2rem`;

  return (
    <div style={BarStyle} className={classNames}>
      <span className="Bar__Text">{val}</span>
    </div>
  );
};

export default Bar;
