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

// Sidebar Transactions
const submit = document.querySelector('#btnSubmit')
const transactionsList = document.querySelector('#transaction-list')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const addTransaction = transaction => {
    const template = `<li class="transaction flex">
        <p>${transaction.name}</p>
        <p>${transaction.amount}</p>
    </li>`

    const li = document.createElement('li')
    li.innerHTML = template
    transactionsList.prepend(li)
}

const getBalance = () => {
    const recipeDisplay = document.querySelector('#recipeAmount')
    const expenseDisplay = document.querySelector('#expenseAmount')
    const balanceDisplay = document.querySelector('.saldo-total')

    const transactionAmount = transactions.map(tr => tr.amount)

    const recipe = transactionAmount.filter(onlyPlus => onlyPlus > 0).reduce((prevValue, current) => {return prevValue + current}, 0)
    const expense = transactionAmount.filter(onlyMinus => onlyMinus < 0).reduce((prevValue, current) => {return prevValue + current}, 0)
    const balance = transactionAmount.reduce((prevValue, current) => {return prevValue + current})

    recipeDisplay.textContent = `R$ ${recipe.toFixed(2)}`
    expenseDisplay.textContent = `R$ ${expense.toFixed(2)}`
    balanceDisplay.textContent = `R$ ${balance.toFixed(2)}`
}

const pushTransactions = () =>{
    transactionsList.innerHTML = ''
    transactions.forEach(addTransaction)
    getBalance()
}
pushTransactions()

submit.addEventListener('click', ()=> {
    const nameValue = document.querySelector('#nameTransaction').value
    const transactionValue = document.querySelector('#valueTransaction').value
    const transaction = {id: 1, name: nameValue, amount: Number(transactionValue)}

    transactions.push(transaction)
    pushTransactions()
    updateLocalStorage()
})