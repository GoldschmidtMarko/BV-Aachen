var images = [];
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

// Populate the images array with the current gallery image paths
document.addEventListener('DOMContentLoaded', function() {
    images = [];
    var galleryImages = document.querySelectorAll('.gallery-container img');
    galleryImages.forEach(function(img) {
        var imageSrc = img.getAttribute('src');
        if (images.indexOf(imageSrc) === -1) {
            images.push(imageSrc);
        }
    });
});