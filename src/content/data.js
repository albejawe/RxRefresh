import { drugs as importedDrugs } from './drugsData';
import { drugs as antibiotics } from './drugs_antibiotics';
import { drugs as respiratory } from './drugs_respiratory';
import { drugs as cns } from './drugs_cns';
import { drugs as derma } from './drugs_derma';
import { drugs as urology } from './drugs_urology';
import { drugs as hematology } from './drugs_hematology';
import { drugs as gi } from './drugs_gi';
import { drugs as endocrine } from './drugs_endocrine';
import { drugs as womensHealth } from './drugs_womens_health';
import { drugs as ophthalmology } from './drugs_ophthalmology';
import { drugs as emergency } from './drugs_emergency';
import { drugs as msk } from './drugs_msk';
import { drugs as allergy } from './drugs_allergy';
import { drugs as extraDrugs1 } from './drugs_extra1';
import { drugs as extraDrugs2 } from './drugs_extra2';
import { drugs as extraDrugs3 } from './drugs_extra3';
import { drugs as extraDrugs4 } from './drugs_extra4';
import { drugs as extraDrugs5 } from './drugs_extra5';
import { drugs as extraDrugs6 } from './drugs_extra6';
import { drugs as extraDrugs7 } from './drugs_extra7';
import { drugs as extraDrugs8, diseases as extraDiseases9 } from './drugs_extra8';
import { drugs as extraDrugs9, diseases as extraDiseases10 } from './drugs_extra9';
import { drugs as extraDrugs10, diseases as extraDiseases11 } from './drugs_extra10';
import { drugs as extraDrugs11, diseases as extraDiseases12 } from './drugs_extra11';
import { drugs as extraDrugs12, diseases as extraDiseases13 } from './drugs_extra12';
import { drugs as extraDrugs13, diseases as extraDiseases14 } from './drugs_extra13';
import { drugs as extraDrugs14, diseases as extraDiseases15 } from './drugs_extra14';
import { drugs as extraDrugs15, diseases as extraDiseases16 } from './drugs_extra15';
import { drugs as extraDrugs16, diseases as extraDiseases17 } from './drugs_extra16';
import { drugs as extraDrugs17, diseases as extraDiseases18 } from './drugs_extra17';
import { drugs as extraDrugs18, diseases as extraDiseases19 } from './drugs_extra18';
import { drugs as extraDrugs19, diseases as extraDiseases20 } from './drugs_extra19';
import { drugs as extraDrugs20, diseases as extraDiseases21 } from './drugs_extra20';

import { diseases as importedDiseases } from './diseasesData';
import { diseases as extraDiseases } from './diseases_extra';
import { diseases as extraDiseases2 } from './diseases_extra2';
import { diseases as extraDiseases3 } from './diseases_extra3';
import { diseases as extraDiseases4 } from './diseases_extra4';
import { diseases as extraDiseases5 } from './diseases_extra5';
import { diseases as extraDiseases6 } from './diseases_extra6';
import { diseases as extraDiseases7 } from './diseases_extra7';
import { diseases as extraDiseases8 } from './diseases_extra8';
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

export const drugs = [
  ...importedDrugs, 
  ...antibiotics, 
  ...respiratory, 
  ...cns, 
  ...derma, 
  ...urology, 
  ...hematology,
  ...gi,
  ...endocrine,
  ...womensHealth,
  ...ophthalmology,
  ...emergency,
  ...msk,
  ...allergy,
  ...extraDrugs1,
  ...extraDrugs2,
  ...extraDrugs3,
  ...extraDrugs4,
  ...extraDrugs5,
  ...extraDrugs6,
  ...extraDrugs7,
  ...extraDrugs8,
  ...extraDrugs9,
  ...extraDrugs10,
  ...extraDrugs11,
  ...extraDrugs12,
  ...extraDrugs13,
  ...extraDrugs14,
  ...extraDrugs15,
  ...extraDrugs16,
  ...extraDrugs17,
  ...extraDrugs18,
  ...extraDrugs19,
  ...extraDrugs20
];
export const diseases = [...importedDiseases, ...extraDiseases, ...extraDiseases2, ...extraDiseases3, ...extraDiseases4, ...extraDiseases5, ...extraDiseases6, ...extraDiseases7, ...extraDiseases8, ...extraDiseases9, ...extraDiseases10, ...extraDiseases11, ...extraDiseases12, ...extraDiseases13, ...extraDiseases14, ...extraDiseases15, ...extraDiseases16, ...extraDiseases17, ...extraDiseases18, ...extraDiseases19, ...extraDiseases20, ...extraDiseases21];
export const quickFacts = importedQuickFacts;

export const getSpecialtyById = (id) => SPECIALTIES.find(s => s.id === id);
