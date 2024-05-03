import React from "react";
import PropTypes from "prop-types"; // ES6
import "./InputBox.css";

function InputBox(props) {
  function onChangeInput(event) {
    props.callbackInput(event.target.value);
  }

  return (
    <input
      onChange={onChangeInput}
      value={props.inputValue}
      type={props.inputType}
      placeholder={props.inputPlaceholder}
      maxLength={props.inputMaxLength}
      name={props.inputName}
      max={props.inputMax}
      min={props.inputMin}
    />
  );
}

InputBox.propTypes = {
  inputType: PropTypes.string,
  inputValue: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputMaxLength: PropTypes.number,
  inputName: PropTypes.string,
  callbackInput: PropTypes.func.isRequired,
  inputMax: PropTypes.number,
  inputMin: PropTypes.number,
};

export default InputBox;
