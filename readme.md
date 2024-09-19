# CIMAT Inventario

## Tabla de Contenidos

- [Prerrequisitos](#prerrequisitos)
- [Instalación de nvm](#instalación-de-nvm)
  - [En Windows](#en-windows)
  - [En macOS y Linux](#en-macos-y-linux)
- [Configuración del Entorno](#configuración-del-entorno)
- [Instalación de Dependencias](#instalación-de-dependencias)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Comandos Útiles](#comandos-útiles)
- [Resolución de Problemas](#resolución-de-problemas)
- [Contacto](#contacto)

---

## Prerrequisitos

- **Git**: Asegúrate de tener Git instalado en tu sistema.
- **nvm**: Node Version Manager para gestionar versiones de Node.js.
- Acceso al repositorio del proyecto.

---

## Instalación de nvm

### En Windows

Para Windows, utilizaremos **nvm-windows**, una versión de nvm adaptada para sistemas Windows.

1. **Descargar nvm-windows**:

   - Visita el repositorio oficial: [nvm-windows Releases](https://github.com/coreybutler/nvm-windows/releases)
   - Descarga el archivo `nvm-setup.zip` de la última versión estable.

2. **Instalar nvm-windows**:

   - Ejecuta el instalador `nvm-setup.exe` y sigue las instrucciones.
   - Durante la instalación, puedes elegir el directorio de instalación y la ruta donde se almacenarán las versiones de Node.js.

3. **Verificar la instalación**:

   ```bash
   nvm version
   ```

### En macOS y Linux

Para sistemas Unix, utilizaremos la versión estándar de nvm.

1. **Instalar nvm**:

   - Usando cURL:

     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
     ```

   - Usando Wget:

     ```bash
     wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
     ```

2. **Actualizar variables de entorno**:

   - Añade las siguientes líneas a tu archivo `~/.bashrc`, `~/.zshrc` o `~/.profile`, dependiendo de tu shell:

     ```bash
     export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
     ```

   - Luego, recarga el archivo de configuración o abre una nueva terminal:

     ```bash
     source ~/.bashrc
     ```

3. **Verificar la instalación**:

   ```bash
   nvm --version
   ```

---

## Configuración del Entorno

1. **Clonar el repositorio**:

   Git clone con HTTPS

   ```bash
   https://github.com/CIMAT-Zacatecas/cimat-inv.git
   ```

   Git clone con SSH

   ```bash
   git clone git@github.com:CIMAT-Zacatecas/cimat-inv.git
   ```

2. **Navegar al directorio del proyecto**:

   ```bash
   cd cimat-inv
   ```

3. **Instalar la versión de Node.js especificada**:

   - Utilizando el archivo `.nvmrc`:

     ```bash
     nvm install
     ```

   - Verificar que estás usando la versión correcta:

     ```bash
     node -v
     ```

     Debería mostrar `v20.17.0`.

4. **Establecer la versión predeterminada de Node.js para este proyecto**:

   ```bash
   nvm use
   ```

---

## Instalación de Dependencias

Con la versión correcta de Node.js activa:

1. **Instalar dependencias con npm**:

   ```bash
   npm install
   ```

---

## Ejecución del Proyecto

Para iniciar el proyecto en modo de desarrollo:

```bash
npm run start
```

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación siguiendo las instrucciones que aparezcan en la terminal.

---

## Comandos Útiles

- **Iniciar el servidor de desarrollo**:

  ```bash
  npm start
  ```

- **Construir el proyecto para producción**:

  ```bash
  npm run build
  ```

- **Ejecutar pruebas**:

  ```bash
  npm test
  ```

- **Linting y Formateo**:

  ```bash
  npm run lint
  npm run format
  ```

---

## Resolución de Problemas

- **nvm no es reconocido como un comando interno o externo**:

  - Asegúrate de que nvm está correctamente instalado y que las variables de entorno están configuradas.
  - En Windows, verifica que la ruta de instalación está en el PATH del sistema.

- **Error al instalar dependencias**:

  - Asegúrate de estar utilizando la versión correcta de Node.js (`v20.17.0`).
  - Elimina la carpeta `node_modules` y el archivo `package-lock.json` y vuelve a instalar:

    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

- **Problemas de compatibilidad entre sistemas operativos**:

  - Asegúrate de que todos los miembros del equipo utilizan nvm para gestionar la versión de Node.js.
  - Utiliza herramientas como `.editorconfig` para mantener consistencia en el estilo de código.

---

## Contacto

Si tienes alguna duda o encuentras algún problema al configurar el proyecto, no dudes en contactarme:

- **Nombre**: [Tu Nombre]
- **Email**: [tu.email@ejemplo.com]
- **Teléfono**: [+34 600 000 000]

---

¡Gracias por formar parte del equipo y contribuir al proyecto!
