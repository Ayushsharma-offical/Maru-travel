/**
 * ===========================================================================
 *  MARU CONCIERGE — flagship virtual travel assistant for Maru Travel
 * ===========================================================================
 *  A complete, self-contained chat widget built as a single IIFE.
 *
 *  FEATURES
 *  --------
 *   1. Liquid-glass (glassmorphism + neumorphism) UI with Maru Gold accents
 *   2. Fully bilingual (English / 한국어) — follows the site's mt_lang switch
 *   3. Full Maru Travel knowledge base (7 categories, 40+ Q&A, EN + KO)
 *   4. Smart intent engine (small talk, keyword scoring, fuzzy matching)
 *   5. Live question search box
 *   6. Follow-up suggestion chips after every answer
 *   7. Proactive greeting + returning-visitor welcome (session memory)
 *   8. Typing indicator, timestamps, scroll animations
 *   9. Quick-trip recommendation quiz (region → travelers → interest)
 *  10. Visa mini-guide (India / Nepal / Bhutan / Sri Lanka)
 *  11. Best-season guide for popular destinations
 *  12. Random travel tips woven into long conversations
 *  13. Message reactions (👍 ❤️ 😊) with persisted counters
 *  14. One-tap "Was this helpful?" feedback
 *  15. Direct WhatsApp bridge everywhere (header button, chips, answers)
 *  16. Unread ping badge, minimize/close/reset controls
 *  17. Fully responsive (mobile) + reduced-motion support
 *  18. Content-company-only Q&A — no pricing / discounts / offers
 * ===========================================================================
 */

