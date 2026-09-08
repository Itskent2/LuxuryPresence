import urllib.request
import os

os.makedirs('images', exist_ok=True)

images = {
    'hero-bg.jpg': 'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg',
    'marci.jpg': 'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/photo-5db79f9.jpg',
    'house1.jpg': 'https://img1.wsimg.com/isteam/stock/3395/',
    'house2.jpg': 'https://img1.wsimg.com/isteam/stock/107927/',
    'house3.jpg': 'https://img1.wsimg.com/isteam/stock/771/'
}

for name, url in images.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(os.path.join('images', name), 'wb') as f:
                f.write(response.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
