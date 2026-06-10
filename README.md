# Automatización prueba de rendimiento - Desafío #4

## Servicio evaluado
GET https://fakestoreapi.com/products/{ID}

El servicio permite obtener la información de un producto específico utilizando un ID entre 1 y 19.

## Herramienta seleccionada
Se seleccionó **k6** porque permite crear scripts simples en JavaScript, manejar cargas progresivas, definir umbrales de calidad, usar datos externos y generar métricas clave de rendimiento.

## Escenario de prueba
- Fuente de datos externa: `data/products.csv`, con IDs del 1 al 19.
- Ramp-up: de 0 a 100 usuarios en 100 segundos.
- Carga sostenida: 100 usuarios durante 25 minutos.
- Ramp-down: de 100 a 0 usuarios en 100 segundos.
- Cada usuario virtual espera entre 4 y 9 segundos antes de ejecutar la solicitud.

## Validaciones implementadas
- Código de respuesta HTTP 200.
- Tiempo de respuesta menor a 500 ms.
- Existencia del campo `id`.
- Existencia del campo `title`.
- Existencia del campo `price`.

## Umbrales definidos
- `http_req_failed < 1%`
- `p95(http_req_duration) < 500ms`
- `checks > 99%`

## Ejecución
```bash
k6 run performance-products-test.js
```

Para exportar resultados:
```bash
k6 run --summary-export reports/summary.json performance-products-test.js
```

## Buenas prácticas aplicadas
- Datos de prueba externos.
- Escenario de carga progresiva.
- Validaciones funcionales durante la prueba.
- Umbrales claros de aceptación.
- Separación entre script, datos y reporte.
- Métricas enfocadas en tiempo de respuesta, errores y tasa de éxito.
