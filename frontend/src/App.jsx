import { useState,useEffect } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        setTableData(response.data);
      } catch (err) {
        setError(err.message);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode,client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  }
  const handleSubmit = async(newClientData) => {
    if (modalMode === 'add') {
      try{
        const response = await axios.post('http://localhost:3000/api/clients',newClientData);
        console.log('Client added:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
      }catch(error) {
        console.error('Error adding client:', error);
      }
      console.log('Adding new item');
    } else{
      try{
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
        setTableData((prevData) => 
          prevData.map(client => client.id === clientData.id ? response.data : client)
        );
      }catch(error) {
        console.error('Error updating client:', error);
      }
      console.log('Editing existing item');
    }

  }
  return (
    <>
      <NavBar onOpen = {() => handleOpen('add') } onSearch = {setSearchTerm} />
      <TableList setTableData={setTableData} tableData={tableData}
      handleOpen={handleOpen} searchTerm= {searchTerm}/>
      <ModalForm onSubmit={handleSubmit} isOpen={isOpen} onClose={() => setIsOpen(false)}
        mode={modalMode} clientData={clientData} />
    </>
  )
}

export default App
