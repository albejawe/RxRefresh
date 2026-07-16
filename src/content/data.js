import { drugs as importedDrugs } from './drugsData';
import { drugs as antibiotics } from './drugs_antibiotics';
import { drugs as respiratory } from './drugs_respiratory';
import { drugs as cns } from './drugs_cns';

import { diseases as importedDiseases } from './diseasesData';
import { quickFacts as importedQuickFacts } from './quickFactsData';

export const SPECIALTIES = [
  { id: 'analgesics',     name: 'Analgesics & Antipyretics',        nameAr: 'المسكنات ومخفضات الحرارة',        color: '#6366F1', icon: '💊' },
  { id: 'antibiotics',    name: 'Antibiotics & Antimicrobials',     nameAr: 'المضادات الحيوية والميكروبية',    color: '#10B981', icon: '🦠' },
  { id: 'cardiovascular', name: 'Cardiovascular',                   nameAr: 'القلب والأوعية الدموية',          color: '#EF4444', icon: '❤️' },
  { id: 'gi',             name: 'Gastrointestinal',                 nameAr: 'الجهاز الهضمي',                   color: '#F59E0B', icon: '🫁' },
  { id: 'respiratory',    name: 'Respiratory',                      nameAr: 'الجهاز التنفسي',                  color: '#06B6D4', icon: '🫧' },
  { id: 'endocrine',      name: 'Endocrine & Metabolic',            nameAr: 'الغدد الصماء والتمثيل الغذائي',   color: '#8B5CF6', icon: '🧬' },
  { id: 'cns',            name: 'CNS & Psychiatry',                 nameAr: 'الجهاز العصبي والنفسي',           color: '#EC4899', icon: '🧠' },
  { id: 'renal',          name: 'Renal & Fluids/Electrolytes',      nameAr: 'الكلى والسوائل والأملاح',         color: '#22D3EE', icon: '💧' },
  { id: 'hematology',     name: 'Hematology & Anticoagulation',     nameAr: 'أمراض الدم ومميعات الدم',         color: '#DC2626', icon: '🩸' },
  { id: 'derma',          name: 'Dermatology',                      nameAr: 'الأمراض الجلدية',                 color: '#F472B6', icon: '🧴' },
  { id: 'ophthalmology',  name: 'Ophthalmology & ENT',              nameAr: 'العيون والأنف والأذن',            color: '#38BDF8', icon: '👁️' },
  { id: 'womens_health',  name: "Women's Health & OB/GYN",          nameAr: 'صحة المرأة والحمل',                color: '#F43F5E', icon: '🤰' },
  { id: 'urology',        name: 'Urology & Men\'s Health',          nameAr: 'المسالك البولية وصحة الرجل',      color: '#0EA5E9', icon: '🚻' },
  { id: 'msk',            name: 'Musculoskeletal & Gout',           nameAr: 'العضلات والمفاصل والنقرس',        color: '#84CC16', icon: '🦴' },
  { id: 'allergy_immuno', name: 'Allergy & Immunology',             nameAr: 'الحساسية والمناعة',                color: '#A855F7', icon: '🤧' },
  { id: 'vitamins',       name: 'Vitamins, Minerals & Supplements', nameAr: 'الفيتامينات والمكملات',           color: '#FACC15', icon: '🍊' },
  { id: 'emergency',      name: 'Emergency & Critical Care',        nameAr: 'الطوارئ والحالات الحرجة',         color: '#F97316', icon: '🚑' },
  { id: 'oncology_basic', name: 'Oncology Basics (Common Drugs)',   nameAr: 'أساسيات الأورام (الأدوية الشائعة)', color: '#7C3AED', icon: '🎗️' }
];

export const drugs = [...importedDrugs, ...antibiotics, ...respiratory, ...cns];
export const diseases = importedDiseases;
export const quickFacts = importedQuickFacts;

export const getSpecialtyById = (id) => SPECIALTIES.find(s => s.id === id);
