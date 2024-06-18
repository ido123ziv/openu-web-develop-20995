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
    end_timestamp bigint default '9999999999' NOT NULL,
    start_timestamp bigint default '0' NOT NULL,
    image_string VARCHAR(255),
    comments TEXT
);

INSERT INTO babysitters (babysitter_name, email, password, city, street, experience, age, phone_number, gender, image_string, comments)
VALUES 
('Amit','amit@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Holon', 'Arlozorov', 'mid', 20, '0505050050','F', '', 'I need a job, please hire me.'),
('Alon','alon@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Haifa', 'Habonim', 'high', 21, '0524854877','M', '', 'I am the perfect babysitter!'),
('Yuval', 'yuval@test.com', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Jerusalem', 'Hankin', 'no_experience', 30, '0532648574', 'M', '', 'the most professional nanny.'),
('Dana','Dana@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Petach Tikva', 'Haetzel', 'mid', 21, '0524854447','F', '', 'Available to work only on every second sunday, a medicine student and an influencer'),
('Mor','mor@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Rehovot', 'Haagana', 'high', 27, '0584864877','F', '', 'Not mobile, only available in my area'),
('Danit','danit@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Rosh Hayin', 'Habonim', 'high', 25, '0524851117','F', '', 'I have 13 sisters and raised them all');

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
('Dilen', 'dilen@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Haifa', 'Habonim', '0500041247','F', 1, 1, 1, 'only the bex for my kids'),
('Robbi','robbi@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Haifa', 'Herzel', '0500555557','M', 1, 4, 3, 'Experienced nanny? we want you!'),
('Shoshi', 'shoshi@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Holon', 'HaShalom', '0558748566', 'F', 2, 4, 2, 'Looking for a great babysitter.'),
('Inbar', 'inbar@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Givatayim', 'HaYarden', '0558748586', 'M', 2, 4, 2, 'I love my kids and only want the best for them'),
('Ivgeny', 'ivgeny@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Azor', 'Ezra', '0558748566', 'M', 2, 4, 2, 'Looking for a traditional babysitter to help with disciplining the kids'),
('Nahum', 'nahum@test.com','$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG','Holon', 'Golda Meir', '0558748566', 'M', 2, 4, 2, 'My kids are difficult, be prepared');

CREATE table IF NOT EXISTS moderators (
    moderator_id SERIAL PRIMARY KEY,
    moderator_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO moderators (moderator_name, email, password)
VALUES
('Liel', 'liel@test.com', '$2a$12$OUO1SwtCGaNZdg.0exRQUut08Bv94z3tHRMt63YdraxPecf30.6aK'),
('Keren', 'keren@test.com', '$2a$12$OUO1SwtCGaNZdg.0exRQUut08Bv94z3tHRMt63YdraxPecf30.6aK'),
('Shelly', 'shelly@test.com', '$2a$12$OUO1SwtCGaNZdg.0exRQUut08Bv94z3tHRMt63YdraxPecf30.6aK'),
('Ido', 'ido@test.com', '$2a$12$OUO1SwtCGaNZdg.0exRQUut08Bv94z3tHRMt63YdraxPecf30.6aK'),
('Eli', 'eli@test.com', '$2a$12$OUO1SwtCGaNZdg.0exRQUut08Bv94z3tHRMt63YdraxPecf30.6aK');

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
(3, 1, 4, 'Ate all the snacks in the house but still did a good job'),
(1, 2, 4, 'Quite decent to say the least'),
(3, 2, 4, 'Not too bad, thanks again'),
(1, 3, 0, 'Not recommended'),
(2, 3, 0, 'Not recommended At all');

CREATE table IF NOT EXISTS parents_babysitters_interactions (
    last_visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted BOOLEAN NOT NULL DEFAULT FALSE,
    worked_with BOOLEAN NOT NULL DEFAULT FALSE,
    parent_id INT REFERENCES parents,
    babysitter_id INT REFERENCES babysitters,
	PRIMARY KEY(parent_id, babysitter_id)
);

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

CREATE table IF NOT EXISTS contact_requests (
    request_id SERIAL PRIMARY KEY,
    request_status moderator_status DEFAULT 'new',
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    message_title VARCHAR(50) NOT NULL,
    user_message VARCHAR(500) NOT NULL
);

INSERT INTO contact_requests (request_status, user_name, user_email, message_title, user_message)
VALUES

('new','Ivgeny','ivgeny@test.com', 'Languages', 'Which languages are available in this site?'),
('new','Abbi', 'example@mail.com', 'Business Partnership Inquiry', 'I hope this message finds you well. 
                                    I am reaching out to explore potential partnership opportunities between our companies. 
                                    Lets discuss how we can collaborate for mutual growth.'),
('new','Anonymous', 'Anonymous@mail.com', 'Issue with a babysitter', 'I am writing to report an issue with a babysitter i have connected to through your platform. 
                                                                      i will love to hear back from you.'),
('new','Or', 'example@mail.com', 'Great Platform!', 'I came across your profile and was impressed by your work. 
                                                     Id love to connect and discuss any potential synergies or opportunities for collaboration.'),
('new','Alona', 'alona@mail.com', 'Inquiry About Additional Services', 'I am curious if any of the babysitters on your app also offer tutoring or help with homework. 
                                                                        It would be great to find someone who can assist with my childs schoolwork.'),
('new','Eran', 'eran@example.com', 'new user', 'I want to join this site I heard a lot about it!');
