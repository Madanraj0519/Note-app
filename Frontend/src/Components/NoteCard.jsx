import React, { useState } from 'react';
import moment from "moment";
import {MdOutlinePushPin, MdCreate, MdDelete} from "react-icons/md"

const NoteCard = ({ note, handleEdit, deleteNote,  updateIsPinned, updateChecked, checkbox }) => {

    

    // console.log(checkbox);
   
  return (
      <div key={note.id} className='border w-full rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium capitalize'>{note.title}</h6>
                <span className='text-xs text-slate-500'>{moment(note.createdOn).format('DD MM YYYY')}</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <input type='checkbox' className='text-slate-300' value={checkbox} onClick={updateChecked} />
              <MdOutlinePushPin className={`icon-btn ${note.isPinned ? "text-primary" : "text-slate-300"}`} onClick={() =>  updateIsPinned(note)} />
            </div>
        </div>

        <p className='text-xs text-slate-600 mt-2'>{note.content?.slice(0, 60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs flex gap-2 text-slate-500'>
                {
                    note.tags.map((tag) => <p>#{tag}</p>)
                }
            </div>
            
            <div className='flex items-center gap-2'>
                <MdCreate className='icon-btn hover:text-green-600' onClick={() => handleEdit(note)} />
                <MdDelete className='icon-btn hover:text-red-600' onClick={() => deleteNote(note)} />
            </div>  
        </div>
      </div>
  )
}

export default NoteCard