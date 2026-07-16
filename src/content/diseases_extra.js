export const diseases = [
  {
    id: 'asthma', name: 'Asthma', nameAr: 'الربو',
    specialty: 'respiratory', icon: '🫧', type: 'disease',
    overview: 'التهاب مزمن في الشعب الهوائية يسبب تضيقاً انتيابياً وقابلاً للشفاء (Reversible) مع فرط إفراز المخاط.',
    pathophysiology: {
      summary: 'محفزات → التهاب → تشنج القصبات (Bronchospasm) + مخاط',
      flow: ['التعرض للمحفز (غبار، جهد)', '↓', 'تنشيط الخلايا البدينة (Mast cells) وإفراز الهيستامين/اللوكوترين', '↓', 'تضيق المسالك الهوائية وصعوبة الزفير (Wheezing)']
    },
    drugClasses: [
      { class: 'SABA (Short-acting Beta Agonists)', classAr: 'موسعات القصبات السريعة', examples: 'Salbutamol (Ventolin)', mechanism: 'إرخاء العضلات الملساء فوراً', bestFor: 'النوبات الحادة (Reliever)' },
      { class: 'Inhaled Corticosteroids (ICS)', classAr: 'الكورتيزون المستنشق', examples: 'Fluticasone, Budesonide', mechanism: 'تخفيف الالتهاب المزمن', sideEffect: 'فطريات الفم', bestFor: 'الوقاية المستمرة (Controller)' },
      { class: 'LTRA', classAr: 'مضادات اللوكوترين', examples: 'Montelukast', mechanism: 'حجب وسائط الحساسية', bestFor: 'الربو التحسسي والمحرض بالرياضة' }
    ],
    keyPoints: ['🎯 الهدف: منع النوبات الليلية وتقليل استخدام المنقذ لمرتين أسبوعياً كحد أقصى.', '❌ لا تستخدم LABA (موسع طويل المفعول) كعلاج وحيد للربو دون كورتيزون مستنشق.'],
    scenario: { setup: 'مريض يستخدم الفنتولين 4 مرات يومياً، ويستيقظ ليلاً بسبب الكحة.', question: 'ما هو التعديل المطلوب؟', reasoning: ['ربو غير مسيطر عليه', 'يجب إضافة علاج وقائي (ICS) وتقليل الاعتماد على الفنتولين'], lesson: '📌 كثرة الفنتولين = حاجة ملحة للكورتيزون الوقائي' },
    flashCards: [{ q: 'ما هو الصوت التنفسي المميز لمريض الربو أثناء النوبة؟', a: 'الأزيز المسموع أثناء الزفير (Expiratory Wheezing)' }],
    quiz: [{ question: 'هل يسبب الربو تضيقاً قابلاً للشفاء (Reversible) أم دائماً (Irreversible) في القصبات؟', options: ['قابل للشفاء', 'دائم'], correctAnswer: 'قابل للشفاء', explanation: 'التضيق في الربو قابل للشفاء باستخدام موسعات القصبات، بخلاف مرض الـ COPD الذي يكون تضيقه شبه دائم.' }]
  },
  {
    id: 'peptic_ulcer', name: 'Peptic Ulcer Disease (PUD)', nameAr: 'مرض القرحة الهضمية',
    specialty: 'gi', icon: '🫁', type: 'disease',
    overview: 'تآكل في الغشاء المخاطي المبطن للمعدة أو الإثني عشر، ينجم غالباً عن عدوى بكتيرية أو استخدام الأدوية.',
    pathophysiology: {
      summary: 'اختلال التوازن بين عوامل الحماية (المخاط) وعوامل الهجوم (الحمض / البكتيريا)',
      flow: ['بكتيريا H. pylori أو كثرة مسكنات NSAIDs', '↓', 'تدمير حاجز المخاط الواقي', '↓', 'الحمض يحرق جدار المعدة مكوناً قرحة']
    },
    drugClasses: [
      { class: 'PPI (Proton Pump Inhibitors)', classAr: 'مثبطات مضخة البروتون', examples: 'Omeprazole, Pantoprazole', mechanism: 'إيقاف إفراز الحمض', bestFor: 'التئام القرحة وعلاج الارتجاع' },
      { class: 'Antibiotics (H. pylori Eradication)', classAr: 'المضادات الحيوية للقضاء على الجرثومة', examples: 'Clarithromycin + Amoxicillin', mechanism: 'قتل بكتيريا الملوية البوابية', bestFor: 'قرحة الـ H. pylori' }
    ],
    keyPoints: ['🎯 قرحة الإثني عشر (Duodenal) ألمها يقل مع الأكل.', '🎯 قرحة المعدة (Gastric) ألمها يزيد مع الأكل.'],
    scenario: { setup: 'مريض كبير في السن يشتكي من براز أسود (Melena) وهو يستخدم الإيبوبروفين لألم ركبتيه يومياً.', question: 'ما هو الخطر الحاصل؟', reasoning: ['البراز الأسود يدل على نزيف هضمي علوي (قرحة نازفة)', 'الـ NSAIDs هي المسبب الرئيسي'], lesson: '📌 مسكنات مفصلية يومية + براز أسود = قرحة نازفة.' },
    flashCards: [{ q: 'ما هو النظام العلاجي الثلاثي (Triple Therapy) للقضاء على جرثومة المعدة؟', a: 'PPI + Clarithromycin + Amoxicillin (أو Metronidazole)' }],
    quiz: [{ question: 'أي نوع من القرحة يتحسن ألمها مؤقتاً عند تناول الطعام؟', options: ['قرحة المعدة', 'قرحة الإثني عشر (الاثني عشري)'], correctAnswer: 'قرحة الإثني عشر (الاثني عشري)', explanation: 'في قرحة الإثني عشر، الطعام يغلق بوابة المعدة ويمنع وصول الحمض مؤقتاً للإثني عشر، مما يخفف الألم.' }]
  },
  {
    id: 'uti', name: 'Urinary Tract Infection (UTI)', nameAr: 'عدوى المسالك البولية',
    specialty: 'urology', icon: '🚻', type: 'disease',
    overview: 'التهاب بكتيري يصيب مجرى البول، المثانة (Cystitis)، أو الكلى (Pyelonephritis). شائع جداً عند النساء.',
    pathophysiology: {
      summary: 'بكتيريا الأمعاء تعبر إلى مجرى البول وتتكاثر',
      flow: ['صعود بكتيريا E. coli (غالباً) عبر الإحليل', '↓', 'الالتصاق بجدار المثانة والتكاثر', '↓', 'التهاب، حرقة بالبول، وكثرة التبول']
    },
    drugClasses: [
      { class: 'Nitrofurantoin', classAr: 'نيتروفورانتوين', examples: 'Macrodantin', mechanism: 'تدمير الـ DNA البكتيري بالبول', sideEffect: 'تلوين البول بالبني', bestFor: 'التهاب المثانة غير المعقد' },
      { class: 'Fluoroquinolones', classAr: 'الفلوروكينولونات', examples: 'Ciprofloxacin', mechanism: 'تثبيط انقسام البكتيريا', bestFor: 'التهاب الكلى أو التهابات البروستاتا المعقدة' }
    ],
    keyPoints: ['🎯 يجب شرب كميات كبيرة من الماء لطرد البكتيريا.', '❌ لا تستخدم Nitrofurantoin إذا كان الالتهاب قد وصل للكلى (Pyelonephritis) لأنه يتركز في المثانة فقط.'],
    scenario: { setup: 'مريضة حامل في الشهر الرابع تشتكي من حرقة في البول. فحص المزرعة أظهر E. coli.', question: 'هل Ciprofloxacin مناسب؟', reasoning: ['الفلوروكينولونات ممنوعة في الحمل', 'البديل الآمن هو Amoxicillin أو Cephalexin أو Nitrofurantoin'], lesson: '📌 Cipro + حمل = ممنوع.' },
    flashCards: [{ q: 'ما هو البكتيريا المسببة لمعظم حالات التهاب المسالك البولية (UTI)؟', a: 'بكتيريا الإشريكية القولونية (E. coli)' }],
    quiz: [{ question: 'أي دواء يُستخدم لتخفيف ألم وحرقة البول فوراً ولكنه يلون البول بالبرتقالي/الأحمر؟', options: ['Ciprofloxacin', 'Phenazopyridine', 'Paracetamol'], correctAnswer: 'Phenazopyridine', explanation: 'الفينازوبيريدين هو مسكن موضعي للمسالك البولية ويحذر المرضى من أنه يغير لون البول للبرتقالي المحمر.' }]
  }
];
