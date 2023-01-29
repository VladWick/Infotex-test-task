const api_url = "https://dummyjson.com/products";

let array = [];
let amount = 10; // default amount
let sortBy = "no sort"; // default mode
let currentElement; 

async function getApi(url) {
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    array = data.products;
    console.log(array);

    getAmount();
    showProducts(amount);
    showCard(amount);

    // Sort products depends on option inside the checkbox
    document.getElementById("sort_checkbox_select").onchange = function() {
        getSortType();
        sortArray(sortBy);
        clearProducts(amount);
        showProducts(amount);
        showCard(amount);
    }
    
    // Change amount of products displayed
    document.getElementById("amount_checkbox_select").onchange = function() {
        clearProducts(amount);
        getAmount();
        showProducts(amount);
        showCard(amount);
    }
}

// Get amount of displayed values
function getAmount() {
    let amount_element = document.getElementById('amount_checkbox_select');
    amount = amount_element.options[amount_element.selectedIndex].text;
}

function getSortType() {
    let sort_element = document.getElementById('sort_checkbox_select');
    sortBy = sort_element.options[sort_element.selectedIndex].text;
}

function sortArray(sortBy) {
    console.log(sortBy)
    if(sortBy == "name") {
        array = array.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
        });
    } else if(sortBy == "price") {
        array = array.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
        });
    } else {
        array = array.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
        });
    }
}

function showProducts(amount) {
    // List contains all the products
    let list = document.getElementById('products_list');
    list.style.textAlign = 'center';

    // Insert first element
    let newElement = document.createElement('li');
    newElement.textContent = array[0].title;
    newElement.classList.add("products_item");
    newElement.setAttribute('draggable', true);
    newElement.setAttribute("id", 0)
    list.insertBefore(newElement, list.firstElementChild);

    // Insert remaining elements in in respect to amount
    for(let i = 1; i < amount; ++i) {
        let newElement = document.createElement('li');
        newElement.textContent = array[i].title;
        newElement.classList.add("products_item");
        newElement.setAttribute('draggable', true);
        newElement.style.textAlign = 'center';
        newElement.setAttribute("id", i)
        list.insertBefore(newElement, list.lastElementChild.nextSibling);
    }
}

// Clear DOM before adding new elements
function clearProducts(amount) {
    for(let i = 0; i < amount; ++i) {
        document.getElementById(i).remove();
    }
}

function showCard(amount) {
    // Loop for next cards
    for(let i = 0; i < amount; ++i) {
        let card_image = document.getElementById('card_image');
        card_image.src = array[i].images[0];

        let card_title = document.getElementById('title');
        card_title.textContent = "Title: " + array[i].title;

        let card_brand = document.getElementById('brand');
        card_brand.textContent = "Brand: " +  array[i].brand;

        let card_category = document.getElementById('category');
        card_category.textContent = "Category: " +  array[i].category;

        let card_description = document.getElementById('description');
        card_description.textContent = "Description: " +  array[i].description;

        let card_price = document.getElementById('price');
        card_price.textContent = "Price: " +  array[i].price;

        document.getElementById(i).onclick = function() { 
            let card_image = document.getElementById('card_image');
            card_image.src = array[i].images[0];

            let card_title = document.getElementById('title');
            card_title.textContent = "Title: " + array[i].title;

            let card_brand = document.getElementById('brand');
            card_brand.textContent = "Brand: " +  array[i].brand;

            let card_category = document.getElementById('category');
            card_category.textContent = "Category: " +  array[i].category;

            let card_description = document.getElementById('description');
            card_description.textContent = "Description: " +  array[i].description;

            let card_price = document.getElementById('price');
            card_price.textContent = "Price: " +  array[i].price;
        }
    }
}

getApi(api_url);