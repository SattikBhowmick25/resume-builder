let cropper;
const photoInput = document.getElementById('photoInput');
const imagePreview = document.getElementById('imagePreview');
const cropButton = document.getElementById('cropButton');
const resumeImage = document.getElementById('imgTemplate'); // Ensure this ID matches the one in your resume template

// When a file is chosen
photoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            cropButton.style.display = 'block';
            
            // Initialize the cropper
            cropper = new Cropper(imagePreview, {
                aspectRatio: 1, // Square crop
                viewMode: 1,
            });
        };
        reader.readAsDataURL(file);
    }
});

// Handle cropping
cropButton.addEventListener('click', function () {
    const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get cropped image as base64 URL

    // Set the cropped image to the resume template
    resumeImage.src = croppedImage; // This ensures the image is added to the resume

    // Hide the cropper and button after cropping
    imagePreview.style.display = 'none';
    cropButton.style.display = 'none';

    // Destroy the cropper instance
    cropper.destroy();
});
