const express = require( 'express' ),
      app = express();

app.get( '/', ( req, res ) => {
    let product_data = init_products_for_sale();
    res.send( product_data );
});



// pull in API data
const PRODUCTS = require( './src/util/products.js' );
const CATEGORIES = require( './src/util/categories.js' );



function init_products_for_sale() {

    // TODO: categories should all have a distinct min/max price

    const max_product_quantity = 10;

    PRODUCTS.product_list.forEach(( product ) => {

        // product quantity
        product.quantity = Math.floor( max_product_quantity * Math.random() );

        // product price
        product.price = configure_product_price( product.category );
    });

    return PRODUCTS.product_list;
}
/*
 * Function: configure_product_price
 *
 * Receives a category name and finds the matching
 * category within the global.  Then calculates a
 * random price for the item within its assigned
 * price range.
 *
 * Parameters:
 *
 *    categoryName (STRING) -> the category that the item belongs to
 *
 * Returns: INTERGER (item price), or throws an error
 */
function configure_product_price( categoryName ) {

    let filtered = CATEGORIES.category_list.filter(( category ) => {
        return category.name === categoryName.toUpperCase();
    });

    if( filtered ) {

        let minimum_price = filtered[ 0 ].price_range.min;
        let maximum_price = filtered[ 0 ].price_range.max;
        let price = Math.floor( maximum_price * Math.random() );

        // return the price to use OR the minimum
        return price > minimum_price ? price : minimum_price;
    } else {
        console.log( 'ERROR' );
    }
}


app.listen(3000);
