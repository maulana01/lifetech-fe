/** @format */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

/** @format */

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://lifetech.apisansco.my.id/api/v1/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);
  const tableStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const headerCellStyle = {
    paddingTop: '12px',
    paddingBottom: '12px',
    textAlign: 'center',
    backgroundColor: '#04AA6D',
    color: 'white',
  };

  const splitTwoButton = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  };

  const convertDate = (tgl) => {
    const date = new Date(tgl);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateStr = day + '-' + month + '-' + year;
    return dateStr;
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://lifetech.apisansco.my.id/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        alert('Data berhasil dihapus');
        window.location.href = '/users';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
    users.map((user) => {
      user.createdAt = convertDate(user.createdAt);
      user.updatedAt = convertDate(user.updatedAt);
    });
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'users data' + fileExtension);
  };

  return (
    <>
      <h1>Daftar Users</h1>
      <div style={splitTwoButton}>
        <button>
          <Link to='/users/add' style={{ color: 'black' }}>
            Tambah User
          </Link>
        </button>
        <button
          onClick={() => {
            exportToCSV();
          }}
        >
          Export
        </button>
      </div>
      <table style={tableStyle}>
        <tr>
          <th style={headerCellStyle}>No</th>
          <th style={headerCellStyle}>Nama</th>
          <th style={headerCellStyle}>Username</th>
          <th style={headerCellStyle}>Nohp</th>
          <th style={headerCellStyle}>Created At</th>
          <th style={headerCellStyle}>Action</th>
        </tr>
        {users.map((user, index) => {
          return (
            <tr style={evenRowStyle} key={user.id}>
              <td style={{ ...cellStyle, textAlign: 'center' }}>{index + 1}</td>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.nohp}</td>
              <td style={cellStyle}>{convertDate(user.createdAt)}</td>
              <td style={cellStyle}>
                <button>
                  <Link to={`/users/edit/${user.id}`} style={{ color: 'black' }}>
                    Edit
                  </Link>
                </button>
                <button
                  type='submit'
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Users;
