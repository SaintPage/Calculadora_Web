// src/components/Button.jsx
import React from 'react'
import PropTypes from 'prop-types'
import './button.css'



export const Button = ({
  primary = false,
  backgroundColor = null,
  size = 'medium',
  label,
  ...props
}) => {
  const modeClass = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'

  const sizeClass = `storybook-button--${size}`

  const classes = ['storybook-button', modeClass, sizeClass].join(' ')
  const style = backgroundColor ? { backgroundColor } : {}

  return (
    <button
      type="button"
      className={classes}
      style={style}
      {...props}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
