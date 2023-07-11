const formEl = {
    name: document.querySelector('#formName'),
    description: document.querySelector('#formDescription'),
    quantity: document.querySelector('#formQuantity'),
    price: document.querySelector('#formPrice'),
    btnCreate: document.querySelector('#formBtn')
}
formEl.btnCreate.addEventListener('click', () => {
    const formData = {
        name: formEl.name.value,
        description: formEl.description.value,
        quantity: formEl.quantity.value,
        price: formEl.price.value
    }
    axios.post('http://localhost:4000/products/create',{...formData})
        .then(res=> {
            console.log(res)
        })
})