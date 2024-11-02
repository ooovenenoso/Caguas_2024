# Caguas 2024 - Caguas Energy Hackathon @ C3Tec

Bienvenidos al repositorio oficial del Hackathon de Caguas. Este espacio ha sido creado para almacenar y compartir el trabajo realizado durante el evento. Se puede subir proyectos, prototipos, y cualquier otro material relevante para fomentar la colaboración en futuros desarrollos.

---

## Requisitos Previos

Antes de empezar, asegúrate de contar con:

1. **Cuenta de GitHub**: Si no tienes una, [créala aquí](https://github.com/).
2. **Git instalado**: Verifica que tienes Git en tu máquina local. Puedes descargarlo desde [Git SCM](https://git-scm.com/).
3. **Acceso al Repositorio**: Solicita acceso al repositorio del hackathon [aquí](https://github.com/PREnergyHack/Caguas_2024).

---

## 📂 Clonación del Repositorio

Para empezar a trabajar, clona este repositorio en tu máquina local:

```bash
git clone <URL-DEL-REPOSITORIO>
```
Cambia al directorio del proyecto:

```bash
cd nombre-del-repositorio
```
---

## Estructura del Repositorio

Es importante seguir la estructura definida para mantener el repositorio organizado:

```plaintext

/docs         # Documentación y referencias
/proyectos    # Código y entregables de cada equipo
 └── equipo-<nombre-del-equipo>
      ├── README.md   # Instrucciones específicas del proyecto
      ├── src/        # Código fuente
      └── recursos/   # Imágenes, documentos adicionales, etc.
/scripts      # Scripts de utilidad compartidos
README.md     # Documentación general del hackathon
```
---

## 🚩 Creación de una Rama por Equipo

Cada equipo debe crear su propia rama para trabajar en su proyecto. Usa el siguiente formato:

```bash
equipo-<nombre-del-equipo>
```
**Ejemplo**:
```bash
git checkout -b equipo-los-innovadores
```

---

## 🚀 Subir Cambios al Repositorio

Después de realizar cambios, sigue estos pasos para subir tu trabajo:

1. Agrega los archivos al seguimiento:
    ```bash
    git add .
    ```

2. Haz un commit con un mensaje claro:
    ```bash
    git commit -m "Descripción del cambio realizado"
    ```

3. Sube los cambios a tu rama:
    ```bash
    git push origin equipo-<nombre-del-equipo>
    ```

---

## 🔄 Crear un Pull Request (PR)

Una vez que tu proyecto esté listo para revisión:

1. Ve al repositorio en GitHub.
2. Haz clic en "Pull Requests" y luego en "New Pull Request".
3. Selecciona la rama de tu equipo como _source branch_ y la rama **main** como _target branch_.
4. Proporciona una descripción clara del PR y solicita revisión por parte de los organizadores.

---

## ✅ Próximos Pasos y Criterios de Evaluación

Los organizadores revisarán los proyectos subidos a través de los Pull Requests. Asegúrate de incluir en tu proyecto:

- **Documentación clara**: Completa el `README.md` de tu proyecto con instrucciones de instalación y uso.
- **Código limpio**: Sigue buenas prácticas de programación y organiza tu código en módulos o funciones.
- **Resultados visuales o demos**: Si es posible, incluye capturas de pantalla o videos que muestren cómo funciona tu proyecto.

---

### Recursos Adicionales

En el repositorio también encontrarás enlaces a archivos y recursos provistos durante la actividad, los cuales pueden servir de base para continuar refinando las soluciones propuestas. También puedes acceder al [Repositorio de Datos](https://drive.google.com/drive/folders/19bddGM20KtD4Eh3Yu0LMsdiSufxfld1q?usp=drive_link) en Google Drive.

---

¡Sigamos trabajando juntos para construir herramientas que mejoren el futuro energético de Puerto Rico!
