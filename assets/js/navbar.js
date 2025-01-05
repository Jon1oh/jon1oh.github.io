document.addEventListener('DOMContentLoaded', function () {
    var sidebarTrigger = document.getElementById('sidebar-trigger');
    var sidebar = document.getElementById('sidebar');
    var mask = document.getElementById('mask');

    sidebarTrigger.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        mask.classList.toggle('active');
    });

    mask.addEventListener('click', function () {
        sidebar.classList.remove('active');
        mask.classList.remove('active');
    });
});
