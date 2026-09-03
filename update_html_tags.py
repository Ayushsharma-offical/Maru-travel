import re

with open('destination_weddings.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    r'MARU TRAVEL INDIA PRESENTS': r'<span data-i18n="dw.eyebrow">MARU TRAVEL INDIA PRESENTS</span>',
    r'<a href="contact\.html"[^>]*>Begin Planning</a>': r'<a href="contact.html" class="dw-btn shimmer" data-i18n="dw.btn">Begin Planning</a>',
    r'Some love stories require a grand stage\. Whether it\'s timeless romance in a lake palace or vibrant heritage in a desert fortress — we bring your vision to life\.': r'<span data-i18n="dw.quote">Some love stories require a grand stage. Whether it\'s timeless romance in a lake palace or vibrant heritage in a desert fortress — we bring your vision to life.</span>',
    r'— The Maru Experience': r'<span data-i18n="dw.quote.author">— The Maru Experience</span>',
    r'01 — RAJASTHAN': r'<span data-i18n="dw.dest.title">01 — RAJASTHAN</span>',
    
    r'<h2 class="t-serif">JAIPUR</h2>': r'<h2 class="t-serif" data-i18n="dw.jaipur">JAIPUR</h2>',
    r'<h3 class="t-cal">The Pink City — A Royal Celebration</h3>': r'<h3 class="t-cal" data-i18n="dw.jaipur.tag">The Pink City — A Royal Celebration</h3>',
    r'<p>Accessibility, heritage and convenience make Jaipur India\'s most compelling wedding destination\.</p>': r'<p data-i18n="dw.jaipur.desc">Accessibility, heritage and convenience make Jaipur India\'s most compelling wedding destination.</p>',
    
    r'<h2 class="t-serif">JODHPUR</h2>': r'<h2 class="t-serif" data-i18n="dw.jodhpur">JODHPUR</h2>',
    r'<h3 class="t-cal">Where Royal Heritage Lives</h3>': r'<h3 class="t-cal" data-i18n="dw.jodhpur.tag">Where Royal Heritage Lives</h3>',
    
    r'<h2 class="t-serif">UDAIPUR</h2>': r'<h2 class="t-serif" data-i18n="dw.udaipur">UDAIPUR</h2>',
    r'<h3 class="t-cal">Romance in Every Frame</h3>': r'<h3 class="t-cal" data-i18n="dw.udaipur.tag">Romance in Every Frame</h3>',
    
    r'<h2 class="t-serif">KUMBHALGARH</h2>': r'<h2 class="t-serif" data-i18n="dw.kumbhalgarh">KUMBHALGARH</h2>',
    r'<h3 class="t-cal">Aravalli Fairytale</h3>': r'<h3 class="t-cal" data-i18n="dw.kumbhalgarh.tag">Aravalli Fairytale</h3>',
    
    r'<h2 class="t-serif">DELHI</h2>': r'<h2 class="t-serif" data-i18n="dw.delhi">DELHI</h2>',
    r'<h3 class="t-cal">Where Heritage meets Modern Luxury</h3>': r'<h3 class="t-cal" data-i18n="dw.delhi.tag">Where Heritage meets Modern Luxury</h3>',
    
    r'<h2 class="t-serif">Our Expertise</h2>': r'<h2 class="t-serif" data-i18n="dw.srv.title">Our Expertise</h2>',
    r'<p>Beautifully Curated\. Flawlessly Executed\.</p>': r'<p data-i18n="dw.srv.sub">Beautifully Curated. Flawlessly Executed.</p>',
    
    r'<h3>Venue Selection</h3>': r'<h3 data-i18n="dw.srv.1">Venue Selection</h3>',
    r'<h3>Guest Management</h3>': r'<h3 data-i18n="dw.srv.2">Guest Management</h3>',
    r'<h3>Ceremonial Execution</h3>': r'<h3 data-i18n="dw.srv.3">Ceremonial Execution</h3>',
    r'<h3>Decor &amp; Styling</h3>': r'<h3 data-i18n="dw.srv.4">Decor &amp; Styling</h3>',
    r'<h3>Food &amp; Hospitality</h3>': r'<h3 data-i18n="dw.srv.5">Food &amp; Hospitality</h3>',
    r'<h3>Travel &amp; Logistics</h3>': r'<h3 data-i18n="dw.srv.6">Travel &amp; Logistics</h3>',
}

for old, new in replacements.items():
    html = re.sub(old, new, html)

with open('destination_weddings.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated HTML tags.")
