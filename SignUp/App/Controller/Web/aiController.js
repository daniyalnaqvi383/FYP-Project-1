const axios = require('axios');
const FormData = require('form-data');
const TryOnLog = require('../../Models/TryOnLog');

exports.processVirtualTryOn = async (req, res) => {
  try {
    const { userId, productId, product_image_url } = req.body;

    // Validation check for uploaded snapshot file array
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Please upload or capture a user photo first."
      });
    }

    // 1. Pack binary buffers into multi-part standard Form Data payload
    const aiFormData = new FormData();
    aiFormData.append('user_photo', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    aiFormData.append('product_image_url', product_image_url);
    aiFormData.append('product_metadata', JSON.stringify({ styleType: "unisex" }));

    // 2. HTTP Post stream request forwarding into Python FastAPI Server (Port 8000)
    const aiResponse = await axios.post('http://127.0.0.1:8000/api/ai/tryon', aiFormData, {
      headers: { ...aiFormData.getHeaders() }
    });

    // 3. Evaluate responses tracking matrix variables
    if (aiResponse.data.success) {
      const renderResult = aiResponse.data.data.renderOutput2D;

      // Log transaction details mapping parameters inside MongoDB cluster
      const logRecord = new TryOnLog({
        userId,
        productId,
        renderedOutputUrl: renderResult,
        status: 'success'
      });
      await logRecord.save();

      // Dispatch final dynamic link parameters safely back into Show/ components
      return res.status(200).json({
        success: true,
        message: "AI Virtual Fitting Complete!",
        data: aiResponse.data.data
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "VITON-HD sub-networks failed to synthesize output frames."
      });
    }

  } catch (error) {
    console.error("Error executing Express Controller pipeline branch:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server breakdown routing streaming variables." 
    });
  }
};