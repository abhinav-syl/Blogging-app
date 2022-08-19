import fetch from node-fetch

function post_data(data){
    const response = fetch("localhost:3000/users", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data,
    });
    
    response.json().then(data => {
      console.log(data);
    });
  }