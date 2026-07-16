export const drugs = [
  {
    id: 'amoxicillin', name: 'Amoxicillin', nameAr: 'أموكسيسيلين', altNames: ['Amoxil', 'Ospamox'],
    specialty: 'antibiotics', difficulty: 1, icon: '🦠',
    mechanism: {
      tagline: 'يدمر جدار الخلية البكتيرية أثناء انقسامها، فتموت وتنفجر',
      flow: [
        { text: 'يرتبط ببروتينات ربط البنسلين (PBPs) في البكتيريا', isKey: true },
        { text: '↓' }, { text: 'يمنع بناء جدار الخلية البكتيرية' },
        { text: '↓' }, { text: 'الخلية البكتيرية تضعف وتتحلل (Bactericidal) ✅' }
      ],
      keyInsight: '💡 فعال ضد البكتيريا إيجابية الجرام، لكنه يُدمر بواسطة إنزيمات البيتا لاكتاماز البكتيرية'
    },
    quickInfo: {
      class: 'Penicillin Antibiotic (مضاد حيوي بنيسيليني)', indications: ['التهاب الأذن الوسطى', 'التهاب الحلق (العقدي)', 'عدوى الأسنان'],
      contraindications: ['Penicillin Allergy (حساسية البنسلين)'],
      interactions: ['Methotrexate — يقلل إطراحه الكَلَوي فتزداد سميته', 'Allopurinol — يزيد خطر الطفح الجلدي'],
      dose: '500mg كل 8 ساعات أو 1g كل 12 ساعة', goldenRule: '⭐ أي تاريخ لصدمة تأقية (Anaphylaxis) من البنسلين = ممنوع تماماً'
    },
    scenario: {
      setup: 'مريض يخبرك أن لديه "حساسية بنسلين" ويسأل إذا كان يمكنه أخذ أموكسيسيلين.', question: 'ما هو تصرفك؟',
      reasoning: ['أموكسيسيلين هو بنسلين بحد ذاته', 'إعطاؤه قد يسبب صدمة حساسية مميتة'], lesson: '📌 Amoxicillin = Penicillin. الحساسية لأحدهما تعني الحساسية للآخر.'
    },
    flashCards: [{ q: 'هل الأموكسيسيلين قاتل للبكتيريا أم مثبط لنموها؟', a: 'قاتل للبكتيريا (Bactericidal) لأنه يدمر الجدار الخلوي' }],
    quiz: [{ question: 'هل يقاوم الأموكسيسيلين البكتيريا المفرزة لإنزيم بيتا لاكتاماز لوحده؟', options: ['نعم', 'لا'], correctAnswer: 'لا', explanation: 'يحتاج إلى إضافة حمض الكلافولانيك لحمايته.' }]
  },
  {
    id: 'amox_clav', name: 'Amoxicillin/Clavulanate', nameAr: 'أموكسيسيلين / كلافولانات', altNames: ['Augmentin', 'Curam', 'Megamox'],
    specialty: 'antibiotics', difficulty: 2, icon: '🦠',
    mechanism: {
      tagline: 'حارس يضحي بنفسه (Clavulanate) ليسمح للأموكسيسيلين بقتل البكتيريا',
      flow: [
        { text: 'حمض الكلافولانيك يرتبط بإنزيمات بيتا لاكتاماز البكتيرية ويعطلها', isKey: true },
        { text: '↓' }, { text: 'يُحفظ الأموكسيسيلين من التدمير' },
        { text: '↓' }, { text: 'الأموكسيسيلين يدمر جدار البكتيريا المقاومة بنجاح ✅' }
      ],
      keyInsight: '💡 حمض الكلافولانيك ليس له تأثير مضاد بكتيري مباشر، وظيفته فقط تشتيت الإنزيم البكتيري'
    },
    quickInfo: {
      class: 'Penicillin + Beta-lactamase inhibitor', indications: ['عضات الحيوانات/البشر', 'التهابات الجهاز التنفسي السفلية', 'التهابات الجيوب الأنفية المقاومة'],
      contraindications: ['تاريخ ليرقان أو خلل كبدي بسبب الدواء'],
      interactions: ['Probenecid — يرفع مستوى الأموكسيسيلين بالدم'],
      dose: '1g كل 12 ساعة (للبالغين)', goldenRule: '⭐ يسبب إسهالاً أكثر من الأموكسيسيلين وحده (بسبب الكلافولانات)'
    },
    scenario: {
      setup: 'مريض يشتكي من إسهال شديد بعد يومين من استخدام Augmentin.', question: 'ما النصيحة؟',
      reasoning: ['الإسهال عرض جانبي شائع للكلافولانات', 'ينصح بتناوله مع بداية وجبة الطعام لتقليل تهيج الأمعاء'], lesson: '📌 Augmentin = دائماً مع بداية الوجبة لتقليل الإسهال'
    },
    flashCards: [{ q: 'ما هو دور حمض الكلافولانيك (Clavulanic acid)؟', a: 'تثبيط إنزيم بيتا لاكتاماز الذي تفرزه البكتيريا لحماية الأموكسيسيلين' }],
    quiz: [{ question: 'أي من الحالات التالية تمنع استخدام أموكسيسيلين/كلافولانات؟', options: ['الحمل', 'تاريخ سابق لإصابة الكبد بسبب الدواء', 'السعال'], correctAnswer: 'تاريخ سابق لإصابة الكبد بسبب الدواء' }]
  },
  {
    id: 'azithromycin', name: 'Azithromycin', nameAr: 'أزيثرومايسين', altNames: ['Zithromax', 'Zmax'],
    specialty: 'antibiotics', difficulty: 2, icon: '🦠',
    mechanism: {
      tagline: 'يتدخل في مصنع البروتين البكتيري فيوقف تكاثرها، ويبقى في الجسم لأيام',
      flow: [
        { text: 'يرتبط بوحدة 50S في الريبوسوم البكتيري', isKey: true },
        { text: '↓' }, { text: 'يمنع بناء البروتينات الضرورية لنمو البكتيريا' },
        { text: '↓' }, { text: 'البكتيريا تتوقف عن النمو والتكاثر (Bacteriostatic)' }
      ],
      keyInsight: '💡 يتركز في الأنسجة بشكل كبير (أعلى من الدم بـ 50 مرة)، ولذلك يُعطى لـ 3 أيام ويستمر مفعوله لـ 10 أيام'
    },
    quickInfo: {
      class: 'Macrolide Antibiotic (مضاد حيوي ماكروليدي)', indications: ['الكلاميديا', 'التهاب الشعب الهوائية', 'إسهال المسافرين (بديل للسيبرو)'],
      contraindications: ['تطاول فترة QT في القلب (QT prolongation)'],
      interactions: ['Antacids (مضادات الحموضة) — تقلل من امتصاصه (افصلها بساعتين)'],
      dose: '500mg مرة يومياً لمدة 3 أيام', goldenRule: '⭐ آمن للحامل (Category B) ومناسب لمرضى حساسية البنسلين'
    },
    scenario: {
      setup: 'مريض يعاني من اضطراب في نظم القلب (Long QT Syndrome) ومصاب بعدوى فطرية، وصف له الطبيب أزيثرومايسين.', question: 'هل تصرف الطبيب سليم؟',
      reasoning: ['الأزيثرومايسين قد يطيل فترة QT بشكل خطير عند المرضى المعرضين لذلك', 'هذا قد يؤدي إلى Torsades de Pointes المميت'], lesson: '📌 Macrolides + Long QT = خطر اضطراب نظم القلب'
    },
    flashCards: [{ q: 'لماذا يستمر كورس الأزيثرومايسين لـ 3 أيام فقط؟', a: 'لأن عمر النصف للدواء طويل جداً (حوالي 68 ساعة) ويتركز في الأنسجة' }],
    quiz: [{ question: 'أي من المضادات الحيوية التالية يُعتبر آمناً للاستخدام في حالات الكلاميديا للحامل؟', options: ['Doxycycline', 'Azithromycin', 'Ciprofloxacin'], correctAnswer: 'Azithromycin' }]
  },
  {
    id: 'ciprofloxacin', name: 'Ciprofloxacin', nameAr: 'سيبروفلوكساسين', altNames: ['Cipro', 'Ciprodar'],
    specialty: 'antibiotics', difficulty: 2, icon: '🦠',
    mechanism: {
      tagline: 'يمنع الحمض النووي البكتيري من الانفكاك، فتتمزق الكروموسومات',
      flow: [
        { text: 'يثبط إنزيم DNA Gyrase و Topoisomerase IV', isKey: true },
        { text: '↓' }, { text: 'لا تستطيع البكتيريا فك شريط الـ DNA لنسخه' },
        { text: '↓' }, { text: 'الـ DNA يتكسر وتموت البكتيريا (Bactericidal)' }
      ],
      keyInsight: '💡 فعال جداً ضد البكتيريا سلبية الجرام (Gram-negative) والزائفة (Pseudomonas)'
    },
    quickInfo: {
      class: 'Fluoroquinolone (فلوروكينولون)', indications: ['عدوى المسالك البولية المعقدة (UTIs)', 'التيفوئيد', 'التهابات البروستاتا'],
      contraindications: ['الحمل (Category C)', 'الأطفال والمراهقين < 18 سنة (يؤثر على الغضاريف)'],
      interactions: ['الحليب والحديد ومضادات الحموضة — ترتبط بالدواء وتمنع امتصاصه (Chelation)'],
      dose: '500mg كل 12 ساعة', goldenRule: '⭐ تمزق وتر أخيل (Achilles tendon rupture) هو أثر جانبي خطير ونادر للفلوروكينولونات'
    },
    scenario: {
      setup: 'شاب رياضي يبلغ من العمر 25 عاماً يتناول سيبروفلوكساسين لعدوى مسالك بولية ويشكو من ألم مفاجئ في كعب القدم.', question: 'ماذا يجب أن يفعل؟',
      reasoning: ['السيبروفلوكساسين يمكن أن يسبب تمزق الأوتار (خاصة وتر أخيل)', 'يجب إيقاف الدواء فوراً وعدم ممارسة الرياضة لحين مراجعة الطبيب'], lesson: '📌 Cipro + ألم في العرقوب = أوقف الدواء لتجنب تمزق الوتر'
    },
    flashCards: [{ q: 'ماذا يحدث إذا تناولت السيبروفلوكساسين مع كوب من الحليب؟', a: 'الكالسيوم يرتبط بالدواء (Chelation) ويمنع امتصاصه' }],
    quiz: [{ question: 'هل يُنصح بالسيبروفلوكساسين للأطفال كخيار أول؟', options: ['نعم', 'لا'], correctAnswer: 'لا', explanation: 'لأنه قد يؤثر على نمو الغضاريف والمفاصل الحاملة للوزن.' }]
  },
  {
    id: 'metronidazole', name: 'Metronidazole', nameAr: 'ميترونيدازول', altNames: ['Flagyl'],
    specialty: 'antibiotics', difficulty: 2, icon: '🦠',
    mechanism: {
      tagline: 'يتفاعل داخل البكتيريا اللاهوائية لتوليد مواد سامة تدمر حمضها النووي',
      flow: [
        { text: 'يدخل الخلية ويتم اختزاله بواسطة إنزيمات البكتيريا اللاهوائية فقط', isKey: true },
        { text: '↓' }, { text: 'تتكون جذور حرة سامة (Toxic free radicals)' },
        { text: '↓' }, { text: 'تكسر خيوط الـ DNA وتميت الخلية' }
      ],
      keyInsight: '💡 يعمل فقط في البيئة اللاهوائية (بدون أكسجين) وضد بعض الطفيليات'
    },
    quickInfo: {
      class: 'Nitroimidazole (مضاد لاهوائيات وطفيليات)', indications: ['التهاب المهبل البكتيري', 'التهابات الأسنان واللثة اللاهوائية', 'الأميبا والجيارديا'],
      contraindications: ['شرب الكحول (يسبب Disulfiram-like reaction)'],
      interactions: ['Warfarin — يزيد من تأثير الوارفارين ويرفع خطر النزف'],
      dose: '400-500mg كل 8 ساعات', goldenRule: '⭐ ميترونيدازول + كحول = غثيان شديد وقيء واحمرار (ممنوع الكحول خلال العلاج وبعده بـ 3 أيام)'
    },
    scenario: {
      setup: 'مريضة تستخدم Flagyl لالتهاب مهبلي، وتسأل إذا كان بإمكانها استخدام غسول فم يحتوي على الكحول.', question: 'بماذا تنصحها؟',
      reasoning: ['حتى الكميات الصغيرة من الكحول في غسول الفم قد تسبب Disulfiram-like reaction مع الميترونيدازول', 'يجب تجنبه تماماً'], lesson: '📌 Flagyl يكره الكحول بأي شكل من الأشكال'
    },
    flashCards: [{ q: 'ما هو الطعم المميز الذي يشكو منه مستخدمو الميترونيدازول؟', a: 'طعم معدني مزعج في الفم (Metallic taste)' }],
    quiz: [{ question: 'هل الميترونيدازول فعال ضد البكتيريا الهوائية (التي تحتاج أكسجين)؟', options: ['نعم', 'لا'], correctAnswer: 'لا', explanation: 'لأنه يحتاج بيئة لاهوائية ليتم اختزاله وتنشيطه.' }]
  }
];
