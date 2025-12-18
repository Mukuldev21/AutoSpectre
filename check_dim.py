from PIL import Image
try:
    img = Image.open('logo/autospectre_logo_rect.png')
    print(f"Current rect image size: {img.size}")
except Exception as e:
    print(e)
