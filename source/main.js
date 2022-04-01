import { 
    randomID,
    checkIsEmpty,
    btnRemoveDataPosition,
    invalidInput,
    removeAlert,
    notifyTransactionSuccess,
    notifyTransactionDeleted,
    unSeenNotificationUpdate
} from "./modules.js";

const transactionsList = document.querySelector('#transaction-list');
// Get localStorage data
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Update transactions on localStorage
const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
// create a template for transactions
const createLi = (transaction) => {
    const isPositive = transaction.amount > 0 ? 'positive' : 'negative'
    const template = `
        <p class="transaction-title">${transaction.name}</p>
        <p class="${isPositive}">R$  ${transaction.amount.toFixed(2)}</p>
        <button role="button" 
            aria-label="Remove transaction" 
            class="btn btn-hover remove-transaction"
        >
            <i class="fa fa-times"></i>
        </button>
        `
    const li = document.createElement('li');
    li.classList.add('transaction');
    li.classList.add('flex');
    li.innerHTML = template

    const button = li.children[2]
    button.addEventListener('click', ()=>{
        removeTransaction(transaction.id);
        notifyTransactionDeleted();
    })

    return li
}
// Remove individual transactions and update
const removeTransaction = transactionID => {
    transactions = transactions.filter(tr => tr.id !== transactionID);
    pushTransactions();
    updateLocalStorage();
    btnRemoveDataPosition();
}
// Get all recipes and expenses and display
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
// Create a li for each transaction and push into Ul
const pushTransactions = () =>{
    transactionsList.innerHTML = ''
    transactions.map((transaction)=>{
        transactionsList.prepend(createLi(transaction));
    })
    getBalance()
}
pushTransactions()

// Update unseen notification in interface
let unSeenNotificationCounter = localStorage.getItem('unSeen') !== null ? JSON.parse(localStorage.getItem('unSeen')) : 0
unSeenNotificationUpdate(unSeenNotificationCounter);

// Submit data on click
const submit = document.querySelector('#btnSubmit');
submit.addEventListener('click', () => {
    const nameValue = document.querySelector('#nameTransaction');
    const transactionValue = document.querySelector('#valueTransaction');
    const valueWithoutComma = transactionValue.value.replace(',', '.');
    
    const transaction = {id: randomID(), name: nameValue.value, amount: Number(valueWithoutComma)}

    // Testing
    if(checkIsEmpty(nameValue.value) || checkIsEmpty(valueWithoutComma) || isNaN(valueWithoutComma))
    {
        invalidInput(nameValue, transactionValue);
        return
    }

    // Transactions related
    transactions.push(transaction);
    pushTransactions();
    updateLocalStorage();
    
    // Interface related
    removeAlert();
    btnRemoveDataPosition();
    notifyTransactionSuccess();
    
    nameValue.value = ''
    transactionValue.value = ''

    // unseen notification update
    unSeenNotificationCounter++
    console.log(unSeenNotificationCounter)
    unSeenNotificationUpdate(unSeenNotificationCounter);
})







