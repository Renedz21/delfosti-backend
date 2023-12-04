<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Descripcion

Este proyecto es una API REST desarrollada con NestJS, que permite realizar operaciones CRUD sobre una base de datos PostgreSQL, la cual se encuentra alojada en un contenedor Docker.

## Configuracion de las variables de entorno


```bash
# Crear archivo .env en la raiz del proyecto
$ touch .env

# Configurar las variables de entorno en el archivo .env
$ POSTGRES_PASSWORD=
$ POSTGRES_USER=
$ POSTGRES_DB=
$ POSTGRES_HOST=
$ POSTGRES_PORT=
$ JWT_SECRET=
```

Recuerda que las variables de entorno deben ser las mismas que se encuentran en el archivo docker-compose.yml

## Inicialización de la base de datos

```bash
$ docker-compose up -d
```

## Instalación

```bash
$ npm install --legacy-peer-deps
```

## Corriendo la aplicación

```bash
# Ambiente de desarrollo
$ npm run start:dev

# Ambiente de producción
$ npm run start:prod
```