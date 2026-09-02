/**
 * Maru Travel - i18n Translation System
 * Supports: English (en) | Korean (ko)
 */

const TRANSLATIONS = {
  en: {
    'nav.home': 'HOME',
    'nav.about': 'ABOUT US',
    'nav.what': 'WHAT WE DO',
    'nav.explore': 'EXPLORE WITH US',
    'nav.tours': 'OUR TOURS',
    'nav.trains': 'LUXURY TRAINS',
    'nav.contact': 'CONTACT',
    'nav.login': 'Login',
    'dest.india': 'INDIA',
    'dest.nepal': 'NEPAL',
    'dest.bhutan': 'BHUTAN',
    'dest.srilanka': 'SRI LANKA',
    'hero.tradition': 'OUR TRADITION',
    'hero.sub': 'EXPLORE INDIA · DISCOVER THE INCREDIBLE',
    'hero.tajmahal': 'TAJ MAHAL — AGRA',
    'hero.rashtrapati': 'RASHTRAPATI BHAVAN — DELHI',
    'hero.amerfort': 'AMER FORT — JAIPUR',
    'hero.varanasi': 'VARANASI',
    'hero.river': 'RIVER JOURNEYS',
    'explore.eyebrow': 'Our Destinations',
    'explore.title': 'EXPLORE WITH US',
    'explore.india': 'INDIA',
    'explore.nepal': 'NEPAL',
    'explore.bhutan': 'BHUTAN',
    'explore.srilanka': 'SRI LANKA',
    'explore.discover.india': 'Discover India',
    'explore.discover.nepal': 'Discover Nepal',
    'explore.discover.bhutan': 'Discover Bhutan',
    'explore.discover.srilanka': 'Discover Sri Lanka',
    'tours.eyebrow': 'Discover',
    'tours.title': 'Our Tour Categories',
    'tours.fit': 'FIT Tours',
    'tours.group': 'Group Tours',
    'tours.luxury': 'Luxury Travel',
    'tours.incentive': 'Incentive Travel',
    'tours.wildlife': 'Wildlife Tours',
    'tours.religious': 'Religious Tours',
    'tours.weddings': 'Weddings & Events',
    'tours.honeymoon': 'Honeymoon Trips',
    'tours.festivals': 'Fairs & Festivals',
    'tours.btn': 'Exotic Experiences',
    'tours.glow': 'Maru Experience',
    'tours.desc': 'Maru Travel welcomes you to experience best in class, tailor made and unique products. Created by travel experts & local professionals in consultation with our clients, our experiences are hand picked to offer ultimate activities in incredible destinations.',
    'trains.eyebrow': 'Luxury Rail Journeys',
    'trains.title': 'India\'s Iconic Trains',
    'trains.maharaja': 'Maharaja Express',
    'trains.maharaja.desc': 'India\'s most luxurious train journey through royal destinations',
    'trains.palace': 'Palace on Wheels',
    'trains.palace.desc': 'A royal journey through the golden sands of Rajasthan',
    'trains.deccan': 'Deccan Odyssey',
    'trains.deccan.desc': 'Explore the wonders of Maharashtra and Goa in royal style',
    'affil.eyebrow': 'Trusted Memberships',
    'affil.title': 'Our Affiliations',
    'footer.desc': 'Curating exceptional journeys across the Indian subcontinent. Experience the extraordinary with luxury travel and unforgettable memories.',
    'footer.links': 'Quick Links',
    'footer.about': 'About Us',
    'footer.tours': 'Our Tours',
    'footer.trains': 'Luxury Trains',
    'footer.destinations': 'Destinations',
    'footer.terms': 'Travel Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
    'footer.director': 'Director: Tejinder Pal Singh Sandhu',
    'footer.copy': '© 2026 Maru Travel India. All rights reserved. Designed for exceptional experiences.',
    'about.hero.title': 'About Us',
    'about.hero.sub': 'Welcome to Maru Travel',
    'about.founder.title': 'Creating Lifelong Memories',
    'about.founder.p1': 'At Maru Travel, we believe every journey is an opportunity to create lifelong memories. Founded in 2023 by Mr. Tejinder Pal Singh Sandhu, our company is built on more than 20 years of professional experience in the global travel industry.',
    'about.founder.p2': 'Before establishing Maru Travel, Mr. Tejinder Pal Singh Sandhu held key positions with some of the travel industry\'s most respected multinational companies, including Thomas Cook, TCI, and other leading travel organizations. His extensive knowledge, strong global network, and passion for delivering exceptional travel experiences inspired the creation of Maru Travel.',
    'about.founder.p3': 'Today, Maru Travel is a trusted destination management and travel solutions company specializing in both Inbound and Outbound Tourism. We offer customized travel experiences for leisure travelers, families, honeymooners, corporate clients, educational groups, and special interest tours.',
    'about.founder.p4': 'Our expertise spans across Asia, where we have developed strong destination knowledge and reliable local partnerships. As part of our global expansion, we now proudly offer curated travel experiences throughout North America and South America, providing our clients with seamless journeys across multiple continents.',
    'wwd.hero.title': 'WHAT WE DO',
    'wwd.hero.sub': 'Crafting extraordinary travel experiences',
    'wwd.cert.iato': 'International Air Transport Association',
    'wwd.cert.tourism': 'Ministry of Tourism',
    'wwd.cert.tourism.desc': 'Government of India',
    'wwd.cert.delhi': 'Delhi Tourism',
    'wwd.cert.delhi.desc': 'Official Tourism Partner',
    'wwd.cert.note': 'These prestigious recognitions reflect our commitment to quality and customer satisfaction.',
    'wwd.srv.eyebrow': 'Comprehensive Solutions',
    'wwd.srv.title': 'Our Services',
    'wwd.srv.1': 'Inbound & Outbound Tour Packages',
    'wwd.srv.2': 'International & Domestic Holiday Packages',
    'wwd.srv.3': 'Flight Reservations',
    'wwd.srv.4': 'Hotel Bookings',
    'wwd.srv.5': 'Visa Assistance',
    'wwd.srv.6': 'Travel Insurance',
    'wwd.srv.7': 'Airport Transfers & Ground Transportation',
    'wwd.srv.8': 'Corporate & Group Travel',
    'wwd.srv.9': 'Customized Travel Itineraries',
    'wwd.why.eyebrow': 'The Maru Difference',
    'wwd.why.title': 'Why Choose Maru Travel?',
    'wwd.why.1.title': '20+ Years',
    'wwd.why.1.desc': 'Of travel industry expertise.',
    'wwd.why.2.title': 'Expert Leadership',
    'wwd.why.2.desc': 'Founded by an experienced travel professional.',
    'wwd.why.3.title': 'Asia Specialists',
    'wwd.why.3.desc': 'Specialists in destinations across Asia.',
    'wwd.why.4.title': 'Global Reach',
    'wwd.why.4.desc': 'Expanding travel solutions across continents.',
    'wwd.why.5.title': 'Certified Company',
    'wwd.why.5.desc': 'Government-recognized and industry-certified.',
    'wwd.why.6.title': 'Personalized Planning',
    'wwd.why.6.desc': 'Personalized travel planning with competitive pricing.',
    'wwd.why.7.title': 'Dedicated Support',
    'wwd.why.7.desc': 'Dedicated customer support from planning to your return journey.',
    'wwd.mv.mission.eyebrow': 'Purpose',
    'wwd.mv.mission.title': 'Our Mission',
    'wwd.mv.mission.desc': 'To deliver exceptional travel experiences that inspire confidence and create unforgettable memories.',
    'wwd.mv.vision.eyebrow': 'Future',
    'wwd.mv.vision.title': 'Our Vision',
    'wwd.mv.vision.desc': 'To become a trusted travel company recognized for excellence and customer satisfaction.',
    'wwd.cta.title': 'Ready for the Extraordinary?',
    'wwd.cta.desc': 'Let our experts design your perfect itinerary.',
    'wwd.cta.sub': 'Your Journey Begins Here',
    'contact.hero.title': 'Contact Us',
    'contact.hero.sub': 'We\'d love to hear from you',
    'contact.info.title': 'Get in Touch',
    'contact.info.office': 'Head Office',
    'contact.info.phone': 'Phone Number',
    'contact.info.email': 'Email Address',
    'contact.info.hours': 'Working Hours',
    'contact.info.time': 'Mon - Sat: 10:00 AM - 7:00 PM',
    'contact.form.title': 'Send us a Message',
    'contact.form.sub': 'Have a question or want to book a tour? Drop us a message below.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'nepal.discover': 'Discover Nepal',
    'nepal.stat.capital': 'Capital',
    'nepal.stat.capital.val': 'Kathmandu',
    'nepal.stat.best': 'Best Time To Visit',
    'nepal.stat.best.val': 'October to December',
    'nepal.stat.currency': 'Currency',
    'nepal.stat.currency.val': 'Nepalese Rupee (NPR)',
    'nepal.stat.attractions': 'Major Attractions',
    'nepal.stat.attractions.val': 'Mt. Everest, Pokhara, Chitwan',
    'nepal.tours.title': 'Explore Our Nepal Tours',
    'bhutan.discover': 'Discover Bhutan',
    'bhutan.stat.capital': 'Capital',
    'bhutan.stat.capital.val': 'Thimphu',
    'bhutan.stat.best': 'Best Time To Visit',
    'bhutan.stat.best.val': 'October to December',
    'bhutan.stat.currency': 'Currency',
    'bhutan.stat.currency.val': 'Ngultrum (BTN)',
    'bhutan.stat.attractions': 'Major Attractions',
    'bhutan.stat.attractions.val': 'Tiger\'s Nest, Punakha Dzong',
    'bhutan.tours.title': 'Explore Our Bhutan Tours',
    'srilanka.discover': 'Discover Sri Lanka',
    'srilanka.stat.capital': 'Capital',
    'srilanka.stat.capital.val': 'Colombo',
    'srilanka.stat.best': 'Best Time To Visit',
    'srilanka.stat.best.val': 'Dec to Mar (West)',
    'srilanka.stat.currency': 'Currency',
    'srilanka.stat.currency.val': 'LKR (Sri Lankan Rupee)',
    'srilanka.stat.attractions': 'Major Attractions',
    'srilanka.stat.attractions.val': 'Sigiriya, Galle, Kandy',
    'srilanka.tours.title': 'Explore Our Sri Lanka Tours',
    'itin.enquire': 'Enquire Now',
    'itin.itinerary': 'Itinerary',
    'itin.faq': 'Frequently Asked Questions',
    'itin.back': 'Back to Tours',
    'itin.route': 'Route',
    'itin.duration': 'Duration',
    'itin.destinations': 'Destinations:',
    'itin.download': 'Download Itinerary',
    'itin.destlist': 'Destinations list',
    'itin.dl_desc': 'Please share your details and we will send the itinerary to your email too.',
    'itin.dl_submit': 'Submit & Download PDF',
    'chatbot.name': 'Maru Concierge',
    'chatbot.status': 'Online & ready to help',
    'chatbot.greeting': "Namaste! 🙏 Welcome to Maru Travel. I'm the Maru Concierge — ask me anything about our company, our services, or how to plan your next trip. Pick a topic below to get started.",
    'chatbot.greetingKo': "안녕하세요! 반갑습니다. 마루 트래블에 오신 것을 환영합니다. 전문 세라 코시에요 — 회사, 서비스 또는 여행 계획에 대해 물어보세요. 아래 주제를 선택해 보세요.",
    'form.safe': 'Your info is safe with us',
    'form.help': 'Let us Help!',
    'form.help_desc': 'We make sure you get your desired travel services with minimal efforts.',
    'form.name': 'Name',
    'form.phone': 'Phone',
    'form.location': 'Location',
    'form.destination': 'Destination',
    'form.travelers': 'No. Of Travelers',
    'form.travel_date': 'Date Of Travel',
    'form.hotel_type': 'Hotel Type',
    'form.theme': 'Theme',
    'form.submit': 'Submit Enquiry',
    'form.secure': 'We Are Safe And Secure',
    'form.ph_name': 'Full Name',
    'form.email': 'Email Address',
    'form.mobile': 'Mobile Number',
    'form.ph_email': 'your@email.com',
    'form.ph_mobile': '+91 9891587778',
    'form.ph_phone': '99xxxx7x5',
    'form.ph_city': 'Your City',
    'form.ph_dest': 'E.g. Manali',
    'form.ph_num': 'Number',
    'star.3': '3 Star',
    'star.4': '4 Star',
    'star.5': '5 Star',
    'star.lux': 'Luxury',
    'theme.spiritual': 'Spiritual',
    'theme.adventure': 'Adventure',
    'theme.honeymoon': 'Honeymoon',
    'theme.wildlife': 'Wildlife',
    'btn.view_itinerary': 'View Itinerary',
    'india.hero.p1': 'A nation of pleasant contrasts, India was home to the world\'s oldest civilizations which flourish in its valleys. Home to exotic wildlife, mighty mountains, unending plains and immense rivers, India offers splendid experiences for every traveller.',
    'india.hero.p2': 'India lives in rugged villages as well as bustling metropolitan such as Delhi and Mumbai which is a perfect blend of old – shopping bazaars, narrow streets, centuries-old monuments and contemporary skyscrapers.',
    'india.stat.capital': 'Capital',
    'india.stat.capital.val': 'New Delhi',
    'india.stat.best': 'Best Time To Visit',
    'india.stat.best.val': 'October to March',
    'india.stat.currency': 'Currency',
    'india.stat.currency.val': 'Indian Rupee (INR)',
    'india.stat.attractions': 'Major Attractions',
    'india.stat.attractions.val': 'Taj Mahal, Rajasthan, Kerala',
    'india.tours.title': 'Explore Our Tours',
    'india.tours.subtitle': 'Handcrafted journeys across India\'s most iconic destinations',
    'nepal.hero.p1': 'A land of breathtaking Himalayan landscapes, ancient temples, and rich spiritual heritage. From the highest peaks in the world to vibrant valleys, Nepal offers an unforgettable journey into the heart of nature and culture.',
    'nepal.tours.subtitle': 'Handcrafted journeys across the majestic Himalayas',
    'bhutan.hero.p1': 'A mesmerizing kingdom nestled in the Himalayas, Bhutan is a land of vibrant culture, sacred monasteries, and dramatic landscapes. Experience the unique charm of the Land of the Thunder Dragon.',
    'bhutan.tours.subtitle': 'Handcrafted journeys across the majestic Land of the Thunder Dragon',
    'srilanka.hero.p1': 'A dazzling teardrop island in the Indian Ocean, Sri Lanka boasts ancient ruins, sweeping tea estates, pristine beaches, and exotic wildlife. Dive into an unforgettable tropical paradise.',
    'srilanka.tours.subtitle': 'Handcrafted journeys across the teardrop island',
    'wwd.hero.title2': 'Discover Maru Travel',
    'wwd.hero.sub2': 'Experience the World with Confidence',
    'wwd.scroll': 'Scroll to Explore',
    'wwd.cert.recog': 'Recognized Excellence',
    'wwd.cert.trusted': 'Certified & Trusted',
    'wwd.cert.iato.full': 'Indian Association of Tour Operators',
    'wwd.cert.iato': 'IATO',
    'contact.success': 'Success!',
    'contact.success.msg': 'We will connect with you soon.',
    'itin.complete': 'JOURNEY COMPLETE',
    'itin.thanks': 'Thank you for Exploring with Maru Travel!',
    'itin.lookforward': 'We look forward to creating unforgettable memories with you.',
    'itin.plan': 'Plan My Journey',
    'itin.years': 'Years of Excellence',
    'itin.happy': 'Happy Travellers',
    'itin.sending': 'Sending...',
  },

  ko: {
    'nav.home': '홈',
    'nav.about': '회사 소개',
    'nav.what': '서비스',
    'nav.explore': '함께 탐험',
    'nav.tours': '투어 소개',
    'nav.trains': '럭셔리 열차',
    'nav.contact': '연락처',
    'nav.login': '로그인',
    'dest.india': '인도',
    'dest.nepal': '네팔',
    'dest.bhutan': '부탄',
    'dest.srilanka': '스리랑카',
    'hero.tradition': '우리의 전통',
    'hero.sub': '인도 탐험 · 놀라운 여정을 발견하세요',
    'hero.tajmahal': '타지마할 — 아그라',
    'hero.rashtrapati': '라슈트라파티 바반 — 델리',
    'hero.amerfort': '아메르 성 — 자이푸르',
    'hero.varanasi': '바라나시',
    'hero.river': '강 여행',
    'explore.eyebrow': '여행 목적지',
    'explore.title': '함께 탐험하세요',
    'explore.india': '인도',
    'explore.nepal': '네팔',
    'explore.bhutan': '부탄',
    'explore.srilanka': '스리랑카',
    'explore.discover.india': '인도 탐험하기',
    'explore.discover.nepal': '네팔 탐험하기',
    'explore.discover.bhutan': '부탄 탐험하기',
    'explore.discover.srilanka': '스리랑카 탐험하기',
    'tours.eyebrow': '발견하기',
    'tours.title': '투어 카테고리',
    'tours.fit': '개인 맞춤 투어',
    'tours.group': '그룹 투어',
    'tours.luxury': '럭셔리 여행',
    'tours.incentive': '인센티브 여행',
    'tours.wildlife': '야생동물 투어',
    'tours.religious': '성지 순례 투어',
    'tours.honeymoon': '허니문 여행',
    'tours.festivals': '축제 & 박람회',
    'tours.btn': '특별한 경험',
    'tours.glow': '마루 익스피리언스',
    'tours.desc': '마루 트래블에 오신 것을 환영합니다. 최고 수준의 맞춤형 독특한 여행 상품을 경험하세요. 여행 전문가와 현지 전문가가 고객과의 협의를 통해 만든 특별한 경험으로, 놀라운 목적지에서 최고의 활동을 제공합니다.',
    'trains.eyebrow': '럭셔리 열차 여행',
    'trains.title': '인도의 상징적인 열차',
    'trains.maharaja': '마하라자 익스프레스',
    'trains.maharaja.desc': '왕실 목적지를 여행하는 인도 최고의 럭셔리 열차',
    'trains.palace': '팰리스 온 휠스',
    'trains.palace.desc': '라자스탄의 황금 모래를 가로지르는 왕실 여행',
    'trains.deccan': '데칸 오디세이',
    'trains.deccan.desc': '왕실 스타일로 마하라슈트라와 고아의 경이로움을 탐험',
    'affil.eyebrow': '신뢰할 수 있는 멤버십',
    'affil.title': '협력 기관',
    'footer.desc': '인도 아대륙을 가로지르는 특별한 여행을 큐레이션합니다. 럭셔리 여행과 잊지 못할 추억으로 특별한 경험을 선사합니다.',
    'footer.links': '빠른 링크',
    'footer.about': '회사 소개',
    'footer.tours': '투어 소개',
    'footer.trains': '럭셔리 열차',
    'footer.destinations': '여행지',
    'footer.terms': '여행 약관',
    'footer.privacy': '개인정보 처리방침',
    'footer.contact': '연락처',
    'footer.director': '대표이사: 테진더 팔 싱 산두',
    'footer.copy': '© 2026 마루 트래블 인디아. 모든 권리 보유. 특별한 경험을 위해 설계되었습니다.',
    'about.hero.title': '회사 소개',
    'about.hero.sub': '마루 트래블에 오신 것을 환영합니다',
    'about.founder.title': '평생의 추억 만들기',
    'about.founder.p1': '마루 트래블에서는 모든 여행이 평생의 추억을 만드는 기회라고 믿습니다. 2023년 테진더 팔 싱 산두에 의해 설립된 저희 회사는 글로벌 여행 산업에서 20년 이상의 전문적인 경험을 바탕으로 합니다.',
    'about.founder.p2': '마루 트래블을 설립하기 전, 테진더 팔 싱 산두는 토마스 쿡, TCI 등 여행 산업에서 가장 존경받는 다국적 기업 일부에서 핵심 직책을 맡았습니다. 그의 폭넓은 지식, 강력한 글로벌 네트워크, 뛰어난 여행 경험을 제공하려는 열정이 마루 트래블의 창립을 이끌었습니다.',
    'about.founder.p3': '오늘날 마루 트래블은 인바운드 및 아웃바운드 관광 모두를 전문으로 하는 신뢰받는 목적지 관리 및 여행 솔루션 회사입니다. 레저 여행자, 가족, 허니문객, 기업 고객, 교육 단체, 특별 관심 투어를 위한 맞춤형 여행 경험을 제공합니다.',
    'about.founder.p4': '저희의 전문성은 아시아 전역에 걸쳐 있으며, 강력한 목적지 지식과 신뢰할 수 있는 현지 파트너십을 구축했습니다. 글로벌 확장의 일환으로 현재 북미와 남미 전역에 걸쳐 엄선된 여행 경험을 자랑스럽게 제공하여 고객님들께 여러 대륙에 걸친 원활한 여행을 선사합니다.',
    'wwd.hero.title': '서비스 소개',
    'wwd.hero.sub': '특별한 여행 경험을 만듭니다',
    'wwd.cert.iato': '국제항공운송협회',
    'wwd.cert.tourism': '관광부',
    'wwd.cert.tourism.desc': '인도 정부',
    'wwd.cert.delhi': '델리 관광청',
    'wwd.cert.delhi.desc': '공식 관광 파트너',
    'wwd.cert.note': '이와 같은 권위 있는 인정은 품질과 고객 만족에 대한 저희의 헌신을 반영합니다.',
    'wwd.srv.eyebrow': '종합 솔루션',
    'wwd.srv.title': '우리의 서비스',
    'wwd.srv.1': '인바운드 & 아웃바운드 투어 패키지',
    'wwd.srv.2': '국내외 휴가 패키지',
    'wwd.srv.3': '항공권 예약',
    'wwd.srv.4': '호텔 예약',
    'wwd.srv.5': '비자 지원',
    'wwd.srv.6': '여행자 보험',
    'wwd.srv.7': '공항 픽업 & 지상 교통',
    'wwd.srv.8': '기업 & 그룹 여행',
    'wwd.srv.9': '맞춤형 여행 일정',
    'wwd.why.eyebrow': '마루의 차이점',
    'wwd.why.title': '왜 마루 트래블을 선택해야 할까요?',
    'wwd.why.1.title': '20년 이상',
    'wwd.why.1.desc': '여행 산업에 대한 전문 지식.',
    'wwd.why.2.title': '전문적인 리더십',
    'wwd.why.2.desc': '경험이 풍부한 여행 전문가가 설립.',
    'wwd.why.3.title': '아시아 전문가',
    'wwd.why.3.desc': '아시아 전역의 목적지 전문가.',
    'wwd.why.4.title': '글로벌 네트워크',
    'wwd.why.4.desc': '대륙을 넘어 여행 솔루션 확장.',
    'wwd.why.5.title': '인증된 기업',
    'wwd.why.5.desc': '정부 인증 및 업계 인증.',
    'wwd.why.6.title': '맞춤형 계획',
    'wwd.why.6.desc': '경쟁력 있는 가격으로 맞춤형 여행 계획.',
    'wwd.why.7.title': '전담 지원',
    'wwd.why.7.desc': '계획부터 귀국까지 전담 고객 지원.',
    'wwd.mv.mission.eyebrow': '목적',
    'wwd.mv.mission.title': '우리의 사명',
    'wwd.mv.mission.desc': '자신감을 불러일으키고 잊지 못할 추억을 만드는 특별한 여행 경험을 제공합니다.',
    'wwd.mv.vision.eyebrow': '미래',
    'wwd.mv.vision.title': '우리의 비전',
    'wwd.mv.vision.desc': '탁월함과 고객 만족으로 인정받는 신뢰할 수 있는 여행 회사가 되는 것.',
    'wwd.cta.title': '특별한 여행을 준비하셨나요?',
    'wwd.cta.desc': '전문가가 완벽한 여행 일정을 설계해 드립니다.',
    'wwd.cta.sub': '여정이 여기에서 시작됩니다',
    'contact.hero.title': '연락하기',
    'contact.hero.sub': '여러분의 이야기를 듣고 싶습니다',
    'contact.info.title': '연락처',
    'contact.info.office': '본사',
    'contact.info.phone': '전화번호',
    'contact.info.email': '이메일 주소',
    'contact.info.hours': '근무 시간',
    'contact.info.time': '월 - 토: 오전 10:00 - 오후 7:00',
    'contact.form.title': '메시지 보내기',
    'contact.form.sub': '질문이 있거나 투어를 예약하고 싶으신가요? 아래에 메시지를 남겨주세요.',
    'contact.form.name': '이름',
    'contact.form.email': '이메일',
    'contact.form.phone': '전화번호',
    'contact.form.subject': '제목',
    'contact.form.message': '메시지 내용',
    'contact.form.submit': '메시지 전송',
    'nepal.discover': '네팔 탐험하기',
    'nepal.stat.capital': '수도',
    'nepal.stat.capital.val': '카트만두',
    'nepal.stat.best': '최적 방문 시기',
    'nepal.stat.best.val': '10월 ~ 12월',
    'nepal.stat.currency': '통화',
    'nepal.stat.currency.val': '네팔 루피 (NPR)',
    'nepal.stat.attractions': '주요 명소',
    'nepal.stat.attractions.val': '에베레스트, 포카라, 치트완',
    'nepal.tours.title': '네팔 투어 탐험하기',
    'bhutan.discover': '부탄 탐험하기',
    'bhutan.stat.capital': '수도',
    'bhutan.stat.capital.val': '팀부',
    'bhutan.stat.best': '최적 방문 시기',
    'bhutan.stat.best.val': '10월 ~ 12월',
    'bhutan.stat.currency': '통화',
    'bhutan.stat.currency.val': '눌트럼 (BTN)',
    'bhutan.stat.attractions': '주요 명소',
    'bhutan.stat.attractions.val': '타이거 네스트, 푸나카 종',
    'bhutan.tours.title': '부탄 투어 탐험하기',
    'srilanka.discover': '스리랑카 탐험하기',
    'srilanka.stat.capital': '수도',
    'srilanka.stat.capital.val': '콜롬보',
    'srilanka.stat.best': '최적 방문 시기',
    'srilanka.stat.best.val': '12월 ~ 3월 (서해안)',
    'srilanka.stat.currency': '통화',
    'srilanka.stat.currency.val': 'LKR (스리랑카 루피)',
    'srilanka.stat.attractions': '주요 명소',
    'srilanka.stat.attractions.val': '시기리야, 갈레, 캔디',
    'srilanka.tours.title': '스리랑카 투어 탐험하기',
    'itin.enquire': '문의하기',
    'itin.itinerary': '세부 일정',
    'itin.faq': '자주 묻는 질문',
    'itin.back': '투어 목록으로',
    'itin.route': '경유지',
    'itin.duration': '기간',
    'itin.destinations': '여행지:',
    'itin.download': '여행 일정 다운로드',
    'itin.destlist': '여행지 목록',
    'itin.dl_desc': '연락처를 알려주시면 여행 일정을 이메일로도 보내드립니다.',
    'itin.dl_submit': '제출 및 PDF 다운로드',
    'form.safe': '귀하의 정보는 안전하게 보호됩니다',
    'form.help': '도와드릴까요?',
    'form.help_desc': '원하시는 여행 서비스를 최소한의 노력으로 제공해 드립니다.',
    'form.name': '이름',
    'form.phone': '전화번호',
    'form.location': '거주 지역',
    'form.destination': '여행지',
    'form.travelers': '여행 인원',
    'form.travel_date': '여행 날짜',
    'form.hotel_type': '호텔 등급',
    'form.theme': '여행 테마',
    'form.submit': '문의 제출',
    'form.secure': '안전하고 보안이 유지됩니다',
    'form.ph_name': '성함을 입력하세요',
    'form.email': '이메일 주소',
    'form.mobile': '휴대폰 번호',
    'form.ph_email': 'your@email.com',
    'form.ph_mobile': '+91 9891587778',
    'form.ph_phone': '99xxxx7x5',
    'form.ph_city': '도시명을 입력하세요',
    'form.ph_dest': '예: 마날리',
    'form.ph_num': '인원 수',
    'star.3': '3성급',
    'star.4': '4성급',
    'star.5': '5성급',
    'star.lux': '럭셔리',
    'theme.spiritual': '성지 순례',
    'theme.adventure': '모험',
    'theme.honeymoon': '허니문',
    'theme.wildlife': '야생동물',
    'btn.view_itinerary': '여행 일정 보기',
  
    'india.hero.p1': '즐거운 대조의 나라인 인도는 계곡에서 번성한 세계에서 가장 오래된 문명의 고향이었습니다. 이국적인 야생동물, 웅장한 산맥, 끝없는 평원과 거대한 강이 있는 인도는 모든 여행자에게 훌륭한 경험을 제공합니다.',
    'india.hero.p2': '인도는 험준한 마을뿐만 아니라 델리와 무바이 같은 북적이는 대도시에도 살고 있으며, 옛 쇼핑 바자, 좁은 골목, 수백 년 된 기념물과 현대적인 마천루가 완벽하게 어우러져 있습니다.',
    'india.stat.capital': '수도',
    'india.stat.capital.val': '뉴델리',
    'india.stat.best': '최적 방문 시기',
    'india.stat.best.val': '10월 ~ 3월',
    'india.stat.currency': '통화',
    'india.stat.currency.val': '인도 루피 (INR)',
    'india.stat.attractions': '주요 명소',
    'india.stat.attractions.val': '타지마할, 라자스탄, 켈라라',
    'india.tours.title': '인도 투어 탐험하기',
    'india.tours.subtitle': '인도의 가장 상징적인 목적지를 잇는 수제 여행',
    'nepal.hero.p1': '숨막히는 히말라야 풍경, 고대 사원, 풍부한 영적 유산의 땅. 세계에서 가장 높은 봉우리부터 생기 넘치는 계곡까지, 네팔은 자연과 문화의 심장으로 잊지 못할 여행을 선사합니다.',
    'nepal.tours.subtitle': '웅장한 히말라야를 잇는 수제 여행',
    'bhutan.hero.p1': '히말라야에 자리한 매혹적인 왕국 부탄은 활기찬 문화, 신성한 수도원, 극적인 풍경의 땅입니다. 번개의 땅이라는 부탄의 독매력을 경험해 보세요.',
    'bhutan.tours.subtitle': '웅장한 번개의 땅을 잇는 수제 여행',
    'srilanka.hero.p1': '인도양의 눈부신 눈물방울 섬 스리랑카는 고대 유적, 탁 트인 차 농장, 깨끗한 해변, 이국적인 야생동물을 자랑합니다. 잊지 못할 열대 낙원으로 떠나보세요.',
    'srilanka.tours.subtitle': '눈물방울 섬을 잇는 수제 여행',
    'wwd.hero.title2': '마루 여행을 발견하세요',
    'wwd.hero.sub2': '자신 있게 세계를 경험하세요',
    'wwd.scroll': '스크롤하여 탐험하기',
    'wwd.cert.recog': '인정받는 우수성',
    'wwd.cert.trusted': '인증 및 신뢰할 수 있는',
    'wwd.cert.iato.full': '인도 여행사 협회',
    'wwd.cert.iato': 'IATO',
    'contact.success': '성공!',
    'contact.success.msg': '곧 연락드리겠습니다.',
    'itin.complete': '여행 완료',
    'itin.thanks': '마루 여행과 함께 탐험해 주셔서 감사합니다!',
    'itin.lookforward': '여러분과 함께 잊지 못할 추억을 만들기를 기대합니다.',
    'itin.plan': '내 여행 계획하기',
    'itin.years': '수년간의 우수성',
    'itin.happy': '행복한 여행객',
    'itin.chat': 'WhatsApp으로 대화하기',
    'itin.whatsapp': 'WhatsApp',
}
};

