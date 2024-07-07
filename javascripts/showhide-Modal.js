var images = [
    "images/alemancup24/IMG_6297.JPG",
    "images/alemancup24/IMG_6327.JPG",
    "images/alemancup24/IMG_6385.JPG",
    "images/alemancup24/IMG_6403.JPG",
    "images/alemancup24/IMG_6570.JPG",
    "images/alemancup24/IMG_6658.JPG",
    "images/alemancup24/IMG_6704.JPG",
    "images/alemancup24/IMG_6713.JPG",
    "images/alemancup24/IMG_6728.JPG",
    "images/alemancup24/IMG_6730.JPG",
    "images/alemancup24/IMG_6740.JPG",
    "images/alemancup24/IMG_6751.JPG",
    "images/alemancup24/IMG_6775.JPG",
    "images/alemancup24/IMG_6783.JPG",
    "images/alemancup24/IMG_6840.JPG",
    "images/alemancup24/IMG_6850.JPG",
    "images/alemancup24/IMG_6855.JPG",
    "images/alemancup24/IMG_6858.JPG",
    "images/alemancup24/IMG_6860.JPG",
    "images/alemancup24/IMG_6886.JPG",
    "images/alemancup24/IMG_6902.JPG",
    "images/alemancup24/IMG_6903.JPG",
    "images/alemancup24/IMG_6934.JPG",
    "images/alemancup24/IMG_6936.JPG",
    "images/alemancup24/IMG_6958.JPG",
    "images/alemancup24/IMG_6963.JPG",
    "images/alemancup24/IMG_6968.JPG",
    "images/alemancup24/IMG_6982.JPG",
    "images/alemancup24/IMG_7028.JPG"
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
window.onclick = function (event) {
    var modal = document.getElementById('imageModal');
    if (event.target == modal) {
        hideModal();
    }
};

// Populate the images array with all gallery image paths
document.addEventListener('DOMContentLoaded', function () {
    var galleryImages = document.querySelectorAll('.grid img');
    galleryImages.forEach(function (img) {
        images.push(img.src);
    });
});