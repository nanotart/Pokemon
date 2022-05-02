import React from 'react'

export default function Pagination( { goNext, goPrev }) {
  return (
    <div>
        {/* complex if statement, if the first statement is true, then it runs the second part */}
        {goPrev && <button onClick={goPrev}>Previous</button>}
        {goNext && <button onClick={goNext}>Next</button>}
    </div>
  )
}
