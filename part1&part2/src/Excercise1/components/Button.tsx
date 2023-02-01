import React from 'react'

type ButtonProps = {
  text: React.ReactNode
  handleClick: any
}

const Button = ({ handleClick, text }: ButtonProps) => {
  return (
    <button onClick={() => handleClick((prevState: number) => prevState + 1)}>
      {text}
    </button>
  )
}

export default Button
