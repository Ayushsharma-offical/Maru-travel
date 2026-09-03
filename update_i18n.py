import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

en_trans = '''
    // Wedding Page English Translations
    'dw.eyebrow': 'MARU TRAVEL INDIA PRESENTS',
    'dw.hero.cal': 'Destination',
    'dw.hero.main': 'Weddings',
    'dw.hero.sub': 'Every moment curated into a beautiful story you will remember forever.',
    'dw.btn': 'Begin Planning',
    'dw.quote': 'Some love stories require a grand stage. Whether it\'s timeless romance in a lake palace or vibrant heritage in a desert fortress — we bring your vision to life.',
    'dw.quote.author': '— The Maru Experience',
    'dw.dest.title': '01 — RAJASTHAN',
    'dw.jaipur': 'JAIPUR',
    'dw.jaipur.tag': 'The Pink City — A Royal Celebration',
    'dw.jaipur.desc': 'Accessibility, heritage and convenience make Jaipur India\'s most compelling wedding destination.',
    'dw.jodhpur': 'JODHPUR',
    'dw.jodhpur.tag': 'Where Royal Heritage Lives',
    'dw.udaipur': 'UDAIPUR',
    'dw.udaipur.tag': 'Romance in Every Frame',
    'dw.kumbhalgarh': 'KUMBHALGARH',
    'dw.kumbhalgarh.tag': 'Aravalli Fairytale',
    'dw.delhi': 'DELHI',
    'dw.delhi.tag': 'Where Heritage meets Modern Luxury',
    'dw.srv.title': 'Our Expertise',
    'dw.srv.sub': 'Beautifully Curated. Flawlessly Executed.',
    'dw.srv.1': 'Venue Selection',
    'dw.srv.2': 'Guest Management',
    'dw.srv.3': 'Ceremonial Execution',
    'dw.srv.4': 'Decor & Styling',
    'dw.srv.5': 'Food & Hospitality',
    'dw.srv.6': 'Travel & Logistics',
    'dw.cta.cal': 'Your Story',
    'dw.cta.title.1': 'YOUR DESTINATION.',
    'dw.cta.title.2': 'YOUR CELEBRATION.',
    'dw.cta.sub': 'Let us create a wedding that feels uniquely yours in every single detail.',
    'dw.cta.btn': 'Contact Our Planners',
'''

ko_trans = '''
    // Wedding Page Korean Translations
    'dw.eyebrow': '마루 트래블 인디아 프레젠츠',
    'dw.hero.cal': '데스티네이션',
    'dw.hero.main': '웨딩스',
    'dw.hero.sub': '모든 순간이 영원히 기억될 아름다운 이야기로 담겨집니다.',
    'dw.btn': '플래닝 시작하기',
    'dw.quote': '어떤 러브스토리는 웅장한 무대를 필요로 합니다. 호수 위 고궁의 시간을 초월한 로맨스든, 사막 요새의 생생한 문화유산이든 — 당신의 비전을 현실로 만들어 드립니다.',
    'dw.quote.author': '— 더 마루 익스피리언스',
    'dw.dest.title': '01 — 라자스탄',
    'dw.jaipur': '자이푸르',
    'dw.jaipur.tag': '핑크시티 — 로열 셀레브레이션',
    'dw.jaipur.desc': '접근성, 문화유산, 편리함이 자이푸르를 인도에서 가장 매력적인 웨딩 목적지로 만듭니다.',
    'dw.jodhpur': '조드푸르',
    'dw.jodhpur.tag': '왕실의 전통이 살아있는 곳',
    'dw.udaipur': '우다이푸르',
    'dw.udaipur.tag': '모든 프레임 속의 로맨스',
    'dw.kumbhalgarh': '쿰발가르',
    'dw.kumbhalgarh.tag': '아라발리 산맥의 동화',
    'dw.delhi': '델리',
    'dw.delhi.tag': '유산과 현대 럭셔리의 만남',
    'dw.srv.title': '아워 엑스퍼티즈',
    'dw.srv.sub': '아름답게 기획되고. 정교하게 실현됩니다.',
    'dw.srv.1': '장소 선정',
    'dw.srv.2': '게스트 관리',
    'dw.srv.3': '의식 진행',
    'dw.srv.4': '장식 & 스타일링',
    'dw.srv.5': '음식 & 호스피탈리티',
    'dw.srv.6': '여행 & 물류',
    'dw.cta.cal': '당신의 이야기',
    'dw.cta.title.1': '당신의 목적지.',
    'dw.cta.title.2': '당신의 셀레브레이션.',
    'dw.cta.sub': '모든 디테일에서 오직 당신만을 위한 웨딩을 만들어 드립니다.',
    'dw.cta.btn': '플래너에게 문의하기',
'''

# We know ko: { separates them. 
# We'll replace \n  },\n\n  ko: { with en_trans + '\n  },\n\n  ko: {'
content = re.sub(r'(\n  },\n\n  ko: \{)', en_trans + r'\1', content)

# And replace \n}\n};\n\n/\* - with ko_trans + '\n}\n};\n\n/\* -'
content = re.sub(r'(\n}\n};\n\n/\* -)', ko_trans + r'\1', content)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated i18n.js")
