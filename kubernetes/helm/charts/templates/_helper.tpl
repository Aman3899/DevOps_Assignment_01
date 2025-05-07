{{- /*
Common labels for all resources
*/ -}}
{{- define "blog-app.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.Version | quote }}
app.kubernetes.io/managed-by: Helm
environment: {{ .Values.environment | default "dev" }}
{{- end -}}

{{- /*
Selector labels for pod matching
*/ -}}
{{- define "blog-app.selectorLabels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- /*
Environment variables from ConfigMap and Secret
*/ -}}
{{- define "blog-app.envVars" -}}
{{- range $key, $value := .Values.env }}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- end }}
{{- if .Values.configMapName }}
- name: CONFIG_MAP_REF
  valueFrom:
    configMapKeyRef:
      name: {{ .Values.configMapName }}
      key: config-key
{{- end }}
{{- if .Values.secretName }}
- name: SECRET_REF
  valueFrom:
    secretKeyRef:
      name: {{ .Values.secretName }}
      key: secret-key
{{- end }}
{{- end -}}

{{- /*
Liveness probe configuration
*/ -}}
{{- define "blog-app.livenessProbe" -}}
livenessProbe:
  httpGet:
    path: {{ .Values.probePath | default "/health" }}
    port: {{ .Values.service.port | default 80 }}
  initialDelaySeconds: {{ .Values.liveness.initialDelaySeconds | default 15 }}
  periodSeconds: {{ .Values.liveness.periodSeconds | default 10 }}
  timeoutSeconds: {{ .Values.liveness.timeoutSeconds | default 1 }}
  failureThreshold: {{ .Values.liveness.failureThreshold | default 3 }}
{{- end -}}

{{- /*
Readiness probe configuration
*/ -}}
{{- define "blog-app.readinessProbe" -}}
readinessProbe:
  httpGet:
    path: {{ .Values.probePath | default "/ready" }}
    port: {{ .Values.service.port | default 80 }}
  initialDelaySeconds: {{ .Values.readiness.initialDelaySeconds | default 5 }}
  periodSeconds: {{ .Values.readiness.periodSeconds | default 5 }}
  timeoutSeconds: {{ .Values.readiness.timeoutSeconds | default 1 }}
  failureThreshold: {{ .Values.readiness.failureThreshold | default 3 }}
{{- end -}}

{{- /*
Resource limits and requests
*/ -}}
{{- define "blog-app.resources" -}}
resources:
  limits:
    cpu: {{ .Values.resources.limits.cpu | default "500m" }}
    memory: {{ .Values.resources.limits.memory | default "512Mi" }}
  requests:
    cpu: {{ .Values.resources.requests.cpu | default "200m" }}
    memory: {{ .Values.resources.requests.memory | default "256Mi" }}
{{- end -}}