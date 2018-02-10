var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LOOPRING",
    database: "bamazon_DB",

});

var table = new Table({
    head: ['ID','Product','Department','Price','Stock'],
    colWidths:[6,15,15,9,9]
});


connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id : " + connection.thread + "\n");
    displayProductList();
});

function displayProductList(){
    let sql = 'SELECT * FROM products WHERE item_id BETWEEN 1 AND 12';
    
    connection.query(sql, (err,res,cols)=>{
        if(err) throw err;
        console.log("\n Fruits and Cheeses available for sale.");

        for(var i = 0; i < res.length ; i ++){
             table.push(
                 [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
             );        
        }
        console.log(table.toString());
        customerOrder();
    });
}

function customerOrder(){
    inquirer.prompt([{        
        name: "product",        
        message: "Select the ID of the product you would like to buy.",
        type: "list",
        choices: ["1","2","3","4","5","6","7","8","9","10","11","12"]
    },{
        name: "unit",
        message: "How many units of the product would you like to buy?"
    }
    ]).then(function(orderedUnits){
        let productID = orderedUnits.product;
        let unitsOrdered = orderedUnits.unit;
        console.log("\nProduct ID : " + productID);
        console.log("Units Ordered : " + unitsOrdered);

        searchProducts(productID, unitsOrdered);
       
    });
}
function searchProducts(productID, unitsOrdered){
    let sql = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
    
    connection.query(sql, {item_id: productID}, function(err,res){

        let exisitingUnits = res[0].stock_quantity;
        let unitPrice = res[0].price;

        if(unitsOrdered > exisitingUnits){
           console.log("Your order cannot be completed due to insufficient quantity! Please select another item.");
           displayProductList();
        }else{
            updateProducts(unitsOrdered, exisitingUnits, productID, unitPrice);

        }
    });
    
}
function  updateProducts(unitsOrdered,exisitingUnits,productID,unitPrice) {
    let newAmt = (exisitingUnits-unitsOrdered);
    let customerPrice = (unitsOrdered * unitPrice);
    
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newAmt
          },
          {
            item_id: productID
          },
          {
            product_sales: customerPrice
          }
        ], function(err,res){
            if (err) throw err;
            console.log("This is the total cost of your purchase: $" + customerPrice);
            console.log("This is the remaining quantity of the product you ordered: " + newAmt);
        }
    );
    
    connection.end();
}
