export const drugs = [
  {
    id: 'diclofenac', name: 'Diclofenac', nameAr: 'ديكلوفيناك', altNames: ['Voltaren', 'Cataflam', 'Olfen'],
    specialty: 'msk', difficulty: 1, icon: '🦴',
    mechanism: {
      tagline: 'مسكن قوي جداً يوقف إنتاج كل وسائط الألم والالتهاب',
      flow: [
        { text: 'يثبط إنزيمات الأكسدة الحلقية (COX-1 و COX-2)', isKey: true },
        { text: '↓' }, { text: 'يمنع تحول حمض الأراكيدونيك إلى بروستاجلاندين' },
        { text: '↓' }, { text: 'يقلل الالتهاب والألم الشديد بقوة أكبر من الإيبوبروفين ✅' }
      ],
      keyInsight: '💡 الديكلوفيناك قوي جداً على المعدة والقلب، لذا يجب تناوله بعد الأكل مباشرة ولأقصر فترة ممكنة.'
    },
    quickInfo: {
      class: 'NSAID (مضاد التهاب غير ستيرويدي)', indications: ['آلام المفاصل الروماتيزمية', 'النقرص الحاد', 'المغص الكلوي (حقن)'],
      contraindications: ['قرحة المعدة النشطة', 'قصور القلب الحاد أو تاريخ لجلطات قلبية'],
      interactions: ['ACE inhibitors / Diuretics — قد يسبب فشلاً كلوياً حاداً (The Triple Whammy)'],
      dose: '50-150 mg يومياً مقسمة على جرعات بعد الأكل', goldenRule: '⭐ أي مريض ضغط يأخذ مدر بول و ACE inhibitor، إعطاؤه ديكلوفيناك قد يدمر كليتيه فجأة.'
    },
    scenario: {
      setup: 'مريض كبير في السن يأخذ (Lisinopril) للضغط و (Furosemide) كمدر للبول، ويطلب Voltaren لألم ركبته.', question: 'ما الخطورة؟',
      reasoning: ['هذا الدمج يسمى "الضربة الثلاثية" (Triple Whammy)', 'مدر البول يقلل حجم الدم، الـ ACEi يوسع شريان الكلى الصادر، والـ NSAID يضيق شريان الكلى الوارد → النتيجة: فشل كلوي حاد'], lesson: '📌 Diuretic + ACEi + NSAID = فشل كلوي حاد.'
    },
    flashCards: [{ q: 'ما الفرق بين Cataflam (Diclofenac Potassium) و Voltaren (Diclofenac Sodium)؟', a: 'Cataflam (البوتاسيوم) يمتص أسرع، لذا يفضل للألم الحاد كألم الأسنان، بينما Sodium أبطأ ويفضل لآلام المفاصل المزمنة.' }],
    quiz: [{ question: 'هل الديكلوفيناك خيار آمن لمريض يعاني من قصور مزمن في عضلة القلب؟', options: ['نعم', 'لا'], correctAnswer: 'لا', explanation: 'الـ NSAIDs بشكل عام، وخاصة الديكلوفيناك، تحبس السوائل وتزيد العبء على القلب وتزيد خطر الجلطات.' }]
  },
  {
    id: 'allopurinol', name: 'Allopurinol', nameAr: 'ألوبيورينول', altNames: ['Zyloric', 'Zyloprim'],
    specialty: 'msk', difficulty: 2, icon: '🦴',
    mechanism: {
      tagline: 'يوقف مصنع حمض اليوريك (Uric Acid) في الجسم لمنع نوبات النقرس',
      flow: [
        { text: 'يثبط إنزيم Xanthine Oxidase في الكبد', isKey: true },
        { text: '↓' }, { text: 'يمنع تحول الهيبوكسانثين إلى حمض اليوريك' },
        { text: '↓' }, { text: 'تنخفض مستويات حمض اليوريك في الدم ولا تترسب البلورات في المفاصل ✅' }
      ],
      keyInsight: '💡 الدواء مخصص لـ "الوقاية" وليس للعلاج أثناء النوبة الحادة، بل إن أخذه أثناء النوبة لأول مرة قد يزيدها سوءاً!'
    },
    quickInfo: {
      class: 'Xanthine Oxidase Inhibitor (مثبط لتصنيع حمض اليوريك)', indications: ['الوقاية من النقرس (Gout)', 'متلازمة انحلال الورم (Tumor Lysis Syndrome)'],
      contraindications: ['المرضى الذين أصيبوا بمتلازمة ستيفنز جونسون (SJS) بسببه'],
      interactions: ['Azathioprine / Mercaptopurine — الألوبيورينول يمنع تكسيرها، فتتضاعف سميتها وتهبط المناعة بشدة 🚨'],
      dose: '100-300 mg مرة يومياً بعد الأكل مع شرب ماء كثير', goldenRule: '⭐ لا تبدأ الألوبيورينول أبداً أثناء نوبة النقرس الحادة (انتظر أسبوعين حتى تهدأ).'
    },
    scenario: {
      setup: 'مريض يتألم بشدة من نوبة نقرس حادة في إصبع قدمه، ووُصف له Allopurinol لأول مرة في الطوارئ.', question: 'ما هو الخطأ الطبي هنا؟',
      reasoning: ['بدء الألوبيورينول أثناء النوبة يسبب تغيراً مفاجئاً في مستويات حمض اليوريك', 'هذا التغير يفكك البلورات القديمة ويثير استجابة مناعية أعنف، مما يطيل النوبة'], lesson: '📌 Allopurinol = للوقاية فقط، ولا يُبدأ به وقت الألم.'
    },
    flashCards: [{ q: 'ما هو التفاعل الجلدي الخطير الذي يجب تحذير المريض منه عند بدء الألوبيورينول؟', a: 'طفح جلدي شديد قد يتطور إلى متلازمة ستيفنز جونسون (SJS).' }],
    quiz: [{ question: 'أي من الأدوية التالية هو العلاج الأنسب لإيقاف نوبة النقرس "الحادة"؟', options: ['Allopurinol', 'Colchicine', 'Febuxostat'], correctAnswer: 'Colchicine', explanation: 'الكولشيسين والـ NSAIDs يعالجان النوبة الحادة، بينما الألوبيورينول وفيبوكسوستات يمنعانها.' }]
  }
];
