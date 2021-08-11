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
const nameValue = document.querySelector('#nameTransaction').value.trim()
const value = document.querySelector('#valueTransaction').value.trim()

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const addTransaction = () => {
    const transactionsList = document.querySelector('#transaction-list')

    const template = `<li class="transaction flex">
        <p>${nameValue}</p>
        <p>${getTransaction().value}</p>
    </li>`

    const li = document.createElement('li')
    li.innerHTML = template
    transactionsList.prepend(li)
}

const getBalance = () => {
    const recipeDisplay = document.querySelector('.recipe')
    const expenseDisplay = document.querySelector('.expense')

}
const pushTransactions = () =>{
    transactions.forEach(addTransaction)
}
submit.addEventListener('click', ()=> {
    addTransaction()
    const transaction = {id: 1, name: getTransaction().name, amount: getTransaction().value}
    console.log(transaction)
    transactions.push(transaction)
    pushTransactions()
})