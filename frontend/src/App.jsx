import { useState } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/NavBar'
import TableList from './components/TableList'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  }
  const handleSubmit = () => {
    if (modalMode === 'add') {
      console.log('Adding new item');
    } else if (modalMode === 'edit') {
      console.log('Editing existing item');
    }else if (modalMode === 'delete') {
      console.log('Deleting item');
    }

  }
  return (
    <>
      <NavBar onOpen = {() => handleOpen('add')}/>
      <TableList handleOpen={handleOpen}/>
      <ModalForm onSubmit={handleSubmit} isOpen={isOpen} onClose={() => setIsOpen(false)}
        mode={modalMode}/>
    </>
  )
}

export default App
