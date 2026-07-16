export const diseases = [
  {
    id: 'hypertension', name: 'Hypertension', nameAr: 'ارتفاع ضغط الدم',
    specialty: 'cardiovascular', icon: '🩺', type: 'disease',
    overview: 'ضغط > 140/90 متكرر، يُسمى Silent Killer لغياب الأعراض المبكرة.',
    pathophysiology: {
      summary: 'الضغط = Cardiac Output × Peripheral Resistance',
      flow: ['ارتفاع المقاومة', '↓', 'ضرر بجدران الأوعية', '↓', 'Stroke, MI, Renal Failure']
    },
    drugClasses: [
      { class: 'ACE Inhibitors', classAr: 'مثبطات الأنجيوتنسين', examples: 'Lisinopril', mechanism: 'توسيع الأوعية', bestFor: 'السكري' },
      { class: 'Calcium Channel Blockers', classAr: 'حاصرات الكالسيوم', examples: 'Amlodipine', mechanism: 'إرخاء العضلات الملساء', sideEffect: 'وذمة (تورم الكاحل)' }
    ],
    keyPoints: ['🎯 الهدف: BP < 130/80'],
    scenario: { setup: 'مريض ضغط يعاني من تورم في الكاحل', question: 'أي دواء غالباً هو السبب؟', reasoning: ['Amlodipine يوسع الشرايين أكثر من الأوردة فتتجمع السوائل'], lesson: '📌 Amlodipine = Ankle edema' },
    flashCards: [{ q: 'ما هو الدواء الأفضل لضغط الدم عند مريض السكري؟', a: 'ACE Inhibitors' }],
    quiz: [{ question: 'هل يجوز الجمع بين ACEi و ARB؟', options: ['نعم', 'لا'], correctAnswer: 'لا' }]
  },
  {
    id: 't2dm', name: 'Type 2 Diabetes Mellitus', nameAr: 'السكري من النوع الثاني',
    specialty: 'endocrine', icon: '🩺', type: 'disease',
    overview: 'مقاومة الإنسولين في الخلايا مع نقص نسبي في إفرازه.',
    pathophysiology: {
      summary: 'مقاومة الإنسولين → الكبد يفرز الجلوكوز → البنكرياس يُرهق',
      flow: ['السمنة/الوراثة', '↓', 'Insulin Resistance', '↓', 'Hyperglycemia']
    },
    drugClasses: [
      { class: 'Biguanides', classAr: 'البيجوانيد', examples: 'Metformin', mechanism: 'تقليل إفراز الكبد للسكر', bestFor: 'الخط الأول' },
      { class: 'SGLT2 Inhibitors', classAr: 'مثبطات SGLT2', examples: 'Empagliflozin', mechanism: 'طرح السكر في البول', bestFor: 'مرضى القلب وفشل القلب' }
    ],
    keyPoints: ['🎯 HbA1c Target < 7%'],
    scenario: { setup: 'مريض سكري مصاب بفشل القلب', question: 'ما هي الفئة المفضلة لإضافتها؟', reasoning: ['SGLT2i أثبتت فعاليتها الكبيرة في تحسين فشل القلب'], lesson: '📌 SGLT2i = قلب سليم' },
    flashCards: [{ q: 'ما هو الفحص الذهبي لمتابعة السكري؟', a: 'السكر التراكمي (HbA1c)' }],
    quiz: [{ question: 'ما هو الدواء الأول الموصى به لمعظم مرضى السكري النوع 2؟', options: ['Insulin', 'Metformin', 'Glibenclamide'], correctAnswer: 'Metformin' }]
  }
];
