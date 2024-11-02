# Puerto Rico Power Dashboard

![Dashboard Screenshot](./screenshot.png)

Este proyecto es un dashboard interactivo que proporciona información detallada sobre el estado energético de Puerto Rico. Utiliza datos reales para visualizar métricas clave como generación de energía por tipo de combustible, ventas por clase de cliente, pico del sistema, disponibilidad de plantas, entre otros.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Uso Futuro de Datos](#uso-futuro-de-datos)
- [Estado del Proyecto](#estado-del-proyecto)
- [Contribuciones](#contribuciones)

## Descripción

El **Puerto Rico Power Dashboard** es una herramienta diseñada para empoderar a los ciudadanos, proporcionando acceso transparente y actualizado a datos energéticos críticos. A través de múltiples visualizaciones interactivas, los usuarios pueden explorar tendencias y obtener una comprensión más profunda del sector energético en Puerto Rico.

## Características

- **Resumen del Servicio**: Muestra la disponibilidad actual del sistema eléctrico.
- **Generación por Tipo de Combustible**: Visualiza la distribución de la generación de energía según el tipo de combustible.
- **Pico del Sistema (MW)**: Rastrea el pico de demanda del sistema a lo largo del tiempo.
- **Disponibilidad de Plantas (%)**: Indica la disponibilidad de las plantas eléctricas en porcentaje.
- **Ventas por Clase de Cliente**: Muestra las ventas de energía desglosadas por clase de cliente.
- **Consumo Total de Energía a lo Largo del Tiempo**: Analiza cómo ha evolucionado el consumo total de energía.
- **Ventas Mensuales por Clase de Cliente**: Ofrece una vista detallada de las ventas mensuales por clase de cliente.
- **Tendencia de Generación por Tipo de Combustible**: Observa cómo ha cambiado la generación por combustible.
- **Comparación de Pico del Sistema y Disponibilidad de Plantas**: Compara estas dos métricas clave en un solo gráfico.
- **Distribución Porcentual de Ventas por Clase de Cliente**: Proporciona una vista porcentual de las ventas por clase de cliente.
- **Promedio Móvil de Pico del Sistema**: Ayuda a identificar tendencias en el pico del sistema.
- **Factor de Carga del Sistema**: Mide la relación entre la carga real y la capacidad máxima.
- **Generación Renovable vs. No Renovable**: Compara la generación de fuentes renovables y no renovables.
- **Consumo Promedio por Cliente**: Calcula el consumo promedio por cliente en cada categoría.
- **Emisiones de CO₂ Estimadas**: Estima las emisiones de CO₂ basadas en el tipo de combustible utilizado.

## Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/PREnergyHack/Caguas_2024/equipo-Solo-Wolf.git
cd equipo-Solo-Wolf
```

Instala las dependencias:

```bash
npm install
```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

La página se recargará si haces ediciones. También verás cualquier error de lint en la consola.

### `npm test`

Inicia el corredor de pruebas en modo interactivo.  
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.  
Empaqueta correctamente React en modo de producción y optimiza la compilación para el mejor rendimiento.

La compilación está minificada y los nombres de archivo incluyen los hashes.  
¡Tu aplicación está lista para desplegarse!

### `npm run eject`

**Nota: ¡esta es una operación de un solo sentido! Una vez que ejecutes `eject`, ¡no podrás volver atrás!**

Si no estás satisfecho con la herramienta de construcción y las opciones de configuración, puedes `eject` en cualquier momento. Este comando eliminará la dependencia de compilación única de tu proyecto.

En lugar de esto, copiará todos los archivos de configuración y las dependencias transitivas (Webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas control total sobre ellos. Todos los comandos excepto `eject` seguirán funcionando, pero apuntarán a los scripts copiados para que puedas modificarlos. En este punto, estás por tu cuenta.

## Despliegue

El proyecto está desplegado en Vercel y está disponible en:

**[https://v1-solo-wolf.vercel.app/](https://v1-solo-wolf.vercel.app/)**

Puedes desplegar tu propia versión siguiendo estos pasos:

1. Crea una cuenta en [Vercel](https://vercel.com/).
2. Conecta tu repositorio de GitHub con Vercel.
3. Vercel detectará automáticamente que estás usando Create React App y configurará la compilación.
4. Una vez desplegado, tu aplicación estará disponible en tu dominio Vercel.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Recharts**: Biblioteca para crear gráficos y visualizaciones de datos en React.
- **PapaParse**: Librería para parsear archivos CSV.
- **Create React App**: Configuración inicial para aplicaciones React.
- **Vercel**: Plataforma de despliegue.

## Uso Futuro de Datos

El archivo `caguas_outages.csv` será utilizado en el futuro para crear heatmaps filtrados que muestren apagones específicos en la región de Caguas. Esto permitirá a los usuarios visualizar y analizar patrones de apagones en esa área.

## Estado del Proyecto

Esta es una **versión preliminar** del dashboard. Algunas funcionalidades están en desarrollo y se esperan mejoras adicionales. Estamos trabajando para solucionar algunos errores conocidos y optimizar la experiencia del usuario.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork del proyecto.
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`).
3. Realiza los cambios deseados y realiza los commits necesarios (`git commit -m 'Descripción de los cambios'`).
4. Sube los cambios (`git push origin feature/nueva-caracteristica`).
5. Abre una solicitud de extracción (pull request) para que podamos revisar tus cambios.


---

¡Gracias por visitar el proyecto! Si tienes alguna sugerencia o encuentras algún problema, no dudes en abrir un issue o contactarnos.

