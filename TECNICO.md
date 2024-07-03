# Manual Técnico - Backend

## Índice
1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Módulos Principales](#módulos-principales)
   - [Bucket (AWS S3)](#bucket-aws-s3)
   - [MongoDB](#mongodb)
   - [Controladores](#controladores)
   - [Rutas](#rutas)
6. [Aplicación Principal](#aplicación-principal)
7. [Punto de Entrada](#punto-de-entrada)
8. [Despliegue](#despliegue)

## Introducción
Este manual técnico describe la implementación del backend de nuestro proyecto, que utiliza Node.js, Express, MongoDB, y AWS S3 para proporcionar una API robusta y escalable.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- AWS SDK (para S3)
- Docker

## Estructura del Proyecto
El proyecto sigue una estructura modular:

markdownCopy# Manual Técnico - Backend

## Índice
1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Módulos Principales](#módulos-principales)
   - [Bucket (AWS S3)](#bucket-aws-s3)
   - [MongoDB](#mongodb)
   - [Controladores](#controladores)
   - [Rutas](#rutas)
6. [Aplicación Principal](#aplicación-principal)
7. [Punto de Entrada](#punto-de-entrada)
8. [Despliegue](#despliegue)

## Introducción
Este manual técnico describe la implementación del backend de nuestro proyecto, que utiliza Node.js, Express, MongoDB, y AWS S3 para proporcionar una API robusta y escalable.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- AWS SDK (para S3)
- Docker

## Estructura del Proyecto

El proyecto sigue una estructura modular:
```sh
proyecto/
│
├── config/
│   ├── bucket.js
│   └── db.mongo.js
│
├── controllers/
│   └── admin.controller.js
│
├── routes/
│   └── admin.routes.js
│
├── app.js
├── index.js
├── Dockerfile
└── package.json
```

## Configuración
La configuración se maneja principalmente a través de variables de entorno. Asegúrese de tener un archivo `.env` en la raíz del proyecto con las siguientes variables:
```sh
PORT=3000
BUCKET_USER_ID=your_aws_access_key_id
BUCKET_USER_SECRET=your_aws_secret_access_key
BUCKET_NAME=your_s3_bucket_name
BUCKET_REGION=your_aws_region
MONGO_USER=your_mongo_username
MONGO_PASSWORD=your_mongo_password
MONGO_HOST=your_mongo_host
MONGO_DATABASE=your_database_name
MONGO_PORT=27017
```
## Módulos Principales

### Bucket (AWS S3)
El módulo `bucket.js` maneja la interacción con AWS S3 para subir archivos.

Funciones principales:
- `uploadFile`: Sube un archivo a S3 y responde a una solicitud HTTP.
- `uploadFile2`: Sube un archivo a S3 y devuelve la URL del archivo subido.

### MongoDB
El módulo `db.mongo.js` gestiona la conexión y operaciones con MongoDB.

Funciones principales:
- `insertData`: Inserta datos en una colección específica.
- `authenticateUser`: Autentica a un usuario.
- `getData`: Obtiene todos los documentos de una colección.
- `deleteData`: Elimina un documento por su ID.

### Controladores
El archivo `admin.controller.js` contiene la lógica de negocio para las operaciones administrativas.

Funciones principales:
- `registro`: Registra un nuevo usuario.
- `registrar_auto`: Registra un nuevo auto.
- `registrar_viaje`: Registra un nuevo viaje.
- `getUsuarios`, `getAutos`, `getViajes`: Obtienen datos de las respectivas colecciones.
- `deleteUsuarios`, `deleteAutos`, `deleteViajes`: Eliminan documentos de las respectivas colecciones.

### Rutas
El archivo `admin.routes.js` define las rutas para las operaciones administrativas.

Rutas principales:
- POST `/registro`: Registra un nuevo usuario.
- POST `/registro_auto`: Registra un nuevo auto.
- POST `/registro_viaje`: Registra un nuevo viaje.
- GET `/getUsuarios`, `/getAutos`, `/getViajes`: Obtienen datos.
- POST `/deleteUsuarios`, `/deleteAuto`, `/deleteViajes`: Eliminan documentos.

## Aplicación Principal
El archivo `app.js` configura la aplicación Express, middleware, y rutas.

Características principales:
- Uso de CORS para permitir solicitudes de diferentes orígenes.
- Configuración de límites para el tamaño de las solicitudes.
- Definición de rutas para administrador, usuario y recepción.
- Ruta de autenticación `/api/login`.

## Punto de Entrada
El archivo `index.js` es el punto de entrada de la aplicación. Inicia el servidor en el puerto especificado en las variables de entorno.

## Despliegue
El proyecto incluye un `Dockerfile` para facilitar el despliegue en contenedores. Para construir y ejecutar el contenedor:

```bash
docker build 
docker run 3000:3000
```

## Estructura del Proyecto Frontend

El frontend de la aplicación está desarrollado en Angular y sigue la siguiente estructura:

markdownCopy# Manual Técnico - Frontend (Angular)

## Estructura del Proyecto Frontend


El frontend de la aplicación está desarrollado en Angular y sigue la siguiente estructura:

```sh
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── recepcionista/
│   │   │   └── turista/
│   │   ├── services/
│   │   │   ├── autenticar.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── usuario.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   └── main.ts
├── .editorconfig
├── .gitignore
├── angular.json
└── package.json
```


## Componentes Principales

### AdminComponent

El `AdminComponent` es el componente principal para la funcionalidad del administrador. Sus principales características incluyen:

- Registro de usuarios, autos y viajes.
- Visualización y gestión de usuarios, autos y viajes.
- Eliminación de usuarios, autos y viajes.

#### Funcionalidades Clave:

1. **Registro de Usuario**:
   - Utiliza un formulario reactivo (`form_registro`) para capturar los datos del usuario.
   - Incluye la funcionalidad para subir y procesar imágenes de perfil.

2. **Registro de Auto**:
   - Utiliza `form_autos` para capturar los detalles del auto.

3. **Registro de Viaje**:
   - Utiliza `form_viajes` para registrar nuevos viajes.

4. **Gestión de Datos**:
   - Métodos `getUsuarios()`, `getAutos()`, y `getViajes()` para obtener datos del backend.
   - Métodos `eliminarUsuario()`, `eliminarAuto()`, y `eliminarViaje()` para eliminar registros.

5. **Autenticación**:
   - Utiliza `AuthService` para manejar el logout.

## Servicios

### AuthService

El `AuthService` maneja la autenticación de usuarios:

- Realiza peticiones HTTP al endpoint de login (`http://3.93.0.237:3000/api/login`).
- Mantiene el estado del usuario actual utilizando `BehaviorSubject`.
- Proporciona métodos para login, logout y obtener el usuario actual.

## Integración Backend-Frontend

1. **Comunicación HTTP**:
   - Utiliza `HttpClient` de Angular para realizar peticiones al backend.
   - Las URLs de API están configuradas para apuntar al servidor backend (ejemplo: `http://3.93.0.237:3000`).

2. **Manejo de Formularios**:
   - Usa `ReactiveFormsModule` para la creación y validación de formularios.

3. **Alertas y Notificaciones**:
   - Implementa SweetAlert2 (`Swal`) para mostrar mensajes de éxito, error y confirmación.

4. **Seguridad**:
   - Implementa un sistema de autenticación basado en tokens (a confirmar con más detalles del backend).

## Despliegue del Frontend

Para desplegar el frontend:

1. Asegúrate de que todas las dependencias estén instaladas:

```sh
npm install
```

2. Construye la aplicación para producción:
```sh
ng build --prod
```

3. El resultado de la construcción se encontrará en el directorio `dist/`. Este directorio contiene los archivos estáticos que pueden ser servidos por un servidor web como Nginx o Apache.

## Consideraciones de Seguridad

- Asegúrate de que todas las comunicaciones con el backend se realicen a través de HTTPS en producción.
- Implementa guardias de ruta en Angular para proteger las rutas que requieren autenticación.
- Valida todos los inputs del usuario tanto en el frontend como en el backend.
- 

# Infraestructura en la Nube (AWS EC2)

## Propósito del EC2

En este proyecto, se utiliza una instancia EC2 de Amazon Web Services para alojar y ejecutar el backend de la aplicación. El EC2 proporciona varias ventajas clave:

1. **Escalabilidad**: Permite ajustar fácilmente los recursos de cómputo según las necesidades de la aplicación.

2. **Flexibilidad**: Ofrece control completo sobre la instancia, permitiendo configurar el entorno según los requisitos específicos del proyecto.

3. **Disponibilidad**: AWS proporciona alta disponibilidad y redundancia para mantener la aplicación en funcionamiento.

4. **Seguridad**: Permite implementar medidas de seguridad robustas, como grupos de seguridad y redes privadas virtuales (VPC).

## Configuración del EC2

La instancia EC2 está configurada de la siguiente manera:

- **Sistema Operativo**: [Especificar el SO, por ejemplo, Amazon Linux 2, Ubuntu, etc.]
- **Tipo de Instancia**: [Especificar el tipo, por ejemplo, t2.micro, t3.small, etc.]
- **Región**: [Especificar la región de AWS, por ejemplo, us-east-1]
- **IP Pública**: 3.93.0.237 (según la URL del backend mencionada en el código)

## Servicios Alojados

La instancia EC2 aloja los siguientes componentes del proyecto:

1. **Servidor Node.js**: Ejecuta la aplicación backend desarrollada con Express.js.
2. **Base de Datos MongoDB**: [Confirmar si MongoDB está instalado en la misma instancia o en un servicio separado]
3. **Nginx**: [Si se utiliza como proxy inverso o para servir el frontend]

![image](https://github.com/rauudy/MIA_P2_201901973/assets/66295181/a1734d05-74b4-4d47-890f-e97fb2bd2002)

# Amazon S3 Bucket

## Propósito del Bucket S3

En este proyecto, se utiliza un bucket de Amazon S3 (Simple Storage Service) para almacenar y servir archivos, específicamente imágenes. El bucket S3 ofrece las siguientes ventajas:

1. **Almacenamiento Escalable**: Permite almacenar y recuperar cualquier cantidad de datos.
2. **Alta Disponibilidad**: Los datos se replican automáticamente en múltiples instalaciones dentro de una región seleccionada.
3. **Seguridad**: Ofrece características robustas de control de acceso y cifrado.
4. **Eficiencia en Costos**: Solo se paga por el almacenamiento que se utiliza.

## Configuración del Bucket S3

Según el código proporcionado, el bucket S3 está configurado de la siguiente manera:

- **Nombre del Bucket**: Definido en la variable de entorno `BUCKET_NAME`
- **Región**: Definida en la variable de entorno `BUCKET_REGION`
- **Credenciales de Acceso**:
  - ID de Usuario: Definido en `BUCKET_USER_ID`
  - Clave Secreta: Definida en `BUCKET_USER_SECRET`

## Uso en la Aplicación

El bucket S3 se utiliza principalmente para:

1. **Almacenamiento de Imágenes de Perfil**: Cuando un usuario se registra o actualiza su perfil, la imagen se sube al bucket S3.

2. **Acceso Público a las Imágenes**: Las imágenes se configuran con acceso público de lectura para que puedan ser accedidas directamente desde la web.

## Implementación

La interacción con el bucket S3 se maneja en el archivo `bucket.js` del backend, que incluye las siguientes funcionalidades principales:

1. **uploadFile**: Sube un archivo al bucket S3 y responde a una solicitud HTTP.
2. **uploadFile2**: Sube un archivo al bucket S3 y devuelve la URL del archivo subido.

Ejemplo de uso:

```javascript
const uploadFile2 = async (path, imagen) => {
    const buffer = new Buffer.from(imagen, 'base64');
    const s3 = new aws.S3({
        accessKeyId: BUCKET_USER_ID,
        secretAccessKey: BUCKET_USER_SECRET,
        ContentType: 'image/jpeg/png',
        ACL: 'public-read',
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: path,
        Body: buffer,
    };

    await s3.upload(params, function sync(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log('Ubicacion de la imagen: ', data.Location);  
            return data.Location;
        }
    });  
};

```

**Seguridad**

Usar políticas de bucket para restringir el acceso solo a los recursos necesarios.
Implementar el cifrado del lado del servidor para los objetos almacenados.
Utilizar URLs prefirmadas para acceso temporal a objetos privados si es necesario.
Habilitar el control de versiones para mantener un historial de cambios en los objetos.

**Consideraciones de Costo y Rendimiento**

Implementar políticas de ciclo de vida para mover o eliminar objetos antiguos y reducir costos.
Utilizar Amazon CloudFront junto con S3 para mejorar el rendimiento en la entrega de contenido.

**Monitoreo**

Configurar métricas de S3 en CloudWatch para supervisar el uso y el rendimiento del bucket.
Habilitar el registro de acceso al bucket para auditar y analizar el acceso a los objetos.
