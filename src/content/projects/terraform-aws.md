---
name: "Infraestructura en AWS con Terraform"
description: "Una infraestructura web completa en AWS —red, cómputo y servidor— levantada desde cero con un solo comando. Definida como código con Terraform y refactorizada después con módulos reutilizables."
image: "/Terraform.png"
isActive: true
order: 1
highlights:
  - "De cero a una web sirviendo tráfico con un único `terraform apply`"
  - "VPC, subred pública, Internet Gateway, rutas y security groups versionados como código"
  - "EC2 con user-data que instala Docker y arranca Nginx sola al nacer"
  - "Refactor de recursos manuales a módulos reutilizables (módulo oficial VPC de AWS)"
skills: ["Terraform", "AWS", "Docker", "Nginx", "IaC"]
github: "https://github.com/GeerDev/Entregables_Terraform"
---

Montar una infraestructura en la nube haciendo clics en la consola de AWS es rápido la primera vez… y un problema todas las demás: no es repetible, no queda documentado y nadie sabe por qué algo está como está. Este proyecto resuelve justo eso: **describir toda la infraestructura como código** para que levantarla, replicarla o destruirla sea cuestión de un comando.

## El reto

Partir de una cuenta de AWS vacía y llegar, **sin tocar la consola web**, a un servidor Nginx respondiendo por HTTP en una IP pública. Todo declarado en Terraform, versionado en Git y reproducible en cualquier región.

## Arquitectura

La infraestructura se construye por capas, cada una como un recurso de Terraform:

- **Red:** una `VPC` propia con su bloque CIDR, una **subred pública**, un **Internet Gateway** y una **tabla de rutas** que envía todo el tráfico (`0.0.0.0/0`) hacia internet.
- **Seguridad:** un **security group** con reglas de entrada para HTTP (puerto 80) abierto y SSH (puerto 22) restringido.
- **Cómputo:** una instancia **EC2** (AMI de capa gratuita) dentro de la subred, accesible vía un **key pair** SSH.
- **Arranque automático:** un script de **user-data** que, en el primer boot de la instancia, instala Docker y levanta un contenedor de **Nginx** sirviendo en el puerto 80.

El `output` de Terraform expone la IP pública para abrir la web al terminar el `apply`.

## De scripts a infraestructura mantenible

El proyecto está dividido en dos fases que cuentan una pequeña historia de madurez:

1. **`puntos-1-7/`** — cada recurso declarado **a mano**, uno a uno. Ideal para entender qué hay debajo y cómo encajan las piezas.
2. **`punto-8-modulo/`** — la misma red reescrita con el **módulo oficial de VPC de AWS**. Menos código, menos errores y configuración reutilizable: el salto de "escribir recursos" a "componer infraestructura".

Cada fase separa la configuración en `providers.tf`, `variables.tf`, `outputs.tf` y el archivo principal, siguiendo las convenciones que hacen un proyecto Terraform legible y mantenible.

## Lo que me llevé

- Pensar la infraestructura como **código versionado**: lo que está desplegado se lee en un repo, no se adivina en una consola.
- El valor de la **idempotencia**: `apply` deja el estado deseado sin importar cuántas veces lo ejecutes.
- Cuándo conviene **abstraer en módulos** y cuándo entender primero el recurso crudo.
- Integrar **cloud-init / user-data** para que las instancias se autoconfiguren sin intervención manual.
