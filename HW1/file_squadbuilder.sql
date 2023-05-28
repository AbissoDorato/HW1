create database db_squadbuilder;
use db_squadbuilder;

ALTER TABLE commenti
ADD id_commento INTEGER PRIMARY KEY AUTO_INCREMENT;


create table likes(
id_ut integer,
id_squad integer,
foreign key(id_ut) references utenti(id),
foreign key(id_squad) references squadra(id_squadra),
unique(id_ut,id_squad)
);


create table utenti(
id integer primary key auto_increment,
email varchar(255),
utente varchar(255),
pas varchar(255)
);

ALTER TABLE likes
ADD CONSTRAINT id_squadra FOREIGN KEY (id_squad) REFERENCES squadra(id_squadra) ON DELETE CASCADE; -- Aggiungi il nuovo vincolo con DELETE CASCADE


create table Squadra(
id_squadra integer primary key auto_increment,
id_allenatore integer,
nome_squadra varchar(255),
pokemon JSON,
foreign key(id_allenatore) references utenti(id)
);

CREATE VIEW squadra_likes_count AS
SELECT s.id_squadra, s.nome_squadra, COALESCE(COUNT(l.id_squad), 0) AS count
FROM squadra s
LEFT JOIN likes l ON s.id_squadra = l.id_squad
GROUP BY s.id_squadra, s.nome_squadra;


CREATE VIEW commenti_visualizzazione AS
SELECT utenti.utente AS nome_utente, squadra.nome_squadra, commenti.commento
FROM commenti
JOIN utenti ON commenti.id_allenatore = utenti.id
JOIN squadra ON commenti.id_squadra = squadra.id_squadra;

CREATE TABLE commenti (
  id_commento INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_allenatore INTEGER,
  id_squadra INTEGER,
  commento VARCHAR(255),
  FOREIGN KEY (id_allenatore) REFERENCES utenti(id),
  FOREIGN KEY (id_squadra) REFERENCES Squadra(id_squadra) ON DELETE CASCADE
);
drop table commenti;



