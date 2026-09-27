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

// Populate the images array with the full-resolution gallery image paths
document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.gallery-container');
    if (!container) return;
    images = [];

    function addImage(src) {
        src = (src || '').trim();
        if (src && images.indexOf(src) === -1) {
            images.push(src);
        }
    }

    // Preferred: an explicit, comma-separated list declared on the container.
    // This lets us include images that are not rendered in the grid (e.g. _13.jpg).
    var declared = container.getAttribute('data-modal-images');
    if (declared) {
        declared.split(',').forEach(addImage);
        return;
    }

    // Fallback: derive full-resolution paths from the displayed thumbnails.
    container.querySelectorAll('img').forEach(function(img) {
        addImage(img.getAttribute('src').replace('/thumbs/', '/'));
    });
});