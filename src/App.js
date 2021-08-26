import React, { useContext, useState } from "react";

const displayContext = React.createContext();

function App() {
  const [display, setDisplay] = useState(0);
  const [upperDisplay, setUpperDisplay] = useState();
  const [lastOperation, setLastOperation] = useState();
  const value = {
    display,
    setDisplay,
    upperDisplay,
    setUpperDisplay,
    lastOperation,
    setLastOperation,
  };

  return (
    <displayContext.Provider value={value}>
      <Calculator />;
    </displayContext.Provider>
  );
}

function Calculator() {
  return (
    <div className="grid">
      <Display />
      <Button big>AC</Button>
      <Button>DEL</Button>
      <Button>÷</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>*</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>+</Button>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Button>-</Button>
      <Button>.</Button>
      <Button>0</Button>
      <Button big>=</Button>
    </div>
  );
}

function Button({ children, big }) {
  const {
    display,
    setDisplay,
    upperDisplay,
    setUpperDisplay,
    lastOperation,
    setLastOperation,
  } = useContext(displayContext);

  const isNumber = () => {
    return !isNaN(parseInt(children));
  };

  const addNumber = () => {
    setDisplay((prevState) =>
      prevState === 0 ? children : `${prevState}${children}`
    );
  };

  const del = () => {
    setDisplay((prevState) => {
      if (prevState !== 0) {
        if (prevState.toString().length > 1) {
          return prevState.slice(0, -1);
        } else {
          return 0;
        }
      } else {
        return prevState;
      }
    });
  };

  const dot = () => {
    setDisplay((prevState) => {
      if (prevState !== 0) {
        return `${prevState}.`;
      } else {
        return prevState;
      }
    });
  };

  const moveUp = () => {
    setUpperDisplay(display + " " + children);
    setLastOperation(children);
    setDisplay(0);
  };

  const compute = () => {
    switch (lastOperation) {
      case "+":
        return parseFloat(upperDisplay) + parseFloat(display);
      case "-":
        return parseFloat(upperDisplay) - parseFloat(display);
      case "*":
        return parseFloat(upperDisplay) * parseFloat(display);
      case "÷":
        return parseFloat(upperDisplay) / parseFloat(display);

      default:
        throw new Error("Something went wrong!");
    }
  };

  const add = () => {
    if (upperDisplay) {
      setUpperDisplay(compute() + " +");
      setLastOperation("+");
      setDisplay(0);
    } else {
      moveUp();
    }
  };

  const subtract = () => {
    if (upperDisplay) {
      setUpperDisplay(compute() + " -");
      setLastOperation("-");
      setDisplay(0);
    } else {
      moveUp();
    }
  };

  const multipli = () => {
    if (upperDisplay) {
      setUpperDisplay(compute() + " *");
      setLastOperation("*");
      setDisplay(0);
    } else {
      moveUp();
    }
  };

  const divide = () => {
    if (upperDisplay) {
      if (parseInt(display) !== 0) {
        setUpperDisplay(compute() + " ÷");
        setLastOperation("÷");
        setDisplay(0);
      } else {
        setUpperDisplay();
        setLastOperation();
        setDisplay(0);
      }
    } else {
      moveUp();
    }
  };

  const equals = () => {
    let result = compute();
    if (result === Infinity) {
      result = 0;
    }
    setDisplay(result);
    setLastOperation();
    setUpperDisplay();
  };

  const otherButtons = () => {
    switch (children) {
      case "AC":
        setDisplay(0);
        setUpperDisplay();
        break;

      case "DEL":
        del();
        break;

      case ".":
        dot();
        break;

      case "+":
        add();
        break;

      case "-":
        subtract();
        break;

      case "*":
        multipli();
        break;

      case "÷":
        divide();
        break;

      case "=":
        equals();
        break;

      default:
        throw new Error("Something went wrong!");
    }
  };

  const clickHandler = () => {
    isNumber() ? addNumber() : otherButtons();
  };

  return (
    <button onClick={clickHandler} className={`button ${big && "big-button"}`}>
      {children}
    </button>
  );
}

function Display() {
  const { display, upperDisplay } = useContext(displayContext);

  return (
    <div className="output">
      <div className="previous-operand">{upperDisplay}</div>
      <div className="current-operand">{display}</div>
    </div>
  );
}

export default App;
