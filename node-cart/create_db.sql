drop table if exists products;

create table products
(
    uuid  varchar(36) not null
        constraint products_pk
            primary key,
    name  varchar(64) not null,
    price int         not null
);

INSERT INTO products (uuid, name, price)
VALUES ('b4bd42e7-22bd-4a6e-8796-c63d2533c964', 'Josera Kitten 10kg', 12000);
INSERT INTO products (uuid, name, price)
VALUES ('76c89de8-ad5e-485c-94d2-9f7186636541', 'Żwirek Benek 10kg', 3000);
INSERT INTO products (uuid, name, price)
VALUES ('420876e3-86c2-401a-a211-c9801d707371', 'Kocimiętka 150g', 359);
INSERT INTO products (uuid, name, price)
VALUES ('08ddda5d-0875-49dc-a354-c01bbe8fec15', 'Kuweta', 4000);
INSERT INTO products (uuid, name, price)
VALUES ('7cd19625-4488-4b5e-9ccf-dbd93297dac7', 'Obroża', 1010);