create database TrafficDb;

use TrafficDb;

CREATE TABLE driver (
    dlno VARCHAR(10),
    d_name VARCHAR(45),
    address VARCHAR(65)
);

CREATE TABLE vehicle (
    regno VARCHAR(10),
    r_year INT,
    chassisno VARCHAR(16),
    v_owner VARCHAR(10)
);

CREATE TABLE police (
    pid VARCHAR(10),
    p_name VARCHAR(45),
    station VARCHAR(16)
);

CREATE TABLE offences (
    o_type VARCHAR(16),
    fine INT
);

CREATE TABLE insurance (
    uid VARCHAR(10),
    issuer VARCHAR(10),
    regno VARCHAR(10)
);

CREATE TABLE impound (
    i_name VARCHAR(10),
    incharge VARCHAR(10)
);

CREATE TABLE commits (
    repno VARCHAR(10),
    dlno VARCHAR(10),
    regno VARCHAR(10),
    o_date DATETIME,
    location VARCHAR(16),
    o_type VARCHAR(16),
    ispaid VARCHAR(5),
    impound VARCHAR(10)
);

insert into offences values('no helmet', 5000);
insert into offences values('no DL', 10000);
insert into offences values('signal jump', 8000);
insert into offences values('no RC', 4000);
insert into offences values('no seatbelt', 5000);
insert into offences values('no insurance', 3000);
insert into offences values('overspeeding', 6000);
insert into offences values('drunk driving', 10000);


insert into driver values('KA1234', 'shashanka', 'basavanagudi');
insert into driver values('KA4321', 'sanjith', 'BG Road');
insert into driver values('KA2143', 'swaroop', 'basavanagudi');
insert into driver values('KA3124', 'rahul', 'banashankari');

CREATE TABLE users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(username)
);