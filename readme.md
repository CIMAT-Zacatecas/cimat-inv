# CIMAT Inventario

## Tabla de Contenidos

- [Prerrequisitos](#prerrequisitos)
- [Instalación de fnm](#instalación-de-fnm)
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
- **fnm**: Fast Node Manager para gestionar versiones de Node.js.
- Acceso al repositorio del proyecto.

---

## Instalación de fnm

### En Windows

Para Windows, instalaremos **fnm** utilizando PowerShell.

1. **Instalar fnm**:

   - Abre **PowerShell**.

   - Ejecuta el siguiente comando para instalar fnm:

     ```powershell
     iwr https://fnm.vercel.app/install | iex
     ```

2. **Actualizar variables de entorno**:

   - Añade lo siguiente a tu perfil de PowerShell para cargar fnm al iniciar:

     ```powershell
     fnm env --use-on-cd | Out-String | Invoke-Expression
     ```

   - Puedes editar tu perfil de PowerShell ejecutando:

     ```powershell
     notepad $PROFILE
     ```

     Y añadiendo la línea anterior al final del archivo.

   - Si el archivo de perfil no existe, créalo ejecutando:

     ```powershell
     if (!(Test-Path -Path $PROFILE)) {
         New-Item -ItemType File -Path $PROFILE -Force
     }
     ```

3. **Recargar el perfil de PowerShell**:

   ```powershell
   . $PROFILE
   ```

4. **Verificar la instalación**:

   ```powershell
   fnm --version
   ```

### En macOS y Linux

Para sistemas Unix, instalaremos **fnm** usando Homebrew o el script de instalación.

1. **Instalar fnm**:

   - **Usando Homebrew** (si está instalado):

     ```bash
     brew install fnm
     ```

   - **Usando el script de instalación**:

     ```bash
     curl -fsSL https://fnm.vercel.app/install | bash
     ```

2. **Actualizar variables de entorno**:

   - Añade lo siguiente a tu archivo de configuración de shell (`~/.bashrc`, `~/.zshrc`, etc.):

     ```bash
     eval "$(fnm env --use-on-cd)"
     ```

   - Esto permitirá la carga automática de la versión correcta de Node.js al cambiar de directorio.

3. **Recargar el archivo de configuración de shell**:

   - Para **Bash**:

     ```bash
     source ~/.bashrc
     ```

   - Para **Zsh**:

     ```bash
     source ~/.zshrc
     ```

4. **Verificar la instalación**:

   ```bash
   fnm --version
   ```

---

## Configuración del Entorno

1. **Clonar el repositorio**:

   - **Git clone con HTTPS**:

     ```bash
     git clone https://github.com/CIMAT-Zacatecas/cimat-inv.git
     ```

   - **Git clone con SSH**:

     ```bash
     git clone git@github.com:CIMAT-Zacatecas/cimat-inv.git
     ```

2. **Navegar al directorio del proyecto**:

   ```bash
   cd cimat-inv
   ```

3. **Instalar la versión de Node.js especificada**:

   - Utilizando el archivo `.nvmrc` o `.node-version` presente en el directorio del proyecto:

     ```bash
     fnm install
     ```

   - Esto instalará y usará la versión de Node.js especificada en el proyecto.

4. **Verificar que estás usando la versión correcta**:

   ```bash
   node -v
   ```

   Debería mostrar `v20.17.0` (o la versión especificada en el proyecto).

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

- **Actualizar dependencias**:

  ```bash
  npm update
  ```

---

## Resolución de Problemas

- **`fnm` no es reconocido como un comando interno o externo**:

  - Asegúrate de que `fnm` está correctamente instalado y que las variables de entorno están configuradas.
  - En Windows, verifica que el directorio de `fnm` está en el **PATH** del sistema.

- **Error al instalar dependencias**:

  - Asegúrate de estar utilizando la versión correcta de Node.js (`v20.17.0`).
  - Elimina la carpeta `node_modules` y el archivo `package-lock.json` y vuelve a instalar:

    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

- **Problemas de compatibilidad entre sistemas operativos**:

  - Asegúrate de que todos los miembros del equipo utilizan `fnm` para gestionar la versión de Node.js.

- **El servidor de desarrollo no inicia**:

  - Verifica que no haya otro proceso utilizando el mismo puerto.
  - Revisa los logs en la terminal para identificar posibles errores.

---

## Contacto

Si tienes alguna duda o encuentras algún problema al configurar el proyecto, no dudes en contactarnos:

- **Equipo de Desarrollo CIMAT**
- **Email**: roberto.villegas@cimat.mx

---

¡Gracias por formar parte del equipo y contribuir al proyecto!
