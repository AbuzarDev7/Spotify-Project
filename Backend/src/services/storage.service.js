const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadToImageKit = async (fileBuffer, fileName) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer, 
            fileName: fileName,
        });
        return response;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw error;
    }
};

module.exports = {
    imagekit,
    uploadToImageKit
};
