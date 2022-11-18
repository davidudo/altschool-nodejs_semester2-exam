const url = 'https://altschoolblogapp.herokuapp.com/user/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNmUyZTcwNDY5NGI3MzgyMDRlYzRkMyIsImZpcnN0TmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJVZG8iLCJlbWFpbCI6InVkb2RhdmlkNDYudWRAZ21haWwuY29tIn0sImlhdCI6MTY2ODE2NTI0NSwiZXhwIjoxNjY4MjUxNjQ1fQ.ZhWrwDZWy38o58Xz2VjYqsFnjTagXFwWhUYXIaainh8';

const updateUser = () => {
  fetch(`${url}636a4be5ad6b5618f07ec319`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      lastName: 'Johnson',
      email: 'udodavid46@gmail.com',
      password: 'davidudo',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    });
};

const deleteUser = () => {
  fetch(`${url}636a37856ce59b9bd3b5b734`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'JavaScript Basics Tutorial',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    });
};

// deleteUser();
// updateUser();
