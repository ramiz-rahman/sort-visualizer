import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

import Button from '../../atoms/Button';
import {
  MdPlayArrow as Play,
  MdPause as Pause,
  MdSkipNext as Forward,
  MdSkipPrevious as Backward,
  MdShuffle as Shuffle,
  MdRepeat as Repeat
} from 'react-icons/md';

// Helper function
function isDisabled(action, disabled = false) {
  return action === undefined || disabled;
}

const VisualizerControls = ({
  // Actions
  onPlay,
  onPause,
  onBackward,
  onForward,
  onShuffle,
  onRepeat,

  // States
  playing,
  playDisabled,
  pauseDisabled,
  backwardDisabled,
  forwardDisabled,
  shuffleDisabled,
  repeatDisabled
}) => {
  return (
    <div className="VisualizerControls">
      {/* Shuffle */}
      <Button
        icon={Shuffle}
        onClick={onShuffle}
        disabled={isDisabled(onShuffle, shuffleDisabled)}
      />

      {/* Backward Button  */}
      <Button
        icon={Backward}
        onClick={onBackward}
        disabled={isDisabled(onBackward, backwardDisabled)}
        iconClass="VisualizerControls__Icon"
      />

      {/* Play or Pause button - context dependent */}
      <Button
        icon={playing ? Pause : Play}
        onClick={playing ? onPause : onPlay}
        disabled={
          playing
            ? isDisabled(onPause, pauseDisabled)
            : isDisabled(onPlay, playDisabled)
        }
        raised
        iconClass="VisualizerControls__Icon"
        className="VisualizerControls__CenterButton"
      />

      {/* Forward Button  */}
      <Button
        icon={Forward}
        onClick={onForward}
        disabled={isDisabled(onForward, forwardDisabled)}
        iconClass="VisualizerControls__Icon"
      />

      {/* Repeat */}
      <Button
        icon={Repeat}
        onClick={onRepeat}
        disabled={isDisabled(onRepeat, repeatDisabled)}
      />
    </div>
  );
};

VisualizerControls.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onBackward: PropTypes.func,
  onForward: PropTypes.func,
  onShuffle: PropTypes.func,
  onRepeat: PropTypes.func,
  playing: PropTypes.bool,
  playDisabled: PropTypes.bool,
  pauseDisabled: PropTypes.bool,
  backwardDisabled: PropTypes.bool,
  forwardDisabled: PropTypes.bool,
  shuffleDisabled: PropTypes.bool,
  repeatDisabled: PropTypes.bool
};

export default VisualizerControls;
