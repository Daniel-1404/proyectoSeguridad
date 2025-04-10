fetch('../components/navigation.html')
.then(response => response.text())
.then(data => {
    document.getElementById('nav-container').innerHTML = data;
});