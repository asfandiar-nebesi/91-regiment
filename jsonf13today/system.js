'use strict'

const catalog = document.getElementById("catalog")
const searchInput = document.querySelector(".search input")
const cartBtn = document.querySelector(".cart")

let productsData = {}
let cart = []

const cartCount = document.createElement('span')
cartCount.className = "cart-count"
cartCount.innerText = "0"
cartBtn.append(cartCount)

const modal = document.createElement('div')
modal.className = "cart-modal"

modal.innerHTML = `
    <div class="cart-content">
        <h2>Корзина</h2>
        <div id="cart-items"></div>
        <button class="close-cart">Закрыть</button>
    </div>
`

document.body.append(modal)

const cartItemsDiv = modal.querySelector("#cart-items")
const closeBtn = modal.querySelector(".close-cart")

cartBtn.onclick = () => {
    modal.classList.add("active")
    renderCart()
}

closeBtn.onclick = () => modal.classList.remove("active")

fetch("./products.json")
    .then(res => res.json())
    .then(data => {
        productsData = data
        renderProducts(data)
    })


searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase()

    const filtered = Object.fromEntries(
        Object.entries(productsData).filter(([name, data]) =>
            name.toLowerCase().includes(value)
        )
    )

    catalog.innerHTML = ""
    renderProducts(filtered)
})


function renderProducts(data) {
    const fragment = document.createDocumentFragment()

    Object.entries(data).forEach(([name, info]) => {
        fragment.append(getProductCard(name, info))
    })

    catalog.append(fragment)
}

function getProductCard(name, data) {
    const card = document.createElement('div')
    card.className = "phone-card"

    const title = document.createElement('h3')
    title.innerText = name

    const content = document.createElement('div')
    content.className = "card-content"

    const slider = getImagesSlider(data.images)

    const desc = document.createElement('div')
    desc.className = "description"

    for (let key in data) {
        if (key !== 'images') {
            const p = document.createElement('p')
            p.innerHTML = `<b>${key}:</b> ${data[key]}`
            desc.append(p)
        }
    }

    const btn = document.createElement('button')
    btn.innerText = "Купить"
    btn.className = "buy-btn"

    btn.onclick = () => addToCart(name)

    desc.append(btn)

    content.append(slider, desc)
    card.append(title, content)

    return card
}

function addToCart(name) {
    cart.push(name)
    cartCount.innerText = cart.length
}

function renderCart() {
    cartItemsDiv.innerHTML = ""

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Корзина пуста</p>"
        return
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div')
        div.className = "cart-item"

        div.innerHTML = `
            <span>${item}</span>
            <button data-index="${index}">х</button>
        `

        div.querySelector("button").onclick = (e) => {
            cart.splice(e.target.dataset.index, 1)
            cartCount.innerText = cart.length
            renderCart()
        }

        cartItemsDiv.append(div)
    })
}

function getImagesSlider(imagesList) {
    const slider = document.createElement('div')
    slider.className = 'slider-wrapper'

    imagesList.forEach((img, index) => {
        const image = new Image()
        image.src = './images/' + img
        image.className = index === 0 ? 'slide-image visible' : 'slide-image'
        slider.append(image)
    })

    if (imagesList.length > 1) {
        const forward = new Image()
        forward.src = './icons/arrow_forward.jpg'
        forward.className = "arrow forward"
        forward.onclick = () => showForwardImage(slider)

        const back = new Image()
        back.src = './icons/arrow_back.jpg'
        back.className = "arrow back"
        back.onclick = () => showBackImage(slider)

        slider.append(forward, back)
    }

    return slider
}

function showBackImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let i = [...images].findIndex(img => img.classList.contains('visible'))

    images[i].classList.remove('visible')
    images[i === 0 ? images.length - 1 : i - 1].classList.add('visible')
}

function showForwardImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let i = [...images].findIndex(img => img.classList.contains('visible'))

    images[i].classList.remove('visible')
    images[i === images.length - 1 ? 0 : i + 1].classList.add('visible')
}