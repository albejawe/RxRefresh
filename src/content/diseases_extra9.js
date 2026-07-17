export const diseases = [
  {
    id: 'myocardial_infarction', name: 'Myocardial Infarction (MI)', nameAr: 'احتشاء عضلة القلب',
    specialty: 'cardiovascular', icon: '❤️', type: 'disease',
    overview: 'موت مفاجئ لخلايا عضلة القلب بسبب انقطاع التروية الدموية عن جزء من القلب، غالباً بسبب تخثر شرياني.',
    pathophysiology: {
      summary: 'تصلب الشرايين والجلطات → انسداد شرايين القلب → نقص الأكسجين والتغذية → موت خلايا العضلة',
      flow: ['تراكم الكوليسترول والدهون في جدران الشرايين', '↓', 'تكون جلطة (Thrombus) أو انفصال جزء من اللويحة', '↓', 'انسداد كامل للشريان ↓ نقص أكسجين → موت الخلايا']
    },
    drugClasses: [
      { class: 'Antiplatelet Agents', classAr: 'مضادات التجلط', examples: 'Aspirin, Clopidogrel (Plavix)', mechanism: 'منع تجمع الصفيحات والجلطات' },
      { class: 'Anticoagulants', classAr: 'مميعات الدم', examples: 'Heparin, Warfarin', mechanism: 'منع تكون عوامل التخثر' },
      { class: 'Beta-blockers', classAr: 'حاصرات بيتا', examples: 'Metoprolol, Carvedilol', mechanism: 'تقليل حمل العمل على القلب' },
      { class: 'ACE Inhibitors', classAr: 'مثبطات الأنجيوتنسين', examples: 'Lisinopril', mechanism: 'حماية عضلة القلب من التندب' }
    ],
    keyPoints: ['🎯 الوقت = العضلة (Time is Muscle): كل دقيقة تأخير تزيد الضرر', '❌ لا تعط Morphine قبل ضخ رئوي للتأكد من عدم وذمة رئوية', '⭐ ECG في أول 10 دقائق من الألم (golden standard)'],
    scenario: { setup: 'رجل 55 سنة يدخل الطوارئ بألم صدري حاد متشع لليد اليسرى والرقبة وعرق بارد.', question: 'ما الإجراء الأول الفوري؟', reasoning: ['ECG فوري + Troponin', 'Aspirin 300mg فوري + Heparin + Clopidogrel', 'بدء Catheterization إن أمكن'] },
    flashCards: [{ q: 'ما الفترة الذهبية (Golden Hour) لفتح الشرايين المسدودة في MI؟', a: '120 دقيقة من بدء الأعراض (PCI)' }],
    quiz: [{ question: 'أي مؤشر حيوي يُعتبر الأفضل والأسرع للكشف عن MI؟', options: ['CK-MB', 'Troponin I/T', 'Myoglobin', 'LDH'], correctAnswer: 'Troponin I/T' }]
  },
  {
    id: 'chronic_kidney_disease', name: 'Chronic Kidney Disease (CKD)', nameAr: 'مرض الكلى المزمن',
    specialty: 'renal', icon: '💧', type: 'disease',
    overview: 'تدهور تدريجي وطويل الأمد لوظيفة الكلى يؤدي إلى فقدان القدرة على تصفية الفضلات والسوائل الزائدة.',
    pathophysiology: {
      summary: 'تلف الكبيبات الكلوية (من السكري، الضغط، الالتهاب) → فقدان الوحدات الكلوية → انخفاض GFR → تراكم الفضلات',
      flow: ['مرض السكري أو ارتفاع الضغط أو التهاب كلوي', '↓', 'تليف الكبيبات (Glomerulosclerosis)', '↓', 'انخفاض GFR (مرشح الترشيح)', '↓', 'Uremia (تسمم بسبب الفضلات)']
    },
    drugClasses: [
      { class: 'ACE Inhibitors / ARBs', classAr: 'مثبطات الأنجيوتنسين', examples: 'Lisinopril, Losartan', mechanism: 'حماية الكبيبات من التدهور التدريجي' },
      { class: 'Phosphate Binders', classAr: 'مثبطات الفوسفات', examples: 'Calcium Acetate, Sevelamer', mechanism: 'منع تراكم الفوسفات السام' },
      { class: 'Diuretics', classAr: 'مدرات البول', examples: 'Furosemide', mechanism: 'إزالة السوائل الزائدة' }
    ],
    keyPoints: ['🎯 تقسيم CKD إلى 5 مراحل حسب GFR', '⭐ GFR < 15 = حاجة للغسيل الكلوي', '❌ تجنب الأدوية السامة للكلى (NSAIDs, Contrast media)'],
    scenario: { setup: 'مريض سكري مع GFR 28 مل/دقيقة، يعاني من فقر دم وارتفاع ضغط.', question: 'ما الأدوية الحتمية؟', reasoning: ['ACE-I أو ARB للحماية', 'ESA (Erythropoietin) لفقر الدم', 'تجنب NSAIDs وmetformin'] },
    flashCards: [{ q: 'ما هو مستوى GFR الذي يستدعي البدء بالغسيل الكلوي؟', a: 'عادة عندما GFR < 15 مل/دقيقة' }],
    quiz: [{ question: 'أي من الأدوية التالية آمنة تماماً في CKD المتقدمة؟', options: ['Metformin', 'ACE-I', 'NSAIDs'], correctAnswer: 'ACE-I' }]
  },
  {
    id: 'sepsis', name: 'Sepsis', nameAr: 'الإنتان (العدوى الدموية الخطيرة)',
    specialty: 'emergency', icon: '🚑', type: 'disease',
    overview: 'استجابة جسم شديدة وخطيرة لعدوى بكتيرية تؤدي لالتهاب عام وفشل أعضاء متعدد.',
    pathophysiology: {
      summary: 'عدوى بكتيرية → إطلاق سموم بكتيرية (LPS) → استجابة التهابية مفرطة → خلل وعائي وفشل أعضاء',
      flow: ['البكتيريا تغزو مجرى الدم', '↓', 'إطلاق Lipopolysaccharide (LPS)', '↓', 'تفعيل الجهاز المناعي بشدة (Cytokine Storm)', '↓', 'hypotension وفشل عضوي']
    },
    drugClasses: [
      { class: 'Broad-spectrum Antibiotics', classAr: 'مضادات حيوية واسعة الطيف', examples: 'Piperacillin-Tazobactam, Carbapenem', mechanism: 'القتل السريع للبكتيريا' },
      { class: 'Vasopressors', classAr: 'مرفعات الضغط', examples: 'Norepinephrine, Dopamine', mechanism: 'رفع الضغط الدموي المنخفض بشكل حرج' },
      { class: 'Fluid Resuscitation', classAr: 'إعادة ترطيب سريعة', examples: 'Normal Saline, Crystalloids', mechanism: 'تعويض فقد السوائل والصدمة' }
    ],
    keyPoints: ['🎯 كل ساعة تأخير في المضادات الحيوية = زيادة 7-8% في الوفيات', '⭐ SIRS Criteria: Temp, HR, RR, WBC', '❌ ننتظر الثقافة أم نبدأ Empiric therapy؟ الإجابة: نبدأ فوراً!'],
    scenario: { setup: 'مريض حمى 39.5°C مع قشعريرة وتسرع نبض 125 وضغط منخفض 90/50 وألم عضلي شديد.', question: 'ما التشخيص والخطوات الأولى؟', reasoning: ['Sepsis + Septic Shock متوقع', 'Blood cultures فوري قبل المضادات', 'ابدأ Empiric broad-spectrum antibiotics فوراً', 'Fluid resuscitation + Vasopressors إذا لزم'] },
    flashCards: [{ q: 'كم ساعة نعطي فيها أول جرعة من المضادات الحيوية في الإنتان من بدء التشخيص؟', a: 'داخل الساعة الأولى (بالمثالي: أقل من 30 دقيقة)' }],
    quiz: [{ question: 'أي من التالي ليس من معايير SIRS (Systemic Inflammatory Response Syndrome)؟', options: ['Temperature > 38 أو < 36', 'Heart Rate > 90', 'Blood Glucose < 100', 'RR > 20'], correctAnswer: 'Blood Glucose < 100' }]
  },
  {
    id: 'acute_stroke', name: 'Acute Ischemic Stroke', nameAr: 'السكتة الدماغية الإقفارية الحادة',
    specialty: 'cns', icon: '🧠', type: 'disease',
    overview: 'انقطاع مفاجئ للتروية الدموية عن منطقة من الدماغ، مما يؤدي لموت خلايا عصبية وفقدان وظائف.',
    pathophysiology: {
      summary: 'جلطة دموية تسد شرياناً دماغياً → نقص أكسجين → نقص ATP → موت عصبي (Cerebral infarction)',
      flow: ['Atherosclerosis أو جلطة من القلب (Embolism)', '↓', 'انسداد شرياني دماغي', '↓', 'نقص الأكسجين وفقد ATP', '↓', 'موت خلايا عصبية (Necrosis) وتمدد الضرر (Ischemic Penumbra)']
    },
    drugClasses: [
      { class: 'Thrombolytics', classAr: 'المذيبات للجلطات', examples: 'Alteplase (tPA)', mechanism: 'إذابة الجلطة وإعادة التروية السريعة' },
      { class: 'Antiplatelet Agents', classAr: 'مضادات التجلط', examples: 'Aspirin, Ticlopidine', mechanism: 'منع تكون جلطات جديدة' },
      { class: 'Anticoagulants', classAr: 'مميعات الدم', examples: 'Warfarin, DOACs', mechanism: 'منع جلطات قلبية المنشأ' }
    ],
    keyPoints: ['🎯 Thrombolytic window = 4.5 ساعة من بدء الأعراض فقط!', '⭐ CT brain الأول: إلغاء النزفية قبل الـ tPA', '❌ لا تعط tPA إذا كانت السكتة نزفية (Hemorrhagic stroke)'],
    scenario: { setup: 'مريض استيقظ من النوم مع شلل نصفي يساري وعدم القدرة على الكلام، وصل الطوارئ بعد ساعتين.', question: 'هل يستحق tPA؟', reasoning: ['إذا CT سالبة للنزف: نعم، لم يمض 4.5 ساعات بعد', 'دعني أتحقق من الموانع الأخرى', 'تاريخ جراحة حديثة أو نزف؟'] },
    flashCards: [{ q: 'ما أقصى وقت من بدء أعراض السكتة الإقفارية يمكن إعطاء tPA؟', a: '4.5 ساعات (في بعض الحالات حتى 24 ساعة مع Thrombectomy الحديثة)' }],
    quiz: [{ question: 'أي من الفحوصات يجب عمله أولاً قبل إعطاء tPA في السكتة الحادة؟', options: ['MRI brain', 'CT brain', 'Angiography', 'Carotid ultrasound'], correctAnswer: 'CT brain' }]
  },
  {
    id: 'atrial_fibrillation', name: 'Atrial Fibrillation (AFib)', nameAr: 'الرجفان الأذيني',
    specialty: 'cardiovascular', icon: '❤️', type: 'disease',
    overview: 'عدم انتظام ضربات القلب العشوائية والسريعة جداً في الأذينين، مما يعطل النبض المنتظم.',
    pathophysiology: {
      summary: 'خلل كهربائي في الأذينين → انقباضات فوضوية وسريعة جداً → ركود دموي أذيني → جلطات',
      flow: ['تأثيرات (جلطات، احتشاء قلبي، قلب مرقش)', '↓', 'خلل كهربائي عشوائي في الأذينين', '↓', 'نبض غير منتظم وسريع (مثل الطبول المجنونة)', '↓', 'ركود دم أذيني → جلطات قلبية']
    },
    drugClasses: [
      { class: 'Anticoagulants', classAr: 'مميعات الدم', examples: 'Warfarin, Apixaban (Eliqua)', mechanism: 'منع الجلطات الدماغية والطرفية' },
      { class: 'Beta-blockers', classAr: 'حاصرات بيتا', examples: 'Metoprolol, Atenolol', mechanism: 'إبطاء معدل ضربات القلب' },
      { class: 'Calcium Channel Blockers', classAr: 'حاصرات الكالسيوم', examples: 'Diltiazem, Verapamil', mechanism: 'إبطاء التوصيل بين الأذينين والبطينين' },
      { class: 'Antiarrhythmics', classAr: 'مضادات عدم الانتظام', examples: 'Amiodarone', mechanism: 'استعادة النظم القلبي المنتظم' }
    ],
    keyPoints: ['🎯 كل مريض AFib يحتاج مميع دم (إلا إذا كان score CHA2DS2-VASc = 0)', '⭐ الخطر الأول: Stroke (من الجلطات)', '❌ لا تحاول تحويل AFib حاد بدون stabilize HR أولاً'],
    scenario: { setup: 'مريضة 72 سنة مع قصة ارتفاع ضغط، تشتكي من ضربات قلب سريعة وغير منتظمة وضيق تنفس.', question: 'ما الخطة العلاجية؟', reasoning: ['ECG لتأكيد AFib', 'إذا hemodynamically unstable: Cardioversion كهربائية', 'إذا stable: Rate control أولاً (Beta-blocker أو CCB)، ثم anticoagulation'] },
    flashCards: [{ q: 'ما هي أهم مضاعفات الرجفان الأذيني غير المعالج؟', a: 'السكتة الدماغية (من الجلطات التي تتكون في الأذينين الراكدة)' }],
    quiz: [{ question: 'مريض AFib hemodynamically stable ينبض 150/دقيقة، ما العلاج الأول؟', options: ['Cardioversion فوراً', 'Amiodarone IV', 'Metoprolol (Rate control)', 'Warfarin'], correctAnswer: 'Metoprolol (Rate control)' }]
  },
  {
    id: 'pneumonia', name: 'Community-Acquired Pneumonia (CAP)', nameAr: 'الالتهاب الرئوي المكتسب من المجتمع',
    specialty: 'respiratory', icon: '🫧', type: 'disease',
    overview: 'عدوى بكتيرية أو فيروسية تصيب الحويصلات الهوائية (Alveoli) في الرئتين، مما يسبب ملء السوائل والصديد.',
    pathophysiology: {
      summary: 'جرثومة تصل للرئتين → استجابة التهابية → امتلاء الحويصلات بالسوائل (Consolidation) → صعوبة التهوية والأكسجين',
      flow: ['العدوى البكتيرية أو الفيروسية تصل للرئتين', '↓', 'غزو الحويصلات الهوائية', '↓', 'استجابة التهابية ↓ فقدان الأكسجين', '↓', 'Hypoxemia وفشل تنفسي']
    },
    drugClasses: [
      { class: 'Beta-lactam Antibiotics', classAr: 'مضادات حيوية بيتا-لاكتام', examples: 'Amoxicillin-Clavulanate, Ceftriaxone', mechanism: 'قتل البكتيريا بتثبيط جدارها' },
      { class: 'Macrolides', classAr: 'المضادات الحيوية الماكروليدية', examples: 'Azithromycin', mechanism: 'منع بناء البروتين البكتيري' },
      { class: 'Fluoroquinolones', classAr: 'مضادات الفلوروكينولون', examples: 'Levofloxacin', mechanism: 'تثبيط DNA البكتيري' }
    ],
    keyPoints: ['🎯 الأكسجين قبل المضادات الحيوية إذا SpO2 < 90%', '⭐ Chest X-ray: Consolidation pattern (منطقة بيضاء)', '❌ لا تعط antibiotic وسيع الطيف لكل سعال!'],
    scenario: { setup: 'رجل 45 سنة يدخل مع حمى 39°C وسعال منتج للبلغم الأخضر وألم صدري عند التنفس العميق.', question: 'ما الخطوات التشخيصية والعلاجية الأولى؟', reasoning: ['Chest X-ray فوري', 'Blood cultures إذا كان حاداً', 'ابدأ مضاد حيوي يغطي S. pneumoniae و H. influenzae (مثل Ceftriaxone)', 'الأكسجين إذا لزم'] },
    flashCards: [{ q: 'ما أشهر البكتيريا المسببة للالتهاب الرئوي المكتسب من المجتمع؟', a: 'Streptococcus pneumoniae و Haemophilus influenzae' }],
    quiz: [{ question: 'أي من الأعراض التالية تشير إلى الالتهاب الرئوي بدلاً من نزلة برد عادية؟', options: ['سعال جاف فقط', 'حمى وسعال منتج بألم صدري', 'إفرازات أنفية فقط'], correctAnswer: 'حمى وسعال منتج بألم صدري' }]
  }
];
