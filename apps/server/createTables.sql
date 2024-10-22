CREATE TABLE vi_usuario (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    concuenta BOOLEAN NOT NULL,
    numerotelefono VARCHAR(15),
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fechaultimologin TIMESTAMP,
    id_persona VARCHAR(50), -- Relación con Persona
    id_rol VARCHAR(50), -- Relación con la tabla Rol
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    desactivadoen TIMESTAMP,
    creadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuariocreacion VARCHAR(50) NOT NULL,
    usuarioactualizacion VARCHAR(50),
    resetToken VARCHAR(255) DEFAULT NULL, -- Campo para el token de restablecimiento de contraseña
    resetTokenExpiracion TIMESTAMP DEFAULT NULL, -- Campo para la fecha de expiración del token
    CONSTRAINT fk_persona FOREIGN KEY (id_persona) REFERENCES vi_persona(id),
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES vi_rol(id)
);


CREATE TABLE vi_rol (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL,
    eliminadoEn TIMESTAMP,
    creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuarioCreacion VARCHAR(50) NOT NULL,
    usuarioActualizacion VARCHAR(50)
);


CREATE TABLE vi_permiso (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL,
    eliminadoEn TIMESTAMP,
    creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuarioCreacion VARCHAR(50) NOT NULL,
    usuarioActualizacion VARCHAR(50)
);

CREATE TABLE vi_notificacion (
    idNotificacion VARCHAR(50) PRIMARY KEY,
    asunto VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipoNotificacion VARCHAR(100),
    leido BOOLEAN DEFAULT FALSE NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL,
    eliminadoEn TIMESTAMP,
    creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuarioCreacion VARCHAR(50) NOT NULL,
    usuarioActualizacion VARCHAR(50),
    idUsuario VARCHAR(50),  -- Relación con la tabla Usuario
    CONSTRAINT fk_usuario FOREIGN KEY (idUsuario) REFERENCES vi_usuario(id)
);

CREATE TABLE vi_persona (
    id VARCHAR(50) PRIMARY KEY,
    tipodocumento VARCHAR(5),
    numerodocumento VARCHAR(20),
    razoneliminacion VARCHAR(255),
    estado VARCHAR(50) NOT NULL,
    --trazabilidad
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    desactivadoen TIMESTAMP,
    creadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuariocreacion VARCHAR(50) NOT NULL,
    usuarioactualizacion VARCHAR(50)
);

--NUESTRA TABLAS

CREATE TABLE vi_comentario (
    id SERIAL PRIMARY KEY,
    comentario TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	estadoaprobacion BOOLEAN DEFAULT FALSE NOT NULL,
	nombreautor VARCHAR(255) NOT NULL,
	estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
 	id_usuario VARCHAR(50),  -- Relación con la tabla Usuario
    id_publicacion INT,  -- Relación con la tabla Publicacion
    CONSTRAINT fk_usuario_comentario FOREIGN KEY (id_usuario) REFERENCES vi_usuario(id),
    CONSTRAINT fk_publicacion_comentario FOREIGN KEY (id_publicacion) REFERENCES vi_publicacion(id)  -- Relación con Publicacion
);


CREATE TABLE vi_tipo_publicacion (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL
);


CREATE TABLE vi_estado_publicacion (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    color VARCHAR(20),
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL
);


CREATE TABLE vi_categoria_publicacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    colorfondo VARCHAR(20),
    colortexto VARCHAR(20),
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE vi_publicacion_x_categoria (
    id_publicacion INT NOT NULL,
    id_categoria_publicacion INT NOT NULL,
    PRIMARY KEY (id_publicacion, id_categoria_publicacion),
    CONSTRAINT fk_publicacion_categoria_publicacion FOREIGN KEY (id_publicacion) REFERENCES vi_publicacion(id),
    CONSTRAINT fk_categoria_publicacion_categoria FOREIGN KEY (id_categoria_publicacion) REFERENCES vi_categoria_publicacion(id)
);


CREATE TABLE vi_etiqueta_publicacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    colorfondo VARCHAR(20),
    colortexto VARCHAR(20),
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL
);


CREATE TABLE vi_publicacion_x_etiqueta (
    id_publicacion INT NOT NULL,  -- Relación con la tabla Publicacion
    id_etiqueta_publicacion INT NOT NULL,  -- Relación con la tabla Etiqueta
    PRIMARY KEY (id_publicacion, id_etiqueta_publicacion), -- Clave primaria compuesta
    CONSTRAINT fk_publicacion FOREIGN KEY (id_publicacion) REFERENCES vi_publicacion(id),
    CONSTRAINT fk_etiqueta FOREIGN KEY (id_etiqueta_publicacion) REFERENCES vi_etiqueta_publicacion(id)
);


CREATE TABLE vi_publicacion (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    urlImagen VARCHAR(255),
    descripcionSEO VARCHAR(255),
    slug VARCHAR(255),
    richtext TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechapublicacion TIMESTAMP,
    fechaultimamodificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    archivado BOOLEAN DEFAULT FALSE,
    id_tipo_publicacion INT,
    id_estado_publicacion INT,
    id_usuario VARCHAR(50),
    CONSTRAINT fk_tipo_publicacion FOREIGN KEY (id_tipo_publicacion) REFERENCES vi_tipo_publicacion(id),
    CONSTRAINT fk_estado_publicacion FOREIGN KEY (id_estado_publicacion) REFERENCES vi_estado_publicacion(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES vi_usuario(id)
);



CREATE TABLE vi_rol_permiso (
    id_rol VARCHAR(50),  -- Clave foránea hacia la tabla Rol
    id_permiso VARCHAR(50),  -- Clave foránea hacia la tabla Permiso
    creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES vi_rol(id),
    CONSTRAINT fk_permiso FOREIGN KEY (id_permiso) REFERENCES vi_permiso(id),
    PRIMARY KEY (id_rol, id_permiso)  -- La clave primaria es la combinación de ambas claves foráneas
);