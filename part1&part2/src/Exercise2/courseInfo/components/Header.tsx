import React from 'react'

type HeaderProps = {
  courses: Record<string, number>
}

const Header = ({ courses }: HeaderProps) => {
  return <h1>{courses.name}</h1>
}

export default Header
