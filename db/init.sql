CREATE type experience AS ENUM(
    'no_experience', 'mid', 'high');
CREATE type moderator_status AS ENUM(
    'new', 'seen', 'working-on', 'done');
CREATE type request_type AS ENUM (
    'activation', 'contact', 'report');

CREATE table IF NOT EXISTS babysitters (
    babysitter_id SERIAL PRIMARY KEY,
    babysitter_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    experience experience,
    age INT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    working_hours JSON NOT NULL,
    end_timestamp bigint default '9999999999' NOT NULL,
    start_timestamp bigint default '0' NOT NULL,
    image_string VARCHAR(255),
    comments TEXT
);

INSERT INTO babysitters (babysitter_name, email, password, city, street, experience, age, phone_number, gender, working_hours, image_string, comments)
VALUES 
('Amit','amit@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Holon', 'Arlozorov', 'mid', 20, '0505050050','F', '{"monday": "9am-3pm", "tuesday": "9am-3pm", "wednesday": "9am-3pm", "thursday": "9am-3pm", "friday": "9am-3pm"}' , '', 'I need a job, please hire me.'),
('Alon','alon@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Haifa', 'Habonim', 'high', 21, '0524854877','M', '{"monday": "8am-5pm", "tuesday": "8am-5pm", "wednesday": "8am-5pm", "thursday": "8am-5pm", "friday": "8am-5pm"}' , '', 'I am the perfect babysitter!'),
('Yuval', 'yuval@test.com', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Jerusalem', 'Hankin', 'no_experience', 30, '0532648574', 'M', '{"monday": "9am-6pm", "tuesday": "9am-6pm", "wednesday": "9am-6pm", "thursday": "9am-6pm", "friday": "9am-6pm"}' , '', 'the most professional nanny.');



CREATE table IF NOT EXISTS parents (
    parent_id SERIAL PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    min_kid_age INT NOT NULL,
    max_kid_age INT NOT NULL,
    num_of_kids INT NOT NULL,
    end_timestamp bigint default '9999999999' NOT NULL,
    start_timestamp bigint default '0' NOT NULL,
    comments TEXT
);

INSERT INTO parents (parent_name, email, password, city, street, phone_number, gender, min_kid_age, max_kid_age, num_of_kids, comments)
VALUES
('Dilen', 'dilen@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Haifa', 'Habonim', '0500041247','F', 1, 1, 1, 'The Bex'),
('Robbi','robbi@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Haifa', 'Herzel', '0500555557','M', 1, 4, 3, 'Experienced nanny? we want you!'),
('Shoshi', 'shoshi@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Holon', 'HaShalom', '0558748566', 'F', 2, 4, 2, 'Looking for a great babysitter.');

CREATE table IF NOT EXISTS recommendations (
    recommendation_id SERIAL,
	parent_id INT REFERENCES parents, 
	babysitter_id INT REFERENCES babysitters,
    rating INT CHECK(rating > -1 AND rating < 6),
    recommendation_text TEXT,
	PRIMARY KEY(parent_id, babysitter_id)	
);

INSERT INTO recommendations (parent_id, babysitter_id, rating, recommendation_text)
VALUES 
(2, 1, 5, 'Number One! u good u'),
(1, 3, 0, 'Not recommended'),
(3, 2, 4, 'Alon did a fantastic job with our kids! Highly recommend.');

CREATE table IF NOT EXISTS parents_babysitters_interactions (
    last_visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted BOOLEAN NOT NULL DEFAULT FALSE,
    worked_with BOOLEAN NOT NULL DEFAULT FALSE,
    parent_id INT REFERENCES parents,
    babysitter_id INT REFERENCES babysitters,
	PRIMARY KEY(parent_id, babysitter_id)
);

INSERT INTO parents_babysitters_interactions (parent_id, babysitter_id, contacted, worked_with)
VALUES
(1, 1, TRUE, TRUE),
(2, 2, TRUE, FALSE),
(3, 3, TRUE, TRUE);

CREATE table IF NOT EXISTS moderator_requests (
    request_id SERIAL PRIMARY KEY,
    request_status moderator_status DEFAULT 'new',
    request_type request_type NOT NULL,
    request_diff JSON
);

INSERT INTO moderator_requests (request_status, request_type, request_diff)
VALUES
('new', 'activation', '{"user_id": 123, "activation_code": "abc123"}'),
('working-on', 'report', '{"report_id": 456, "issue": "complaint"}');