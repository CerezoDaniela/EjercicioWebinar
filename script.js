//let para variables
//const para constantes
const items=[
	{
		name: 't-shirt',
		price: 18,
		img: 'img/tee.png'
	},
	{
		name: 'cap',
		price: 3,
		img: 'img/caps.png'
	},
	{
		name: 'notebook',
		price: 15,
		img: 'img/notebooks.png'
	}
]

const section = document.querySelector('section');
let cart = []

function inputChange(i, name, price, img){
	const article = document.querySelectorAll('article')[i];
	const button = article.querySelector('button');
	const input = article.querySelector("input");
	console.log("button " + input.value);
	button.onclick = () =>{
		var quantity = parseInt(input.value);
		price = parseInt(price);
		var bExist = cart.some(item => (item.name == name));

		if(bExist)
			cart.forEach(item => item.quantity += (item.name == name) ? quantity : 0);
		else{
			cart.push(
			{
				quantity: quantity,
				name,
				price,
				img
			})
		}
		printCartItems()
	}
}

function printCartItems(){
	const list = document.querySelector('aside ul');
	list.innerHTML = '';
	cart.forEach(item => list.innerHTML += `
		<li>${item.name} / ${item.quantity} / $${item.price}.00</li><img src="${item.img}"/>  
		`)

	updateTotal()
}

function updateTotal(){
	const totalElement= document.querySelector("#total-price");
	const total = cart.reduce((acc, current) => acc + (current.price* current.quantity), 0)
	totalElement.innerText = `$${total}.00`
}

items.forEach((item,i) => {
	section.innerHTML += `<article class='items'>
			<img src='${item.img}'/>
			<p>${item.name}</p>
			<small>$${String(item.price)}.00</small>
			<div>
				<input type='number' placeholder='quantity' onchange='inputChange(${i}, 
				"${item.name}", "${item.price}", "${item.img}")'/>
				<button>Add to cart</button>
			</div>
		</article>`
	
})