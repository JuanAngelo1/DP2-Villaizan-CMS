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
    imagenPerfil TEXT, -- Campo para la URL de la imagen de perfil, permite NULL y tipo TEXT
    id_crm VARCHAR(50), -- Campo adicional para integración CRM
    puntosacumulados INTEGER, -- Campo adicional para acumulación de puntos
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
    sexo VARCHAR(25), -- Nuevo campo para el sexo de la persona
    edad INT, -- Nuevo campo para la edad de la persona
    --trazabilidad
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    desactivadoen TIMESTAMP,
    creadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuariocreacion VARCHAR(50) NOT NULL,
    usuarioactualizacion VARCHAR(50)
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

--NUESTRA TABLAS

CREATE TABLE vi_comentario (
    id SERIAL PRIMARY KEY,
    comentario TEXT NOT NULL,
    estadoaprobacion BOOLEAN DEFAULT FALSE NOT NULL,
    nombreautor VARCHAR(255) NOT NULL,
	fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechaultimamodificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    id_usuario VARCHAR(50),        -- Relación con la tabla Usuario
    id_publicacion INT,            -- Relación con la tabla Publicacion
    id_sentimiento INT,            -- Relación con la tabla Sentimiento
    CONSTRAINT fk_usuario_comentario FOREIGN KEY (id_usuario) REFERENCES vi_usuario(id),
    CONSTRAINT fk_publicacion_comentario FOREIGN KEY (id_publicacion) REFERENCES vi_publicacion(id),
    CONSTRAINT fk_sentimiento_comentario FOREIGN KEY (id_sentimiento) REFERENCES vi_sentimiento(id) -- Nueva relación con Sentimiento
);

CREATE TABLE vi_sentimiento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    colorfondo VARCHAR(20),
    colortexto VARCHAR(20)
);


CREATE TABLE vi_tipo_publicacion (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL
);


CREATE TABLE vi_estado_version (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
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
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
	archivado BOOLEAN DEFAULT FALSE,
    id_tipo_publicacion INT,
    id_usuario VARCHAR(50),
    CONSTRAINT fk_tipo_publicacion FOREIGN KEY (id_tipo_publicacion) REFERENCES vi_tipo_publicacion(id),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES vi_usuario(id)
);


CREATE TABLE vi_version_publicacion (
    id SERIAL PRIMARY KEY,
    id_publicacion INT NOT NULL,
    id_estado INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    urlImagen VARCHAR(255),
    descripcionSEO VARCHAR(255),
    slug VARCHAR(255),  -- Restricción UNIQUE para el campo slug
    richtext TEXT,  -- Nuevo campo richtext
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechaultimamodificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_publicacion FOREIGN KEY (id_publicacion) REFERENCES vi_publicacion(id),
    CONSTRAINT fk_estado_version FOREIGN KEY (id_estado) REFERENCES vi_estado_version(id)
);


CREATE TABLE vi_preguntas_frecuentes (
    id SERIAL PRIMARY KEY,
    pregunta TEXT,
    respuesta TEXT,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechaultimamodificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaactivo BOOLEAN DEFAULT TRUE
);

CREATE TABLE vi_puntosventa (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    nota TEXT
);

CREATE TABLE vi_villaparada (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    nota TEXT,
    direccion VARCHAR(512) NOT NULL,
	fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechaultimamodificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	estaactivo BOOLEAN DEFAULT TRUE,
	id_fruta VARCHAR(255) NOT NULL,
	CONSTRAINT fk_fruta FOREIGN KEY (id_fruta) REFERENCES vi_fruta(id)
);

CREATE TABLE vi_villaparada_x_usuario (
    id SERIAL PRIMARY KEY,
    cantitadpuntos INT NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
	fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	estaactivo BOOLEAN DEFAULT TRUE,
	id_usuario VARCHAR(255) NOT NULL,
	id_villaparada INT NOT NULL,
	CONSTRAINT fk_villaparada FOREIGN KEY (id_villaparada) REFERENCES vi_villaparada(id),
	CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES vi_usuario(id)
);