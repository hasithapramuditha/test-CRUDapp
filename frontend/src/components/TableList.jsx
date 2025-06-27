import axios from 'axios';
import { useState,useEffect} from 'react';


export default function TableList({handleOpen, searchTerm}) {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        setTableData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const filteredData = tableData.filter(client => {
    return client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.job.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return(
    <>
      <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Rate</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody className="hover:bg-base-300">
          {/* row */}
          {filteredData.map((client) => (
            <tr>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
                  <button className={`btn rounded-full w-20 ${client.isactive ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                    {client.isactive ? "Active" : "Inactive"}
                  </button>
              </td>
              <td>
                <button onClick={() => handleOpen('edit')} className="btn btn-sm btn-secondary">Update</button>
              </td>
              <td>
                <button onClick={() => handleOpen('delete')} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )}