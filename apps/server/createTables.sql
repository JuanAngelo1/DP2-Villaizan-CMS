CREATE TABLE vi_usuario (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    concuenta BOOLEAN NOT NULL,
    numerotelefono VARCHAR(15),
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fechaultimologin TIMESTAMP,
	id_persona VARCHAR(50),
    CONSTRAINT fk_persona FOREIGN KEY (id_persona) REFERENCES vi_persona(id),
    --trazabilidad
    estaactivo BOOLEAN DEFAULT TRUE NOT NULL,
    desactivadoen TIMESTAMP,
    creadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actualizadoen TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuariocreacion VARCHAR(50) NOT NULL,
    usuarioactualizacion VARCHAR(50)
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

CREATE TABLE vi_tipopublicacion (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL
);


CREATE TABLE vi_estadopublicacion (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    color VARCHAR(20),
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE vi_categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    color VARCHAR(20),
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE vi_etiqueta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    color VARCHAR(20),
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE vi_publicacion (
    idPublicacion SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    urlImagen VARCHAR(255),
    descripcion TEXT NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fechaPublicacion TIMESTAMP,
    fechaUltimaModificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE NOT NULL,
    idCategoria INT,  -- Relación con la tabla Categoria
    idTipoPublicacion INT, -- Relación con la tabla TipoPublicacion
    idEstadoPublicacion INT, -- Relación con la tabla EstadoPublicacion
    CONSTRAINT fk_categoria FOREIGN KEY (idCategoria) REFERENCES vi_categoria(id),
    CONSTRAINT fk_tipo_publicacion FOREIGN KEY (idTipoPublicacion) REFERENCES vi_tipopublicacion(id),
    CONSTRAINT fk_estado_publicacion FOREIGN KEY (idEstadoPublicacion) REFERENCES vi_estadopublicacion(id)
);

CREATE TABLE vi_publicacion_etiqueta (
    idPublicacion INT,  -- Relación con la tabla Publicacion
    idEtiqueta INT,     -- Relación con la tabla Etiqueta
    PRIMARY KEY (idPublicacion, idEtiqueta), -- Clave primaria compuesta
    CONSTRAINT fk_publicacion FOREIGN KEY (idPublicacion) REFERENCES vi_publicacion(idPublicacion),
    CONSTRAINT fk_etiqueta FOREIGN KEY (idEtiqueta) REFERENCES vi_etiqueta(id)
);






