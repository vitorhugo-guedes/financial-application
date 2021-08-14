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

const randomID = () => {
    return Math.floor(Math.random() * (1000 - 0 + 1)) + 0
}

const checkIsEmpty = (arg) => {
    if(arg == '' || arg == null){
        return true
    }
}

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const resetData = () =>{
    localStorage.removeItem('transactions')
    location.reload()
}

const removeTransaction = transactionID => {
    transactions = transactions.filter(tr => tr.id !== transactionID)
    pushTransactions()
    updateLocalStorage()
}

const invalidInput = (name, value) => {
    const inputName = document.querySelector('#nameTransaction')
    const inputValue = document.querySelector('#valueTransaction')

    const inputNameAlert = document.querySelector('#inputNameAlert')
    const inputValueAlert = document.querySelector('#inputValueAlert')

    if(checkIsEmpty(name)){
        inputNameAlert.classList.add('show-inputAlert')
        inputName.focus()
    }else if(checkIsEmpty(value) || isNaN(value)){
        inputValueAlert.classList.add('show-inputAlert')
        inputValue.focus()
    }else{
        inputNameAlert.classList.remove('show-inputAlert')
        inputValueAlert.classList.remove('show-inputAlert')
    }
}

const addTransaction = transaction => {
    const template = `<li class="transaction flex">
        <p>${transaction.name}</p>
        <p>${transaction.amount.toFixed(2)}</p>
        <button onclick="removeTransaction(${transaction.id})" class="btn btn-hover remove-transaction">
            <i class="fa fa-times"></i>
        </button>
    </li>`

    const li = document.createElement('li')
    li.innerHTML = template

    if(checkIsEmpty(transaction.name) || checkIsEmpty(transaction.amount) || isNaN(transaction.amount)){
        return ''
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

submit.addEventListener('click', () => {
    const nameValue = document.querySelector('#nameTransaction').value
    const transactionValue = document.querySelector('#valueTransaction').value
    const valueWithoutComma = transactionValue.replace(',', '.')
    const transaction = {id: randomID(), name: nameValue, amount: Number(valueWithoutComma)}

    if(checkIsEmpty(nameValue) || checkIsEmpty(transactionValue) || isNaN(transactionValue)){
        invalidInput(nameValue, transactionValue)
    }else{
        transactions.push(transaction)
        pushTransactions()
        updateLocalStorage()
    }
})

btnRemoveData.addEventListener('click', () => {
    resetData()
})