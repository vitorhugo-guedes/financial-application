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
const nameTransaction = document.querySelector('#NameTransaction');
const valueTransaction = document.querySelector('#ValueTransaction');

const pushTransaction = (name, value) => {
    const template = `<li class="transaction flex">
        <p>hellou</p>
        <p>alou</p>
    </li>`
    const transactionsList = document.querySelector('#transaction-place')
    transactionsList.innerHTML = template
}

pushTransaction()