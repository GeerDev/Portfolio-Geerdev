---
name: "Pipelines CI/CD con Jenkins y GitHub Actions"
description: "Automatización del ciclo de vida del software de punta a punta: integración continua, publicación de imágenes Docker, tests end-to-end y acciones a medida, implementadas con las dos herramientas de referencia, Jenkins y GitHub Actions."
image: "/CICD.png"
isActive: true
order: 3
highlights:
  - "Pipelines en Jenkins (clásico) y GitHub Actions (cloud-native) comparados de tú a tú"
  - "Build aislado con Docker-in-Docker: sin herramientas preinstaladas en el agente"
  - "CD que publica imágenes en GitHub Container Registry etiquetadas por commit (SHA)"
  - "Tests E2E con Cypress sobre toda la app levantada con Docker Compose"
skills: ["Jenkins", "GitHub Actions", "Docker", "Cypress", "Gradle"]
github: "https://github.com/GeerDev/Entregables_CICD"
---

Si entregar software a mano da miedo, es que algo falla. Una buena pipeline convierte el "a ver si esta vez no rompo nada" en un proceso **automático, repetible y con red de seguridad**. Este proyecto recorre ese camino con las dos herramientas que dominan la industria —**Jenkins** y **GitHub Actions**— para entender cuándo brilla cada una.

## Jenkins: la integración continua clásica

### Pipeline declarativa Java + Gradle
Una pipeline en tres etapas que se dispara con cada cambio:

```
Checkout  →  Compile (gradlew compileJava)  →  Test (gradlew test)
```

Construida sobre una imagen Docker de Gradle a medida, para que el entorno de build sea siempre el mismo.

### Docker-in-Docker: builds sin contaminar el agente
La evolución interesante: en lugar de instalar herramientas en el agente de Jenkins, la pipeline **monta el socket de Docker** y ejecuta el build dentro de un contenedor (`gradle:6.6.1`). ¿La ganancia? Libertad total: cualquier build puede usar **cualquier imagen**, sin tocar la máquina que orquesta. El agente se mantiene limpio.

## GitHub Actions: workflows cloud-native

Cuatro workflows que cubren el ciclo completo:

- **CI de frontend** — se activa solo en pull requests que tocan el directorio del front (filtrado por *paths*), con Node.js, caché de dependencias, build y tests unitarios.
- **CD de frontend** — despliegue manual (`workflow_dispatch`) que hace login en **GitHub Container Registry**, construye la imagen Docker y la publica etiquetada como `latest` **y con el SHA del commit**, para poder trazar exactamente qué versión está desplegada.
- **Tests end-to-end** — levanta la app entera (API + front) con **Docker Compose**, espera a que los servicios estén listos con `wait-on`, lanza **Cypress** en modo headless y garantiza la limpieza con `if: always()`.
- **Acción personalizada en JavaScript** — una *custom action* que, al etiquetar una issue con `motivate`, consulta una API de citas y deja un mensaje motivador. Hecha solo con módulos nativos de Node, sin dependencias externas.

## Lo que me llevé

- La diferencia real entre un CI clásico (**Jenkins**) y uno cloud-native (**GitHub Actions**), y por qué hoy conviven.
- **Distintos disparadores** para distintas necesidades: por commit, por PR con filtro de rutas, manual, por evento de etiqueta.
- **Docker como pieza transversal**: entorno de build aislado *y* artefacto de despliegue.
- Trazabilidad de verdad: etiquetar imágenes por **commit** para saber siempre qué hay en producción.
- Meter los **tests E2E dentro de la pipeline** para que nada llegue lejos sin pasar por la red de seguridad.
