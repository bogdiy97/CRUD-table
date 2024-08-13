import React, { useEffect, useState, useRef } from "react";

const DataTable = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const outsideClick = useRef(false);
  const itemsPerPage = 5;
  const LastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = LastItem - itemsPerPage;
  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, LastItem);
  let filteredPagination = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => setCurrentPage(1), [searchTerm]);
  useEffect(() => {
    if (!editId) return;

    let selectedItem = document.getElementById(`${editId}`);
    debugger;
    selectedItem.focus();
  }, [editId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target)
      ) {
        setEditId(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function addData() {
    if (name && gender && age) {
      const newData = { id: Date.now(), name: name, gender: gender, age: age };
      setData([...data, newData]);

      // Clear input fields after adding
      setName("");
      setGender("");
      setAge("");
    }
  }

  function deleteItem(index) {
    if (filteredData.length === 1 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEdit = (id, updatedData) => {
    if (!editId || item.id !== id) {
      return;
    }
    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="container">
      <div className="addContainer">
        <div className="info-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="add" onClick={() => addData()}>
          ADD
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search by name"
          name="name"
          value={searchTerm}
          className="search-input"
          onChange={handleSearch}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  suppressContentEditableWarning={true}
                  contentEditable={editId === item.id}
                  onBlur={(e) => handleEdit(item.id, { name: e.target.text })}
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  suppressContentEditableWarning={true}
                  contentEditable={editId === item.id}
                  onBlur={(e) => handleEdit(item.id, { gender: e.target.text })}
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  suppressContentEditableWarning={true}
                  contentEditable={editId === item.id}
                  onBlur={(e) => handleEdit(item.id, { age: e.target.text })}
                >
                  {item.age}
                </td>

                <td>
                  <button
                    id={item.id}
                    className="edit"
                    onClick={() => setEditId(item.id)}
                  >
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteItem(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredPagination.length / itemsPerPage) },
            (_, index) => (
              <button
                style={{
                  backgroundColor: currentPage === index + 1 && "lightgreen",
                }}
                key={index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
