import React, {useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar'
import NoteCard from '../../Components/NoteCard'
import { MdAdd } from 'react-icons/md'
import EditNotes from '../../Components/EditNotes'
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import EmptyCard from '../../Components/EmptyCard'

const Home = () => {

  const [ openAddEditModel, setOpenAddEditModel ] = useState({
    isShown : false,
    type : "add",
    data : null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [ userInfo, setUserInfo ] = useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({
      isShown : true, data : noteDetails, type : "edit",
    });
  }

  // Get User Info
  const getUserInfo = async() => {
    try {
      const response = await axiosInstance.get("/api/auth/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login"); 
      }
    }
  }

  // Get all notes
  const getAllNotes = async() => {
    try {
      const response = await axiosInstance.get("/api/note/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  }

  // delete notes
  const deleteNote = async(data) => {
    const noteId = data._id
        try {
            const response = await axiosInstance.delete("/api/note/delete-note/" + noteId );

            if(response.data && !response.data.error){
                getAllNotes();
                // navigate('/dashboard')
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
               console.log("An unexpected error occurred. Please try again.");
            }
        }
    location.reload();
  };

  // Search for notes
  const searchNotes = async(query) => {
    try {
      const response = await axiosInstance.get("/api/note/search-notes", {
        params : { query },
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id;
    setIsPinned((prev) => !prev);
    try {
        const response = await axiosInstance.put("/api/note/update-note-pinned/" + noteId , {
           isPinned: isPinned,
        });

        if(response.data && response.data.note){
            getAllNotes();
        }
    } catch (error) {
        console.log(error);
    }
  };

  const updateChecked = async(noteData) => {
    const noteId = noteData._id;
    setCheckbox((prev) => !prev);
    try {
      const response = await axiosInstance.put("/api/note/update-checked-note/" + noteId , {
        isChecked : checkbox,
     });

     if(response.data && response.data.note){
         getAllNotes();
     }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false); //
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();

    return () => {};
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} 
      searchNotes={searchNotes} handleClearSearch={handleClearSearch} />

      <div className='container mx-auto px-10'>
        {
          allNotes.length > 0 ? (
            <div className='grid md:grid-cols-3 gap-4 mt-8'>
               {
                 allNotes.map((note) => (
                   <NoteCard note={note} 
                   handleEdit={handleEdit}
                   deleteNote={() => deleteNote(note)}
                   updateIsPinned={() => updateIsPinned(note)}
                   checkbox={checkbox}
                   updateChecked={() => updateChecked(note)} />
                 ))
               }
            </div>
          ) : (
            <EmptyCard isSearch={isSearch} />
          )
        }
      </div>   

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl
      bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
       onClick={() => {
        setOpenAddEditModel({
          isShown : true, type: "add", data : null
        });
       }}>
        <MdAdd className='text-[32px] text-white' />
      </button> 

      <Modal isOpen={openAddEditModel.isShown}
         onRequestClose={() => {}}
         style={{
          overlay:{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
         }}
         contentLabel=''
         className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <EditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
          setOpenAddEditModel({ isShown : false, type: "add", data : null });
          }}
          getAllNotes={getAllNotes} />
      </Modal>

    </>
  )
}

export default Home