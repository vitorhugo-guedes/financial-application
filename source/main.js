const transactionsList = document.querySelector('#transaction-list');
const notification = document.querySelector('#notification');

// Verify localStorage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const notifyTransaction = () => {
    notification.classList.add('show-notification');
    setTimeout(()=>{
        notification.classList.remove('show-notification');
    }, 1200);
}
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
const removeTransaction = transactionID => {
    transactions = transactions.filter(tr => tr.id !== transactionID);
    pushTransactions();
    updateLocalStorage();
    btnRemoveDataPosition(transactions);
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
    }
}
const removeAlert = () => {
    inputNameAlert.classList.remove('show-inputAlert')
    inputValueAlert.classList.remove('show-inputAlert')
}
const addTransaction = transaction => {
    const isPositive = transaction.amount > 0 ? 'positive' : 'negative'
    const template = `
        <p class="transaction-title">${transaction.name}</p>
        <p class="${isPositive}">R$  ${transaction.amount.toFixed(2)}</p>
        <button role="button" aria-label="Remove transaction" 
                onclick="removeTransaction(${transaction.id})" 
                class="btn btn-hover remove-transaction"
        >
            <i class="fa fa-times"></i>
        </button>
        `
    const li = document.createElement('li');
    li.classList.add('transaction');
    li.classList.add('flex');
    li.innerHTML = template

    if(checkIsEmpty(transaction.name) || checkIsEmpty(transaction.amount) || isNaN(transaction.amount)){
        return ''
    }else{
        transactionsList.prepend(li)
    }
}
const getBalance = () => {
    const recipeDisplay = document.querySelector('#recipeAmount');
    const expenseDisplay = document.querySelector('#expenseAmount');
    const balanceDisplay = document.querySelector('#total-balance');

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

// Sidebar Transactions
const submit = document.querySelector('#btnSubmit');
const nameValue = document.querySelector('#nameTransaction');
const transactionValue = document.querySelector('#valueTransaction');

submit.addEventListener('click', () => {
    const valueWithoutComma = transactionValue.value.replace(',', '.');
    const transaction = {id: randomID(), name: nameValue.value, amount: Number(valueWithoutComma)}

    if(checkIsEmpty(nameValue.value) || checkIsEmpty(valueWithoutComma) || isNaN(valueWithoutComma)){
        invalidInput(nameValue.value, valueWithoutComma)
    }else{
        transactions.push(transaction);
        pushTransactions();
        updateLocalStorage();
        
        removeAlert();
        btnRemoveDataPosition(transactions);
        notifyTransaction();

        nameValue.value = ''
        transactionValue.value = ''
    }

})

const resetData = () =>{
    localStorage.removeItem('transactions');
    location.reload();
}

// Remove all transactions icon
const btnRemoveData = document.querySelector('#btnRemoveData');
btnRemoveData.addEventListener('click', () => {
    resetData();
})
const btnRemoveDataPosition = localTransactions =>{
    if(localTransactions.length < 9){
        btnRemoveData.classList.add('remove-data-initial');
        btnRemoveData.classList.remove('remove-data');
    }else{
        btnRemoveData.classList.add('remove-data');
        btnRemoveData.classList.remove('remove-data-initial');
    }
}
btnRemoveDataPosition(transactions);