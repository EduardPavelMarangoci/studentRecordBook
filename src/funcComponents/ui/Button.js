import React from "react";
import "./Button.css";

import PropTypes from "prop-types"; // ES6

function Button(props) {
  function clickButton(event) {
    props.callbackButton();
    // props.setIsTableVisible(!props.isTableVisible);
  }

  return (
    <div
      onClick={clickButton}
      className={props.classCss}
      style={{
        fontSize: props.fontSize,
      }}
    >
      {props.label}
    </div>
  );
}

Button.defaultProps = {
  label: "click",
};

Button.propTypes = {
  label: PropTypes.string,
  classCss: PropTypes.string,
  fontSize: PropTypes.number,
  callbackButton: PropTypes.func.isRequired,
  // setIsTableVisible: PropTypes.bool.isRequired,
  // isTableVisible: PropTypes.bool.isRequired,
};

export default Button;
