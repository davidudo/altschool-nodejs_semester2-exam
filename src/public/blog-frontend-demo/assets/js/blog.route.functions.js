const token = localStorage.getItem('token');

/* API url */
// const url = 'https://altschoolblogapp.herokuapp.com/blog/';
const url = 'http://localhost:8000/blog';

const getBlogs = () => {
  fetch(`${url}?pageNumber=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const getBlog = () => {
  fetch(`${url}636a4c47ad6b5618f07ec31e`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const createBlog = () => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'JavaScript Tutorial',
      description: 'JavaScript Basics for Beginners',
      body: 'This is the content of the blog.',
      tags: ['JavaScript', 'Beginners'],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    });
};

const updateBlog = () => {
  fetch(`${url}636a37866ce59b9bd3b5b78c`, {
    method: 'PUT',
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

const deleteBlog = () => {
  fetch(`${url}636a37866ce59b9bd3b5b78f`, {
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

console.log('hey')

getBlogs();
// createBlog();
// updateBlog();
// getBlog();
// deleteBlog();
