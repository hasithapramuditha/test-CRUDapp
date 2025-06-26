export default function TableList({handleOpen}) {
  const clients = [
    {id: 1, name: "Hasitha Pramuditha", email:"hasithapramuditha@gmail.com", job:"Software Engineer", rate: "700", isactive: true},
    {id: 2,name: "Hasitha Pramuditha 1", email:"hasithapramuditha@gmail.com", job:"Software Engineer", rate: "700", isactive: true},
    {id: 3,name: "Hasitha Pramuditha 2", email:"hasithapramuditha@gmail.com", job:"Software Engineer", rate: "700", isactive: false},
    {id: 4,name: "Hasitha Pramuditha 3", email:"hasithapramuditha@gmail.com", job:"Software Engineer", rate: "700", isactive: true}
  ];
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
          {clients.map((client) => (
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