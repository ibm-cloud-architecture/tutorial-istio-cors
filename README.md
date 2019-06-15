Example using CORS in istio

Pre-reqs
- Kubernetes with Istio

Deploy backend and frontend
```
kubectl apply -f backend/
kubectl apply -f frontend/
kubectl apply -f istio/
```

Start port-forward for frontend
```
kubectl port-forward service/bff-service 8080:80
```

Start port-forward for istio
```
kubectl port-forward service/istio-ingressgateway 8000:80 -n istio-system
```

Open browser for frontend
```
http://127.0.0.1.xip.io:8080/
```

Open browser inspect and go to javascript console, then copy paste the following to make a POST http request against the backend going thru istio ingressgateway
```js
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
postData('http://127.0.0.1.nip.io:8000/api/v1/foo', {answer: 42})
  .then(data => console.log(JSON.stringify(data, null, 2))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));
```
