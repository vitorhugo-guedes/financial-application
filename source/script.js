import { unSeenNotificationUpdate } from "./modules.js";

// Sidebar Display
const mainGrid = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const closebtn = document.getElementById('closeBtn');
const sidebarToggle = document.getElementById('sidebarToggle');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
    mainGrid.classList.toggle('grid-open');

    // Reset unseen notifications
    unSeenNotificationUpdate(0);
})

closebtn.addEventListener('click', () =>{
    sidebar.classList.remove('show-sidebar');
    mainGrid.classList.toggle('grid-open');
})





