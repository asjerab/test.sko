

let products;

let storedProducts = localStorage.getItem('products');
if (storedProducts) {
    products = JSON.parse(storedProducts);
    console.log("if stored")
}
else {
    products = [
        { navn: "Jordan 5 Retro", farge: "Universal Blue", pris: 252, shippingFee: 200, id: 0, antall: 0 },
        { navn: "jordan 3 retro red", farge: "red and white", pris: 225, id: 1, antall: 0 },
        { navn: "yeezy foam runners adidas", farge: "sea black", pris: 257, id: 2, antall: 0 },
        { navn: "nike dunk pandas low", farge: "Black and White", pris: 140, id: 3, antall: 0, },
        { navn: "purple lobster", farge: "Dark Purple", pris: 1519, id: 4, antall: 0, },
        { navn: "yeezy slide", farge: "Beige", pris: 216, id: 5, antall: 0, },
        { navn: "lobster dunk", farge: "sea orange", pris: 352, id: 6, antall: 0, },
        { navn: "jordan 4 midnight navy", farge: "blue navy", pris: 334, id: 7, antall: 0, },
        { navn: "jordan 4 thunder red", farge: "red and black", pris: 470, id: 8, antall: 0, },
        { navn: "jordan 4 fire red", farge: "red black and white", pris: 437, id: 9, antall: 0, },
        { navn: "new balance low", farge: "Brown", pris: 109, id: 10, antall: 0, },
        { navn: "Nike Air Max Plus Grind", farge: "White & Grey", pris: 138, id: 11, antall: 0, },
    ];
}






function removeShoe(index) {
    const product = products[index];
    product.antall = 0;
    localStorage.setItem("products", JSON.stringify(products));
    window.location.reload()
}

let adBUtton = document.querySelector('.sale_nr_two_small')

adBUtton.addEventListener('click', () => {
    location.href = 'produkt.html?id=8'
})







// Dette er en kode som regner ut totalprisen i handlekurven, den henter ut informasjonen fra arrayet vi lagde i topen av script documente (Products)

let totalPris = 0;
for (let i = 0; i < products.length; i++) {
    if (products[i].antall > 0) {
        totalPris += products[i].pris * products[i].antall;
    }
}
console.log("Total pris:", totalPris);


