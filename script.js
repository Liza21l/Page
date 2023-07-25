
const formEl = {
    name: document.querySelector('#formName'),
    description: document.querySelector('#formDescription'),
    quantity: document.querySelector('#formQuantity'),
    price: document.querySelector('#formPrice'),
    btnCreate: document.querySelector('#formBtn')
}
const ChangeEl = {
    name: document.querySelector('#changeName'),
    id: document.querySelector('#changeId'),
    btnChange: document.querySelector('#btnChange')
}

const productCountEl = document.querySelector('#productCount')
const getCount = () => {
    axios.get(`http://localhost:4000/products/count`)
        .then((res) => {
            console.log(res.data)
            productCountEl.innerHTML = `Total products: ${res.data.count}`
        })
}

ChangeEl.btnChange.addEventListener('click', () => {
    const ChangeData = {
        name: ChangeEl.name.value,
        id: ChangeEl.id.value
    }
    axios.put(`http://localhost:4000/products/change-name?id=${ChangeData.id}&name=${ChangeData.name}` )
        .then((res) => {
            console.log(res.data)
            axios.get(`http://localhost:4000/products/get-item?id=${ChangeData.id}`)
                .then((res) => {
                    console.log(res.data)
                    getProducts()
                })
        })
})



const productsEl = document.querySelector('#products')

let products = []


const renderProducts = () => { 
    productsEl.innerHTML = ""
    products.forEach(productItem => { 
        productsEl.innerHTML += `
        <div product-id="${productItem.id}" class="products_item">
            <p class="title">${productItem.name}</p>
            <p>id products: ${productItem.id}</p>
            <p>${productItem.description}</p>
            <p>Quantity ${productItem.quantity}</p>
            <p class="price">${productItem.price} грн</p>
            <button product-id="${productItem.id}" class="btnDelete">delete</button>
        </div>
        `
    })
    const btnsDelete = document.querySelectorAll(".btnDelete")
    btnsDelete.forEach(btnItem => {
        btnItem.addEventListener("click", () => {
            const productId = btnItem.getAttribute("product-id")
            axios.delete(`http://localhost:4000/products/delete?id=${productId}`)
                .then((res) => {
                    console.log(res)
                    getProducts()
                })
        })
    })
}

const getProducts = () => {
    getCount()
    axios.get("http://localhost:4000/products/get-all")
        .then((res) => {
            products = [
                ...res.data
            ]
            renderProducts()
        })
}
getProducts()

const idProduct = "mKhdHNCN"
axios.get(`http://localhost:4000/products/get-item?id=${idProduct}`)
    .then((res) => {
        console.log(res.data)
    })

axios.get(`http://localhost:4000/products/get?page=3&limit=10`)
    .then((res) => {
        console.log(res.data)
    })

formEl.btnCreate.addEventListener('click', () => {
    const formData = {
        name: formEl.name.value,
        description: formEl.description.value,
        quantity: formEl.quantity.value,
        price: formEl.price.value
    }
    axios.post('http://localhost:4000/products/create',{...formData})
        .then(res=> {
            console.log(res.data)
            getProducts()
        })
})


