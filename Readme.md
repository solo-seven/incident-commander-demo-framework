# Distributed Systems Demo Environment

## Infrastructure

### Kubernetes Kind Cluster

The Kind cluster is setup to have 1 control plane node and 3 worker nodes. The control plane node exposes ports 80 and 443
which allows you to set host names in `/etc/hosts` to route to `localhost`. That way you can set up Ingress to route based
on domain name.

    - host: api.dsdemo.valesordev.com
      http:
        paths:
          - pathType: Prefix
            path: /
            backend:
              service:
                name: monolith-service
                port:
                  number: 80

Your host file should look similar to the following:

    127.0.0.1 frontend.dsdemo.valesordev.com
    127.0.0.1 api.dsdemo.valesordev.com

#### Helm Charts

- Grafana Kubernetes Monitoring
- Cert Manager

#### Controllers

- nginx Ingress

## Applications

The application is based off a common architecture framework within organizations. Most organizations are still running
a monolith behind their frontend application(s). Some of the functions of the monolith have been extracted out and are
running as microservices within Kubernetes.

### Frontend

This is a Create React App generated application. Right now when the main page load, it makes a `fetch` to an endpoint
in the Spring Boot application. Faro is configured in `src/index.js`. This is where the CORS URLs are configured for Faro
to propagate the TraceID to the underlying system.

### Java Spring Boot

The Spring Boot application is a representative of a monolith in the application. It has the Spring Boot Actuator
configured to expose Prometheus metrics and to send Traces. Right now logs are just written to standard out. Since this
is running in Kubernetes and we grab the pod logs to get them. Future work should move this to possibly use the appender.

### Go REST/gRPC Service

This module has not been developed yet. It should have both an HTTP interface and an asynchronous messaging interface.

