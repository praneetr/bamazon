
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10, 1) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mangoes", "Fruits", 3, 100),("Kiwis", "Fruits", 5, 25),("Papayas", "Fruits", 2, 15),
("Bananas", "Fruits", 1, 1000),("Oranges", "Fruits", 2, 500),("Apples", "Fruits", 3, 600),
("Swiss", "Cheese", 5, 100),("American", "Cheese", 3, 40),("Mozarella", "Cheese", 4, 60),
("Cheddar", "Cheese", 5, 100),("Parmesan", "Cheese",3.5, 25),("Provolone", "Cheese", 4, 50);

);
