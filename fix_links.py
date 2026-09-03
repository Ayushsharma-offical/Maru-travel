import glob
import re

count = 0
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    orig = content
    # Replace destination.html with destination_weddings.html (handle various quote types just in case)
    content = content.replace('"destination.html"', '"destination_weddings.html"')
    content = content.replace("'destination.html'", "'destination_weddings.html'")
    
    # Also replace weddings.html with destination_weddings.html
    content = content.replace('"weddings.html"', '"destination_weddings.html"')
    content = content.replace("'weddings.html'", "'destination_weddings.html'")
    
    if orig != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        count += 1
        print(f"Updated {f}")

print(f"Total files updated: {count}")
