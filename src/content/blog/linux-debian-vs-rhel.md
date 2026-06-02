---
name: "Linux: Debian vs RHEL"
description: "Las dos grandes familias de Linux que te vas a encontrar en infraestructura y en qué se diferencian de verdad."
image: "/Linux.png"
isActive: true
important: false
order: 3
category: ["Linux", "Sistemas"]
highlights:
  - "apt vs dnf"
  - "Debian vs RHEL"
  - "Lo esencial del día a día"
url: ""
---

En infraestructura te vas a topar con las dos grandes familias de Linux. Saber en cuál estás te ahorra muchos sustos.

## Las dos familias

- **Debian / Ubuntu** — paquetes `.deb`, gestor **`apt`**. Reina en la nube y la comunidad.
- **RHEL / Rocky / Alma / Fedora** — paquetes `.rpm`, gestor **`dnf`** (antes `yum`). Manda en la empresa por soporte y certificaciones.

## El día a día

| Tarea | Debian | RHEL |
| --- | --- | --- |
| Instalar paquete | `apt install` | `dnf install` |
| Servicios | `systemctl` | `systemctl` |
| Firewall | `ufw` | `firewalld` |
| Repos | `/etc/apt/` | `/etc/yum.repos.d/` |

Fíjate en que **`systemd`, la estructura de directorios y la mayoría de comandos son iguales** en ambas.

## La idea que importa

No memorices: aprende una familia bien y te mueves en la otra. Lo único que cambia de verdad es **qué gestor de paquetes y qué firewall** te toca según dónde aterrices.

> Debian para empezar y para cloud; RHEL donde hay contrato de soporte detrás.
