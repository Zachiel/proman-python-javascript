ALTER TABLE ONLY public.user_boards DROP CONSTRAINT fk_user_boards_user_id;
ALTER TABLE ONLY public.user_boards DROP CONSTRAINT fk_user_boards_board_id;
ALTER TABLE ONLY public.cards DROP CONSTRAINT fk_cards_status_id;
ALTER TABLE ONLY public.cards DROP CONSTRAINT fk_cards_board_id;
ALTER TABLE ONLY public.board_statuses DROP CONSTRAINT fk_board_statuses_status_id;
ALTER TABLE ONLY public.board_statuses DROP CONSTRAINT fk_board_statuses_board_id;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT username_unique;
ALTER TABLE ONLY public.statuses DROP CONSTRAINT statuses_pkey;
ALTER TABLE ONLY public.cards DROP CONSTRAINT cards_pkey;
ALTER TABLE ONLY public.boards DROP CONSTRAINT boards_pkey;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.statuses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.cards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.boards ALTER COLUMN title DROP DEFAULT;
ALTER TABLE public.boards ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP TABLE public.user_boards;
DROP SEQUENCE public.statuses_id_seq;
DROP TABLE public.statuses;
DROP SEQUENCE public.cards_id_seq;
DROP TABLE public.cards;
DROP SEQUENCE public.boards_id_seq;
DROP TABLE public.boards;
DROP TABLE public.board_statuses;
SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public.board_statuses (
    board_id integer NOT NULL,
    status_id integer NOT NULL,
    status_order integer NOT NULL
);



CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    is_private boolean DEFAULT false NOT NULL
);



CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;



CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    status_id integer NOT NULL,
    title character varying(200) DEFAULT 'Card title'::character varying NOT NULL,
    card_order integer NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    body character varying(200)
);



CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;



CREATE TABLE public.statuses (
    id integer NOT NULL,
    title character varying(200) DEFAULT 'Status title'::character varying NOT NULL
);



CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;



CREATE TABLE public.user_boards (
    board_id integer NOT NULL,
    user_id integer NOT NULL,
    user_role character varying(200)[] NOT NULL,
    CONSTRAINT check_roles CHECK (((user_role)::text = ANY (ARRAY[('owner'::character varying)::text, ('member'::character varying)::text, ('guest'::character varying)::text])))
);



CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200),
    email character varying(200) NOT NULL,
    registration_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password character varying(200) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);



CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;



ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;



ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);



ALTER TABLE ONLY public.boards ALTER COLUMN title SET DEFAULT concat('Board ', (currval('public.boards_id_seq'::regclass))::character varying(10));



ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);



ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);



ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);



INSERT INTO public.board_statuses VALUES (1, 1, 1);
INSERT INTO public.board_statuses VALUES (2, 1, 1);
INSERT INTO public.board_statuses VALUES (1, 2, 2);
INSERT INTO public.board_statuses VALUES (2, 2, 2);
INSERT INTO public.board_statuses VALUES (1, 3, 3);
INSERT INTO public.board_statuses VALUES (2, 3, 3);
INSERT INTO public.board_statuses VALUES (1, 4, 4);
INSERT INTO public.board_statuses VALUES (2, 4, 4);



INSERT INTO public.boards VALUES (1, 'Board 1', false);
INSERT INTO public.boards VALUES (2, 'Board 2', false);



INSERT INTO public.cards VALUES (1, 1, 1, 'new card 1', 1, false, NULL);
INSERT INTO public.cards VALUES (2, 1, 1, 'new card 2', 2, false, NULL);
INSERT INTO public.cards VALUES (3, 1, 2, 'in progress card', 1, false, NULL);
INSERT INTO public.cards VALUES (4, 1, 3, 'planning', 1, false, NULL);
INSERT INTO public.cards VALUES (5, 1, 4, 'done card 1', 1, false, NULL);
INSERT INTO public.cards VALUES (6, 1, 4, 'done card 2', 2, false, NULL);
INSERT INTO public.cards VALUES (7, 2, 1, 'board 2 card 1', 1, false, NULL);
INSERT INTO public.cards VALUES (8, 2, 1, 'board 2 card 2', 2, false, NULL);
INSERT INTO public.cards VALUES (9, 2, 2, 'board 2 wip', 1, false, NULL);
INSERT INTO public.cards VALUES (10, 2, 3, 'board 2 planning', 1, false, NULL);
INSERT INTO public.cards VALUES (11, 2, 4, 'board 2 done 1', 1, false, NULL);
INSERT INTO public.cards VALUES (12, 2, 4, 'board 2 done 2', 2, false, NULL);



INSERT INTO public.statuses VALUES (1, 'new');
INSERT INTO public.statuses VALUES (2, 'in progress');
INSERT INTO public.statuses VALUES (3, 'testing');
INSERT INTO public.statuses VALUES (4, 'done');






INSERT INTO public.users VALUES (1, 'ProManAdmin', 'ProMan', 'Admin', 'admin@proman.com', '2023-02-22', '$2b$12$BosXgyg3cKMTSvOv.lNTQuGV87haDzWLmfEXWMXEkCKLFRNtlzK4q', true);



SELECT pg_catalog.setval('public.boards_id_seq', 3, true);



SELECT pg_catalog.setval('public.cards_id_seq', 12, true);



SELECT pg_catalog.setval('public.statuses_id_seq', 4, true);



SELECT pg_catalog.setval('public.users_id_seq', 1, false);



ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_unique UNIQUE (username);



ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.board_statuses
    ADD CONSTRAINT fk_board_statuses_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);



ALTER TABLE ONLY public.board_statuses
    ADD CONSTRAINT fk_board_statuses_status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id);



ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);



ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id);



ALTER TABLE ONLY public.user_boards
    ADD CONSTRAINT fk_user_boards_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);



ALTER TABLE ONLY public.user_boards
    ADD CONSTRAINT fk_user_boards_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);