/* ---------------------------------------------------------------------------
 * Language engine: changeLanguage / apply
 * Persists to localStorage key 'mt_lang'. Handles data-i18n attributes AND
 * walks the DOM to auto-translate any remaining English text node.
 * ------------------------------------------------------------------------- */
(function () {
  var LS_KEY = 'mt_lang';

  function getLang() {
    try { return localStorage.getItem(LS_KEY) || 'en'; } catch (e) { return 'en'; }
  }
  window.getLang = getLang;

  // flat EN->KO map built from dictionary (for text-node auto-translate)
  var FLAT = {};
  var enD = TRANSLATIONS.en || {};
  var koD = TRANSLATIONS.ko || {};
  Object.keys(enD).forEach(function (k) {
    if (koD[k] !== undefined && koD[k] !== enD[k]) FLAT[enD[k]] = koD[k];
  });
  // meal badges + UI words rendered in modals
  FLAT['Breakfast'] = '조식';
  FLAT['Lunch'] = '중식';
  FLAT['Dinner'] = '석식';

  function dict(lang) { return TRANSLATIONS[lang] || TRANSLATIONS.en; }

  // swap data-i18n elements AND data-i18n-placeholder inside root
  function applyI18n(root) {
    root = root || document;
    var d = dict(getLang());
    var els = root.querySelectorAll ? root.querySelectorAll('[data-i18n]') : [];
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (d[key] !== undefined) els[i].textContent = d[key];
    }
    var phs = root.querySelectorAll ? root.querySelectorAll('[data-i18n-placeholder]') : [];
    for (var j = 0; j < phs.length; j++) {
      var pkey = phs[j].getAttribute('data-i18n-placeholder');
      if (d[pkey] !== undefined) phs[j].setAttribute('placeholder', d[pkey]);
    }
  }

  function isEditable(el) {
    var tag = el && el.tagName ? el.tagName.toUpperCase() : '';
    return tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT';
  }

  // translate a text node using the flat map (preserve surrounding whitespace)
  // Tries exact match first, then normalized (whitespace-collapsed) match.
  // Logs unmatched English text when DEBUG_I18N is true for easy gap detection.
  function translateTextNode(node) {
    var t = node.nodeValue;
    if (!t) return false;
    var mch = t.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var core = mch[2];
    if (!core) return false;
    if (FLAT[core] !== undefined) { node.nodeValue = mch[1] + FLAT[core] + mch[3]; return true; }
    // normalized fallback: collapse internal whitespace
    var norm = core.replace(/\s+/g, " ").trim();
    if (norm !== core && FLAT[norm] !== undefined) { node.nodeValue = mch[1] + FLAT[norm] + mch[3]; return true; }
    // dev debug: warn on untranslated english-looking text (skip short/proper-noun-ish)
    if (window.DEBUG_I18N && /[A-Za-z]{3}/.test(core) && core.length > 8) {
      console.warn("[i18n] untranslated text:", JSON.stringify(core.slice(0, 80)));
    }
    return false;
  }

  function walkText(root) {
    if (getLang() === 'en') return;
    root = root || document;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        while (p && p !== document) {
          if (isEditable(p)) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [];
    var n;
    while ((n = walker.nextNode())) list.push(n);
    for (var i = 0; i < list.length; i++) translateTextNode(list[i]);
  }

  function setLangUI(lang) {
    var els = document.querySelectorAll('#opt-en,#opt-ko,[data-lang-opt]');
    for (var i = 0; i < els.length; i++) {
      var id = els[i].getAttribute('id');
      if (id === 'opt-' + lang) els[i].classList.add('active');
      else els[i].classList.remove('active');
    }
  }

  function applyAll(root) {
    applyI18n(root);
    walkText(root);
    applyTourCards(root);
  }

  // Translate static .tour-card elements on country pages using TOURS_KO,
  // matched by the tour id inside the card's onclick href.
  function applyTourCards(root) {
    if (getLang() !== 'ko' || typeof TOURS_KO === 'undefined') return;
    root = root || document;
    var cards = root.querySelectorAll ? root.querySelectorAll('.tour-card') : [];
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var oc = card.getAttribute('onclick') || '';
      var m = oc.match(/id=(tour[a-zA-Z0-9]+|nepal\d+|bhutan\d+|srilanka\d+)/);
      if (!m) continue;
      var k = TOURS_KO[m[1]];
      if (!k) continue;
      var nameEl = card.querySelector('.tour-name');
      var routeEl = card.querySelector('.tour-route');
      var durEl = card.querySelector('.tour-duration-badge');
      var btnEl = card.querySelector('.tour-btn');
      if (nameEl && k.title) nameEl.textContent = k.title;
      if (routeEl && k.route) routeEl.textContent = k.route;
      if (durEl && k.duration) durEl.textContent = k.duration;
      if (btnEl) btnEl.textContent = TRANSLATIONS.ko['btn.view_itinerary'] || '여행 일정 보기';
    }
  }

  window.changeLanguage = function (lang) {
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    setLangUI(lang);
    applyAll(document);
    if (typeof window.onLangChange === 'function') window.onLangChange(lang);
    if (window.__langChangeHandlers) {
      window.__langChangeHandlers.forEach(function (h) { h(lang); });
    }
    // Full page reload so pages that render data at load (e.g. tour_itinerary
    // reading mt_lang from localStorage) reflect the new language completely.
    if (window.mtLangReload !== false) {
      setTimeout(function () { window.location.reload(); }, 50);
    }
  };
  window.setLang = window.changeLanguage;

  // merged modal data helper for country pages
  window.mtModalData = function (tourId, base) {
    if (getLang() !== 'ko' || typeof TOURS_KO === 'undefined' || !TOURS_KO[tourId]) return base;
    var k = TOURS_KO[tourId];
    var out = {
      title: k.title || base.title,
      route: k.route || base.route,
      img: base.img,
      days: []
    };
    if (base.days && k.days) {
      base.days.forEach(function (day, i) {
        var kd = k.days[i] || {};
        var dd = '';
        if (kd.d) dd += kd.d;
        if (kd.d && kd.title) dd += ' \u2013 ';
        if (kd.title) dd += kd.title;
        out.days.push({
          d: dd || day.d,
          t: kd.text ? kd.text.replace(/<\/?p>/gi, '') : day.t,
          m: day.m
        });
      });
    }
    return out;
  };

  function init() {
    setLangUI(getLang());
    applyAll(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);

  } else {
    init();
  }

  // re-apply whenever dynamic content is injected (modals, sliders)
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mu) {
        if (mu.type === 'childList' && mu.addedNodes.length) {
          mu.addedNodes.forEach(function (n) {
            if (n.nodeType === 1) { applyI18n(n); walkText(n); }
          });
        }
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
