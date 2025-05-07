// tracing.js - OpenTelemetry configuration
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

// Configure the OpenTelemetry SDK with simpler configuration
const sdk = new NodeSDK({
    serviceName: process.env.OTEL_SERVICE_NAME || 'backend-service',
    traceExporter: process.env.NODE_ENV === 'production'
        ? new OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://jaeger:4318/v1/traces',
        })
        : new ConsoleSpanExporter(), // For development, print to console
    instrumentations: [
        getNodeAutoInstrumentations({
            // Auto-instrument Express
            '@opentelemetry/instrumentation-express': { enabled: true },
            // Auto-instrument HTTP
            '@opentelemetry/instrumentation-http': { enabled: true },
            // Auto-instrument MongoDB if you're using it
            '@opentelemetry/instrumentation-mongodb': { enabled: true },
            // Disable instrumentations you don't need
            '@opentelemetry/instrumentation-dns': { enabled: false },
        })
    ]
});

// Start the OpenTelemetry SDK (handle both Promise and non-Promise return types)
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

// Gracefully shut down the SDK to flush telemetry when the process exits
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