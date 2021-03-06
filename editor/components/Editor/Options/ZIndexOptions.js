import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

/* eslint-disable no-param-reassign, radix */

class ZIndexOptions extends Component {

  changeZIndex = (event) => {
    const dir = event.currentTarget.getAttribute('data-change-direction');
    let index = 0;
    this.props.selectedBlocks.forEach((block) => {
      let zIndex = block.zIndex;
      switch (dir) {
        case '+': {
          zIndex = Math.min(zIndex + 1, 255);
          break;
        }
        case '-': {
          zIndex = 0;
          break;
        }
        default: {
          break;
        }
      }
      const params = {
        zIndex,
      };
      block.zIndex = zIndex;
      window.RevealEditor.currentSection.getSelectedBlocks()[index].setState(params);
      index += 1;
    });
    this.props.editor_set_selected_blocks(window.RevealEditor.currentSection.getState().selectedBlocks);
  }

  render = () => {
    return (
      <div className="zindex-option">
        <button className="editor-button" onTouchTap={ this.changeZIndex } data-change-direction='-'>
          <div className="icon-controller-next" style={ { transform: 'scale(2) rotate(90deg)' } }></div>
          To Bottom
        </button>
        <button className="editor-button" onTouchTap={ this.changeZIndex } data-change-direction='+'>
          <div className="icon-controller-play" style={ { transform: 'scale(2) rotate(270deg)' } }></div>
            Level + 1
        </button>
      </div>
    );
  }
}

ZIndexOptions.propTypes = {
  isMain: PropTypes.bool,
  label: PropTypes.string,
  blockProp: PropTypes.string,
  selectedBlocks: PropTypes.array.isRequired,
  editor_set_selected_blocks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default create(ZIndexOptions, mapStateToProps);
