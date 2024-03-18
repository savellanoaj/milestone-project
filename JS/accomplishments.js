// Function to toggle fade effect
function toggleFade() {
    var element = document.getElementById('fadeElement');
    if (element.classList.contains('show')) {
        element.classList.remove('show');
    } else {
        element.classList.add('show');
    }
}
