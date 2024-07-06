function showhide(ids) {
    ids.forEach(id => {
        var e = document.getElementById(id);
        if (e) {
            e.style.display = (e.style.display === 'none') ? 'block' : 'none';
        }
    });
}