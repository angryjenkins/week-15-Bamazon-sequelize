var mysql   = require('mysql');
var colors  = require('colors');
var prompt  = require('prompt');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '04051997',
  database : 'Bamazon'
});

var schema = {
  properties: {
    ItemID: {
      description: 'Enter an ItemID to get started!'.cyan,
      type: 'integer',
      message: 'Invalid input -- Please enter an item NUMBER.'.red.bold,
      required: true
    }
  }
};

// GOTTADO: prompt for an order query.
//if input is INT, query by ItemID. If a VARCHAR, query by Name. **aDD qUERY TO A qUERYtABLE.

//SEARCH BY QUERY,

connection.connect();

connection.query("SELECT * FROM Bamazon.Products", function(err, rows, fields) {
  if (err) throw err;

  console.log("Welcome to the Bamazon Storefront!".bold.cyan);
  for(var i=0;i<rows.length;i++){
    console.log(("item " + rows[i].ItemID).black.bgCyan + " " + rows[i].Name.bold + " || $" + rows[i].Price.toFixed(2) + " (" + rows[i].StockQuantity + " available)");
  }

  prompt.start();

  prompt.get(schema, function (err, result) {
    var selectedRow = rows[result.ItemID-1];

    if(result.ItemID > rows.length){
      console.log('Sorry, there is no Item # %s'.bold.red, result.ItemID);
      connection.end();

    } else {
      console.log('Command-line input received:');
      console.log('  Interested in Item #: ' + result.ItemID + " -- " + selectedRow.Name.bold);
      description: 'Enter an ItemID to get started!'
      

      switch(selectedRow.StockQuantity){
        case selectedRow.StockQuantity < 1:
          console.log('Sorry, we are all out of %s',selectedRow.Name);
          break;
        default:
          console.log('You are in luck! We have '.green + selectedRow.StockQuantity + ' of those in stock.'.green);

          var schema2 = {
            properties: {
              Quantity: {
                description: 'How many of this item would you like?'.cyan,
                type: 'integer',
                message: 'Invalid input - please enter a NUMBER.'.red.bold,
                required: true
              }
            }
          };

          prompt.get(schema2,function (err, result){

              if(result.Quantity > selectedRow.StockQuantity){
                console.log('Sorry, there are only '.red.bold + selectedRow.StockQuantity + ' available.'.red.bold);
                connection.end();
              } else{
                console.log(result.Quantity + " x " + (selectedRow.Name).green.bold + ' -- this  order will cost '.green + "$".bold + (result.Quantity * selectedRow.Price).toFixed(2).bold);

                //prompt are you sure you want to purchase? yes/no. 
                //IF YES, update the table decreasing the quantity by the ordered amount.


                var newQuantity = selectedRow.StockQuantity - result.Quantity;

                //this connection is causing an error - must figure out where to end the connection.
                connection.query("UPDATE Products SET StockQuantity=" + newQuantity + " WHERE ItemID =" + selectedRow.ItemID, function(err, rows, fields) {
                  if (err) throw err;

                  //prompt confirmation?
                  console.log('Inventory updated. Remaining: ' + newQuantity + ' x ' +selectedRow.Name);
                
                connection.end();

                });
              }
          });
        }
      }
  });
});

