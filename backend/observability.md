## Observability Setup

### Steps to Add Observability

- [ ] **1. Install OpenTelemetry in Backend**

  Install dependencies:

  ```bash
  npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/exporter-prometheus
  ```

  Add the following code to your backend (e.g., `app.js`):

  ```javascript

    require("./tracing");
    const promClient = require('prom-client');
    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var cors = require("cors");
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');

    // Create a Registry and metrics collectors for Prometheus
    const register = new promClient.Registry();
    promClient.collectDefaultMetrics({ register });

    // Create custom metrics
    const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10]
    });

    const httpRequestCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
    });

    const errorCounter = new promClient.Counter({
    name: 'http_errors_total',
    help: 'Total number of HTTP errors',
    labelNames: ['method', 'route', 'status_code']
    });

    // Register custom metrics
    register.registerMetric(httpRequestDurationMicroseconds);
    register.registerMetric(httpRequestCounter);
    register.registerMetric(errorCounter);

    var app = express();

    app.set('views', path.join(\_\_dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();

    res.on('finish', () => {
    const route = req.route ? req.route.path : req.path;
    const labels = {
    method: req.method,
    route: route,
    status_code: res.statusCode
    };

        httpRequestCounter.inc(labels);
        end(labels);
        if (res.statusCode >= 400) {
          errorCounter.inc(labels);
        }

    });

    next();
    });

    // Expose metrics endpoint for Prometheus to scrape
    app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
    });

    // Add a simple health check endpoint
    app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
    });

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(**dirname, 'public')));
    app.use("/uploads", express.static(path.join(**dirname, 'uploads')));
    app.use(cors());
  
    app.use('/', indexRouter);
    app.use('/users', usersRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
    });

    module.exports = app;
    ```
    With tracing.js file:
    ```javascript
    const { NodeSDK } = require('@opentelemetry/sdk-node');
    const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
    const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

    const sdk = new NodeSDK({
        serviceName: process.env.OTEL_SERVICE_NAME || 'backend-service',
        traceExporter: process.env.NODE_ENV === 'production'
            ? new OTLPTraceExporter({
                url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://jaeger:4318/v1/traces',
            })
            : new ConsoleSpanExporter(),
        instrumentations: [
            getNodeAutoInstrumentations({
                '@opentelemetry/instrumentation-express': { enabled: true },
                '@opentelemetry/instrumentation-http': { enabled: true },
                '@opentelemetry/instrumentation-mongodb': { enabled: true },
                '@opentelemetry/instrumentation-dns': { enabled: false },
            })
        ]
    });

    try {
        const result = sdk.start();
        if (result && typeof result.then === 'function') {
            result.then(() => console.log('OpenTelemetry initialized successfully'))
                .catch((error) => console.error('Error initializing OpenTelemetry', error));
        } else {
            console.log('OpenTelemetry initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing OpenTelemetry', error);
    }

    process.on('SIGTERM', () => {
        try {
            const result = sdk.shutdown();
            if (result && typeof result.then === 'function') {
                result.then(() => {
                    console.log('OpenTelemetry SDK shut down');
                    process.exit(0);
                }).catch((error) => {
                    console.log('Error shutting down OpenTelemetry SDK', error);
                    process.exit(1);
                });
            } else {
                console.log('OpenTelemetry SDK shut down');
                process.exit(0);
            }
        } catch (error) {
            console.log('Error shutting down OpenTelemetry SDK', error);
            process.exit(1);
      }
    });
    ```


    Instrument your app to collect HTTP metrics (e.g., using middleware).

- [ ] **2. Set Up Prometheus**

  Create a `prometheus.yml` file in your project root:

  ```yaml
  global:
    scrape_interval: 15s
  scrape_configs:
    - job_name: "mern-app"
      static_configs:
        - targets: ["localhost:9464"]
  ```

  Run Prometheus using Docker:

  ```bash
  docker run -d -p 9090:9090 -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
  ```

- [ ] **3. Set Up Grafana**

  Run Grafana using Docker:

  ```bash
  docker run -d -p 3000:3000 grafana/grafana
  ```

  Access Grafana at `http://localhost:3000`, log in with `admin/admin`, and add Prometheus as a data source pointing to `http://localhost:9090`.
  Create dashboards for:

  - HTTP request rate
  - Error rate (4xx/5xx)
  - Latency (p95, p99)
  - Custom app-level metrics (e.g., user sign-ups)

- [ ] **4. Screenshots**

  Take screenshots of your Grafana dashboards showing the above metrics.

### Config Files

- `backend/index.js`: Updated with OpenTelemetry instrumentation.
- `prometheus.yml`: Prometheus configuration file.
