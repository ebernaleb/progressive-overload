const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs from Unsplash (free to use, high-quality images)
const images = {
  'beginner-workout.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  'amateur-workout.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  'pro-workout.jpg': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
  'testimonial-1.jpg': 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=80',
  'testimonial-2.jpg': 'https://images.unsplash.com/photo-1570691079236-4bca6c45d440?w=400&q=80',
  'testimonial-3.jpg': 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80'
};

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download each image
Object.entries(images).forEach(([filename, url]) => {
  const filePath = path.join(imagesDir, filename);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`Downloaded ${filename}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 