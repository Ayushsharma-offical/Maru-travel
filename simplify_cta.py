import re

with open('destination_weddings.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clean up the HTML of the CTA section
cta_pattern = r'<!-- 5\. GRAND FINALE CTA — ULTRA PREMIUM -->.*?</section>'
new_cta_html = '''<!-- 5. CTA (SIMPLE & ELEGANT) -->
<section class="dw-cta">
  <!-- Main Content Box Only -->
  <div class="dw-cta-content v-reveal">
    <!-- Decorative top divider -->
    <div class="cta-divider">
      <span class="cta-div-line"></span>
      <span class="cta-div-gem">◆</span>
      <span class="cta-div-line"></span>
    </div>

    <h3 class="dw-cta-cal t-cal" data-i18n="dw.cta.cal">Your Story</h3>
    <h2 class="dw-cta-title t-serif">
      <span class="cta-line-1 cta-title-glow" data-i18n="dw.cta.title.1">YOUR DESTINATION.</span><br>
      <span class="cta-line-2 cta-title-glow" data-i18n="dw.cta.title.2">YOUR CELEBRATION.</span>
    </h2>

    <!-- Gold separator -->
    <div class="cta-separator">
      <svg viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 Q75 0 150 10 Q225 20 300 10" fill="none" stroke="rgba(197,160,89,0.6)" stroke-width="1.5"/>
        <circle cx="150" cy="10" r="4" fill="rgba(197,160,89,0.8)"/>
        <circle cx="50" cy="7" r="2.5" fill="rgba(197,160,89,0.5)"/>
        <circle cx="250" cy="7" r="2.5" fill="rgba(197,160,89,0.5)"/>
      </svg>
    </div>

    <p class="dw-cta-sub t-serif" data-i18n="dw.cta.sub">Let us create a wedding that feels uniquely yours in every single detail.</p>

    <!-- Dual CTA Buttons -->
    <div class="cta-btn-group">
      <a href="contact.html" class="dw-btn cta-btn" data-i18n="dw.cta.btn">Contact Our Planners</a>
      <a href="tel:+919891587778" class="dw-btn cta-btn-ghost">
        <span>+91 98915 87778</span>
      </a>
    </div>

    <!-- Bottom divider -->
    <div class="cta-divider" style="margin-top: 40px;">
      <span class="cta-div-line"></span>
      <span class="cta-div-gem">◆</span>
      <span class="cta-div-line"></span>
    </div>
  </div>
</section>'''

content = re.sub(cta_pattern, new_cta_html, content, flags=re.DOTALL)

# 2. Clean up the CTA CSS
css_pattern = r'/\*\s*─── ULTRA PREMIUM CTA OVERHAUL ───\s*\*/.*?(?=@media\(max-width)'
new_css = '''/* ─── SIMPLE & ELEGANT CTA ─── */
.dw-cta {
  padding: 100px 5%;
  background: 
    linear-gradient(160deg, rgba(20,28,15,0.95) 0%, rgba(35,45,25,0.92) 50%, rgba(20,28,15,0.97) 100%),
    url('images/website_assests/wedding/wedding_stage.jpg') center/cover fixed;
  position: relative; overflow: hidden;
  text-align: center;
}

/* Content Card */
.dw-cta-content {
  position: relative; z-index: 10; max-width: 860px; margin: 0 auto;
  padding: 50px 40px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(197,160,89,0.3);
  border-radius: 12px;
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 0 50px rgba(0,0,0,0.4);
  opacity: 0; transform: translateY(30px);
  transition: all 1s ease;
}
.dw-cta-content.visible { opacity: 1; transform: translateY(0); }

/* Divider */
.cta-divider { display: flex; align-items: center; gap: 16px; justify-content: center; margin-bottom: 30px; }
.cta-div-line { flex: 1; max-width: 120px; height: 1px; background: linear-gradient(90deg, transparent, rgba(197,160,89,0.6), transparent); }
.cta-div-gem { color: var(--w-gold); font-size: 14px; opacity: 0.8; }

/* Typography */
.dw-cta-cal { font-size: clamp(4.5rem, 8vw, 8rem); color: var(--w-gold); margin: 0 0 -25px; line-height: 1; text-shadow: 0 0 20px rgba(197,160,89,0.3); }
.dw-cta-title { font-size: clamp(2.5rem, 4.5vw, 4.5rem); margin: 0 0 0; line-height: 1.2; letter-spacing: 3px; }
.cta-title-glow {
  color: #FFF; text-shadow: 0 0 10px rgba(255,255,255,0.2);
  display: block;
}
.cta-line-1 { font-size: 0.85em; }
.cta-line-2 { font-size: 1em; }

/* Wave Separator */
.cta-separator { margin: 25px auto; width: 300px; }
.cta-separator svg { width: 100%; height: auto; }

.dw-cta-sub { font-size: 1.3rem; color: rgba(255,255,255,0.8); margin: 0 0 45px; font-style: italic; line-height: 1.7; }

/* Button Group */
.cta-btn-group { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.cta-btn { background: var(--w-gold) !important; color: #1a2210 !important; font-weight: 700 !important; border: 2px solid var(--w-gold) !important; letter-spacing: 2px; }
.cta-btn:hover { background: transparent !important; color: var(--w-gold) !important; }
.cta-btn-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 18px 40px; border-radius: 50px; font-size: 13px; font-weight: 500;
  letter-spacing: 3px; text-transform: uppercase; text-decoration: none;
  background: transparent; color: rgba(255,255,255,0.9);
  border: 2px solid rgba(255,255,255,0.3); transition: all 0.4s ease; cursor: pointer;
}
.cta-btn-ghost:hover { border-color: var(--w-gold); color: var(--w-gold); }

'''

content = re.sub(css_pattern, new_css, content, flags=re.DOTALL)

with open('destination_weddings.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated CTA section.")
