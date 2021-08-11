//Sidebar display
const closebtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainGrid = document.getElementById('main');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
    mainGrid.classList.toggle('grid-test');
})

closebtn.addEventListener('click', () =>{
    sidebar.classList.remove('show-sidebar');
    mainGrid.classList.toggle('grid-test');
})

// inserir transações na sidebar
const submit = document.querySelector('#btnSubmit')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const getTransaction = () => {
    const nameValue = document.querySelector('#nameTransaction').value
    const value = document.querySelector('#valueTransaction').value
    const transactionObj = {name: nameValue, value: value}

    return transactionObj
}

const addTransaction = () => {
    const transactionsList = document.querySelector('#transaction-list')
    
    const template = `<li class="transaction flex">
        <p>${getTransaction().name}</p>
        <p>${getTransaction().value}</p>
    </li>`

    const li = document.createElement('li')
    li.innerHTML = template
    transactionsList.prepend(li)
}

submit.addEventListener('click', ()=> {
    addTransaction()
})