window.addEventListener('load', () => {
    if (document.URL.includes('shoppingCart.html')) {
        document.getElementById("total").innerText = totalPris;
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Denne koden definerer en funksjon "addToCart" som tar en parameter "index". Funksjonen bruker parameteren for å hente produktet fra en liste "products" ved hjelp av indeksen.Deretter sjekker funksjonen om "antall" -attributtet til produktet er større eller lik 1. Hvis dette er tilfelle, viser funksjonen en advarsel om at skoen allerede er i handlekurven og avslutter funksjonen. Hvis ikke, øker funksjonen antallet av produktet med 1 og lagrer oppdaterte produkter i "localStorage" ved hjelp av "setItem" -funksjonen.Til slutt viser funksjonen en melding om at skoen er lagt til i handlekurven.
function addToCart(index) {
    const product = products[index];
    if (product.antall >= 1) {
        alert("The shoe is already in the cart")
        return
    }
    product.antall++;
    localStorage.setItem("products", JSON.stringify(products));
    alert("Shoe has been added to cart")
}

// 1. Bruk denne, endre litt for å lage en funksjon som setter antall til 0.
// 2. Kjør displayCart() på nytt eller refresh siden
/////////////////////////////////////////////////////////////////////////////

//Denne koden definerer en funksjon "displayCart" som itererer gjennom elementene i en liste "products" og sjekker om "antall" -attributtet er større enn 0. Hvis dette er tilfelle, viser funksjonen produktinformasjon og kvantitet i konsollen, samt genererer HTML-kode for å vise produktinformasjon i en handlekurv.HTML-koden som genereres inkluderer en bildevisning av produktet, navn og fargeinformasjon, antall produkt i handlekurven, produktpris og en "fjern" -knapp for å fjerne produktet fra handlekurven.Til slutt, legger funksjonen inn HTML-koden i handlekurv-elementet på siden ved hjelp av "appendChild"
function displayCart() {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.antall > 0) {
            console.log(`Product: ${product.navn}, Antall: ${product.antall}`);
            const HTMLString3 =
                '<div  class="shopping-cart-content-flex">' +
                '<div id="shoeId" class="shopping-cart-content-wrap">' +
                '<div class="image-image-info">' +
                '<div class="image-cart-box"><img src="images/' + product.navn + '.png"> </img></div>' +
                '<div class="image-cart-box-info">' +
                '<h1>' + product.navn + '</h1>' +
                '<h2>' + product.farge + '</h2>' +
                '</div>' +
                '</div>' +
                '<i onclick="decreaseQuantity(' + product.id + ')" class="fa-solid fa-minus"></i>' +
                '<div class="quantity-box-pack">' +
                '<h1>' + product.antall + '<h1>' +
                '<h2>quantity</h2>' +
                '</div>' +
                '<i onclick="increaseQuantity(' + product.id + ')" class="fa-regular fa-plus"></i>' +
                '<div class="item-cart-price">' +
                '<h2> $' + product.pris + '</h2>' +
                '</div>' +
                '<button class="fjernsko" onclick="removeShoe(' + product.id + ')" id="' + product.id + '" > <i class="fa-solid fa-trash"></i></button>'
            '</div>' +
                '</div>'
            '</div>'

            let cartItem = document.createElement("div")
            cartItem.innerHTML = HTMLString3;
            document.getElementById("shopping-cart-wrap").appendChild(cartItem);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////



function increaseQuantity(index) {
    const product = products[index]
    product.antall++;
    localStorage.setItem("products", JSON.stringify(products));
    displayCart();
    window.location.reload()
}


function decreaseQuantity(index) {
    const product = products[index]
    product.antall--;
    localStorage.setItem("products", JSON.stringify(products));
    displayCart();
    window.location.reload()
}




//Denne koden definerer en funksjon "getProduct" som henter produktinformasjon basert på produktets ID fra URL-parameteren. URL-parameteren leses ved hjelp av "URLSearchParams" -funksjonen, og produktet med samme ID som parameteren blir funnet ved hjelp av "find" -funksjonen.Deretter genererer funksjonen HTML-kode som inneholder produktets navn, farge, bilde, størrelsesvalg og "kjøp" -knapp. Koden inkluderer også et "addToCart" -funksjonsanrop når "kjøp" -knappen klikkes på, med produktets ID som parameter.Til slutt, legger funksjonen inn den genererte HTML-koden i et nytt div-element og legger til dette elementet på siden ved hjelp av "appendChild" -funksjonen.

function getProduct() {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(function (i) {
        return i.id === parseInt(productId);
    })

    const productPage = document.createElement('div');

    const HTMLString2 =


        '<div class="shoe_product_pack_flex">' +
        '<div class="shoe_product_pack">' +
        '<img src="images/' + product.navn + '.png" alt="">  ' +
        '<div class="shoe_product_info_wrap">' +
        '<div class="shoe_product_info">' +
        '<h1> ' + product.navn + '</h1>' +
        '<p>Lyst på nye sko? skjekk ute den nye ' + product.navn + '' +
        '<br>' +
        'med sin nye farge ' + product.farge + '' +
        '<br>' +
        'og sin elegante tekstil,  som går med alt av klesplagg ' +
        '</p>' +
        '</div>' +
        '<div class="shoe_product_interactive">' +
        '<div class="input_shoe_product">' +
        '<h1>Size :</h1>' +
        '<input type="number" placeholder=" 35-45" min="35" max="45">' +
        '</div>' +
        '<h1> Price ; $' + product.pris + '</h1>' +
        '<div class="shoe_product_buton">' +
        '<button onclick="addToCart(' + product.id + ')">Add to cart</button>' +
        '</div>';
    '</div>'
    '</div>'
    '</div>'
    '</div>'


    console.log(HTMLString2);

    productPage.innerHTML = HTMLString2;
    document.getElementById("display_shoe_products").appendChild(productPage);


}

/////////////////////////////////////////////////////////////////////////////












// function shoppingCart() {

//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('id');

//     const product = products.find(function (i) {
//         return i.id === parseInt(productId);
//     })

//     // const productPage = document.createElement('div');
// }





