CREATE type experience AS ENUM(
    'no_experience', 'mid', 'high');
CREATE type moderator_status AS ENUM(
    'new', 'seen', 'working-on', 'done');
CREATE type request_type AS ENUM (
    'activation', 'contact', 'report');

CREATE table IF NOT EXISTS babysitters (
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
    end_timestamp bigint default '9999999999' NOT NULL,
    start_timestamp bigint default '0' NOT NULL,
    image_string VARCHAR(255) NOT NULL,
    comments TEXT
);

CREATE table IF NOT EXISTS parents (
    parent_id SERIAL PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    min_kid_age INT NOT NULL,
    max_kid_age INT NOT NULL,
    num_of_kid INT NOT NULL,
    end_timestamp bigint default '9999999999' NOT NULL,
    start_timestamp bigint default '0' NOT NULL,
    comments TEXT
);

CREATE table IF NOT EXISTS recommendations (
    recommendation_id SERIAL,
    rating INT CHECK(rating > -1 AND rating < 6),
    recommendation_text TEXT,
    PRIMARY KEY(parent_id, babysitter_id),
    FOREIGN KEY(parent_id) REFERENCES parents(parent_id)
    FOREIGN KEY(babysitter_id) REFERENCES babysitters(babysitter_id)
);

CREATE table IF NOT EXISTS parents_babysitters_interactions (
    last_visit_timestamp TIMESTAMP CURRENT_TIMESTAMP,
    contacted BOOLEAN NOT NULL DEFAULT FALSE,
    worked_with BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(parent_id, babysitter_id),
    FOREIGN KEY(parent_id) REFERENCES parents(parent_id)
    FOREIGN KEY(babysitter_id) REFERENCES babysitters(babysitter_id)
);

CREATE table IF NOT EXISTS moderator_requests (
    request_id SERIAL PRIMARY KEY,
    request_status moderator_status DEFAULT 'new',
    request_type request_type NOT NULL,
    request_diff JSON
);
