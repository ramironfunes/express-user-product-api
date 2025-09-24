document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    console.log("connected");

    let id_item = document.getElementById('iD');
    let delete_button = document.getElementById('delete_Button');
    let addProductForm = document.getElementById('addProductForm');
    let productList = document.getElementById('productList');

    // Inicializar la lista de productos
    let products = [];

    delete_button.addEventListener('click', () => {
        if (id_item.value.length <= 0) {
            Swal.fire({
                html: "<b>Some fields are empty</b>",
                toast: true,
                showConfirmButton: false,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
                color: "white",
                background: "red"
            });
        } else {
            let select = document.getElementById(id_item.value);

            if (select === null) {
                Swal.fire({
                    html: `<b>Item by ID ${id_item.value} is not in the list</b>`,
                    toast: true,
                    showConfirmButton: false,
                    position: 'top-right',
                    timer: 3000,
                    timerProgressBar: true,
                    color: "white",
                    background: "red"
                });
            } else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `This will delete item with ID ${id_item.value} permanently.`,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        socket.emit('delete', id_item.value);
                    } else {
                        // Handle the cancel event here
                    }
                });
            }
        }
    });

    socket.on('confirm_delete', data => {
        if (data[0]) {
            let select = document.getElementById(String(data[1]))
            select.remove()
        }
    });

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let title_item = document.getElementById('title').value;
        let desc_item = document.getElementById('description').value;
        let code_item = document.getElementById('code').value;
        let price_item = document.getElementById('price').value;
        let stock_item = document.getElementById('stock').value;
        let cat_item = document.getElementById('category').value;
        let img_item = document.getElementById("IMG").value;

        let item_new = {
            "title": title_item,
            "description": desc_item,
            "code": code_item,
            "price": price_item,
            "stock": stock_item,
            "category": cat_item,
            "thumbnail": img_item
        };

        if (title_item.length === 0 || desc_item.length === 0 || code_item.length === 0 ||
            price_item.length === 0 || stock_item.length === 0 || cat_item.length === 0) {
            Swal.fire({
                html: "<b>Please fill all the info</b>",
                toast: true,
                showConfirmButton: false,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
                color: "white",
                background: "red"
            });
        } else {
            socket.emit('add_item', item_new)
        }
    });

    socket.on("confirm_add", data => {
        if (data[0] === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `It seems there's already an item with the code ${data[1].code}`,
            });
        } else {
            // Actualizar la lista de productos
            products.push(data[3]);

            // Limpiar la lista actual
            productList.innerHTML = '';

            // Renderizar la nueva lista
            products.forEach(product => {
                const newElement = document.createElement('ul');
                newElement.id = product.id;
                newElement.innerHTML = `
                    <h2>ID:${product.id} Name: ${product.title}</h2>
                    <img src="${product.thumbnail}" style="width:150px; border:1px solid black; " alt="Product Image">
                    <li>Description: ${product.description}</li>
                    <li>Code: ${product.code}</li>
                    <li>Price: ${product.price} Bells</li>
                    <li>category:${product.category}</li>
                `;
                productList.appendChild(newElement);
            });
        }
    });
});


////////////////////////////////////////////
/*
id_item.addEventListener('keyup',evt=>{
    if(evt.key === 'Enter'){
        let select=document.getElementById(String(id_item.value))
        //select.remove();
        console.log("calling upon",select)
        socket.emit('mesagge',select)
    }
})
*/