
export const randomID = () => {
    return Math.floor(Math.random() * (1000 - 0 + 1)) + 0
}
export const checkIsEmpty = (arg) => {
    if(arg == '' || arg == null){
        return true
    }
}

// Delete all data from localStorage and reload page
const resetData = () =>{
    localStorage.removeItem('transactions');
    location.reload();
}

const btnRemoveData = document.querySelector('#btnRemoveData');
btnRemoveData.addEventListener('click', () => {
    resetData();
})
// Remove data icon position in sidebar
export const btnRemoveDataPosition = () =>{
    const localTransactions = JSON.parse(localStorage.getItem('transactions'))
    const storageTransaction = localTransactions == null ? [] : localTransactions

    if(storageTransaction.length < 9 || localTransactions == null){
        btnRemoveData.classList.add('remove-data-initial');
        btnRemoveData.classList.remove('remove-data');
    }else{
        btnRemoveData.classList.add('remove-data');
        btnRemoveData.classList.remove('remove-data-initial');
    }
}
btnRemoveDataPosition();

// check inputs data is correct
export const invalidInput = (inputTitle, inputAmount) => {
    const inputNameAlert = document.querySelector('#inputNameAlert')
    const inputValueAlert = document.querySelector('#inputValueAlert')

    if(checkIsEmpty(inputTitle.value)){
        inputNameAlert.classList.add('show-inputAlert')
        inputTitle.focus()
    }else if(checkIsEmpty(inputAmount.value) || isNaN(inputAmount.value)){
        inputValueAlert.classList.add('show-inputAlert')
        inputAmount.focus()
    }
}
// Remove alerts from inputs
export const removeAlert = () => {
    inputNameAlert.classList.remove('show-inputAlert')
    inputValueAlert.classList.remove('show-inputAlert')
}

// Display notification
const notification = document.querySelector('#notification');
const notificationDeleted = document.querySelector('#transactionDeleted')

export const notifyTransactionSuccess = () => {
    notification.classList.add('show-notification');
    setTimeout(()=>{
        notification.classList.remove('show-notification');
    }, 1200); // 1200
}
export const notifyTransactionDeleted = ()=>{
    const timer = document.querySelector('.timer');
    
    notificationDeleted.classList.add('show-notification');
    timer.style.animation = 'widthOver 1s linear'
    
    setTimeout(()=>{
        timer.style.animation = '';
        notificationDeleted.classList.remove('show-notification');
    }, 1200) // 
}


// Create unseen transactions in localStorage and update in interface
export const unSeenNotificationUpdate = counter => {
    const sidebarToggleElement = document.querySelector("#sidebarToggle");

    localStorage.setItem('unSeen', JSON.stringify(counter));
    sidebarToggleElement.setAttribute('data-view', `${counter}`);

    if(counter == 0){
        sidebarToggleElement.classList.add('sidebar-toggle-before');
    }else{
        sidebarToggleElement.classList.remove('sidebar-toggle-before');
    }
}
