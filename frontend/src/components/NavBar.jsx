export default function NavBar({ onOpen, onSearch }) {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <> 
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Clients</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearch} 
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary" onClick={onOpen}>Add Client</a>
        </div>
      </div>
    </>
  );
}
