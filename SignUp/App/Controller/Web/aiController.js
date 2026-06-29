const axios = require('axios');
const FormData = require('form-data');

exports.processVirtualTryOn = async (req, res) => {
    try {
        // 1. Check karein ke donon images frontend se received huin ya nahi
        if (!req.files || !req.files.personImage || !req.files.clothImage) {
            return res.status(400).json({ success: false, message: "Missing required images." });
        }

        const personFile = req.files.personImage;
        const clothFile = req.files.clothImage;

        // 2. Python FastAPI server ke liye FormData prepare karein
        const formData = new FormData();
        formData.append('person_image', personFile.data, personFile.name);
        formData.append('cloth_image', clothFile.data, clothFile.name);

        console.log("Sending images to AI Server (Port 5000)...");

        // 3. Local Python AI Server (FastAPI) ko hit karein
        const aiResponse = await axios.post('http://localhost:5000/api/tryon', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            responseType: 'arraybuffer' // Kyunki FastAPI image file return karega
        });

        // 4. Image binary data ko Base64 string mein convert karein
        const base64Image = Buffer.from(aiResponse.data, 'binary').toString('base64');
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;

        return res.status(200).json({
            success: true,
            tryOnImage: imageSrc
        });

    } catch (error) {
        console.error("AI Server Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "AI processing failed or server is offline.",
            error: error.message
        });
    }
};