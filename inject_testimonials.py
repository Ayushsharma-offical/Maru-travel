import re

html_path = 'index.html'
css_path = 'css/style.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

testimonials_html = '''
<!-- TESTIMONIALS SECTION -->
<section id="testimonials">
  <div class="testi-header">
    <p class="testi-eyebrow">The Maru Experience</p>
    <h2 class="testi-title">Happy Customers</h2>
    <div class="customer-collage">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.35.52.jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.01.jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.19.jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.23.jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.28 (1).jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.31 (1).jpeg" alt="Customer">
      <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.32.jpeg" alt="Customer">
    </div>
  </div>

  <div class="testi-slider-wrap">
    <div class="testi-slider" id="testiSlider">
      
      <div class="testi-card active">
        <p class="testi-quote">"We were initially worried about the food and logistics in Rajasthan, but Maru Travel handled everything flawlessly. The heritage hotels were breathtaking, and our guide felt like family. Highly recommended."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.35.52.jpeg" alt="Ji-woo Kim">
          <div class="testi-author-info">
            <h4>Ji-woo Kim</h4>
            <p>South Korea • Rajasthan Tour</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"Our honeymoon in Udaipur was straight out of a movie. They surprised us with a private boat ride at sunset. Every detail was meticulously planned. We didn't have to worry about a single thing."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.01.jpeg" alt="Min-ho Choi">
          <div class="testi-author-info">
            <h4>Min-ho Choi</h4>
            <p>South Korea • Golden Triangle</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"Traveling with my elderly parents can be challenging, but the team ensured absolute comfort. The tempo traveler was spotless, and the pacing of the tour in Jaipur and Agra was perfect."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.19.jpeg" alt="Seo-yeon Park">
          <div class="testi-author-info">
            <h4>Seo-yeon Park</h4>
            <p>South Korea • Classic India</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"As someone who loves photography, the itinerary was incredibly well thought out. They knew exactly what time to visit the Taj Mahal and Varanasi ghats for the best light. A truly premium experience."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.23.jpeg" alt="Hyun-woo Lee">
          <div class="testi-author-info">
            <h4>Hyun-woo Lee</h4>
            <p>South Korea • Varanasi Heritage</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"We booked the luxury train journey. The local experiences, like the authentic Rajasthani dinner, were spectacular. It felt very safe and luxurious throughout the entire week."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.28 (1).jpeg" alt="Soo-jin Kang">
          <div class="testi-author-info">
            <h4>Soo-jin Kang</h4>
            <p>South Korea • Luxury Rail</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"The attention to detail was impressive. From airport pick-up to the final drop-off, the hospitality was warm and professional. Maru Travel truly understands high-end service."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.31 (1).jpeg" alt="Dong-hyun Yoon">
          <div class="testi-author-info">
            <h4>Dong-hyun Yoon</h4>
            <p>South Korea • Rajasthan Heritage</p>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <p class="testi-quote">"A life-changing trip. Staying at the Taj palaces was a dream, but the way our trip coordinator checked in on us daily made it feel truly personalized. I will definitely book with them again."</p>
        <div class="testi-author">
          <img src="images/Customer feedback/WhatsApp Image 2026-09-05 at 19.37.32.jpeg" alt="Eun-ji Jung">
          <div class="testi-author-info">
            <h4>Eun-ji Jung</h4>
            <p>South Korea • Golden Triangle</p>
          </div>
        </div>
      </div>

    </div>

    <div class="testi-nav">
      <button class="testi-btn" id="testiPrev"><i class="fas fa-arrow-left"></i></button>
      <button class="testi-btn" id="testiNext"><i class="fas fa-arrow-right"></i></button>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.testi-card');
      const btnNext = document.getElementById('testiNext');
      const btnPrev = document.getElementById('testiPrev');
      if(cards.length === 0) return;
      
      let currentIdx = 0;
      let autoPlayInterval;

      function showCard(idx) {
        cards.forEach((c, i) => {
          if(i === idx) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });
      }

      function nextCard() {
        currentIdx = (currentIdx + 1) % cards.length;
        showCard(currentIdx);
      }

      function prevCard() {
        currentIdx = (currentIdx - 1 + cards.length) % cards.length;
        showCard(currentIdx);
      }

      function startAutoPlay() {
        autoPlayInterval = setInterval(nextCard, 5000);
      }

      function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }

      if(btnNext) btnNext.addEventListener('click', () => { nextCard(); resetAutoPlay(); });
      if(btnPrev) btnPrev.addEventListener('click', () => { prevCard(); resetAutoPlay(); });

      startAutoPlay();
    });
  </script>
</section>
'''

