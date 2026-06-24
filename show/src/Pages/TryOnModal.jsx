import React, { useState } from 'react';
import apiClient from '../api/apiClient'; // 👈 Step 1 wale file ka sahi path check kar lein
import TryOnCanvas from './TryOnCanvas'; 

const TryOnModal = ({ isOpen, onClose, product }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTryOnSubmit = async () => {
    if (!selectedFile) return alert("Please upload or capture a profile photo first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("user_photo", selectedFile);
    // ProductDetail logic ke mutabiq image paths main property array context mein hain
    formData.append("product_image_url", product.images?.[0] || ""); 
    formData.append("productId", product._id);           
    formData.append("userId", "65f1a2b3c4d5e6f7a8b9c0d1"); 

    try {
      // ⚡ Hit Node.js Backend Gateway (Port 8030)
      const response = await apiClient.post("/ai/process-tryon", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        // AI returns verified 2D textures straight into state
        setAiResult(response.data.data);
      }
    } catch (error) {
      console.error("Critical breakdown hitting Express core route pipeline:", error);
      alert("AI Pipeline Connection Refused. Please verify if Node backend and FastAPI are running on core ports.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-lg font-bold">✕</button>

        {/* LEFT COMPARTMENT */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">AI Virtual Fitting Room</h3>
          <p className="text-xs text-gray-500">Selected Product: <span className="font-semibold text-gray-700">{product.name}</span></p>

          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-gray-50/50 min-h-[200px]">
            {imagePreview ? (
              <img src={imagePreview} alt="User Profile" className="h-40 object-contain rounded-xl shadow-sm" />
            ) : (
              <div className="text-center space-y-2">
                <span className="text-2xl">📸</span>
                <p className="text-xs text-gray-400">Upload your clear front-facing portrait photo</p>
              </div>
            )}
            <input type="file" accept="image/*" id="userPhotoInput" onChange={handleFileChange} className="hidden" />
            <label htmlFor="userPhotoInput" className="mt-4 text-xs font-semibold bg-white text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              {selectedFile ? "Change Image" : "Select Image"}
            </label>
          </div>

          <button 
            onClick={handleTryOnSubmit} 
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-lg shadow-blue-500/10 active:scale-[0.98] ${loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {loading ? "🧬 Synchronizing VITON-HD Core Deep Layers..." : "⚡ Run AI Virtual Try-On"}
          </button>
        </div>

        {/* RIGHT COMPARTMENT: 3D INTERACTIVE CANVAS VIEWPORT */}
        <div className="flex-1 border border-gray-100 rounded-2xl bg-gray-50/50 p-4 flex flex-col items-center justify-center min-h-[400px]">
          {aiResult ? (
            <div className="w-full h-full text-center space-y-4 flex flex-col">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  VITON-HD AI Complete
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Three.js 3D Viewer Active
                </span>
              </div>
              
              <div className="w-full flex-1 h-80 rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
                <TryOnCanvas textureUrl={aiResult.renderOutput2D} />
              </div>
            </div>
          ) : (
            <p className="text-xs font-medium text-gray-400 text-center max-w-[240px] leading-relaxed">
              Output configuration engine will activate interactive 3D simulation once AI returns verified textures.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default TryOnModal;