const url = 'https://altschoolblogapp.herokuapp.com/blog/';

let getBlogs = () => {
  fetch(`${url}?pageNumber=2`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

}

let postBlog = () => {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNmJiMDUwMzk1ZmJmZGNlYWEzYzM5NCIsImZpcnN0TmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJVZG8iLCJlbWFpbCI6InVkb2RhdmlkNDYudWRAZ21haWwuY29tIn0sImlhdCI6MTY2ODAwMTg4MiwiZXhwIjoxNjY4MDg4MjgyfQ.FJBSfSlcvlCt1y0bmin45b2c1wgvzbw5c6IhOhy8PQw';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      "title": "JavaScript Tutorial",
      "description": "JavaScript Basics for Beginners",
      "body": "This is the content of the blog.",
      "tags": ["JavaScript", "Beginners"]
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data)
  })
}

let updateBlog = () => {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNmJiMDUwMzk1ZmJmZGNlYWEzYzM5NCIsImZpcnN0TmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJVZG8iLCJlbWFpbCI6InVkb2RhdmlkNDYudWRAZ21haWwuY29tIn0sImlhdCI6MTY2ODAwMTg4MiwiZXhwIjoxNjY4MDg4MjgyfQ.FJBSfSlcvlCt1y0bmin45b2c1wgvzbw5c6IhOhy8PQw';

  fetch(`${url}636a37866ce59b9bd3b5b78c`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      "title": "JavaScript Basics Tutorial"
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data)
  })
}

// getBlogs();
// postBlog();
updateBlog();
