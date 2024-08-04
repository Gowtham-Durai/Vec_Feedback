import Swal from 'sweetalert2'; 
 
// Function to show the alert 
function showAlert(message) { 
    Swal.fire({ 
        title: message, 
        icon: 'warning', 
        timer: 1000, 
        showConfirmButton: false 
    }); 
} 
 
// Function to block context menu 
function blockContextMenu(e) { 
    e.preventDefault(); 
    showAlert('Inspect is Blocked'); 
} 
 
// Function to handle key combinations 
function handleKeyCombination(e) { 
    if (e.ctrlKey && [ 73, 74, 85].includes(e.keyCode)) { 
        e.preventDefault(); 
        showAlert('Inspect is Blocked'); 
    } 
} 
 
// Event listeners 
document.addEventListener('contextmenu', blockContextMenu); 
document.addEventListener('keydown', handleKeyCombination); 