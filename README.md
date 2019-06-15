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
Click button to send http request `POST` to backend.
It should return JSON since the CorsPolicy is allowing the request
