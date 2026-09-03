import re

files_to_fix = ['what_we_do.html', 'about_us.html']

for filepath in files_to_fix:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix double WEDDINGS dropdown in what_we_do
    if 'what_we_do.html' in filepath:
        # Remove the weird inline dropdown
        bad_dropdown = r'      <div class="we-dropdown"><a href="destination_weddings\.html" class="polish">WEDDINGS &amp; EVENTS</a><div class="we-dropdown-menu"><a href="destination_weddings\.html">DESTINATION WEDDINGS</a><a href="destination_weddings\.html">CORPORATE EVENTS</a></div></div>\n'
        content = re.sub(bad_dropdown, '', content)

    # 2. Fix email in footer (and everywhere else just to be sure)
    content = content.replace('tejinder@marutravel.in', 'info@marutravel.in')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Fixed {filepath}")
