---
name: "Orquestación de contenedores con Kubernetes"
description: "Un laboratorio progresivo que lleva una misma aplicación de TODOs desde un monolito en memoria hasta una arquitectura distribuida (UI + API + base de datos) desplegada y orquestada en Kubernetes."
image: "/Kubernetes.png"
isActive: true
order: 2
highlights:
  - "Misma app, tres niveles: monolito en memoria → monolito con BD → app distribuida"
  - "UI con Nginx, API en Node.js/Express y PostgreSQL como servicios independientes"
  - "Deployments y Services para escalar y comunicar componentes dentro del clúster"
  - "Separación de responsabilidades y persistencia real de datos"
skills: ["Kubernetes", "Docker", "Node.js", "Express", "PostgreSQL", "Nginx"]
github: "https://github.com/GeerDev/Entregables_Kubernetes"
---

¿Cómo pasa una aplicación de "funciona en mi máquina" a vivir en un clúster que la mantiene en pie, la escala y la cura sola? Este laboratorio responde a esa pregunta construyendo **la misma aplicación tres veces**, cada una un escalón más cerca de cómo se despliega software de verdad.

## La idea: una app, tres evoluciones

El hilo conductor es una sencilla **lista de TODOs** (UI + API). Lo interesante no es la app, sino cómo cambia su arquitectura:

### 1. Monolito en memoria
Todo en un único proceso y los datos viven en la memoria de la aplicación. Funciona… hasta que reinicias y **se pierde todo**. El punto de partida perfecto para entender por qué necesitamos algo más.

### 2. Monolito con base de datos
La misma app, pero los datos pasan a una **capa de persistencia** real. Los TODOs sobreviven a los reinicios. Aparece el concepto de estado que hay que cuidar.

### 3. Aplicación distribuida
El salto grande. La app se rompe en **tres servicios independientes**:

```
Nginx (UI)  →  API Node.js/Express  →  PostgreSQL
```

Cada pieza es un contenedor con su propia responsabilidad, desplegada y comunicada **dentro de Kubernetes**. Es, en pequeño, el patrón de las arquitecturas de microservicios.

## Kubernetes en acción

Sobre esa última arquitectura es donde Kubernetes brilla:

- **Deployments** que describen el estado deseado de cada componente (qué imagen, cuántas réplicas) y lo mantienen.
- **Services** que dan a cada pieza una dirección estable y permiten que la UI hable con la API y la API con la base de datos sin conocer IPs concretas.
- **Networking entre contenedores**: separar la UI, la lógica y los datos en servicios distintos que colaboran a través de la red del clúster.

## Lo que me llevé

- Entender **por qué** existe la orquestación viviendo primero el dolor del monolito.
- La diferencia real entre **stateless y stateful**, y qué implica meter una base de datos en el clúster.
- Pensar en **separación de responsabilidades**: cada servicio hace una cosa y la hace bien.
- Usar `kubectl`, Deployments y Services como las piezas básicas con las que se construye casi todo en Kubernetes.
