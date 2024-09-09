// Select elements
const imageUpload = document.getElementById('image-upload');
const image = document.getElementById('image');
const opacitySlider = document.getElementById('opacity-slider');
const saveButton = document.getElementById('save-btn');
const fileNameDisplay = document.getElementById('FileNameDisplay');
const uploadLink = document.getElementById('upload-link');

// Trigger file input on link click
uploadLink.addEventListener('click', (event) => {
    event.preventDefault();
    imageUpload.click();
});

// Handle Image Upload and Update File Name Display
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
            image.style.display = 'block';
        };
        reader.readAsDataURL(file);
        
        // Display the uploaded file name
        fileNameDisplay.textContent = `File: ${file.name}`;
    }
});

// Handle Opacity Change
opacitySlider.addEventListener('input', (event) => {
    const opacityValue = event.target.value / 100;
    image.style.opacity = opacityValue;
});

// Handle Save Image
saveButton.addEventListener('click', () => {
    if (image.src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to match the image
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Draw the image with current opacity onto the canvas
        ctx.globalAlpha = image.style.opacity;
        ctx.drawImage(image, 0, 0);

        // Create a download link for the canvas content as a PNG file
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'image_with_opacity.png';
        link.click();
    }
});
