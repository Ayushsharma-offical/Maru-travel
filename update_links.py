import os
import glob
import re

html_files = glob.glob('*.html')
js_files = glob.glob('maru-chatbot.js')
all_files = html_files + js_files

for f in all_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Update Destination / Weddings links
    if f.endswith('.html'):
        content = re.sub(r'href="weddings\.html"', r'href="destination_weddings.html"', content)
        content = re.sub(r'href="destination\.html"', r'href="destination_weddings.html"', content)
        
        # 2. Update India, Nepal, Bhutan, Sri Lanka tabs
        content = re.sub(r'href="[^"]*"([^>]*data-i18n="dest\.india")', r'href="india.html"\1', content)
        content = re.sub(r'href="[^"]*"([^>]*data-i18n="dest\.nepal")', r'href="nepal.html"\1', content)
        content = re.sub(r'href="[^"]*"([^>]*data-i18n="dest\.bhutan")', r'href="bhutan.html"\1', content)
        content = re.sub(r'href="[^"]*"([^>]*data-i18n="dest\.srilanka")', r'href="srilanka.html"\1', content)

    # 3. Update Email
    content = content.replace("tejinder@marutravel.in", "info@marutravel.in")

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# Specific fix for destination_weddings.html (Remove .current from About Us, add to Weddings & Events)
dw_path = 'destination_weddings.html'
if os.path.exists(dw_path):
    with open(dw_path, 'r', encoding='utf-8') as f:
        dw_content = f.read()
    
    # Remove from About Us
    dw_content = dw_content.replace('class="current polish" data-i18n="nav.about"', 'class="polish" data-i18n="nav.about"')
    # Add to Weddings & Events
    dw_content = dw_content.replace('class="polish" data-i18n="nav.events"', 'class="current polish" data-i18n="nav.events"')
    
    with open(dw_path, 'w', encoding='utf-8') as f:
        f.write(dw_content)

print("Updates completed successfully.")
