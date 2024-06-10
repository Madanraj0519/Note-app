import React from 'react'

const EmptyCard = ({ isSearch }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={isSearch ? "https://cdn0.iconfinder.com/data/icons/content-16/24/notes-question-512.png" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwVRJz1pc8vE9n5FHQX44gTuDpZU2odhPKD1O9EajSrStFX2jwsPlS5sqvkE34JeEfSq0&usqp=CAU"} alt='no notes' className='w-60' />

        {
          isSearch ? (
              <p className='w-1/2 text-sm font-medium text-slate-700
               text-center leading-7 mt-5'>Oops! No Notes found matching your search</p>
          ) : (<p className='w-1/2 text-sm font-medium text-slate-700
            text-center leading-7 mt-5'>Start creating your first note! Click the 'Add' button to jot 
            down your thoughts, ideas, and reminders. Let's get started!</p>)
        }
    </div>
  )
}

export default EmptyCard