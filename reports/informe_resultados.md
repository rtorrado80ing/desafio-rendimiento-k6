# Informe de resultados - Prueba de rendimiento

## Objetivo
Evaluar el comportamiento del servicio `GET /products/{ID}` bajo una carga progresiva hasta 100 usuarios concurrentes, manteniendo la carga durante 25 minutos y finalizando con una reducción gradual.

## Métricas a analizar
- Tiempo promedio de respuesta.
- Percentil 90 y 95 de tiempo de respuesta.
- Tasa de errores HTTP.
- Throughput: solicitudes por segundo.
- Porcentaje de checks exitosos.
- Comportamiento durante ramp-up, carga sostenida y ramp-down.

## Criterios de aceptación
- El 95% de las respuestas debe estar por debajo de 500 ms.
- La tasa de error debe ser inferior al 1%.
- La tasa de validaciones exitosas debe ser superior al 99%.

## Análisis esperado
Si durante la carga sostenida aumentan los tiempos de respuesta o aparecen errores 5xx/429, podría existir saturación del servicio, limitación de rate limit o cuello de botella en procesamiento.

Si los tiempos se mantienen estables durante los 25 minutos, se considera que el servicio soporta la carga objetivo.

## Recomendaciones
- Implementar monitoreo del lado servidor para CPU, memoria, red y logs.
- Revisar posibles límites de rate limit del servicio.
- Ejecutar pruebas adicionales con mayor carga para identificar el punto de quiebre.
- Agregar pruebas por percentiles p90, p95 y p99.
- Incluir dashboards con Grafana/InfluxDB si se requiere análisis histórico.
