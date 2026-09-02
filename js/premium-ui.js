// Premium UI Scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // We wait 2 seconds to let the site's JS framework render the JSON payloads into DOM
    setTimeout(() => {
        // The Explore With Us Section
        const exploreHTML = `
        <div class="flip-card-container">
            <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front glass-panel"><h3>India</h3></div><div class="flip-card-back"><img src="images/new_assets/Taj Mahal.jpg" style="width:100%; height:100%; object-fit:cover;"><h3>Taj Mahal</h3></div></div></div>
            <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front glass-panel"><h3>Nepal</h3></div><div class="flip-card-back"><img src="images/new_assets/Khajuraho.jpg" style="width:100%; height:100%; object-fit:cover;"><h3>Kathmandu</h3></div></div></div>
            <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front glass-panel"><h3>Bhutan</h3></div><div class="flip-card-back"><img src="images/new_assets/Amerfort.jpg" style="width:100%; height:100%; object-fit:cover;"><h3>Bhutan</h3></div></div></div>
            <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front glass-panel"><h3>Sri Lanka</h3></div><div class="flip-card-back"><img src="images/new_assets/Boat Ride.jpg" style="width:100%; height:100%; object-fit:cover;"><h3>Sri Lanka</h3></div></div></div>
        </div>`;

        // Tour Categories
        const tourCatsHTML = `
        <div class="tilt-grid">
            <div class="tilt-card"><img src="images/new_assets/Varanasi.jpg"><div class="tilt-content">FIT Tours</div></div>
            <div class="tilt-card"><img src="images/new_assets/sarnath- Varanasi.jpg"><div class="tilt-content">Group Tours</div></div>
            <div class="tilt-card"><img src="images/new_assets/chand-baori-abhaneri.gif"><div class="tilt-content">Luxury Travel</div></div>
            <div class="tilt-card"><img src="images/new_assets/presidents-house-a- Delhi.webp"><div class="tilt-content">Incentive Travel</div></div>
            <div class="tilt-card"><img src="images/new_assets/Akshardham Temple.jpg"><div class="tilt-content">Religious Tours</div></div>
            <div class="tilt-card"><img src="images/new_assets/Taj Mahal.jpg"><div class="tilt-content">Conference</div></div>
            <div class="tilt-card"><img src="images/new_assets/Amerfort.jpg"><div class="tilt-content">Wildlife Tours</div></div>
            <div class="tilt-card"><img src="images/new_assets/Boat Ride.jpg"><div class="tilt-content">Wellness Tour</div></div>
            <div class="tilt-card"><img src="images/new_assets/Khajuraho.jpg"><div class="tilt-content">Fairs and Festivals</div></div>
        </div>`;

        const trainHTML = `
        <div class="train-grid">
            <div class="train-card"><img src="images/new_assets/1.Train-Exterior-1.jpg"><h3>Palace on Wheels</h3></div>
            <div class="train-card"><img src="images/new_assets/Enteir india-panorama-maharaja-express.jpg"><h3>Maharaja Express</h3></div>
            <div class="train-card"><img src="images/new_assets/1.Train-Exterior-1.jpg"><h3>Deccan Odyssey</h3></div>
        </div>`;

        const affilHTML = `
        <div class="affiliations-bar">
            <img src="images/new_assets/Maru Travel Logo al.png" style="height:60px; object-fit:contain;">
            <h2 style="margin:0; font-weight:bold;">IATO</h2>
            <h2 style="margin:0; font-weight:bold;">IRCTC</h2>
            <h2 style="margin:0; font-weight:bold;">Maharaja Express</h2>
            <h2 style="margin:0; font-weight:bold;">IGTA</h2>
            <h2 style="margin:0; font-weight:bold;">TAAI</h2>
        </div>`;

        const testHTML = `
        <div class="testimonial-section">
            <div class="testimonial-box glass-panel">
                <div class="calligraphy-text">"A truly Royal Indian experience."</div>
                <p style="font-size:1.2rem;">- Maru Travel Client</p>
            </div>
        </div>`;

        function safeInject(keyword, newHTML) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue && node.nodeValue.includes(keyword)) {
                    // Find the widget container
                    let parent = node.parentElement;
                    while (parent && parent.tagName !== 'BODY') {
                        if (parent.id && parent.id.startsWith('w') && parent.classList.contains('widget')) {
                            
                            // Prevent multiple injections
                            if (parent.hasAttribute('data-injected')) return true;
                            parent.setAttribute('data-injected', 'true');

                            // Create wrapper for our content
                            const wrapper = document.createElement('div');
                            wrapper.innerHTML = newHTML;
                            
                            // Hide original, insert ours
                            parent.style.display = 'none';
                            parent.parentNode.insertBefore(wrapper, parent.nextSibling);
                            
                            return true;
                        }
                        parent = parent.parentElement;
                    }
                }
            }
            return false;
        }

        safeInject('브랜드 갤러리', exploreHTML);
        safeInject('2027', tourCatsHTML);
        safeInject('Luxury Train Travel', trainHTML);
        safeInject('COSMETIC', affilHTML);
        safeInject('MASTER CLASS', testHTML);

        // Re-initialize tilt logic
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -15; 
                const rotateY = ((x - centerX) / centerX) * 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

    }, 2500); // Increased wait time slightly to ensure skeleton finishes loading
});
