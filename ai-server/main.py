from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
import requests
import os
import cv2
import numpy as np
from rembg import remove
from PIL import Image
import io

app = FastAPI()

class TryOnRequest(BaseModel):
    person_url: str
    cloth_url: str  # Ismei ab admin ki upload ki hui model wali image (e.g., Nova1) ka URL aayega

INPUT_DIR = "./data/vhd/test"
PERSON_PATH = os.path.join(INPUT_DIR, "image", "user_person.jpg")
CLOTH_PATH = os.path.join(INPUT_DIR, "cloth", "extracted_cloth.jpg")
CLOTH_MASK_PATH = os.path.join(INPUT_DIR, "cloth-mask", "extracted_cloth.jpg")
OUTPUT_IMAGE_PATH = "./results/gmm_stage1/test/try-on/user_person.jpg"

# Folders auto-create karne ke liye
os.makedirs(os.path.dirname(PERSON_PATH), exist_ok=True)
os.makedirs(os.path.dirname(CLOTH_PATH), exist_ok=True)
os.makedirs(os.path.dirname(CLOTH_MASK_PATH), exist_ok=True)

@app.post("/api/tryon")
async def virtual_tryon(data: TryOnRequest):
    try:
        print("📥 Downloading user profile image...")
        person_res = requests.get(data.person_url, stream=True)
        if person_res.status_code != 200:
            raise HTTPException(status_code=400, detail="User image download failed.")
        with open(PERSON_PATH, "wb") as f:
            f.write(person_res.content)

        print("📥 Downloading model garment image for extraction...")
        cloth_res = requests.get(data.cloth_url)
        if cloth_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Garment image download failed.")

        # ----------------------------------------------------
        # 🧠 AUTOMATED AI CLOTH EXTRACTION ROUTINE (Method 1)
        # ----------------------------------------------------
        print("✂️ Extracting flat shirt using rembg...")
        input_image = Image.open(io.BytesIO(cloth_res.content))
        
        # rembg background aur human body skin auto-detect karke transparent kar dega
        output_image = remove(input_image) 
        
        # Pure White Background create karein VITON-HD ke liye
        white_bg = Image.new("RGBA", output_image.size, (255, 255, 255, 255))
        flat_cloth = Image.alpha_composite(white_bg, output_image).convert("RGB")
        flat_cloth.save(CLOTH_PATH, "JPEG", quality=95)
        print(f"✅ Flat garment isolated and saved to: {CLOTH_PATH}")

        # OpenCV ke zariye Binary Mask auto-generate karein
        print("🎭 Generating binary cloth mask mapping...")
        np_img = np.array(output_image)
        # Alpha channel (transparency) se mask create karein
        alpha_channel = np_img[:, :, 3] 
        # Jahan transparent nahi hai (shirt hai), wahan pure white (255) kar dein
        _, binary_mask = cv2.threshold(alpha_channel, 10, 255, cv2.THRESH_BINARY)
        
        cv2.imwrite(CLOTH_MASK_PATH, binary_mask)
        print(f"✅ Binary mask mapped and saved to: {CLOTH_MASK_PATH}")
        # ----------------------------------------------------

        # 🚀 Run Pre-trained VITON-HD Inference Pipeline
        print("🧬 Running VITON-HD synthesis framework...")
        command = ["python", "test.py", "--name", "gmm_stage1", "--stage", "GMM", "--data_dir", "./data/vhd"]
        # subprocess.run(command, capture_output=True, text=True)

        # Mock testing ke liye (agar inference script ready na ho toh extracted shirt hi return karwa dein)
        if os.path.exists(OUTPUT_IMAGE_PATH):
            return FileResponse(OUTPUT_IMAGE_PATH, media_type="image/jpeg")
        else:
            # Fallback output safe testing ke liye
            return FileResponse(CLOTH_PATH, media_type="image/jpeg")

    except Exception as e:
        print(f"❌ Pipeline Execution Error: {str(e)}")
        return {"success": False, "error": str(e)}