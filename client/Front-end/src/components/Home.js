import React from 'react'
import UserRating from './UserRating'
import ContestTimer from './ContestTimer'
import ContestUpdates from './ContestUpdates'

export default function Home(props) {
 
  return (
    <>
    <div className="d-flex">

    <div >Contest Updates to be displayed here</div>
    <div className="container">

    <UserRating/>
    <ContestTimer/>
    <ContestUpdates/>
    </div>
    </div>
    </>
  )
}
