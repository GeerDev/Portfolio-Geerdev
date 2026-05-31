---
name: "Microservicios"
description: "Introducción a la arquitectura de microservicios: sus ventajas, sus retos y cuándo merece la pena frente a un monolito."
image: "/Microservices.png"
isActive: true
important: true
order: 3
category: ["Infraestructura"]
highlights:
  - "Arquitectura escalable"
  - "Monolito vs microservicios"
  - "Despliegue independiente"
url: ""
---

La arquitectura de **microservicios** consiste en dividir una aplicación en un conjunto de servicios pequeños, independientes y desplegables por separado, que se comunican entre sí a través de la red. En este artículo veremos *qué problemas resuelve*, *qué problemas crea* y cuándo merece la pena adoptarla.

> 💡 Este artículo usa **todos** los elementos de formato disponibles en el blog, así que sirve también como plantilla de referencia de Markdown.

## ¿Qué es un microservicio?

Frente al **monolito** —donde todo el código vive en un único despliegue— los microservicios apuestan por la **autonomía**: cada servicio tiene su propia base de datos, su ciclo de vida y, a menudo, su propio equipo.

Sus rasgos esenciales son:

- **Independencia de despliegue:** puedes actualizar el servicio de pagos sin tocar el de usuarios.
- **Responsabilidad única:** cada servicio hace *una cosa* y la hace bien.
- **Comunicación por red:** normalmente vía HTTP/REST, gRPC o colas de mensajes.
- **Datos descentralizados:** cada servicio es dueño de sus propios datos.

## Monolito vs. microservicios

No existe una opción "mejor" en abstracto: depende del tamaño del equipo, la madurez del producto y la necesidad real de escalar. Esta tabla resume el contraste:

| Criterio            | Monolito                   | Microservicios               |
| ------------------- | -------------------------- | ---------------------------- |
| Despliegue          | Único, todo a la vez       | Independiente por servicio   |
| Escalado            | Toda la app                | Solo el servicio que lo pide |
| Complejidad inicial | Baja                       | Alta                         |
| Tolerancia a fallos | Un fallo puede tumbar todo | Aislamiento de fallos        |
| Equipo ideal        | Pequeño                    | Varios equipos autónomos     |

## Ventajas

1. **Escalado granular** — escalas solo lo que lo necesita.
2. **Despliegues frecuentes** — equipos pequeños liberan sin coordinarse con todos.
3. **Aislamiento de fallos** — si cae el servicio de notificaciones, el de pagos sigue vivo.
4. **Libertad tecnológica** — un servicio en Go, otro en Node, otro en Python.

## Desafíos (lo que nadie te cuenta)

Adoptar microservicios **no es gratis**. Estos son los costes reales:

- Necesitas **observabilidad** seria: logs centralizados, *tracing* distribuido y métricas.
- La **consistencia de datos** pasa de transacción ACID a *eventual consistency*.
- La latencia de red se acumula (lo que era una llamada a función ahora es una petición HTTP).
- Debugar un flujo que cruza 6 servicios es **mucho** más difícil.

> ⚠️ **Regla práctica:** no empieces con microservicios. Empieza con un monolito bien modularizado y extrae servicios *cuando el dolor lo justifique*.

## Comunicación entre servicios

Hay dos grandes estilos. El **síncrono** (petición/respuesta) es sencillo de razonar pero acopla servicios en el tiempo. Por ejemplo, una llamada REST con `fetch`:

```ts
// Llamada síncrona al servicio de usuarios
async function getUser(id: string): Promise<User> {
  const res = await fetch(`http://users-service/api/users/${id}`);
  if (!res.ok) {
    throw new Error(`Users service respondió ${res.status}`);
  }
  return res.json() as Promise<User>;
}
```

El **asíncrono** (eventos/mensajes) desacopla los servicios: el emisor publica un evento y no espera respuesta. Por ejemplo, publicar en una cola tras crear un pedido:

```python
# Publicar un evento "pedido.creado" en RabbitMQ
import json
import pika

def publicar_pedido(pedido: dict) -> None:
    conexion = pika.BlockingConnection(pika.ConnectionParameters("broker"))
    canal = conexion.channel()
    canal.queue_declare(queue="pedidos", durable=True)
    canal.basic_publish(exchange="", routing_key="pedidos", body=json.dumps(pedido))
    conexion.close()
```

Para definir el despliegue puedes apoyarte en ficheros declarativos. Un fragmento de `docker-compose.yml`:

```yaml
services:
  users-service:
    image: miapp/users:1.4.0
    ports:
      - "8081:8080"
  orders-service:
    image: miapp/orders:2.1.0
    depends_on:
      - broker
```

Y el clásico comando para levantarlo todo es `docker compose up -d`, donde `-d` deja los contenedores en segundo plano.

![Orquestación de servicios con herramientas de automatización](../../assets/images/blog/MCP_Playwright.png)

---

## El patrón Saga (consistencia sin transacciones globales)

Cuando una operación cruza varios servicios, no puedes usar una transacción ACID única. El patrón **Saga** la divide en pasos locales, cada uno con su **compensación** por si algo falla:

| Paso | Acción            | Compensación si falla |
| ---- | ----------------- | --------------------- |
| 1    | Reservar stock    | Liberar stock         |
| 2    | Cobrar al cliente | Reembolsar            |
| 3    | Crear envío       | Cancelar envío        |

> 🧭 La clave de una Saga es que **cada paso sabe cómo deshacerse**. La consistencia se alcanza *eventualmente*, no de forma inmediata.

## ¿Cuándo NO usar microservicios?

Evítalos si:

1. Tu equipo es pequeño (menos de 5 personas).
2. El producto aún busca *product-market fit* y los requisitos cambian a diario.
3. No tienes cultura de **DevOps** ni automatización de despliegues.

Para profundizar, recomiendo el clásico de Martin Fowler sobre el [Monolito primero](https://martinfowler.com/bliki/MonolithFirst.html).

## Conclusión

Los microservicios son una herramienta **organizativa** tanto como técnica: brillan cuando tienes varios equipos que necesitan avanzar en paralelo y escalar de forma independiente. Pero traen una **complejidad operativa** considerable.

La recomendación sigue siendo la misma: **monolito modular primero**, microservicios cuando el dolor real lo justifique.
