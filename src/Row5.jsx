import React from 'react'
import CalcButton from './CalcButton'

export default function Row5({ handleClick }) {
  return (
    <>
      {/* “0” ocupa dos columnas; ya tenía className="double" */}
      <CalcButton 
        className='double' 
        value='0' 
        keyCode='48' 
        onClick={handleClick}
      >
        0
      </CalcButton>
      <CalcButton value='.' keyCode='190' onClick={handleClick}>.</CalcButton>
      {/* “=” es operador → className="operator" */}
      <CalcButton
        className='operator'
        value='result'
        keyCode='13'
        onClick={handleClick}
      >
        =
      </CalcButton>
    </>
  )
}