(function () {
  "use strict";

  /* Guard so two copies of the widget can never render at once. */
  if (window.__MARU_CONCIERGE_LOADED__) return;
  window.__MARU_CONCIERGE_LOADED__ = true;

  /* ====================================================================
   *  1. CONFIG — branding, contact channels, language wiring
   * ==================================================================== */

  var BRAND = {
    brand: {
      name: "Maru Travel",
      nameKo: "마루 트래블",
      tagline: "Curating Exceptional Journeys",
      taglineKo: "특별한 여행을 큐레이팅합니다",
      botName: "Maru Concierge",
      botNameKo: "마루 컨시어지",
      status: "Online · ready to help",
      statusKo: "온라인 · 도와드릴 준비가 되었습니다",
      gold: "#c9a84c",
      goldDark: "#a8862f",
      navyFrom: "#182736",
      navyTo: "#0e1a26",
      avatarIcon: "fas fa-concierge-bell"
    },
    contact: {
      whatsappNumber: "919891587778",
      whatsappDisplay: "+91 98915 87778",
      email: "info@marutravel.in",
      phoneDisplay: "+91 98915 87778",
      address:
        "6A, First Floor, Uttam Nagar Main Rd, Near Metro Pillar No. 666, " +
        "New Delhi - 110059, India"
    },
    /* How long (ms) after page load before the FAB pings a hint. */
    proactiveDelay: 15000,
    /* Max questions shown in the search results. */
    searchMax: 5,
    /* Fixed "about" content used in the About drawer. */
    aboutLine: "Established in 2023 by Mr. Tejinder Pal Singh — built on 20+ years of global travel industry experience.",
    aboutLineKo: "2023년, 글로벌 여행 업계 20년 이상의 경험을 가진 테진더 팔 싱 대표가 설립했습니다."
  };

  /* ------------------------------------------------------------------
   *  Language helper — mirrors the site's localStorage key (mt_lang).
   *  The main i18n engine reloads the page on toggle, so this reads the
   *  persisted value on every call and is always up to date.
   * ------------------------------------------------------------------ */
  function getLang() {
    try {
      var stored = window.localStorage.getItem("mt_lang");
      return stored === "ko" ? "ko" : "en";
    } catch (err) {
      return "en";
    }
  }

  var LANG = getLang();

  /* Convenient bilingual picker used across the whole widget. */
  function T(en, ko) {
    return (LANG === "ko" && ko) ? ko : en;
  }

/* ====================================================================
   *  2. KNOWLEDGE BASE — Maru Travel only
   *  Each question carries { q, a } (English) and { qKo, aKo } (Korean)
   * ==================================================================== */

  var CATEGORIES = [
    {
      id: "about",
      label: "About Maru Travel",
      labelKo: "Maru Travel 소개",
      icon: "🏢",
      intro: "Here is a quick look at who we are and how we began.",
      introKo: "저희가 누구인지, 어떻게 시작했는지 간단히 소개합니다.",
      questions: [
        {
          q: "What is Maru Travel?",
          qKo: "Maru Travel은 어떤 회사인가요?",
          a: "Maru Travel is a trusted destination management and travel " +
             "solutions company specializing in both Inbound and Outbound " +
             "Tourism. We craft customized travel experiences for leisure " +
             "travelers, families, honeymooners, corporate clients, " +
             "educational groups, and special interest tours.",
          aKo: "Maru Travel은 인바운드·아웃바운드 관광을 전문으로 하는 신뢰받는 " +
              "여행 전문 기업입니다. 레저 여행객, 가족, 신혼여행, 기업 고객, " +
              "교육 단체, 특수 관심 여행까지 맞춤형 여행 경험을 설계해 드립니다."
        },
        {
          q: "When was Maru Travel established?",
          qKo: "Maru Travel은 언제 설립되었나요?",
          a: "Maru Travel was founded in 2023 by Mr. Tejinder Pal Singh, " +
             "built on more than 20 years of his professional experience " +
             "in the global travel industry.",
          aKo: "Maru Travel은 글로벌 여행 업계에서 20년 이상의 경력을 가진 " +
              "테진더 팔 싱 대표가 2023년에 설립했습니다."
        },
        {
          q: "Who is Mr. Tejinder Pal Singh?",
          qKo: "테진더 팔 싱 대표는 어떤 분인가요?",
          a: "Mr. Tejinder Pal Singh is the Founder & Managing Director of " +
             "Maru Travel. Before starting Maru Travel, he held key positions " +
             "at some of the travel industry's most respected multinational " +
             "companies, including Thomas Cook, TCI, and other leading travel " +
             "organizations.",
          aKo: "테진더 팔 싱 대표는 Maru Travel의 창립자이자 대표이사입니다. " +
              "창업 이전에는 Thomas Cook, TCI 등 업계에서 가장 존경받는 " +
              "다국적 여행사들의 주요 보직을 맡았습니다."
        },
        {
          q: "What inspired the creation of Maru Travel?",
          qKo: "Maru Travel을 만들게 된 계기는 무엇인가요?",
          a: "Mr. Singh's extensive industry knowledge, strong global network, " +
             "and passion for delivering exceptional travel experiences " +
             "inspired him to build a company that puts personalized service " +
             "first — that company is Maru Travel.",
          aKo: "깊은 업계 통찰과 탄탄한 글로벌 네트워크, 그리고 최상의 여행 경험을 " +
              "전달하려는 열정이 창업으로 이어졌고, 개인 맞춤 서비스를 가장 중시하는 " +
              "회사가 바로 Maru Travel입니다."
        },
        {
          q: "What kind of travelers do you work with?",
          qKo: "어떤 여행객들과 함께 일하시나요?",
          a: "We work with leisure travelers, families, honeymooners, corporate " +
             "clients, educational groups, and special interest tour groups — " +
             "essentially anyone looking for a well-planned, personalized journey.",
          aKo: "레저 여행객, 가족, 신혼부부, 기업 임직원, 교육 단체, 특별 관심 여행 " +
              "단체까지 폭넓게 함께하고 있습니다. 잘 계획된 맞춤형 여행을 원하는 모든 분들을 위해 있습니다."
        },
        {
          q: "Which regions do you specialize in?",
          qKo: "전문으로 하는 지역은 어디인가요?",
          a: "Our core expertise is across Asia, where we have built strong " +
             "destination knowledge and reliable local partnership teams. As " +
             "part of our global expansion, we now also offer curated travel " +
             "experiences throughout North America and South America.",
          aKo: "핵심 전문 지역은 아시아 전역이며 현지 파트너십과 노하우가 깊습니다. " +
              "글로벌 확대의 일환으로 현재는 북미와 남미 전역의 큐레이티드 여행도 제공합니다."
        }
      ]
    },

    {
      id: "services",
      label: "Our Services",
      labelKo: "제공 서비스",
      icon: "🧳",
      intro: "Here is everything we take care of for your trip.",
      introKo: "여행을 위해 저희가 맡아 처리해 드리는 모든 서비스입니다.",
      questions: [
        {
          q: "What services does Maru Travel offer?",
          qKo: "어떤 서비스를 제공하나요?",
          a: "We offer a full suite of travel services: Inbound & Outbound " +
             "Tour Packages, International & Domestic Holiday Packages, " +
             "Flight Reservations, Hotel Bookings, Visa Assistance, Travel " +
             "Insurance, Airport Transfers & Ground Transportation, Corporate " +
             "& Group Travel, and Customized Travel Itineraries.",
          aKo: "인바운드·아웃바운드 투어 패키지, 국내·해외 휴가 패키지, 항공권 예약, 호텔 예약, " +
              "비자 지원, 여행자 보험, 공항 이동·현지 교통, 기업·단체 여행, 맞춤형 여정 등 " +
              "여행 전 과정을 위한 종합 서비스를 제공합니다."
        },
        {
          q: "Do you handle both inbound and outbound tours?",
          qKo: "인바운드와 아웃바운드 여행을 모두 처리하시나요?",
          a: "Yes — we design Inbound & Outbound Tour Packages, so whether " +
             "travelers are arriving in India or heading abroad, we can plan " +
             "the full itinerary end to end.",
          aKo: "네. 인바운드와 아웃바운드 투어 패키지를 모두 설계하며, 인도에 오시거나 " +
              "해외로 가시거나, 어느 쪽이든 전체 일정을 처음부터 끝까지 계획해 드립니다."
        },
        {
          q: "Can you book my flights and hotels?",
          qKo: "항공권과 호텔 예약을 해 주시나요?",
          a: "Absolutely. We provide Flight Reservations and Hotel Bookings " +
             "as part of our end-to-end trip-planning service, so you never " +
             "have to coordinate multiple vendors yourself.",
          aKo: "물론입니다. 항공권 예약과 호텔 예약까지 포함한 원스톱 여행 기획 서비스로, " +
              "여러 업체를 직접 상대하실 필요가 없습니다."
        },
        {
          q: "Do you help with visas?",
          qKo: "비자 신청도 도와주시나요?",
          a: "Yes, Visa Assistance is one of our core services. We guide you " +
             "through the documentation and application process for your " +
             "destination.",
          aKo: "네. 비자 지원은 핵심 서비스 중 하나입니다. 목적지별 서류 준비부터 " +
              "신청 절차까지 체계적으로 안내해 드립니다."
        },
        {
          q: "Do you offer travel insurance?",
          qKo: "여행자 보험도 준비되나요?",
          a: "Yes — Travel Insurance is part of our travel solutions, so you " +
             "can travel with extra peace of mind.",
          aKo: "네. 여행자 보험을 함께 준비할 수 있어 마음의 안정을 더한 여행을 " +
              "즐기실 수 있습니다."
        },
        {
          q: "Can you arrange airport transfers?",
          qKo: "공항 픽업도 가능한가요?",
          a: "Yes — Airport Transfers & Ground Transportation are included " +
             "in our services, so your journey is seamless from the moment " +
             "you land.",
          aKo: "네. 공항 픽업·샌딩과 도시 내 이동 차량 서비스를 제공하여, 내리시는 " +
              "순간부터 매끄러운 여행이 시작됩니다."
        },
        {
          q: "Do you handle corporate or group travel?",
          qKo: "기업 또는 단체 여행도 관리하시나요?",
          a: "Yes, we manage Corporate & Group Travel, including coordinated " +
             "logistics for larger groups and business delegations.",
          aKo: "네. 기업 여행과 단체 여행을 모두 진행하며, 대규모 그룹과 출장단의 " +
              "일정, 인원, 물동사항까지 함께 조율합니다."
        },
        {
          q: "Can you create a completely custom itinerary for me?",
          qKo: "완전 맞춤형 일정도 만들어 주실 수 있나요?",
          a: "Yes — Customized Travel Itineraries are at the heart of what " +
             "we do. Tell us your preferences, budget, and travel dates and " +
             "our team will design a personalized plan.",
          aKo: "네. 맞춤형 여정이야말로 저희의 핵심입니다. 선호, 예산, 날짜를 알려주시면 " +
              "팀이 하나하나 개인 맞춤 계획을 설계해 드립니다."
        }
      ]
    },

{
      id: "certifications",
      label: "Certifications & Recognition",
      labelKo: "인증 및 수상 내역",
      icon: "🏆",
      intro: "A few of the credentials that back our promises.",
      introKo: "저희의 약속을 뒷받침해 주는 주요 인증들입니다.",
      questions: [
        {
          q: "Is Maru Travel a certified travel company?",
          qKo: "Maru Travel은 인증받은 여행사인가요?",
          a: "Yes. Maru Travel is recognized and certified by the International " +
             "Air Transport Association (IATA), the Ministry of Tourism, " +
             "Government of India, and Delhi Tourism as an Official Tourism " +
             "Partner.",
          aKo: "네. Maru Travel은 국제항공운송협회(IATA), 인도 정부 관광부, 그리고 " +
              "델리 관광청으로부터 공식 관광 파트너로 인정받은 인증 여행사입니다."
        },
        {
          q: "What is your IATA certification?",
          qKo: "IATA 인증은 무엇인가요?",
          a: "We are certified by the International Air Transport Association " +
             "(IATA), a globally recognized standard for travel agencies " +
             "handling airline bookings and partnerships.",
          aKo: "국제항공운송협회(IATA) 인증을 보유하고 있습니다. 항공권 발권과 항공사 " +
              "제휴를 다루는 여행사에 부여되는 국제적으로 공인된 기준입니다."
        },
        {
          q: "Are you recognized by the Government of India?",
          qKo: "인도 정부의 인정을 받았나요?",
          a: "Yes, we are recognized by the Ministry of Tourism, Government " +
             "of India, reflecting our compliance with national tourism " +
             "standards.",
          aKo: "네. 인도 정부 관광부로부터 인정받은 업체로, 국가 관광 기준을 준수하고 " +
              "있음을 반영합니다."
        },
        {
          q: "What does the Delhi Tourism partnership mean?",
          qKo: "델리 관광청 파트너십은 어떤 의미인가요?",
          a: "We hold Official Tourism Partner status with Delhi Tourism, " +
             "which recognizes our commitment to quality service and ethical " +
             "business practices in the region.",
          aKo: "델리 관광청의 공식 관광 파트너로 선정된 회사입니다. 지역 내 품질 서비스와 " +
              "윤리적 영업 관행을 지켜온 노력을 인정받은 것입니다."
        },
        {
          q: "Why do these certifications matter to me as a traveler?",
          qKo: "여행자에게 이러한 인증이 왜 중요한가요?",
          a: "These recognitions reflect our commitment to quality, reliability, " +
             "ethical business practices, and customer satisfaction — so you " +
             "can book with confidence.",
          aKo: "이 인증들은 품질, 신뢰성, 윤리적 운영, 고객 만족에 대한 저희의 다  결의 " +
              "보여줍니다. 안심하고 예약하실 수 있는 이유입니다."
        }
      ]
    },

    {
      id: "whyus",
      label: "Why Choose Maru Travel?",
      labelKo: "왜 Maru Travel인가요?",
      icon: "⭐",
      intro: "A quick summary of what sets us apart.",
      introKo: "저희가 특별한 이유를 짧게 정리했습니다.",
      questions: [
        {
          q: "How many years of experience does Maru Travel have?",
          qKo: "Maru Travel의 경력은 얼마나 되나요?",
          a: "Our leadership brings 20+ years of travel industry expertise, " +
             "gained at major global travel organizations before founding " +
             "Maru Travel.",
          aKo: "창립 전 세계 주요 여행사에서 쌓은 20년 이상의 여행 업계 전문성을 " +
                "바탕으로 합니다."
        },
        {
          q: "Is Maru Travel run by experienced professionals?",
          qKo: "경험 많은 전문가가 운영하나요?",
          a: "Yes — Maru Travel was founded by an experienced travel " +
             "professional, Mr. Tejinder Pal Singh, who previously held senior " +
             "roles at companies like Thomas Cook and TCI.",
          aKo: "네. 전직 Thomas Cook과 TCI에서 고위직을 역임한 경험 많은 여행 전문가 " +
                "테진더 팔 싱 대표가 설립했습니다."
        },
        {
          q: "Are you specialists in Asia travel?",
          qKo: "아시아 여행 전문인가요?",
          a: "Yes, we are specialists in destinations across Asia, with deep " +
             "local knowledge and dependable on-ground partnerships throughout " +
             "the region.",
          aKo: "네. 아시아 전역의 지역별 깊은 지식과 믿을 수 있는 현지 파트너십을 " +
                "갖춘 전문가들입니다."
        },
        {
          q: "Do you operate outside Asia as well?",
          qKo: "아시아 외에도 활동하시나요?",
          a: "Yes — as part of our global expansion, we are extending our travel " +
             "solutions across North & South America, in addition to our core " +
             "strength in Asia.",
          aKo: "네. 아시아의 강점을 바탕으로 글로벌 확장 차원에서 북미·남미 지역으로도 " +
                "여행 솔루션을 확대하고 있습니다."
        },
        {
          q: "Is Maru Travel a certified company?",
          qKo: "인증받은 회사인가요?",
          a: "Yes, we are a government-recognized and industry-certified company, " +
             "backed by IATA, the Ministry of Tourism, and Delhi Tourism.",
          aKo: "네. 정부 인정과 업계 인증을 모두 받았으며, IATA, 인도 관광부, 델리 " +
                "관광청으로부터 인정을 받고 있습니다."
        },
        {
          q: "Will my trip be personalized to my needs?",
          qKo: "각자의 니즈에 맞춰 여행이 진행되나요?",
          a: "Yes — we provide personalized travel planning, tailoring every " +
             "itinerary to your preferences rather than offering one-size-fits-all " +
             "packages.",
          aKo: "네. 획일화된 패키지 대신 선호에 맞춰 여정 하나하나를 설계하는 " +
                "맞춤형 여행 기획을 제공합니다."
        },
        {
          q: "What kind of support can I expect during my trip?",
          qKo: "여행 중 어떤 지원을 받을 수 있나요?",
          a: "We provide dedicated customer support from the planning stage all " +
             "the way through to your return journey, so you are never left " +
             "without help.",
          aKo: "계획 단계부터 귀국 순간까지 전담 고객 지원이 이어지며, 어느 순간에도 " +
                "혼자 문제를 붙잡지 않으셔도 됩니다."
        }
      ]
    },

    {
      id: "mission",
      label: "Mission & Vision",
      labelKo: "미션과 비전",
      icon: "🎯",
      intro: "What drives Maru Travel every day.",
      introKo: "매일 Maru Travel을 움직이는 것들입니다.",
      questions: [
        {
          q: "What is Maru Travel's mission?",
          qKo: "Maru Travel의 미션은 무엇인가요?",
          a: "Our mission is to deliver exceptional travel experiences through " +
             "personalized service, expert guidance, and innovative travel " +
             "solutions that inspire confidence and create unforgettable memories.",
          aKo: "맞춤형 서비스와 전문가 안내, 혁신적인 여행 솔루션으로 신뢰를 심어주고 " +
                "잊지 못할 추억을 만드는 최상의 여행 경험을 제공하는 것이 미션입니다."
        },
        {
          q: "What is Maru Travel's vision?",
          qKo: "Maru Travel의 비전은 무엇인가요?",
          a: "Our vision is to become a globally trusted travel company, " +
             "recognized for excellence, integrity, and customer satisfaction " +
             "while connecting travelers to the world's most inspiring destinations.",
          aKo: "탁월함과 정직성, 고객 만족으로 인정받는 세계적 신뢰의 여행사가 되어 " +
               "세계에서 가장 영감을 주는 목적지로 여행자를 연결하는 것이 비전입니다."
        }
      ]
    },

    {
      id: "destinations",
      label: "Destinations We Cover",
      labelKo: "여행 가능한 지역",
      icon: "🌍",
      intro: "Where we can take you, near and far.",
      introKo: "가까운 곳부터 먼 곳까지, 데려다 드릴 수 있는 곳입니다.",
      questions: [
        {
          q: "Which destinations do you cover?",
          qKo: "어느 지역으로 여행을 가능한가요?",
          a: "Our core strength is across Asia including the Indian subcontinent, " +
             "and we now also offer curated travel experiences throughout " +
             "North America and South America as part of our global expansion.",
          aKo: "인도 반도를 포함한 아시아 전역이 강점이며, 글로벌 확대 차원에서 북미와 " +
               "남미 전역의 큐레이티드 여행도 제공합니다."
        },
        {
          q: "Do you offer luxury train journeys?",
          qKo: "호화 열차 여행도 제공하나요?",
          a: "Yes, luxury train experiences (such as the Maharaja Express) are " +
             "part of our curated offerings — you can discover them under the " +
             "Luxury Trains section of our website.",
          aKo: "네. 마하라자 익스프레스 같은 럭셔리 열차 여행이 큐레이티드 상품에 포함되어 " +
               "있으며, 웹사이트의 럭셔리 열차 섹션에서 만나보실 수 있습니다."
        },
        {
          q: "Do you plan honeymoon trips?",
          qKo: "신혼여행도 계획해 주나요?",
          a: "Yes, honeymoon trips are one of our specialties, designed as a " +
             "personalized, romantic itinerary for couples.",
          aKo: "네. 신혼부부를 위한 로맨틱한 맞춤 여정을 설계하는 것이 주요 전문 영역 중 " +
              "하나입니다."
        },
        {
          q: "Do you organize wildlife safaris?",
          qKo: "야생동물 사파리도 진행하나요?",
          a: "Yes, wildlife safaris are among the special interest tours we curate, " +
             "alongside cultural and adventure travel experiences.",
          aKo: "네. 문화, 어드벤처 여행과 함께 특수 관심 투어의 하나로 야생동물 사파리를 " +
               "전문적으로 큐레이팅 합니다."
        },
        {
          q: "Where can I find the tour options?",
          qKo: "여행 상품은 어디서 볼 수 있나요?",
          a: "Explore the Tours section on our website — you will find curated " +
             "India journeys, Nepal & Bhutan adventures and Sri Lanka escapes, " +
             "each with a day-by-day itinerary.",
          aKo: "웹사이트의 투어 섹션에서 인도, 네팔·부탄 어드벤처, 스리랑카 휴양 등 " +
               "일별 상세 일정이 포함된 큐레이티드 여행들을 만나보실 수 있습니다."
        }
      ]
    },

    {
      id: "booking",
      label: "Booking & Contact",
      labelKo: "예약 및 문의",
      icon: "📞",
      intro: "How to reach us and get your trip started.",
      introKo: "연락하는 방법과 여행 시작을 하는 방법입니다.",
      questions: [
        {
          q: "How can I contact Maru Travel?",
          qKo: "Maru Travel에 어떻게 연락하나요?",
          a: "You can reach us directly via WhatsApp at +91 98915 87778, or email " +
             "us at info@marutravel.in. There is also a WhatsApp button in " +
             "this chat window.",
          aKo: "WhatsApp(+91 98915 87778)이나 이메일(info@marutravel.in)로 연락하실 " +
               "수 있고, 이 채팅 창 안에 있는 WhatsApp 버튼을 이용하셔도 됩니다."
        },
        {
          q: "Where is your office located?",
          qKo: "사무실은 어디에 있나요?",
          a: "Our head office is at 6A, First Floor, Uttam Nagar Main Rd, Near " +
             "Metro Pillar No. 666, New Delhi - 110059.",
          aKo: "본사는 New Delhi - 110059, Uttam Nagar Main Rd, 지하철 기둥 666번 근처, " +
                "6A 1층에 위치해 있습니다."
        },
        {
          q: "How do I start planning a trip with you?",
          qKo: "어떻게 여행 계획을 시작하나요?",
          a: "The fastest way is to message us on WhatsApp or email with your " +
             "preferred destination, travel dates, and number of travelers — our " +
             "team will get back to you with a personalized itinerary.",
          aKo: "가장 빠른 방법은 원하는 여행지, 날짜, 인원수를 함께 WhatsApp이나 이메일로 " +
               "보내는 것입니다. 팀이 맞춤형 계획으로 회신해 드립니다."
        },
        {
          q: "Do you coordinate corporate travel invoicing?",
          qKo: "기업 여행 청구도 처리해 주나요?",
          a: "Yes, for Corporate & Group Travel we can coordinate invoicing and " +
             "documentation suited to business travel requirements — just mention " +
             "this when you reach out.",
          aKo: "네. 기업·단체 여행의 경우 비즈니스 여행 조건에 맞는 청구서와 서류를 함께 " +
               "준비해 드립니다. 연락 시 말씀만 해 주시면 됩니다."
        }
      ]
    }
  ];

/* ====================================================================
   *  3. SMALL TALK, VISA GUIDE, BEST SEASON GUIDE, TRAVEL TIPS, QUIZ
   * ==================================================================== */

  var SMALL_TALK = [
    {
      triggers: ["how are you", "how r u", "hows it going"],
      reply: "I am doing great, thank you for asking! How can I help plan your next journey?",
      replyKo: "덕분에 기분 좋게 있습니다! 다음 여행 계획을 어떻게 도와드릴까요?"
    },
    {
      triggers: ["what can you do", "what do you do", "help me", "what can i ask"],
      reply: "I can answer anything about Maru Travel — our company, services, destinations, certifications, honeymoons, visas, best seasons, and more. Just pick a topic below!",
      replyKo: "저는 Maru Travel에 대해 모두 답해드립니다 — 회사 소개, 서비스, 여행지, 인증, 신혼여행, 비자, 최적의 시즌 등. 아래 주제를 선택해 주세요!"
    },
    {
      triggers: ["who are you", "what are you", "your name", "what is your name"],
      reply: "I am the Maru Concierge — your personal virtual travel assistant from Maru Travel. Ask me anything!",
      replyKo: "저는 Maru Travel의 개인 맞춤형 가상 여행 가이드인 Maru 컨시어지입니다. 무엇이든 물어보세요!"
    },
    {
      triggers: ["hi", "hello", "hey", "namaste", "namaskar", "good morning", "good afternoon", "good evening"],
      reply: "Hello! Namaste! How can I help you plan your journey today? Pick a topic below to get started.",
      replyKo: "안녕하세요! 나마스테! 오늘 여행 계획을 어떻게 도와드릴까요? 아래에서 주제를 선택해 주세요."
    },
    {
      triggers: ["thank you", "thanks", "thank u", "thankyou", "thx"],
      reply: "You are most welcome! Is there anything else you would like to know about Maru Travel?",
      replyKo: "별말씀을요! Maru Travel에 대해 더 궁금한 점이 있으신가요?"
    },
    {
      triggers: ["bye", "goodbye", "see you", "see ya"],
      reply: "Thanks for chatting with Maru Travel! We cannot wait to plan your next journey.",
      replyKo: "Maru Travel과 대화해 주셔서 감사합니다! 다음 여행을 설계해 드릴 날을 기대합니다."
    },
    {
      triggers: ["are you human", "are you real", "bot or human"],
      reply: "I am the Maru Travel assistant — a friendly chatbot! But behind me is a real team of travel experts ready to help you personally via WhatsApp.",
      replyKo: "저는 Maru Travel의 어시스턴트 챗봇입니다! 그렇지만 뒤에는 실제 전문가 팀이 항상 WhatsApp에서 개인 상담을 준비하고 있답니다."
    },
    {
      triggers: ["how much", "price", "pricing", "cost", "costs", "cheap", "expensive", "discount", "offer", "deal", "rate"],
      reply: "Every journey is tailored individually, so pricing depends on your itinerary, season, hotels and group size. Share your plan on WhatsApp and our team will send a completely personalized quote.",
      replyKo: "여행은 모두 개별 맞춤으로 진행되어 일정, 시즌, 호텔, 인원에 따라 요금이 달라집니다. 계획을 WhatsApp으로 공유해 주시면 맞춤 견적을 안내해 드립니다."
    },
    {
      triggers: ["where are you", "location", "address", "office"],
      reply: "Our head office is at 6A, First Floor, Uttam Nagar Main Rd, Near Metro Pillar No. 666, New Delhi - 110059, India.",
      replyKo: "본사는 인도 뉴델리 Uttam Nagar Main Rd, 지하철 기둥 666번 근처 6A 1층에 있습니다."
    },
    {
      triggers: ["call", "phone", "number", "contact number"],
      reply: "You can reach us on WhatsApp at +91 98915 87778 or email info@marutravel.in.",
      replyKo: "WhatsApp +91 98915 87778 또는 이메일 info@marutravel.in 로 문의하실 수 있습니다."
    }
  ];

  /* ---- Mini visa guide ------------------------------------------------ */
  var VISA_GUIDE = {
    india: {
      label: "India · 인도",
      en: "Most nationalities apply for an e-Tourist Visa online (e-visa) before arrival — passport valid 6+ months, return ticket, hotel booking, and photos. We hand-hold the entire application for you.",
      ko: "대부분의 국적은 입국 전 온라인 전자관광비자(e-Visa)를 신청합니다. 유효기간 6개월 이상의 여권, 왕복항공권, 호텔 예약, 사진이 필요하며, 신청 내내 저희가 함께합니다."
    },
    nepal: {
      label: "Nepal · 네팔",
      en: "Tourist visas are issued on arrival at Tribhuvan International Airport or land borders — multiple entry for 15/30/90 days. Carry the fee in USD and 2 passport photos.",
      ko: "네팔은 트리부반 국제공항이나 국경에서 도착 비자 발급이 가능합니다 — 15/30/90일 다회 입국. USD 현금과 사진 2장을 준비하세요."
    },
    bhutan: {
      label: "Bhutan · 부탄",
      en: "Bhutan issues visas only through licensed local operators — Maru Travel handles the clearance and the Sustainable Development Fee arrangements for you.",
      ko: "부탄은 현지 공인 여행사를 통해서만 비자를 발급합니다. Maru Travel이 비자 승인과 지속가능개발비(SDF) 절차를 대신 진행해 드립니다."
    },
    srilanka: {
      label: "Sri Lanka · 스리랑카",
      en: "Sri Lanka grants the ETA (Electronic Travel Authorization) online before arrival — usually approved within 24-48 hours. Keep the approval printout and return ticket ready.",
      ko: "스리랑카는 대부분 입국 전 온라인 전자여행허가(ETA)를 받습니다. 보통 24~48시간 내 승인되며, 승인 출력본과 왕복항공권을 준비하세요."
    }
  };

  /* ---- Best travel seasons --------------------------------------------- */
  var SEASON_GUIDE = {
    golden: "The Golden Triangle (Delhi–Agra–Jaipur) is best from October to March — cool days and clear skies. Summer (Apr–Jun) gets hot and July–Sep brings the monsoon.",
    goldenKo: "황금삼각지대(델리–아그라–자이푸르)는 10월~3월이 최적기입니다. 여름(4~6월)은 덥고, 7~9월은 장마철입니다.",
    kerala: "Kerala is ideal from September to March (February–April is also lovely). Avoid the heaviest monsoon weeks of June–August.",
    keralaKo: "케랄라는 9월~3월이 최적기이며, 2월~4월도 좋습니다. 6~8월 장마철은 피하는 것이 좋습니다.",
    nepal: "Nepal trekking and sightseeing shine in March–May and October–December. Winter (Dec–Feb) stays crisp and clear in Kathmandu.",
    nepalKo: "네팔은 3~5월과 10~12월이 여행 최적기입니다. 겨울(12~2월)은 카트만두의 하늘이 맑고 상쾌합니다.",
    bhutan: "Bhutan is lovely in March–May (festivals and rhododendrons) and September–November (clear mountain views).",
    bhutanKo: "부탄은 3~5월(축제와 철쭉)과 9~11월(맑은 산 전망)이 가장 좋습니다.",
    srilanka: "Sri Lanka's weather varies by coast — the south and the hill country are at their best from December to March.",
    srilankaKo: "스리랑카는 해안마다 날씨가 다르며, 남부와 산악 지역은 12월~3월이 가장 쾌적합니다."
  };

  /* ---- Travel tips shown occasionally --------------------------------- */
  var TRAVEL_TIPS = [
    { en: "Carry a power bank — long sightseeing days drain phones fast.", ko: "보조 배터리는 필수입니다. 긴 관광 일정에서는 휴대폰 배터리가 금방 방전됩니다." },
    { en: "Dress modestly when visiting Indian temples — covered shoulders help.", ko: "인도 사원 방문 시 어깨가 가려지는 단정한 복장을 준비하세요." },
    { en: "Stay hydrated and drink bottled water on hot day trips.", ko: "무더운 외출일에는 수분을 충분히 섭취하고 생수만 마시세요." },
    { en: "Book luxury trains (like the Maharaja Express) several weeks ahead.", ko: "마하라자 익스프레스 같은 럭셔리 열차는 몇 주 전에 예약하는 것이 좋습니다." },
    { en: "Keep photocopies of passports and visas stored separately.", ko: "여권과 비자 서류의 사본은 따로 보관하세요." },
    { en: "North Indian meals are flavorful — mild versions are always available.", ko: "북인도 음식은 풍미가 강하지만 부드러운 맛으로도 조리 가능합니다." },
    { en: "See the Taj Mahal at sunrise — it is worth waking up early for.", ko: "타지마할은 일출 때 보세요 — 일찍 일어날 가치가 있습니다." },
    { en: "Monsoon timing matters in Kerala and Goa — our team guides the best weeks.", ko: "케랄라와 고아에서는 장마 시기가 중요합니다 — 팀이 최적의 주차를 안내해 드립니다." }
  ];

  /* ---- Quick-trip recommendation quiz --------------------------------- */
  var QUIZ = {
    chipEn: "✨ Find my perfect trip",
    chipKo: "✨ 나에게 딱 맞는 여행 찾기",
    steps: [
      {
        key: "region",
        askEn: "Where would you like to go?",
        askKo: "어느 지역으로 가시나요?",
        options: [
          { en: "India", ko: "인도" },
          { en: "Nepal", ko: "네팔" },
          { en: "Bhutan", ko: "부탄" },
          { en: "Sri Lanka", ko: "스리랑카" }
        ]
      },
      {
        key: "travelers",
        askEn: "Who is traveling?",
        askKo: "누가 함께 가나요?",
        options: [
          { en: "Couple · honeymoon", ko: "커플 · 신혼여행" },
          { en: "Family with kids", ko: "가족 (아이들과 함께)" },
          { en: "Friends / solo", ko: "친구 · 혼자" },
          { en: "Business group", ko: "비즈니스 그룹" },
          { en: "Senior travelers", ko: "시니어 여행객" }
        ]
      },
      {
        key: "interest",
        askEn: "What excites you most?",
        askKo: "가장 끌리는 것은 무엇인가요?",
        options: [
          { en: "Culture & heritage", ko: "문화유산" },
          { en: "Nature & mountains", ko: "자연 · 산" },
          { en: "Beaches & sunsets", ko: "해변 · 노을" },
          { en: "Wildlife safaris", ko: "야생동물 사파리" },
          { en: "Food & shopping", ko: "맛집 · 쇼핑" }
        ]
      }
    ],
    suggest: function (answers) {
      var region = answers.region || "India";
      var travelers = answers.travelers || "Couple · honeymoon";
      var interest = answers.interest || "Culture & heritage";

      if (region === "India") {
        if (interest === "Wildlife safaris") {
          return "India is a safari paradise — Ranthambore and Jim Corbett tiger safaris with luxury camps, perfectly arranged for " + travelers + " from Delhi.";
        }
        if (interest === "Nature & mountains") {
          return "For nature lovers: a curated Himachal journey (Manali–Kullu) or the floral valleys of Uttarakhand — snow, vast vistas and quiet evenings, planned for " + travelers + ".";
        }
        if (interest === "Beaches & sunsets") {
          return "Think Kerala — a houseboat cruise through the Backwaters, sunset beaches and lagoon resorts, a serene escape for " + travelers + ".";
        }
        if (interest === "Food & shopping") {
          return "Delhi–Jaipur–Agra Classic: street-food walks, royal bazaars and palace cafes — a feast for the senses for " + travelers + ".";
        }
        return "The classic Golden Triangle (Delhi – Agra – Jaipur): Taj Mahal at sunrise, a jeep safari at Amber Fort and luxury heritage hotels, shaped for " + travelers + ".";
      }
      if (region === "Nepal") {
        return "Nepal is mountains and soul — Kathmandu's temples, Pokhara's sunrise over Phewa Lake and a Chitwan jungle stay, planned end to end for " + travelers + ".";
      }
      if (region === "Bhutan") {
        return "Bhutan offers a rare calm — Paro, Thimphu and the Punakha valleys, sacred dzongs and Tsechu festivals, a serene journey for " + travelers + ".";
      }
      return "Sri Lanka for you — Colombo's energy, Kandy's tea highlands, the Sigiriya Lion Rock climb and soft southern beaches, timed beautifully for " + travelers + ".";
    }
  };

/* ====================================================================
   *  4. STYLES — clean, simple, professional chat widget
   * ==================================================================== */

  var CSS_TEXT = [
    ".mc-root, .mc-root * { box-sizing: border-box; }",
    ".mc-root {",
    "  position: fixed; bottom: 20px; right: 20px; z-index: 2147483000;",
    "  font-family: 'Manrope', 'Segoe UI', -apple-system, Arial, sans-serif;",
    "  -webkit-font-smoothing: antialiased;",
    "}",
    "@media (prefers-reduced-motion: reduce) { .mc-root * { animation: none !important; transition: none !important; } }",

    /* ---- Floating action button (fab) ------------------------------ */
    ".mc-fab {",
    "  width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;",
    "  background: linear-gradient(135deg, #dcb964, #c9a84c 50%, #a8862f);",
    "  color: #fff; font-size: 24px; display: flex; align-items: center; justify-content: center;",
    "  box-shadow: 0 8px 24px rgba(168, 134, 47, 0.4);",
    "  transition: transform 0.2s ease, box-shadow 0.2s ease;",
    "  position: relative; outline: none;",
    "}",
    ".mc-fab:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(168, 134, 47, 0.5); }",
    ".mc-fab:active { transform: scale(0.95); }",
    ".mc-fab-badge {",
    "  position: absolute; top: -3px; right: -3px; min-width: 20px; height: 20px; padding: 0 5px;",
    "  background: #e6483f; color: #fff; font-size: 11px; font-weight: 800; border-radius: 12px;",
    "  display: flex; align-items: center; justify-content: center; border: 2px solid #fff;",
    "  box-shadow: 0 2px 6px rgba(0,0,0,0.25); animation: mcPulse 1.8s ease-in-out infinite;",
    "}",
    ".mc-fab-badge.hidden { display: none; }",
    "@keyframes mcPulse {",
    "  0%,100% { box-shadow: 0 0 0 0 rgba(230,72,63,.55), 0 2px 6px rgba(0,0,0,.25); }",
    "  60%     { box-shadow: 0 0 0 9px rgba(230,72,63,0),  0 2px 6px rgba(0,0,0,.25); }",
    "}",

    /* ---- Panel: clean white card ------------------------------------ */
    ".mc-panel {",
    "  position: absolute; bottom: 80px; right: 0; width: 370px; height: 560px; max-height: 74vh;",
    "  border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;",
    "  background: #ffffff;",
    "  border: 1px solid rgba(0,0,0,0.08);",
    "  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);",
    "  opacity: 0; pointer-events: none; transform: translateY(16px) scale(0.97); transform-origin: bottom right;",
    "  transition: opacity 0.25s ease, transform 0.28s cubic-bezier(.22,.9,.3,1.1);",
    "}",
    ".mc-panel.open { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }",

    /* ---- Header ------------------------------------------------------- */
    ".mc-header {",
    "  position: relative; z-index: 1; padding: 14px 16px; color: #fff; display: flex; align-items: center; gap: 10px;",
    "  background: linear-gradient(135deg, #1c2b3a 0%, #131f2c 100%);",
    "}",
    ".mc-avatar {",
    "  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;",
    "  font-size: 16px; font-weight: 800; color: #fff;",
    "  background: linear-gradient(145deg, #d9b95f, #b3923c);",
    "}",
    ".mc-header-info { flex: 1; min-width: 0; }",
    ".mc-head-title { font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; }",
    ".mc-head-title .mc-gold { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 12px; background: rgba(226,196,122,.18); border: 1px solid rgba(226,196,122,.3); color: #e2c47a; white-space: nowrap; }",
    ".mc-head-sub { margin-top: 2px; font-size: 11px; color: rgba(255,255,255,.7); display: flex; align-items: center; gap: 6px; }",
    ".mc-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2fd06a; }",
    ".mc-actions { display: flex; gap: 5px; flex-shrink: 0; }",
    ".mc-icon-btn {",
    "  width: 28px; height: 28px; border-radius: 8px; border: none; cursor: pointer; color: #fff; font-size: 12px;",
    "  background: rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center;",
    "  transition: background 0.2s;",
    "}",
    ".mc-icon-btn:hover { background: rgba(255,255,255,.2); }",
    ".mc-wa-btn { background: #25D366; }",
    ".mc-wa-btn:hover { background: #1ebe57; }",

    /* ---- Quick topic chips row ---------------------------------------- */
    ".mc-quick {",
    "  position: relative; z-index: 1; padding: 8px 12px; display: flex; gap: 6px; overflow-x: auto;",
    "  background: #f7f8fa; border-bottom: 1px solid rgba(0,0,0,0.06);",
    "  scrollbar-width: none;",
    "}",
    ".mc-quick::-webkit-scrollbar { display: none; }",
    ".mc-quick-chip {",
    "  white-space: nowrap; border: none; cursor: pointer; padding: 6px 12px; border-radius: 16px; font-size: 11px; font-weight: 600;",
    "  font-family: inherit; color: #555; background: #fff; border: 1px solid rgba(0,0,0,0.08);",
    "  transition: all 0.15s;",
    "}",
    ".mc-quick-chip:hover { background: #f0f0f0; }",
    ".mc-quick-chip.gold { color: #fff; background: linear-gradient(135deg, #c9a84c, #a8862f); border: none; }",

    /* ---- Body ----------------------------------------------------------- */
    ".mc-body {",
    "  position: relative; z-index: 1; flex: 1; overflow-y: auto; padding: 14px; background: #f7f8fa;",
    "  display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;",
    "}",
    ".mc-body::-webkit-scrollbar { width: 5px; }",
    ".mc-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }",

    /* -- date stamp ------------------------------------------------------- */
    ".mc-date {",
    "  align-self: center; font-size: 10px; color: #999; background: #fff; padding: 3px 10px; border-radius: 12px;",
    "  border: 1px solid rgba(0,0,0,0.06); margin: 4px 0;",
    "}",

    /* -- message rows ----------------------------------------------------- */
    ".mc-row { display: flex; flex-direction: column; max-width: 85%; animation: mcIn 0.25s ease; }",
    ".mc-row.bot { align-self: flex-start; align-items: flex-start; }",
    ".mc-row.user { align-self: flex-end; align-items: flex-end; }",
    "@keyframes mcIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }",

    ".mc-msg-bubble { padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.55; white-space: pre-line; word-break: break-word; }",
    ".mc-bot-bubble { background: #fff; color: #333; border: 1px solid rgba(0,0,0,0.08); border-bottom-left-radius: 4px; }",
    ".mc-user-bubble { background: linear-gradient(135deg, #c9a84c, #b3923c); color: #fff; border-bottom-right-radius: 4px; }",
    ".mc-time { font-size: 9px; color: #aaa; margin-top: 2px; padding: 0 4px; }",

    /* -- Typing indicator -------------------------------------------------- */
    ".mc-typing { display: flex; gap: 4px; padding: 2px 4px; }",
    ".mc-typing span { width: 6px; height: 6px; border-radius: 50%; background: #ccc; animation: mcBounce 1.1s infinite ease-in-out; }",
    ".mc-typing span:nth-child(2) { animation-delay: 0.15s; }",
    ".mc-typing span:nth-child(3) { animation-delay: 0.3s; }",
    "@keyframes mcBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-3px); opacity: 1; } }",

    /* ---- Reaction bar ------------------------------------------------------ */
    ".mc-reactions { display: flex; gap: 4px; margin-top: 4px; padding-left: 2px; }",
    ".mc-react {",
    "  border: none; cursor: pointer; font-size: 14px; width: 28px; height: 28px; border-radius: 50%;",
    "  background: #fff; border: 1px solid rgba(0,0,0,0.08); transition: transform 0.15s;",
    "  display: flex; align-items: center; justify-content: center;",
    "}",
    ".mc-react.chosen { transform: scale(1.15); border-color: #c9a84c; }",
    ".mc-react-count { font-size: 9px; color: #999; margin-left: 1px; }",

    /* ---- Option buttons (clean flat) ---------------------------------------- */
    ".mc-options { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; width: 100%; }",
    ".mc-opt {",
    "  display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;",
    "  padding: 11px 14px; border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; cursor: pointer; font-family: inherit;",
    "  font-size: 13px; font-weight: 600; color: #444; text-align: left; background: #fff;",
    "  transition: all 0.15s;",
    "}",
    ".mc-opt:hover { border-color: #c9a84c; color: #a5811f; background: #fdfaf3; }",
    ".mc-opt:active { transform: scale(0.99); }",
    ".mc-opt .mc-opt-ico { margin-right: 8px; }",
    ".mc-opt .mc-opt-arw { opacity: 0.4; font-size: 14px; }",

    /* ---- Chips --------------------------------------------------------------- */
    ".mc-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }",
    ".mc-chip {",
    "  border: none; cursor: pointer; padding: 7px 14px; border-radius: 18px; font-family: inherit;",
    "  font-size: 11.5px; font-weight: 600; color: #555; background: #fff; border: 1px solid rgba(0,0,0,0.1);",
    "  transition: all 0.15s;",
    "}",
    ".mc-chip:hover { background: #f5f5f5; }",
    ".mc-chip.gold { color: #fff; background: linear-gradient(135deg, #c9a84c, #a8862f); border: none; }",
    ".mc-chip.green { color: #fff; background: #25D366; border: none; }",

    /* -- Info card (visa / season) ----------------------------------------- */
    ".mc-card {",
    "  margin-top: 6px; padding: 12px 14px; border-radius: 12px; max-width: 100%;",
    "  background: #fff; border: 1px solid rgba(0,0,0,0.08); font-size: 12.5px; line-height: 1.55; color: #444;",
    "}",
    ".mc-card-title { font-size: 11.5px; font-weight: 700; color: #a5811f; margin-bottom: 5px; }",

    /* -- Tip strip ----------------------------------------------------------- */
    ".mc-tip {",
    "  align-self: center; max-width: 92%; margin-top: 2px; font-size: 11px; color: #888;",
    "  background: #fffbe6; border: 1px dashed #e6d49a; border-radius: 10px; padding: 7px 12px; line-height: 1.45;",
    "}",

    /* ---- Search -------------------------------------------------------------- */
    ".mc-search { position: relative; z-index: 1; padding: 10px 12px 0; background: transparent; }",
    ".mc-search-box { position: relative; display: flex; align-items: center; }",
    ".mc-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #aaa; font-size: 12px; pointer-events: none; }",
    ".mc-search-input {",
    "  width: 100%; border: 1px solid rgba(0,0,0,0.1); border-radius: 20px; padding: 9px 12px 9px 32px;",
    "  font-family: inherit; font-size: 12px; color: #444; outline: none; background: #fff;",
    "  transition: border-color 0.2s;",
    "}",
    ".mc-search-input:focus { border-color: #c9a84c; }",

    /* ---- Footer -------------------------------------------------------------- */
    ".mc-footer {",
    "  position: relative; z-index: 1; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;",
    "  background: #fff; border-top: 1px solid rgba(0,0,0,0.06);",
    "}",
    ".mc-footer small { font-size: 10px; color: #999; }",
    ".mc-footer .mc-brand-mark { font-size: 10px; font-weight: 700; color: #a5811f; }",

    ".mc-empty { text-align: center; color: #999; font-size: 12px; padding: 12px 8px; }",

    /* ---- Suggest bar (WhatsApp prompt) -------------------------------------- */
    ".mc-suggest {",
    "  display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 6px;",
    "  background: #f0faf3; border: 1px solid #b7e3c9; border-radius: 10px; padding: 9px 12px;",
    "}",
    ".mc-suggest-txt { font-size: 11.5px; color: #1f7a44; line-height: 1.4; flex: 1; }",
    ".mc-suggest-btn {",
    "  border: none; cursor: pointer; padding: 8px 12px; border-radius: 10px; font-family: inherit;",
    "  font-size: 11.5px; font-weight: 700; color: #fff; white-space: nowrap; background: #25D366;",
    "}",

    "@media (max-width: 480px) {",
    "  .mc-root { right: 12px; bottom: 12px; }",
    "  .mc-panel { right: 12px; bottom: 72px; width: calc(100vw - 24px); height: 72vh; }",
    "  .mc-fab { width: 54px; height: 54px; font-size: 22px; }",
    "}"
  ].join("\n");

/* ====================================================================
   *  5. STATE + DOM HELPERS
   * ==================================================================== */

  var STORE_KEY = "maruConciergeV2";
  var PING_KEY = "mcPinged";

  function readStore() {
    try {
      var raw = window.sessionStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (s && typeof s === "object") return s;
    } catch (err) { /* ignore */ }
    return null;
  }

  function writeStore(obj) {
    try { window.sessionStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (err) { /* ignore */ }
  }

  function readReactions() {
    try {
      var raw = window.sessionStorage.getItem("mcReactions");
      return raw ? JSON.parse(raw) : {};
    } catch (err) { return {}; }
  }

  function writeReactions(map) {
    try { window.sessionStorage.setItem("mcReactions", JSON.stringify(map)); } catch (err) { /* ignore */ }
  }

  var State = {
    open: false,
    greeted: false,
    visitCount: 0,
    userMsgs: 0,
    botReplies: 0,
    quizAnswers: {},   // region / travelers / interest
    quizStep: -1,      // -1 = not started
    categoryId: null,
    history: []
  };

  var REACTIONS = readReactions(); // { questionText: { emoji: count } }

  function visitCount() {
    try {
      var n = parseInt(window.localStorage.getItem("mcVisits"), 10) || 0;
      return n;
    } catch (err) { return 0; }
  }

  function bumpVisit() {
    try { window.localStorage.setItem("mcVisits", String(visitCount() + 1)); } catch (err) { /* ignore */ }
  }

  function nowTime() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }

  function todayLabel() {
    var d = new Date();
    return YYYY(d) + ". " + MM(d) + ". " + DD(d);
  }

  function YYYY(d) { return String(d.getFullYear()); }
  function MM(d)   { var m = d.getMonth() + 1; return m < 10 ? "0" + m : String(m); }
  function DD(d)   { var n = d.getDate(); return n < 10 ? "0" + n : String(n); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Tiny DOM builder: el("div", { class: "x", onclick: fn }, [children...])
   * `html` attribute sets innerHTML (escaped content only!), everything else
   * is setAttribute except class/onclick handlers.
   */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    for (var key in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
      var v = attrs[key];
      if (key === "class") node.className = v;
      else if (key === "html") node.textContent = v; // safe text assignment
      else if (key.indexOf("on") === 0 && typeof v === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), v);
      } else node.setAttribute(key, v);
    }
    children = children || [];
    for (var i = 0; i < children.length; i++) {
      if (children[i]) node.appendChild(children[i]);
    }
    return node;
  }

  function openWhatsApp(message) {
    var text = message || "";
    var url = "https://wa.me/" + "919891587778";
    if (text) url += "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  }

  function scrollBottom() {
    window.requestAnimationFrame(function () {
      if (DOM.body) DOM.body.scrollTop = DOM.body.scrollHeight;
    });
  }

  function waitDelay() {
    return 420 + Math.floor(Math.random() * 420);
  }

  function randi(n) {
    return Math.floor(Math.random() * n);
  }

/* ====================================================================
   *  6. WIDGET SHELL — fab + glass panel
   * ==================================================================== */

  var DOM = {
    root: null, panel: null, fab: null, badge: null,
    body: null, search: null, searchWrap: null,
    closeBtn: null, minBtn: null, resetBtn: null, waBtn: null,
    headTitle: null, headSub: null, footerYear: null
  };

  function injectStyles() {
    var s = document.createElement("style");
    s.setAttribute("data-mc-styles", "1");
    var safe = CSS_TEXT;
    s.appendChild(document.createTextNode(safe));
    document.head.appendChild(s);
  }

  /* WhatsApp glyph (inline SVG, matches brand green) */
  function waSvg(size) {
    var span = el("span", { "aria-hidden": "true" }, null);
    span.innerHTML =
      '<svg width="' + (size || 14) + '" height="' + (size || 14) + '" viewBox="0 0 448 512" fill="#fff" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 ' +
      '111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z' +
      'm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 ' +
      '0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 ' +
      '101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 ' +
      '5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 ' +
      '1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 ' +
      '0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 ' +
      '35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
    return span;
  }

  /* ---- Panel & fab builders ---- */
  function buildShell() {
    /* header */
    var avatar = el("div", { class: "mc-avatar" }, [document.createTextNode("MT")]);

    var titleRow = el("div", { class: "mc-head-title" }, [
      (DOM.headTitle = el("span", {}, [document.createTextNode(BRAND.brand.botName)])),
      el("span", { class: "mc-gold" }, [document.createTextNode("PRO")])
    ]);

    var subRow = el("div", { class: "mc-head-sub" }, [
      el("span", { class: "mc-status-dot" }),
      (DOM.headSub = el("span", {}, [document.createTextNode(T(BRAND.brand.status, BRAND.brand.statusKo))]))
    ]);
    var info = el("div", { class: "mc-header-info" }, [titleRow, subRow]);

    var waBtn = el("button", {
      class: "mc-icon-btn mc-wa-btn",
      type: "button",
      onclick: openWaChat,
      "aria-label": "Open WhatsApp chat"
    }, [waSvg(14)]);

    var minBtn = el("button", {
      class: "mc-icon-btn", type: "button",
      onclick: togglePanel, "aria-label": "Minimize"
    }, [el("span", { html: "—" })]);

    var resetBtn = el("button", {
      class: "mc-icon-btn", type: "button",
      onclick: resetConversation, "aria-label": "Restart chat"
    }, [el("span", { html: "↺" })]);

    var closeEl = el("button", {
      class: "mc-icon-btn", type: "button",
      onclick: togglePanel, "aria-label": "Close chat"
    }, [el("span", { html: "✕" })]);

    var actions = el("div", { class: "mc-actions" }, [waBtn, minBtn, resetBtn, closeEl]);
    var header = el("div", { class: "mc-header" }, [avatar, info, actions]);

    /* search */
    var searchInput = el("input", {
      class: "mc-search-input", type: "text",
      placeholder: T("Search questions…", "질문을 검색해 보세요…"),
      "aria-label": "Search"
    });
    var searchWrap = el("div", { class: "mc-search" }, [
      el("div", { class: "mc-search-box" }, [
        el("span", { class: "mc-search-icon" }, [document.createTextNode("🔎")]),
        searchInput
      ])
    ]);

    var body = el("div", { class: "mc-body" }, null);

    var quickBar = el("div", { class: "mc-quick" }, null);

    var footer = el("footer", { class: "mc-footer" }, [
      el("div", { class: "mc-brand-mark" }, [document.createTextNode("Maru Travel · ")]),
      el("small", {}, [
        (DOM.footerYear = el("span", {}, [document.createTextNode("© " + new Date().getFullYear())]))
      ])
    ]);

    var panel = el("div", { class: "mc-panel" }, [header, searchWrap, quickBar, body, footer]);
    var fab = el("button", {
      class: "mc-fab", type: "button",
      onclick: togglePanel, "aria-label": "Open Maru Concierge"
    }, [
      el("span", { html: "💬" }),
      (DOM.badge = el("span", { class: "mc-fab-badge hidden" }, [document.createTextNode("1")]))
    ]);

    var root = el("div", { class: "mc-root" }, [panel, fab]);
    document.body.appendChild(root);

    DOM.root = root;
    DOM.panel = panel;
    DOM.fab = fab;
    DOM.body = body;
    DOM.search = searchInput;
    DOM.searchWrap = searchWrap;
    DOM.quickBar = quickBar;
    DOM.closeBtn = closeEl;
    DOM.minBtn = minBtn;
    DOM.resetBtn = resetBtn;
    DOM.waBtn = waBtn;

    searchInput.addEventListener("keyup", onSearchKeyup); 
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && DOM.panel.classList.contains("open")) togglePanel();
    });
  }

  function togglePanel() {
    State.open = !State.open;
    if (State.open) {
      DOM.panel.classList.add("open");
      DOM.badge.classList.add("hidden");
      if (!State.greeted) {
        State.greeted = true;
        persist();
        startConversation();
      }
    } else {
      DOM.panel.classList.remove("open");
    }
  }

  function resetConversation() {
    State.greeted = false;
    State.categoryId = null;
    State.quizStep = -1;
    State.quizAnswers = null;
    State.userMsgs = 0;
    State.botReplies = 0;
    DOM.body.innerHTML = "";
    startConversation();
  }

  function openWaChat() {
    openWhatsApp(null);
  }

