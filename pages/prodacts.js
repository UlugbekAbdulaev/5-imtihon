async function getAllProduct() {
    let res = await fetch('https://fakestoreapi.com/products', {
        method: "GET"
    });
    res = await res.json()
    printproduct(res)
}
getAllProduct();

let section = document.querySelector("#section");
let sup = document.querySelector("#sup");
let categoriesDiv = document.querySelector("#categories");
let addtocard = document.querySelector("#addTOcard");

function printproduct(products) {
    section.innerHTML = "";
    products.forEach(item => {
        let span1 = document.createElement("div");
        span1.classList.add("col-span-1", "p-2", "border", "mt-10", "rounded-lg", "border-[gray]");
        let image = document.createElement("img");
        image.classList.add("w-full", "md:h-[280px]", "h-[180px]");
        image.src = item.image;
        image.alt = item.title;
        let title = document.createElement("p");
        title.classList.add("text-white", "pb-10");
        title.textContent = item.title;
        let newDiv = document.createElement("div");
        newDiv.classList.add("flex", "justify-between", "items-center");
        let prise = document.createElement("span");
        prise.classList.add("text-white");
        prise.textContent = item.price + " $";
        let btn = document.createElement("button");
        btn.classList.add("bg-[blue]", "p-3", "text-white", "rounded-lg");
        btn.textContent = "Add To Cart";

        btn.setAttribute("onclick", `addstore(${item.id})`);

        span1.appendChild(image);
        span1.appendChild(title);
        newDiv.appendChild(prise);
        newDiv.appendChild(btn);
        span1.appendChild(newDiv);

        section.appendChild(span1);
    });
}

//maxsulotlarni tanlab olish uchun SAVAT.......................
let savat = [];

async function addstore(params) {
    let res = await fetch(`https://fakestoreapi.com/products/${params}`);
    res = await res.json();
    savat.push({...res, count: 1});

    sup.textContent = savat.length;
    rendStor(savat);
}

// mahsulotlarni categoriyasi bilan ko'rish..............................
async function getcategories() {
    try {
        let categ = await fetch('https://fakestoreapi.com/products/categories', {
            method: "GET"
        });

        categ = await categ.json();
        rendcate(categ);
    } catch (error) {
        console.error(error);
    }
}
getcategories();

function rendcate(categories) {
    // All tugmasini qo'shish
    let btn_all = document.createElement('button');
    btn_all.classList.add("border", "p-4", "rounded-lg", "active:bg-blue-500");
    btn_all.textContent = "All";
    btn_all.addEventListener('click', getAllProduct); // All tugmasi bosilganda barcha maxsulotlarni olish
    categoriesDiv.appendChild(btn_all);

    categories?.forEach((coteg) => {
        let btn_category = document.createElement(`button`);
        btn_category.classList.add("border", "p-4", "rounded-lg", "active:bg-blue-500");
        btn_category.textContent = coteg;

        btn_category.addEventListener("click", () => catogoryId(coteg));

        categoriesDiv.appendChild(btn_category);
    });
}

async function catogoryId(category) {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
            method: "GET"
        });
        let product = await response.json();
        console.log(product);

        printproduct(product);
    } catch (error) {
        alert(error?.message);
    }
}

let addTOcard = () => {
    addtocard.classList.toggle("translate-x-[-600px]");
}

let x = () => {
    addtocard.classList.remove("translate-x-[-600px]");
}

let pricePrint = document.createElement("div");
pricePrint.classList.add("text-white");

// sotib olingan maxsulotlarni listini ko'rish
function rendStor() {
    addtocard.innerHTML = "";
    addtocard.appendChild(pricePrint);

    savat.forEach(item => {
        let span1 = document.createElement("div");
        span1.classList.add("text-white", "flex", "justify-between", "items-senter");

        let info_box = document.createElement("div");
        info_box.classList.add("items-center", "gap-3", "flex");

        let image = document.createElement("img");
        image.classList.add("w-20", "h-20", "rounded-lg");
        image.src = item?.image;
        image.alt = item?.title;

        let text = document.createElement("div");
        let titl = document.createElement("p");
        titl.textContent = item.title;

        let price = document.createElement("p");
        price.textContent = item.price + " $";

        let buttons = document.createElement("div");
        buttons.classList.add("flex", "justify-between", "items-center", "gap-2");

        let remove = document.createElement("button");
        remove.textContent = "remove";
        remove.setAttribute("onclick", `remove_delete(${item.id})`);
        remove.classList.add("px-4", "py-2", "bg-[blue]", "rounded-lg");
        let minus = document.createElement("button");
        minus.classList.add("px-4", "py-2", "bg-[blue]", "rounded-lg");
        minus.textContent = "-";
        minus.setAttribute("onclick", `decrement(${item.id})`);
        let span = document.createElement("span");
        span.textContent = item.count;
        let plus = document.createElement("button");
        plus.classList.add("px-4", "py-2", "bg-[blue]", "rounded-lg");
        plus.textContent = "+";
        plus.setAttribute("onclick", `increment(${item.id})`);

        buttons.appendChild(remove);
        buttons.appendChild(minus);
        buttons.appendChild(span);
        buttons.appendChild(plus);

        text.appendChild(titl);
        text.appendChild(price);

        info_box.appendChild(image);
        info_box.appendChild(text);

        span1.appendChild(info_box);
        span1.appendChild(buttons);

        addtocard.appendChild(span1);
    });
}

function increment(id) {
    let prod_find = savat.find((item) => {
        return item.id == id;
    });

    prod_find.count++;
    rendStor();
    addPrice();
}

function decrement(id) {
    let prod_find = savat.find((item) => {
        return item.id == id;
    });
    if (prod_find.count > 1) {
        prod_find.count--;
        rendStor();
        addPrice();
    }
}

function remove_delete(id) {
    let index = savat.findIndex((item) => {
        return item.id == id;
    });

    savat.splice(index, 1);
    rendStor(savat);
    sup.textContent = savat.length;
    addPrice();
    if (savat.length == 0) {
        addtocard.classList.remove("translate-x-[-600px]");
    }
}

let allSumma = 0;

function addPrice() {
    allSumma = savat.reduce((total, item) => {
        return total + item.count * item.price;
    }, 0);

    pricePrint.textContent = "total: " + Math.round(allSumma) + " $";
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
});
