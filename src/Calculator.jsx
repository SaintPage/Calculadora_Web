import React from 'react'
import useCalculator from './useCalculator'
import Display from './Display'
import Keyboard from './Keyboard'
import './style.css'   

export default function Calculator() {
  const { currentValue, displayRef, handleButtonClick } = useCalculator()

  return (
    <div className="container">
      <h1 className="calculator-title">Calculadora Proyecto </h1>
      <div className="calculator">
        <Display value={currentValue} displayRef={displayRef} />
        <Keyboard handleClick={handleButtonClick} />
      </div>
    </div>
  )
}