/* ====================================================================
 *  7. RENDER LAYER — messages, menus, answers, chips, quiz, guides
 * ==================================================================== */

  function persist() {
    try { window.sessionStorage.setItem(STORE_KEY, JSON.stringify(State)); } catch (err) { /* ignore */ }
  }

  function loadPersisted() {
    var s = readStore();
    if (s) {
      State.greeted = s.greeted || false;
      State.categoryId = s.categoryId || null;
      State.quizStep = typeof s.quizStep === "number" ? s.quizStep : -1;
      State.quizAnswers = s.quizAnswers || null;
    }
  }

  function scrollBottom() {
    window.requestAnimationFrame(function () {
      if (DOM.body) DOM.body.scrollTop = DOM.body.scrollHeight;
    });
  }

  function typingEl() {
    return el("div", { class: "mc-row bot" }, [
      el("div", { class: "mc-bot-bubble mc-typing" }, [
        el("span", {}), el("span", {}), el("span", {})
      ])
    ]);
  }

  function showTyping(done) {
    var row = typingEl();
    DOM.body.appendChild(row);
    scrollBottom();
    window.setTimeout(function () {
      if (row.parentNode) row.parentNode.removeChild(row);
      done();
    }, waitDelay());
  }

  function waitDelay() {
    return 380 + Math.floor(Math.random() * 420);
  }

  function appendBot(text, opts) {
    opts = opts || {};
    var row = el("div", { class: "mc-row bot" }, [
      el("div", { class: "mc-bot-bubble", html: text }),
      el("div", { class: "mc-time" }, [document.createTextNode(nowTime())])
    ]);
    DOM.body.appendChild(row);
    scrollBottom();
    if (!opts.silent) { State.botReplies++; persist(); }
  }

  function appendUser(text) {
    var row = el("div", { class: "mc-row user" }, [
      el("div", { class: "mc-user-bubble", html: text }),
      el("div", { class: "mc-time" }, [document.createTextNode(nowTime())])
    ]);
    DOM.body.appendChild(row);
    scrollBottom();
    State.userMsgs++;
  }

  function dateStamp() {
    var row = el("div", { class: "mc-date" }, [document.createTextNode(T("Today", "오늘"))]);
    DOM.body.appendChild(row);
  }

  function clearLive() {
    var rows = DOM.body.querySelectorAll("[data-live]");
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (r.parentNode) r.parentNode.removeChild(r);
    }
  }

  /* Neumorphic option button */
  function optBtn(text, icon, onClick) {
    var btn = el("button", { class: "mc-opt", type: "button", onclick: onClick }, [
      el("span", {}, [
        el("span", { class: "mc-opt-ico" }, [document.createTextNode(icon || "•")]),
        document.createTextNode(text)
      ]),
      el("span", { class: "mc-opt-arw" }, [document.createTextNode("›")])
    ]);
    return btn;
  }

  function chipBtn(text, cls, onClick) {
    return el("button", { class: "mc-chip" + (cls ? " " + cls : ""), type: "button", onclick: onClick }, [document.createTextNode(text)]);
  }

  function chip(text, cls, onClick) {
    return chipBtn(text, cls, onClick);
  }

  /* ------------------------------------------------------------------ */
  /*  MAIN MENU                                                          */
  /* ------------------------------------------------------------------ */
  function renderMainMenu() {
    clearLive();
    var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);

    CATEGORIES.forEach(function (cat) {
      wrap.appendChild(optCategoryBtn(cat));
    });

    wrap.appendChild(optBtn(
      T("✨ Find my perfect trip", "✨ 나에게 딱 맞는 여행 찾기"),
      "✨",
      startQuiz
    ));
    wrap.appendChild(optBtn(
      T("🌍 Visa guide", "🌍 비자 안내"),
      "🛂",
      renderVisaMenu
    ));
    wrap.appendChild(optBtn(
      T("🗓️ Best season to travel", "🗓️ 여행하기 좋은 시즌"),
      "🌤️",
      renderSeasonMenu
    ));

    var row = el("div", { class: "mc-row bot" }, [
      el("div", { class: "mc-bot-bubble", html: T(
        "What would you like to explore?",
        "무엇을 알아보시겠어요?"
      ) }),
      el("div", { class: "mc-time" }, [document.createTextNode(nowTime())])
    ]);
    DOM.body.appendChild(row);
    DOM.body.appendChild(wrap);
    scrollBottom();
  }

  function optCategoryBtn(cat) {
    return optBtn(T(cat.label, cat.labelKo), cat.icon.replace("fas ", ""), function () {
      openCategory(cat.id);
    });
  }

  function openCategory(id) {
    var cat = null;
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) cat = CATEGORIES[i];
    }
    if (!cat) return;
    State.categoryId = id;

    appendUser(T(cat.label, cat.labelKo));
    showTyping(function () {
      appendBot(T("Here is everything about " + cat.label + ":", cat.labelKo + "에 대해 알려드릴게요:"), { silent: true });
      renderQuestionList(cat);
    });
  }

  function renderQuestionList(cat) {
    clearLive();
    var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);
    cat.questions.forEach(function (item) {
      wrap.appendChild(optBtn(
        T(item.q, item.qKo),
        "❓",
        function () { openAnswer(cat, item); }
      ));
    });

    var chips = el("div", { class: "mc-chips", "data-live": "1" }, [
      chip(T("← Main menu", "← 메인 메뉴"), "gold", backToMenu),
      chip(T("💬 WhatsApp us", "💬 WhatsApp 문의"), "green", function () { openWaChat(); })
    ]);
    DOM.body.appendChild(wrap);
    DOM.body.appendChild(chips);
    scrollBottom();
  }

  function openAnswer(cat, item) {
    appendUser(T(item.q, item.qK || item.q));
    showTyping(function () {
      appendBot(T(item.a, item.aK || item.a), { silent: true });
      renderReactions(item);
      renderPostAnswer(cat);
      maybeFeedback();
      maybeSuggest();
      persist();
    });
  }

  /* ------------------------------------------------------------------ */
  /*  POST-ANSWER CHIPS + REACTIONS                                       */
  /* ------------------------------------------------------------------ */
  function renderPostAnswer(cat) {
    clearLive();
    var chips = el("div", { class: "mc-chips", "data-live": "1" }, [
      chip(T("More in " + cat.label, cat.labelKo + " 자세히"), "", function () {
        renderQuestionList(cat);
      }),
      chip(T("← Main menu", "← 메인 메뉴"), "gold", backToMenu),
      chip(T("💬 WhatsApp", "💬 WhatsApp"), "green", function () { openWaChat(); })
    ]);
    DOM.body.appendChild(chips);
    scrollBottom();
  }

  var REACTION_EMOJIS = ["👍", "❤️", "😊"];

  function renderReactions(item) {
    var key = item.q;
    var counts = REACTIONS[key] || {};
    var bar = el("div", { class: "mc-reactions" }, null);
    REACTION_EMOJIS.forEach(function (em) {
      var n = counts[em] || 0;
      var btn = el("button", { class: "mc-react", type: "button" }, [
        document.createTextNode(em)
      ]);
      var label = el("span", { class: "mc-reaction-count" }, [document.createTextNode(n ? String(n) : "\u00A0")]);
      btn.addEventListener("click", function () {
        counts[em] = (counts[em] || 0) + 1;
        REACTIONS[key] = counts;
        writeReactions(REACTIONS);
        btn.classList.add("chosen");
        label.textContent = counts[em];
      });
      bar.appendChild(btn);
      bar.appendChild(label);
    });
    DOM.body.appendChild(bar);
  }

  /* ------------------------------------------------------------------ */
  /*  FEEDBACK (once per session)                                        */
  /* ------------------------------------------------------------------ */
  var feedbackShown = false;

  function maybeFeedback() {
    if (feedbackShown || State.botReplies < 3) return;
    feedbackShown = true;
    var wrap = el("div", { class: "mc-card", style: "margin-top:8px;" }, [
      el("div", { class: "mc-card-title" }, [document.createTextNode(T("Was this helpful?", "도움이 되셨나요?"))]),
      el("div", { class: "mc-chips" }, [
        chip("👍 " + T("Yes", "네"), "gold", function () {
          appendBot(T("Wonderful! Anything else I can help with?", "기쁩니다! 더 물어보실 것이 있나요?"), { silent: true });
          wrap.parentNode.removeChild(wrap);
        }),
        chip("👎 " + T("Not quite", "아니요"), "", function () {
          appendBot(T("Sorry to hear that — a real travel expert is a message away.", "아쉽네요. 실제 전문가와의 상담은 한 통의 메시지로 가능합니다."), { silent: true });
          wrap.parentNode.removeChild(wrap);
        })
      ])
    ]);
    DOM.body.appendChild(wrap);
  }

  /* ------------------------------------------------------------------ */
  /*  WHATSAPP SUGGEST STRIP                                             */
  /* ------------------------------------------------------------------ */
  var suggestShown = false;

  function maybeSuggest() {
    if (suggestShown || State.userMsgs < 4) return;
    suggestShown = true;
    var strip = el("div", { class: "mc-suggest" }, [
      el("span", { class: "mc-suggest-txt" }, [document.createTextNode(
        T("Love to hear more? Talk directly with our experts on WhatsApp — free & fast.",
          "더 자세한 상담을 원하시나요? 전문가가 WhatsApp에서 즉시 상담해 드립니다.")
      )]),
      chip("💬", "green", function () { openWaChat(); })
    ]);
    DOM.body.appendChild(strip);
    scrollBottom();
  }

  /* ------------------------------------------------------------------ */
  /*  BACK TO MENU                                                       */
  /* ------------------------------------------------------------------ */
  function backToMenu() {
    appendUser(T("Back to main menu", "메인 메뉴로"));
    showTyping(function () { renderMainMenu(); });
  }

  /* ------------------------------------------------------------------ */
  /*  SEARCH                                                             */
  /* ------------------------------------------------------------------ */
  function allItems() {
    var out = [];
    CATEGORIES.forEach(function (c) {
      c.questions.forEach(function (q) {
        out.push({ cat: c, item: q });
      });
    });
    return out;
  }

  function onSearchKeyup() {
    var v = (DOM.search.value || "").trim().toLowerCase();
    clearLive();
    if (v.length < 2) return;
    var hits = [];
    allItems().forEach(function (rec) {
      var q = (rec.item.q + " " + rec.item.a).toLowerCase();
      var qK = ((rec.item.qK || "") + " " + (rec.item.aK || "")).toLowerCase();
      if (q.indexOf(v) !== -1 || qK.indexOf(v) !== -1) {
        hits.push(rec);
      }
    });
    hits = hits.slice(0, BRAND.searchResults || 5);
    var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);
    if (!hits.length) {
      wrap.appendChild(el("div", { class: "mc-empty" }, [
        document.createTextNode(T("No matches — try 'visa', 'tours', 'appointment'…", "일치하는 결과가 없습니다. 'booking', 'tour' 등을 검색해 보세요."))
      ]));
      wrap.appendChild(chip(T("← Main menu", "← 메인 메뉴"), "gold", backToMenu));
    } else {
      hits.forEach(function (rec) {
        wrap.appendChild(optBtn(T(rec.item.q, rec.item.qK || rec.item.q), "❓", function () {
          openAnswer(rec.cat, rec.item);
        }));
      });
    }
    DOM.body.appendChild(wrap);
    scrollBottom();
  }

  /* ------------------------------------------------------------------ */
  /*  GREETING + START                                                  */
  /* ------------------------------------------------------------------ */
  function startConversation() {
    DOM.body.innerHTML = "";
    dateStamp();
    var greeting = null;
    if (State.botReplies === 0 && State.userMsgs === 0 && hasReturned()) {
      greeting =
        T(
          "Namaste and welcome back! 🙏 I am " + BRAND.brand.botName + ". It's lovely to see you again — how can I help you today?",
          "나마스테, 다시 오신 것을 환영합니다! 🙏 저는 " + BRAND.brand.botNameKo + " 입니다. 오늘은 어떻게 도와드릴까요?"
        );
    } else {
      greeting =
        T(
          "Namaste! 🙏 Welcome to Maru Travel. I am " + BRAND.brand.botName + " — your personal travel assistant. Pick a topic below or type your question.",
          "나마스테! 🙏 Maru Travel에 오신 것을 환영합니다. 저는 " + BRAND.brand.botNameKo + " — 당신의 개인 여행 비서입니다. 아래 주제를 선택하거나 질문을 입력해 주세요."
        );
    }
    appendBot(greeting, { silent: true });
    renderMainMenu();
  }

  function hasReturned() {
    return visitCount() > 1;
  }

  /* ------------------------------------------------------------------ */
  /*  QUIZ FLOW (recommendation)                                         */
  /* ------------------------------------------------------------------ */
  function startQuiz() {
    State.quizStep = 0;
    State.quizAnswers = {};
    appendUser(T(QUIZ.chipEn, QUIZ.chipKo));
    showTyping(function () {
      renderQuizStep();
    });
  }

  function renderQuizStep() {
    if (State.quizStep >= QUIZ.steps.length) {
      finishQuiz();
      return;
    }
    var step = QUIZ.steps[State.quizStep];
    var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);
    wrap.appendChild(el("div", { class: "mc-card", style: "margin-bottom:8px;" }, [
      el("div", { class: "mc-card-title" }, [document.createTextNode(T(step.askEn, step.askKo))])
    ]));
    step.options.forEach(function (o) {
      wrap.appendChild(optBtn(T(o.en, o.ko), "", function (opt) {
        return function () {
          State.quizAnswers[step.key] = opt.en;
          State.quizStep++;
          appendUser(T(opt.en, opt.ko));
          showTyping(function () {
            renderQuizStep();
          });
        };
      }(o)));
    });
    DOM.body.appendChild(wrap);
    scrollBottom();
  }

  function finishQuiz() {
    var a = State.quizAnswers;
    var text = QUIZ.suggest(a);
    appendBot(text, { silent: true });
    var ver = el("div", { class: "mc-chips", "data-live": "1" }, [
      chip(T("💬 Message this plan to WhatsApp", "WhatsApp으로 계획 보내기"), "green", function () {
        openWhatsApp(T("Hi Maru! I would like to plan a trip for: ","안녕하세요! 다음과 같은 여행을 생각 중입니다: ") + a.region + " · " + a.travelers + " · " + a.interest);
      }),
      chip(T("← Main menu", "← 메인 메뉴"), "gold", backToMenu)
    ]);
    DOM.body.appendChild(ver);
    DOM.lastQuiz = true;
    scrollBottom();
  }

  /* ------------------------------------------------------------------ */
  /*  VISA GUIDE                                                         */
  /* ------------------------------------------------------------------ */
  function renderVisaMenu() {
    appendUser(T("🌍 Visa guide", "🌍 비자 안내"));
    showTyping(function () {
      appendBot(T("Here is a quick country-by-country visa heads-up (details vary with nationality):",
        "국적별로 상세 내용은 다를 수 있지만, 나라별 비자 요약을 알려드립니다:"), { silent: true });
      var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);
      Object.keys(VISA_GUIDE).forEach(function (k) {
        wrap.appendChild(optBtn(T(VISA_GUIDE[k].label, VISA_GUIDE[k].label), "🛃", function (key) {
          return function () { renderVisaDetail(key); };
        }(k)));
      });
      DOM.body.appendChild(wrap);
      DOM.body.appendChild(chipsRow("← Main menu", "gold", backToMenu));
      scrollBottom();
    });
  }

  function renderVisaDetail(key) {
    var v = VISA_GUIDE[key];
    appendUser(T(v.label, v.label));
    showTyping(function () {
      appendBot(T(v.en, v.ko), { silent: true });
      DOM.body.appendChild(chipsRow(T("💬 Ask our experts", "💬 전문가 문의"), "green", function () {
        openWaChat(T("Hi! I need help with the visa for " + v.label, "안녕하세요! " + v.label + " 비자 관련 도움이 필요합니다."));
      }));
      DOM.body.appendChild(chipsRow(T("← Main menu", "← 메인 메뉴"), "gold", backToMenu));
      scrollBottom();
    });
  }

  /* ------------------------------------------------------------------ */
  /*  SEASON GUIDE                                                       */
  /* ------------------------------------------------------------------ */
  var SEASON_ITEMS = [
    { key: "golden", label: "Golden Triangle (Delhi·Agra·Jaipur)", ko: "황금삼각지대 (델리·아그라·자이푸르)" },
    { key: "kerala", label: "Kerala", ko: "케랄라" },
    { key: "nepal", label: "Nepal", ko: "네팔" },
    { key: "bhutan", label: "Bhutan", ko: "부탄" },
    { key: "srilanka", label: "Sri Lanka", ko: "스리랑카" }
  ];

  function renderSeasonMenu() {
    appendUser(T("🗓️ Best season", "🗓️ 여행지별 최적 시즌"));
    showTyping(function () {
      appendBot(T("Here are the best travel windows for our most popular regions:", "가장 인기 있는 지역별 최적의 여행 시기를 알려드립니다:"), { silent: true });
      var wrap = el("div", { class: "mc-options", "data-live": "1" }, null);
      SEASON_ITEMS.forEach(function (s) {
        wrap.appendChild(optBtn(T(s.label, s.ko), "🗓️", function (item) {
          return function () { renderSeason(item); };
        }(s)));
      });
      DOM.body.appendChild(wrap);
      DOM.body.appendChild(chipsRow("← Main menu", "gold", backToMenu));
      scrollBottom();
    });
  }

  function renderSeason(item) {
    var text = SEASON_GUIDE[item.key] || "";
    appendUser(T(item.label, item.ko));
    showTyping(function () {
      appendBot(T(text, SEASON_GUIDE[item.key + "Ko"] || text), { silent: true });
      DOM.body.appendChild(chipsRow(T("💬 Plan my trip", "💬 여행 계획하기"), "green", function () {
        openWaChat();
      }));
      DOM.body.appendChild(chipsRow("← Main menu", "gold", backToMenu));
      scrollBottom();
    });
  }

  function chipsRow(label, cls, fn) {
    var row = el("div", { class: "mc-chips", "data-live": "1" }, [
      chip(label, cls, fn)
    ]);
    return row;
  }

