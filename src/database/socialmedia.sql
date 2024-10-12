-- Table for Users
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100) NOT NULL,
  age INT NOT NULL CHECK (age > 0),
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(10) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table for Passwords (One-to-One relationship with users)
CREATE TABLE IF NOT EXISTS passwords (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user INT NOT NULL UNIQUE, -- One-to-one relationship with users
  user_password VARCHAR(255) NOT NULL, -- Ensure this is hashed
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for User Profiles (One-to-One relationship with users)
CREATE TABLE IF NOT EXISTS user_profile (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user INT NOT NULL UNIQUE, -- One-to-one relationship with users
  company VARCHAR(100) NOT NULL,
  website VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  user_status VARCHAR(100) NOT NULL,
  skills VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL,
  github VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Experience (One-to-Many relationship with user_profile)
CREATE TABLE IF NOT EXISTS experience (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user_profile INT NOT NULL, -- One-to-many relationship with user_profile
  title VARCHAR(100) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  exp_from DATE NOT NULL,
  exp_to DATE NOT NULL,
  current TINYINT NOT NULL, -- Consider changing to BOOLEAN if supported
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_user_profile) REFERENCES user_profile(id) ON DELETE CASCADE
);

-- Table for Education (One-to-Many relationship with user_profile)
CREATE TABLE IF NOT EXISTS education (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user_profile INT NOT NULL, -- One-to-many relationship with user_profile
  school VARCHAR(100) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  fieldofstudy VARCHAR(100) NOT NULL,
  exp_from DATE NOT NULL,
  exp_to DATE NOT NULL,
  current TINYINT NOT NULL, -- Consider changing to BOOLEAN if supported
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_user_profile) REFERENCES user_profile(id) ON DELETE CASCADE
);

-- Table for Social Media (One-to-Many relationship with user_profile)
CREATE TABLE IF NOT EXISTS social (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user_profile INT NOT NULL, -- One-to-many relationship with user_profile
  youtube VARCHAR(100) NOT NULL,
  facebook VARCHAR(100) NOT NULL,
  twitter VARCHAR(100) NOT NULL,
  instagram VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_user_profile) REFERENCES user_profile(id) ON DELETE CASCADE
);

-- Table for User Posts (One-to-Many relationship with users)
CREATE TABLE IF NOT EXISTS user_post (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user INT NOT NULL, -- One-to-many relationship with users (remove UNIQUE)
  post_text VARCHAR(255) NOT NULL,
  post_name VARCHAR(255) NOT NULL,
  id_like INT NOT NULL, -- Track number of likes for each post
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Post Likes (Many-to-Many relationship between users and posts)
CREATE TABLE IF NOT EXISTS post_likes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user INT NOT NULL, -- The user who gave the like
  id_post INT NOT NULL, -- The post that received the like
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_post) REFERENCES user_post(id) ON DELETE CASCADE,

  UNIQUE (id_user, id_post) -- Ensure a user can only like a post once
);

-- Insertar Usuarios
INSERT INTO users (name, second_name, age, email, role) VALUES
('Juan', 'Pérez', 30, 'juan.perez@example.com', 'admin'),
('María', 'Gómez', 25, 'maria.gomez@example.com', 'user'),
('Carlos', 'Lopez', 28, 'carlos.lopez@example.com', 'user');

-- Passwords
INSERT INTO passwords (id_user, user_password) VALUES
(1, 'hashed_password_juan'), -- Asegúrate de que el password esté hasheado
(2, 'hashed_password_maria'),
(3, 'hashed_password_carlos');

INSERT INTO user_profile (id_user, company, website, location, user_status, skills, bio, github) VALUES
(1, 'Tech Solutions', 'www.techsolutions.com', 'Madrid, España', 'Desarrollador', 'Java, Python, SQL', 'Apasionado de la tecnología.', 'github.com/juanperez'),
(2, 'Creative Studio', 'www.creativestudio.com', 'Barcelona, España', 'Diseñadora', 'Photoshop, Illustrator', 'Amante del diseño gráfico.', 'github.com/mariagomez'),
(3, 'Web Services', 'www.webservices.com', 'Valencia, España', 'Ingeniero', 'C++, JavaScript', 'Desarrollador web.', 'github.com/carloslopez');

INSERT INTO experience (id_user_profile, title, company, location, exp_from, exp_to, current, description) VALUES
(1, 'Desarrollador Senior', 'Tech Solutions', 'Madrid, España', '2020-01-01', '2023-01-01', 0, 'Desarrollo de aplicaciones web.'),
(2, 'Diseñadora Gráfica', 'Creative Studio', 'Barcelona, España', '2019-06-01', '2023-01-01', 1, 'Diseño de identidades corporativas.'),
(3, 'Ingeniero de Software', 'Web Services', 'Valencia, España', '2021-02-01', '2023-01-01', 1, 'Desarrollo de soluciones web.');

INSERT INTO education (id_user_profile, school, degree, fieldofstudy, exp_from, exp_to, current, description) VALUES
(1, 'Universidad de Madrid', 'Ingeniería en Sistemas', 'Sistemas Computacionales', '2015-09-01', '2020-06-01', 0, 'Graduado con honores.'),
(2, 'Universidad de Barcelona', 'Diseño Gráfico', 'Diseño', '2015-09-01', '2019-06-01', 0, 'Graduada con distinción.'),
(3, 'Universidad Politécnica', 'Ingeniería en Computación', 'Computación', '2016-09-01', '2020-06-01', 0, 'Graduado con mención.'); 

INSERT INTO social (id_user_profile, youtube, facebook, twitter, instagram) VALUES
(1, 'youtube.com/juanperez', 'facebook.com/juanperez', 'twitter.com/juanperez', 'instagram.com/juanperez'),
(2, 'youtube.com/mariagomez', 'facebook.com/mariagomez', 'twitter.com/mariagomez', 'instagram.com/mariagomez'),
(3, 'youtube.com/carloslopez', 'facebook.com/carloslopez', 'twitter.com/carloslopez', 'instagram.com/carloslopez');

INSERT INTO user_post (id_user, post_text, post_name, id_like) VALUES
(1, '¡Hola a todos! Estoy emocionado por este nuevo proyecto.', 'Primer Post', 0),
(2, 'Diseñando algo increíble para un cliente.', 'Trabajo en Progreso', 0),
(3, 'Comenzando un nuevo proyecto de desarrollo web.', 'Nuevo Proyecto', 0);

INSERT INTO post_likes (id_user, id_post) VALUES
(2, 1), -- María le da like al post de Juan
(3, 1), -- Carlos le da like al post de Juan
(1, 2), -- Juan le da like al post de María
(3, 3); -- Carlos le da like al post de él mismo

SELECT  
	u.name AS "Nombre", u.second_name AS "Apellido", u.age AS "Edad", u.email AS "Email", u.role AS "Rol",
    p.user_password AS "Password",
    u.registered_at AS "Fecha Registro"
FROM users u
JOIN passwords p ON p.id_user=u.id;


SELECT  
	u.name AS "Nombre", u.second_name AS "Apellido", 
	up.post_text AS "Texto del Post", up.registered_at AS "Fecha del Post"
FROM user_post up
JOIN users u ON up.id_user = u.id;


SELECT 
	up.post_text AS "Texto del Post", 
    u.name AS "Quien ha dado Like"
FROM post_likes pl
JOIN user_post up ON pl.id_post = up.id
JOIN users u ON pl.id_user = u.id;
