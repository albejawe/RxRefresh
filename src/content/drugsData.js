export const drugs = [
  {
    id: 'paracetamol', name: 'Paracetamol', nameAr: 'باراسيتامول', altNames: ['Acetaminophen', 'Panadol', 'Tylenol'],
    specialty: 'analgesics', difficulty: 1, icon: '💊',
    mechanism: {
      tagline: 'يثبط إنتاج الألم والحرارة في الجهاز العصبي المركزي فقط — لا يؤذي المعدة',
      flow: [
        { text: 'يثبط COX-3 (إنزيم مسؤول عن إنتاج البروستاجلاندين) في الدماغ', isKey: true },
        { text: '↓' }, { text: 'إنتاج Prostaglandins يقل في المخ' },
        { text: '↓' }, { text: 'الألم يخف والحرارة تنخفض — دون التأثير على المعدة' }
      ],
      keyInsight: '💡 لا يثبط COX-1 في المعدة (بعكس الـ NSAIDs) → آمن على المعدة، لكن خطر على الكبد بجرعات عالية'
    },
    quickInfo: {
      class: 'Non-opioid Analgesic / Antipyretic', indications: ['ألم خفيف إلى متوسط', 'الحمى', 'خيار أول للحامل والمرضع'],
      contraindications: ['Severe hepatic impairment (فشل كبدي شديد)'],
      interactions: ['Warfarin — بجرعات عالية يرفع INR', 'Alcohol — يرفع NAPQI → Hepatotoxicity'],
      dose: '500–1000mg كل 4–6 ساعات | الحد الأقصى 4g/day للبالغين', goldenRule: '⭐ فوق 4g/day = Hepatotoxicity'
    },
    scenario: {
      setup: 'رجل 40 سنة يأخذ Warfarin، يطلب جرعة أعلى من الباراسيتامول لصداع شديد.', question: 'تعطيه جرعة إضافية؟',
      reasoning: ['الجرعات العالية ترفع تأثير Warfarin', 'خطر نزيف داخلي', 'الحل: التزم بالجرعة القياسية'], lesson: '📌 Paracetamol + Warfarin بجرعات عالية = راقب INR'
    },
    flashCards: [{ q: 'ما هو الحد الأقصى الآمن لجرعة الباراسيتامول يومياً للبالغين؟', a: '4 جرامات (4g/day)' }],
    quiz: [{ question: 'أي من الحالات تُعتبر مضاد استطباب للباراسيتامول؟', options: ['قرحة المعدة', 'فشل كبدي شديد', 'الربو'], correctAnswer: 'فشل كبدي شديد' }]
  },
  {
    id: 'ibuprofen', name: 'Ibuprofen', nameAr: 'إيبوبروفين', altNames: ['Advil', 'Brufen', 'Motrin'],
    specialty: 'analgesics', difficulty: 1, icon: '💊',
    mechanism: {
      tagline: 'يثبط إنزيمات COX طرفياً لتقليل الالتهاب، لكنه يقلل حماية المعدة',
      flow: [
        { text: 'يثبط غير انتقائي لـ COX-1 و COX-2', isKey: true },
        { text: '↓' }, { text: 'تثبيط COX-2 يقلل الألم والالتهاب ✅' },
        { text: '↓' }, { text: 'تثبيط COX-1 يقلل البروستاجلاندين الحامي للمعدة ❌' }
      ],
      keyInsight: '💡 يسبب تهيج المعدة ويجب تناوله مع الطعام'
    },
    quickInfo: {
      class: 'NSAID (مضاد التهاب غير ستيرويدي)', indications: ['ألم متوسط', 'التهاب', 'عسر الطمث'],
      contraindications: ['Active peptic ulcer (قرحة هضمية نشطة)', 'حمل (الثلث الثالث)'],
      interactions: ['Aspirin — يقلل التأثير القلبي للأسبيرين', 'Lithium — يرفع مستواه بالدم'],
      dose: '200–400mg كل 4–6 ساعات | الحد 3.2g/day', goldenRule: '⭐ ألم معدة مع NSAID = فكر في قرحة أو PPI'
    },
    scenario: {
      setup: 'مريض قرحة هضمية سابقة يطلب إيبوبروفين لألم المفاصل.', question: 'ما هو الإجراء؟',
      reasoning: ['الـ NSAIDs تزيد خطر النزف الهضمي', 'يفضل تجنبها أو إعطاؤها مع PPI'], lesson: '📌 NSAID + تاريخ قرحة = PPI ضروري'
    },
    flashCards: [{ q: 'لماذا يُنصح بتناول الإيبوبروفين مع الطعام؟', a: 'لتقليل تهيج المعدة الناتج عن تثبيط COX-1' }],
    quiz: [{ question: 'هل الإيبوبروفين آمن في الثلث الأخير من الحمل؟', options: ['نعم', 'لا'], correctAnswer: 'لا', explanation: 'قد يسبب انغلاق القناة الشريانية مبكراً للجنين.' }]
  },
  {
    id: 'atorvastatin', name: 'Atorvastatin', nameAr: 'أتورفاستاتين', altNames: ['Lipitor'],
    specialty: 'cardiovascular', difficulty: 2, icon: '❤️',
    mechanism: {
      tagline: 'يوقف مصنع الكوليسترول بالكبد فيضطر الكبد لسحبه من الدم',
      flow: [
        { text: 'يثبط HMG-CoA Reductase (إنزيم تصنيع الكوليسترول)', isKey: true },
        { text: '↓' }, { text: 'الكبد يرفع مستقبلات LDL ليعوّض النقص' },
        { text: '↓' }, { text: 'LDL في الدم ينخفض 40-60%' }
      ],
      keyInsight: '💡 لا "يحرق" الكوليسترول، بل يمنع تصنيعه فيسحبه الكبد'
    },
    quickInfo: {
      class: 'Statin', indications: ['ارتفاع الكوليسترول', 'وقاية بعد نوبة قلبية/سكتة'],
      contraindications: ['Pregnancy (الحمل — Category X)', 'أمراض الكبد النشطة'],
      interactions: ['Clarithromycin — يرفع مستوى الستاتين → خطر Myopathy', 'Grapefruit juice — نفس الخطر'],
      dose: '10–80mg مرة يومياً', goldenRule: '⭐ ألم عضلي غير مبرر + Statin = أوقف الدواء وافحص CK'
    },
    scenario: {
      setup: 'مريضة تتناول Atorvastatin أصبحت حاملاً مؤخراً.', question: 'ما الإجراء الصحيح؟',
      reasoning: ['الستاتينات Category X', 'يجب إيقافها فوراً'], lesson: '📌 Statin + الحمل = إيقاف فوري'
    },
    flashCards: [{ q: 'ما الإنزيم الذي تثبطه الـ Statins؟', a: 'HMG-CoA Reductase' }],
    quiz: [{ question: 'متى يُفضل تناول الـ Atorvastatin؟', options: ['صباحاً', 'مساءً'], correctAnswer: 'مساءً' }]
  },
  {
    id: 'lisinopril', name: 'Lisinopril', nameAr: 'ليسينوبريل', altNames: ['Zestril', 'Prinivil'],
    specialty: 'cardiovascular', difficulty: 2, icon: '❤️',
    mechanism: {
      tagline: 'يمنع تضيق الأوعية ويحمي الكلى، ولكنه يرفع البوتاسيوم',
      flow: [
        { text: 'يثبط ACE (إنزيم تحويل الأنجيوتنسين)', isKey: true },
        { text: '↓' }, { text: 'يمنع تحول Angiotensin I إلى Angiotensin II (المضيق للأوعية)' },
        { text: '↓' }, { text: 'الأوعية تتسع والضغط ينخفض ✅' }
      ],
      keyInsight: '💡 يمنع تحلل Bradykinin، مما يسبب السعال الجاف كأثر جانبي شهير'
    },
    quickInfo: {
      class: 'ACE Inhibitor', indications: ['ارتفاع الضغط', 'فشل القلب', 'حماية الكلى لمرضى السكري'],
      contraindications: ['Pregnancy (Category D)', 'Bilateral renal artery stenosis'],
      interactions: ['Spironolactone / NSAIDs — يرفع البوتاسيوم (Hyperkalemia)'],
      dose: '10–40mg مرة يومياً', goldenRule: '⭐ سعال جاف مستمر = حوّل المريض إلى ARB'
    },
    scenario: {
      setup: 'مريض يستخدم Lisinopril ويشكو من سعال جاف لا يستجيب للأدوية.', question: 'ما الحل؟',
      reasoning: ['السعال ناتج عن تراكم البراديكينين', 'الـ ARBs لا تسبب هذا التراكم'], lesson: '📌 ACEi cough → switch to ARB'
    },
    flashCards: [{ q: 'لماذا تسبب الـ ACE inhibitors سعالاً جافاً؟', a: 'بسبب تراكم الـ Bradykinin في الرئتين' }],
    quiz: [{ question: 'هل يسبب Lisinopril نقصاً أم زيادة في البوتاسيوم؟', options: ['نقص', 'زيادة'], correctAnswer: 'زيادة' }]
  },
  {
    id: 'omeprazole', name: 'Omeprazole', nameAr: 'أوميبرازول', altNames: ['Losec', 'Prilosec'],
    specialty: 'gi', difficulty: 1, icon: '🫁',
    mechanism: {
      tagline: 'يغلق مضخات البروتون في المعدة، فيمنع إفراز الحمض تماماً',
      flow: [
        { text: 'يرتبط بشكل غير عكوس بمضخة H+/K+ ATPase', isKey: true },
        { text: '↓' }, { text: 'تتوقف الخلايا الجدارية عن إفراز الحمض' },
        { text: '↓' }, { text: 'حموضة المعدة تقل وتُشفى القرحة ✅' }
      ],
      keyInsight: '💡 يجب تناوله قبل الطعام بـ 30 دقيقة لأن المضخات تنشط مع الأكل'
    },
    quickInfo: {
      class: 'Proton Pump Inhibitor (PPI)', indications: ['GERD', 'قرحة المعدة', 'علاج H. pylori'],
      contraindications: ['Hypersensitivity'],
      interactions: ['Clopidogrel — يقلل فعاليته (يفضل Pantoprazole بدلاً منه)'],
      dose: '20–40mg يومياً قبل الإفطار', goldenRule: '⭐ تناول PPI على معدة فارغة لضمان الفعالية'
    },
    scenario: {
      setup: 'مريض قلبي يأخذ Clopidogrel وتم وصف Omeprazole له.', question: 'هل هذا التدخل آمن؟',
      reasoning: ['Omeprazole يثبط CYP2C19 اللازم لتفعيل Clopidogrel', 'البديل الآمن هو Pantoprazole'], lesson: '📌 Clopidogrel + PPI = اختر Pantoprazole'
    },
    flashCards: [{ q: 'متى يجب تناول الأوميبرازول؟', a: 'قبل الطعام بـ 30 إلى 60 دقيقة' }],
    quiz: [{ question: 'أي PPI هو الأفضل لمريض يستخدم Clopidogrel؟', options: ['Omeprazole', 'Pantoprazole', 'Esomeprazole'], correctAnswer: 'Pantoprazole' }]
  },
  {
    id: 'metformin', name: 'Metformin', nameAr: 'ميتفورمين', altNames: ['Glucophage'],
    specialty: 'endocrine', difficulty: 2, icon: '🧬',
    mechanism: {
      tagline: 'يعيد حساسية الخلايا للإنسولين ويمنع الكبد من ضخ السكر',
      flow: [
        { text: 'يقلل تصنيع الجلوكوز في الكبد (Gluconeogenesis)', isKey: true },
        { text: '↓' }, { text: 'يحسن حساسية مستقبلات الإنسولين في العضلات' },
        { text: '↓' }, { text: 'سكر الدم ينخفض دون إفراز إنسولين إضافي ✅' }
      ],
      keyInsight: '💡 لا يسبب هبوط سكر (Hypoglycemia) بمفرده لأنه لا يحفز البنكرياس'
    },
    quickInfo: {
      class: 'Biguanide', indications: ['السكري النوع الثاني (الخيار الأول)', 'PCOS'],
      contraindications: ['Severe renal impairment (eGFR < 30)', 'الحماض الكيتوني'],
      interactions: ['Contrast media — أوقفه قبل الأشعة الملونة بـ 48 ساعة لمنع الفشل الكلوي'],
      dose: '500–2000mg يومياً مع الطعام', goldenRule: '⭐ Metformin + eGFR < 30 = Lactic Acidosis'
    },
    scenario: {
      setup: 'مريض سكري يحتاج أشعة مقطعية بالصبغة.', question: 'ما هو الإجراء بخصوص الميتفورمين؟',
      reasoning: ['الصبغة قد تسبب فشل كلوي حاد مؤقت', 'في حال الفشل الكلوي يتراكم الميتفورمين ويسبب Lactic Acidosis'], lesson: '📌 أشعة بصبغة = أوقف الميتفورمين'
    },
    flashCards: [{ q: 'هل يسبب الميتفورمين زيادة في الوزن؟', a: 'لا، على العكس قد يساعد في خسارة الوزن قليلاً' }],
    quiz: [{ question: 'ما هو الأثر الجانبي الأخطر (نادر) للميتفورمين؟', options: ['Hypoglycemia', 'Lactic Acidosis', 'Weight gain'], correctAnswer: 'Lactic Acidosis' }]
  }
];
