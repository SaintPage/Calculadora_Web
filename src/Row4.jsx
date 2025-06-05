import React from 'react'
import CalcButton from './CalcButton'

export default function Row4({ handleClick }) {
  return (
    <>
      <CalcButton value='1' keyCode='49' onClick={handleClick}>1</CalcButton>
      <CalcButton value='2' keyCode='50' onClick={handleClick}>2</CalcButton>
      <CalcButton value='3' keyCode='51' onClick={handleClick}>3</CalcButton>
      {/* “+” es operador → className="operator" */}
      <CalcButton
        className='operator'
        value='sum'
        keyCode='187'
        onClick={handleClick}
      >
        +
      </CalcButton>
    </>
  )
}
