import { useEffect, useState } from "react";

export default function ModalForm({isOpen, onClose, mode,onSubmit , clientData}) { 
  const [rate,setRate]= useState('');
  const [name,setName]= useState('');
  const [job,setJob]= useState('');
  const [email,setEmail]= useState('');
  const [status,setStatus]= useState('false');

  const handleStatusChange = (e) =>{
    setStatus(e.target.value == 'Active');

  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const clientData = {
                            name,
                            email,
                            job,
                            rate: Number(rate),
                            isactive: status
                          };
      await onSubmit(clientData )
      onClose();
    }catch (error) {
      console.error('Error adding client', error);
    }
    onClose();
  }

  useEffect(() => {
    if (mode === 'edit' && clientData) {
      setName(clientData.name || '');
      setEmail(clientData.email || '');
      setJob(clientData.job || '');
      setRate(clientData.rate || '');
      setStatus(clientData.isactive || false);
    } else {
      setName('');
      setEmail('');       
      setJob('');
      setRate('');
      setStatus(false);
    }
  }, [mode, clientData]);


  return(
    <> 
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className = "font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details' }  </h3>
          <form onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <label className="input input-border my-4 flex item-center gap-2">
              Name
              <input type="text" className="grow" placeholder="Enter the name here" value={name} onChange={(e)=> setName(e.target.value)} />
            </label>
            <label className="input input-border my-4 flex item-center gap-2">
              Email
              <input type="text" className="grow" placeholder="Enter the email here" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </label>
            <label className="input input-border my-4 flex item-center gap-2">
              Job
              <input type="text" className="grow" placeholder="Enter the job here" value={job} onChange={(e)=> setJob(e.target.value)}/>
            </label>

            <div className="flex mb-4 justify-between">
              <label className="input input-border my-4 flex item-center gap-2">
                  Rate
                <input type="number" className="grow" placeholder="Enter the rate here" value={rate} onChange={(e)=> setRate(e.target.value)}/>
              </label>
              <select value={status ? 'Active' :'Inactive'} className="select my-4 ml-4" onChange={handleStatusChange}>
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>
            <button className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client' }</button>
          </form>
        </div>
      </dialog>
    </>
  )}