# Find the end of the #trains section to inject testimonials
trains_end_match = re.search(r'</section>[\s\r\n]*(?=<!--.*?AFFILIATIONS|<!--.*?footer)', html_content, re.IGNORECASE)
if trains_end_match:
    inject_pos = trains_end_match.end()
    html_content = html_content[:inject_pos] + '\n' + testimonials_html + '\n' + html_content[inject_pos:]
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("Injected HTML successfully.")
else:
    print("Could not find insertion point for HTML.")

with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

testimonials_css = '''
/* ============================================================
   TRUE LIQUID GLASS TESTIMONIALS
   ============================================================ */
#testimonials {
  padding: 100px 5%;
  background: linear-gradient(135deg, #182013 0%, #293621 100%);
  position: relative;
  overflow: hidden;
  color: #fff;
}
.testi-header {
  text-align: center;
  margin-bottom: 50px;
}
.testi-eyebrow {
  font-size: 14px;
  letter-spacing: 5px;
  color: #D4AF37;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.testi-title {
  font-family: var(--ff-script, 'Cinzel Decorative', serif);
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.customer-collage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.customer-collage img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #D4AF37;
  filter: grayscale(100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: -20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  position: relative;
}
.customer-collage img:first-child { margin-left: 0; }
.customer-collage:hover img { filter: grayscale(0%); }
.customer-collage img:hover { transform: scale(1.3) translateY(-10px); z-index: 10; border-color: #fff; box-shadow: 0 15px 30px rgba(0,0,0,0.5); }

.testi-slider-wrap {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}
.testi-slider {
  display: flex;
  overflow: hidden;
  border-radius: 32px;
}
.testi-card {
  flex: 0 0 100%;
  padding: 60px 80px;
  box-sizing: border-box;
  text-align: center;
  /* True Liquid Glass Effect */
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 40%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.08) 100%);
  backdrop-filter: blur(24px) saturate(160%) brightness(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(160%) brightness(1.1);
  border-top: 1.5px solid rgba(255,255,255,0.3);
  border-left: 1.5px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.02);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2);
  display: none;
  animation: fadeScaleIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.testi-card.active { display: block; }
@keyframes fadeScaleIn {
  0% { opacity: 0; transform: scale(0.95) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.testi-card::before {
  content: '';
  position: absolute;
  top: 0; left: -50%; right: -50%; height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}

.testi-quote {
  font-size: 1.35rem;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 40px;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.testi-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.testi-author img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #D4AF37;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.testi-author-info {
  text-align: left;
}
.testi-author-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #D4AF37;
  font-weight: 600;
}
.testi-author-info p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
}

.testi-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}
.testi-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 1.2rem;
}
.testi-btn:hover {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #1a2210;
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}

@media(max-width: 768px) {
  .testi-card { padding: 40px 30px; }
  .testi-quote { font-size: 1.1rem; }
  .testi-title { font-size: 2.5rem; }
}
'''
if 'TRUE LIQUID GLASS TESTIMONIALS' not in css_content:
    css_content += '\n' + testimonials_css
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("Injected CSS successfully.")
else:
    print("CSS already present.")
