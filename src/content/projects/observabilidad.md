---
name: "Observabilidad: métricas, logs y trazas"
description: "Stack de observabilidad de extremo a extremo sobre los tres pilares de la telemetría —métricas, logs y trazas— con Prometheus, Loki y Jaeger, instrumentando una aplicación Python real y orquestado con Docker Compose."
image: "/Telemetria.png"
isActive: true
order: 4
highlights:
  - "Los tres pilares cubiertos: métricas (Prometheus), logs (Loki) y trazas (Jaeger)"
  - "App FastAPI instrumentada que exporta sus propias métricas a Prometheus"
  - "Trazado distribuido con Jaeger siguiendo principios de OpenTracing (spans y tags)"
  - "Todo el stack levantado y conectado con Docker Compose"
skills: ["Prometheus", "Loki", "Jaeger", "Docker", "Python", "FastAPI"]
github: "https://github.com/GeerDev/Entregables_Telemetria"
---

Desplegar es solo la mitad del trabajo; la otra mitad es **saber qué está pasando** una vez que el sistema está vivo. Cuando algo va lento o falla a las 3 de la mañana, la diferencia entre adivinar y *saber* se llama observabilidad. Este proyecto construye ese sistema nervioso atacando sus **tres pilares**: métricas, logs y trazas.

## Pilar 1 — Métricas con Prometheus

El núcleo del proyecto. Prometheus **recolecta métricas por scraping** y las guarda como series temporales que luego se consultan con PromQL:

- Setup base en Docker, consultando uso de **CPU y memoria**.
- Conceptos clave de su modelo: **exporters**, **recording rules** y **alert rules**.
- **Instrumentación de aplicación**: una API en **FastAPI** que, mediante el cliente de Prometheus para Python, **exporta sus propias métricas**. Aquí se cierra el círculo: no solo monitorizas la infraestructura, sino el comportamiento real de tu código.

## Pilar 2 — Logs con Loki

El "Prometheus de los logs". Se analiza cómo **Loki** agrega y centraliza los registros de los servicios, encajando en el mismo ecosistema y filosofía de etiquetas, para pasar de tener logs dispersos por contenedores a un punto único donde buscar.

## Pilar 3 — Trazas con Jaeger

Cuando una petición atraviesa varios servicios, ¿dónde se va el tiempo? El **trazado distribuido** lo responde. Con **Jaeger** y los principios de OpenTracing se trabaja la anatomía de una traza:

```
Trace
 └─ Span (operación) → tags, scope, duración
     └─ Span hijo …
```

Spans, scopes y tags permiten **seguir una petición de punta a punta** y localizar el cuello de botella exacto.

## Cómo encaja todo

El stack se orquesta con **Docker Compose**, que levanta los servicios de observabilidad junto a la aplicación instrumentada y los conecta en una sola red. El resultado es una **plataforma unificada**: en un mismo entorno conviven la app, sus métricas, sus logs y sus trazas.

## Lo que me llevé

- Interiorizar los **tres pilares** y entender que se complementan: las métricas te dicen *que* algo va mal, las trazas *dónde* y los logs *por qué*.
- Pasar de monitorizar "la máquina" a **instrumentar la aplicación** y medir lo que de verdad importa al negocio.
- El modelo de Prometheus —scraping, series temporales, alertas— como base de casi cualquier monitorización moderna.
- Leer una **traza distribuida** para diagnosticar latencia en sistemas con muchas piezas.
