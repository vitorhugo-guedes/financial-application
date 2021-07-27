//Sidebar display
const closebtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden');
})

closebtn.addEventListener('click', () =>{
    const sidebarClass = sidebar.classList;
    sidebarClass.remove('sidebar-hidden');
})