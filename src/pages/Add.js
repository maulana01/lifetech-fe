/** @format */
import './Add.css'; // Import your CSS file

const Add = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const username = e.target[1].value;
    const password = e.target[2].value;
    const nohp = e.target[3].value;
    const data = {
      name,
      username,
      password,
      nohp,
    };
    try {
      const response = await fetch('https://lifetech.apisansco.my.id/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        window.location.href = '/users';
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='add-container'>
      <h1>Add User</h1>
      <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' className='input-field' />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' className='input-field' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='input-field' />
        </div>
        <div className='form-group'>
          <label htmlFor='nohp'>No HP</label>
          <input type='text' id='nohp' className='input-field' />
        </div>
        <div className='form-group'>
          <button className='submit-button'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
