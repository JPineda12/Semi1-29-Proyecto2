# DROP DATABASE ayd1_practica2;
CREATE  DATABASE ayd1_practica2;
USE ayd1_practica2;
CREATE TABLE Usuario(
idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(400) NOT NULL,
img_url VARCHAR(400) NOT NULL,
email VARCHAR(400) NOT NULL,
nombre VARCHAR(400) NOT NULL,
pass VARCHAR(400) NOT NULL
);

CREATE TABLE Estado_Amistad(
idEstadoAmistad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
estado VARCHAR(45)
);

CREATE TABLE Solicitud_Amistad(
idAmigo1 INT NOT NULL,
idAmigo2 INT NOT NULL,
idEstado INT NOT NULL,
FOREIGN KEY(idAmigo1) REFERENCES Usuario(idUsuario),
FOREIGN KEY(idAmigo2)  REFERENCES Usuario(idUsuario),
FOREIGN KEY(idEstado) REFERENCES Estado_Amistad(idEstadoAmistad)
);

CREATE TABLE Publicacion(
idPublicacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
url_imagen VARCHAR(300) NOT NULL,
texto VARCHAR(500),
fecha DATE,
Publicacion_idUsuario INT NOT NULL,
FOREIGN KEY(Publicacion_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Etiqueta(
idEtiqueta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
etiqueta VARCHAR(80) NOT NULL
);

CREATE TABLE Post_Tags(
Publicacion_idPublicacion INT NOT NULL,
Etiqueta_idEtiqueta INT NOT NULL,
FOREIGN KEY(Publicacion_idPublicacion) REFERENCES Publicacion(idPublicacion),
FOREIGN KEY(Etiqueta_idEtiqueta) REFERENCES Etiqueta(idEtiqueta)
);

CREATE TABLE Sala_Chat(
idSala INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
idUsuario1 INT NOT NULL,
idUsuario2 INT NOT NULL,
FOREIGN KEY(idUsuario1) REFERENCES Usuario(idUsuario),
FOREIGN KEY(idUsuario2) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Mensaje(
idMensaje INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(500) NOT NULL,
Usuario_idUsuario INT NOT NULL,
Sala_idChat INT NOT NULL,
FOREIGN KEY(Usuario_idUsuario) REFERENCES Usuario(idUsuario),
FOREIGN KEY(Sala_idChat) REFERENCES Sala_Chat(idSala)
);

-- DATA INICIAL PARA QUE FUNCIONE

INSERT INTO Estado_Amistad(estado)
VALUES('Amigos');

INSERT INTO Estado_Amistad(estado)
VALUES('Eliminado');

INSERT INTO Estado_Amistad(estado)
VALUES('Pendiente');
