var images = [
    "images/alemancup25/_1.jpg",
    "images/alemancup25/_2.jpg",
    "images/alemancup25/_3.jpg",
    "images/alemancup25/_4.jpg",
    "images/alemancup25/_5.jpg",
    "images/alemancup25/_6.jpg",
    "images/alemancup25/_7.jpg",
    "images/alemancup25/_8.jpg",
    "images/alemancup25/_9.jpg",
    "images/alemancup25/_10.jpg",
    "images/alemancup25/_11.jpg",
    "images/alemancup25/_12.jpg",
    "images/alemancup25/_13.jpg",
    "images/alemancup25/_14.jpg",
    "images/alemancup25/_15.jpg",
    "images/alemancup25/_16.jpg",
    "images/alemancup25/_17.jpg",
    "images/alemancup25/_18.jpg",
    "images/alemancup25/_19.jpg",
    "images/alemancup25/_20.jpg",
    "images/alemancup25/_21.jpg",
    "images/alemancup25/_22.jpg",
    "images/alemancup25/_23.jpg",
    "images/alemancup25/1.jpg",
    "images/alemancup25/2.jpg",
    "images/alemancup25/3.jpg",
    "images/alemancup25/4.jpg",
    "images/alemancup25/5.jpg",
    "images/alemancup25/6.jpg",
    "images/alemancup25/7.jpg",
    "images/alemancup25/8.jpg",
    "images/alemancup25/9.jpg",
    "images/alemancup25/10.jpg",
    "images/alemancup25/11.jpg",
    "images/alemancup25/12.jpg",
    "images/alemancup25/13.jpg",
    "images/alemancup25/SE_DE_AB.jpg",
    "images/alemancup25/SE_DE_C.jpg",
    "images/alemancup25/SE_DE_D.jpg",
    "images/alemancup25/SE_MX_A.jpg",
    "images/alemancup25/SE_MX_B.jpg",
    "images/alemancup25/SE_MX_C.jpg",
    "images/alemancup25/SE_MX_D.jpg",
];
var currentIndex = 0;

// Function to open the modal with a specific image
function showImage(imageSrc) {
    var modal = document.getElementById('imageModal');
    var modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    currentIndex = images.indexOf(imageSrc); // Set current index based on clicked image
    modal.classList.add('show');
}

// Function to hide the modal
function hideModal() {
    var modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

// Function to show the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(images[currentIndex]);
}

// Function to show the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(images[currentIndex]);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('imageModal');
    if (event.target == modal) {
        hideModal();
    }
};

// Populate the images array with all gallery image paths
document.addEventListener('DOMContentLoaded', function() {
    var galleryImages = document.querySelectorAll('.grid img');
    galleryImages.forEach(function(img) {
        images.push(img.src);
    });
});