/* ====================================================================
 *  8. CONVERSATION ENGINE — intents, matching, proactive behavior
 * ==================================================================== */

  var TIPS_SHOWN = false;

  function showRandomTip() {
    if (TIPS_SHOWN) return;
    TIPS_SHOWN = true;
    var tip = TRAVEL_TIPS[randi(TRAVEL_TIPS.length)];
    var row = el("div", { class: "mc-tip" }, [
      document.createTextNode("💡 " + T(tip.en, tip.ko))
    ]);
    DOM.body.appendChild(row);
    scrollBottom();
  }

  function smallTalkReply(text) {
    var lower = text.trim().toLowerCase();
    for (var i = 0; i < SMALL_TALK.length; i++) {
      var e = SMALL_TALK[i];
      for (var j = 0; j < e.triggers.length; j++) {
        if (lower.indexOf(e.triggers[j]) !== -1) {
          return T(e.reply, e.replyKo);
        }
      }
    }
    return null;
  }

  function tokenize(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9가-힣\s]/g, " ").split(/\s+/).filter(Boolean);
  }

  function scoreTokens(tokens, hay) {
    var low = hay.toLowerCase();
    var score = 0;
    for (var i = 0; i < tokens.length; i++) {
      var w = tokens[i];
      if (w.length < 3) continue;
      if (low.indexOf(w) !== -1) score += 2;
    }
    return score;
  }

  function bestItem(text) {
    var tokens = tokenize(text);
    if (!tokens.length) return null;
    var best = null;
    var bestScore = 0;
    allItems().forEach(function (rec) {
      var hay = rec.item.q + " " + rec.item.a + " " + (rec.item.qKo || "") + " " + (rec.item.aKo || "");
      var s = scoreTokens(tokens, hay);
      if (s > bestScore) { bestScore = s; best = rec; }
    });
    if (bestScore >= 2) return best;
    return null;
  }

  function scoreTokens(tokens, hay) {
    var low = hay.toLowerCase();
    var score = 0;
    for (var i = 0; i < tokens.length; i++) {
      var w = tokens[i];
      if (w.length < 3) continue;
      if (low.indexOf(w) !== -1) score += 2;
    }
    return score;
  }

  /* Special commands typed by the user */
  function handleUserText(text) {
    var lower = text.trim().toLowerCase();

    var sm = smallTalkReply(text);
    if (sm) {
      showTyping(function () { appendBot(sm, { silent: true }); });
      return;
    }

    if (lower.indexOf("visa") !== -1) { renderVisaMenu(); return; }
    if (lower.indexOf("season") !== -1 || lower.indexOf("best time") !== -1 || lower.indexOf("when to") !== -1) {
      renderSeasonMenu(); return;
    }
    if (lower.indexOf("quiz") !== -1 || lower.indexOf("recommend") !== -1 || lower.indexOf("suggest") !== -1) {
      startQuiz(); return;
    }
    if (lower.indexOf("whatsapp") !== -1 || lower.indexOf("contact") !== -1 || lower.indexOf("number") !== -1 || lower.indexOf("email") !== -1) {
      showTyping(function () {
        appendBot(T(
            "You can reach Maru Travel on WhatsApp at " + BRAND.contact.whatsappDisplay + ", email " + BRAND.contact.email + ", or use the WhatsApp button above. ",
            "Maru Travel에는 WhatsApp(" + BRAND.contact.whatsappDisplay + "), 이메일(" + BRAND.contact.email + ") 그리고 이 채팅창의 WhatsApp 버튼으로 연락하실 수 있습니다."
          ), { silent: true });
      });
      return;
    }

    var hit = bestItem(text);
    if (hit) {
      showTyping(function () {
        appendBot(T(hit.item.a, hit.item.aKo), { silent: true });
      });
      return;
    }

    /* Nothing matched — empathetic fallback with a live human bridge */
    showTyping(function () {
      appendBot(T(
        "I could not find a direct answer for that one — but the real Maru team replies within minutes on WhatsApp or email.",
        "잠깐만요, 그것에 대한 바로 답을 찾지 못했어요. 하지만 실제 팀이 WhatsApp이나 이메일로 몇 분 안에 답변해 드립니다."
      ), { silent: true });
      var row = el("div", { class: "mc-chips", "data-live": "1" }, [
        chip(T("💬 Ask on WhatsApp", "💬 WhatsApp으로 문의"), "green", function () { openWaChat(); }),
        chip(T("✉️ Email us", "✉️ 이메일 문의"), "", function () {
          window.location.href = "mailto:" + BRAND.contact.email;
        }),
        chip("← Main menu", "gold", backToMenu)
      ]);
      DOM.body.appendChild(row);
      scrollBottom();
    });
  }

  /* ------------------------------------------------------------------ */
  /*  API for chips that open the chat again                             */
  /* ------------------------------------------------------------------ */
  function openChat() {
    if (!DOM.panel.classList.contains("open")) togglePanel();
  }

  /* ------------------------------------------------------------------ */
  /*  QUICK CHIPS (top bar)                                              */
  /* ------------------------------------------------------------------ */
  function buildQuickChips() {
    if (!DOM.quickBar) return;
    DOM.quickBar.innerHTML = "";
    var chips = [
      { en: "🎯 Menu", ko: "🎯 메뉴", fn: backToMenu },
      { en: "✨ Try the quiz", ko: "✨ 추천 받기", fn: startQuiz },
      { en: "🛂 Visas", ko: "🛂 비자", fn: renderVisaMenu },
      { en: "🗓️ Seasons", ko: "🗓️ 시즌", fn: renderSeasonMenu },
      { en: "💬 WhatsApp", ko: "💬 WhatsApp", fn: openWaChat }
    ];
    chips.forEach(function (c) {
      var b = el("button", {
        class: "mc-quick-chip" + (c.en.indexOf("💬") === 0 ? " gold" : ""),
        type: "button",
        onclick: function (fn) {
          return function () { openChat(); fn(); };
        }(c.fn)
      }, [document.createTextNode(T(c.en, c.ko))]);
      DOM.quickBar.appendChild(b);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  LANG SWITCH                                                        */
  /* ------------------------------------------------------------------ */
  function refreshLang() {
    LANG = getLang();
    DOM.headTitle.textContent = T(BRAND.brand.botName, BRAND.brand.botNameKo);
    DOM.headSub.textContent = T(BRAND.brand.status, BRAND.brand.statusKo);
    DOM.search.placeholder = T("Search questions…", "질문을 검색해 보세요…");
    buildQuickChips();
  }

  /* ------------------------------------------------------------------ */
  /*  PROACTIVE PING                                                     */
  /* ------------------------------------------------------------------ */
  function armPing() {
    window.setTimeout(function () {
      if (!State.open && !State.greeted) {
        DOM.badge.classList.remove("hidden");
      }
    }, BRAND.pingDelay || 14000);
  }

  /* ------------------------------------------------------------------ */
  /*  PUBLIC API                                                         */
  /* ------------------------------------------------------------------ */
  window.MaruChat = {
    open: openChat, close: function () { togglePanel(); },
    whatsapp: openWaChat
  };

  /* ------------------------------------------------------------------ */
  /*  INIT                                                               */
  /* ------------------------------------------------------------------ */
  function init() {
    injectStyles();
    buildShell();
    loadPersisted();
    bumpVisit();
    refreshLang();
    armPing();

    DOM.search.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var v = (DOM.search.value || "").trim();
        if (v) {
          DOM.search.value = "";
          appendUser(v);
          handleUserText(v);
        }
      }
    });

    DOM.search.addEventListener("input", onSearchKeyup);
    DOM.search.addEventListener("keyup", onSearchKeyup);

    /* Language switcher (if the main i18n engine exposes a hook) */
    if (window.__langChangeHandlers && window.__langChangeHandlers.push) {
      window.__langChangeHandlers.push(function () { refreshLang(); });
    }
    try {
      if (typeof window.onLangChange === "function") {
        var prev = window.onLangChange;
        window.onLangChange = function (lang) {
          try { if (typeof prev === "function") prev(lang); } catch (err) { }
          refreshLang();
        };
      } else {
        window.onLangChange = function () { refreshLang(); };
      }
    } catch (err) { /* ignore */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

