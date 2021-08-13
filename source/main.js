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
const btnRemoveData = document.querySelector('#btnRemoveData')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const resetData = () =>{
    localStorage.removeItem('transactions')
    location.reload()
}

const invalidNum = () => {
    alert('Valor digitado incorreto. Por favor, digite apenas números ou use somente uma vírgula')
}

const addTransaction = transaction => {
    const template = `<li class="transaction flex">
        <p>${transaction.name}</p>
        <p>${transaction.amount.toFixed(2)}</p>
    </li>`

    const li = document.createElement('li')
    li.innerHTML = template

    if(isNaN(transaction.amount)){
        invalidNum()
    }else{
        transactionsList.prepend(li)
    }
}

const getBalance = () => {
    const recipeDisplay = document.querySelector('#recipeAmount')
    const expenseDisplay = document.querySelector('#expenseAmount')
    const balanceDisplay = document.querySelector('.saldo-total')

    const transactionAmount = transactions.map(tr => tr.amount)

    const recipe = transactionAmount.filter(onlyPlus => onlyPlus > 0).reduce((prevValue, current) => {return prevValue + current}, 0)
    const expense = transactionAmount.filter(onlyMinus => onlyMinus < 0).reduce((prevValue, current) => {return prevValue + current}, 0)
    const balance = transactionAmount.reduce((prevValue, current) => {return prevValue + current}, 0)

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
    const valueWithoutComma = transactionValue.replace(',', '.')
    const transaction = {id: 1, name: nameValue, amount: Number(valueWithoutComma)}

    if(isNaN(valueWithoutComma)){
        invalidNum()
    }else{
        transactions.push(transaction)
    }
    pushTransactions()
    updateLocalStorage()
})

btnRemoveData.addEventListener('click', () => {
    resetData()
})