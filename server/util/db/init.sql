CREATE TYPE experience AS ENUM IF NOT EXISTS(
    'no_experience', 'mid', 'high');

CREATE TABLE babysitters IF NOT EXISTS(
    babysitter_id SERIAL PRIMARY KEY,
    babysitter_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    experience experience,
    age INT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    min_kid_age INT default 0,
    max_kid_age INT default 18,
    working_hours JSON NOT NULL,
    end_timestamp bigint unsigned default '9999999999' NOT NULL,
    start_timestamp bigint unsigned default '0' NOT NULL,
    image_string VARCHAR(255) NOT NULL,
    comments TEXT
);

CREATE TABLE parents IF NOT EXISTS(
    parent_id SERIAL PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    min_kid_age INT NOT NULL,
    max_kid_age INT NOT NULL,
    num_of_kid INT NOT NULL,
    end_timestamp bigint unsigned default '9999999999' NOT NULL,
    start_timestamp bigint unsigned default '0' NOT NULL,
    comments TEXT
);




