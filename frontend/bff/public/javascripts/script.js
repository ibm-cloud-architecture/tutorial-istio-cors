function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native Javascript objects 
}

const button = document.querySelector('button');
const text_area = document.querySelector('textarea');
button.addEventListener('click', event => {
  //text_area.innerHTML = `Click count: ${event.detail}`;
  postData('http://127.0.0.1.nip.io:8000/api/v1/foo', {answer: 42})
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
    text_area.innerHTML = JSON.stringify(data, null, 2)
  }) // JSON-string from `response.json()` call
  .catch(error => {
    console.error(error)
    text_area.innerHTML = error.message
  });
});

