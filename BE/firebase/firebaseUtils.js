const bucket = require('./firebaseConfig');
const { v4: uuidv4 } = require('uuid');

async function uploadImageToFirebase(imageBuffer, mimeType) {
    const fileName = `images/${uuidv4()}.jpg`;
    const file = bucket.file(fileName);

    await file.save(imageBuffer, {
        metadata: {
            contentType: mimeType,
        },
        public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
}

module.exports = { uploadImageToFirebase };
