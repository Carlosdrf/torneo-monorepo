# MorningValue: Torneo Galáctico

Aplicación web interactiva donde distintas especies del universo compiten en combates galácticos.  
El proyecto permite registrar especies, enfrentarlas en combates, visualizar resultados y generar un ranking global basado en desempeño.

Diseño inspirado en una estética sci-fi / futurista (tipo Star Wars), con animaciones sutiles y una UI moderna.

---

## Features

### Gestión de Especies

- Registro de nuevas especies
- Atributos:
  - Nombre
  - Nivel de poder (entero)
  - Habilidad especial
- Persistencia en memoria (estado volátil durante la sesión)

### Combates

- Selección manual de luchadores
- Regla de combate:
  - Gana la especie con **mayor nivel de poder**
  - En caso de empate, gana por **orden alfabético**
- Animación visual simple para simular el enfrentamiento
- Registro automático de resultados (victorias / derrotas)

### Ranking Galáctico

- Ordenado por:
  1. Número de victorias
  2. Cantidad de poder

---

## Tecnologías usadas

- **Angular** (Standalone Components)
- **Angular Material (icons)**
- **Tailwind CSS**
- **TypeScript**
- **Formly** para formularios dinámicos
- **CSS Custom Properties** + efectos glow
- Arquitectura modular y reusable
- Node 20 LTS

---

## Instalación y uso

Clona el repositorio:

```bash
git clone https://github.com/Carlosdrf/torneo-monorepo.git
cd torneo-monorepo
```

--

Instala dependencias:

```bash
npm install
```

Levanta frontend:

````bash
npm run serve-frontend
```

Backend:
```bash
npm run serve-backend
```

Ahora el frontend estará disponible en: `http://localhost:4200`


<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## NX - comandos útiles

```bash
nx serve <project>     # Ejecutar un proyecto
nx build <project>     # Build de un proyecto
nx graph               # Visualizar dependencias del monorepo
nx reset               # Limpiar cache de Nx
```
````
