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
import { drugs as extraDrugs21, diseases as extraDiseases22 } from './drugs_extra21';
import { drugs as extraDrugs22, diseases as extraDiseases23 } from './drugs_extra22';
import { drugs as extraDrugs23, diseases as extraDiseases24 } from './drugs_extra23';
import { drugs as extraDrugs24, diseases as extraDiseases25 } from './drugs_extra24';
import { drugs as extraDrugs25, diseases as extraDiseases26 } from './drugs_extra25';
import { drugs as extraDrugs26, diseases as extraDiseases27 } from './drugs_extra26';
import { drugs as extraDrugs27, diseases as extraDiseases28 } from './drugs_extra27';
import { drugs as extraDrugs28, diseases as extraDiseases29 } from './drugs_extra28';
import { drugs as extraDrugs29, diseases as extraDiseases30 } from './drugs_extra29';
import { drugs as extraDrugs30, diseases as extraDiseases31 } from './drugs_extra30';
import { drugs as extraDrugs31, diseases as extraDiseases32 } from './drugs_extra31';
import { drugs as extraDrugs32, diseases as extraDiseases33 } from './drugs_extra32';
import { drugs as extraDrugs33, diseases as extraDiseases34 } from './drugs_extra33';
import { drugs as extraDrugs34, diseases as extraDiseases35 } from './drugs_extra34';
import { drugs as extraDrugs35, diseases as extraDiseases36 } from './drugs_extra35';
import { drugs as extraDrugs36, diseases as extraDiseases37 } from './drugs_extra36';
import { drugs as extraDrugs37, diseases as extraDiseases38 } from './drugs_extra37';
import { drugs as extraDrugs38, diseases as extraDiseases39 } from './drugs_extra38';
import { drugs as extraDrugs39, diseases as extraDiseases40 } from './drugs_extra39';
import { drugs as extraDrugs40, diseases as extraDiseases41 } from './drugs_extra40';
import { drugs as extraDrugs41, diseases as extraDiseases42 } from './drugs_extra41';
import { drugs as extraDrugs42, diseases as extraDiseases43 } from './drugs_extra42';
import { drugs as extraDrugs43, diseases as extraDiseases44 } from './drugs_extra43';
import { drugs as extraDrugs44, diseases as extraDiseases45 } from './drugs_extra44';
import { drugs as extraDrugs45, diseases as extraDiseases46 } from './drugs_extra45';
import { drugs as extraDrugs46, diseases as extraDiseases47 } from './drugs_extra46';
import { drugs as extraDrugs47, diseases as extraDiseases48 } from './drugs_extra47';
import { drugs as extraDrugs48, diseases as extraDiseases49 } from './drugs_extra48';
import { drugs as extraDrugs49, diseases as extraDiseases50 } from './drugs_extra49';
import { drugs as extraDrugs50, diseases as extraDiseases51 } from './drugs_extra50';
import { drugs as extraDrugs51, diseases as extraDiseases52 } from './drugs_extra51';
import { drugs as extraDrugs52, diseases as extraDiseases53 } from './drugs_extra52';
import { drugs as extraDrugs53, diseases as extraDiseases54 } from './drugs_extra53';
import { drugs as extraDrugs54, diseases as extraDiseases55 } from './drugs_extra54';
import { drugs as extraDrugs55, diseases as extraDiseases56 } from './drugs_extra55';
import { drugs as extraDrugs56, diseases as extraDiseases57 } from './drugs_extra56';
import { drugs as extraDrugs57, diseases as extraDiseases58 } from './drugs_extra57';
import { drugs as extraDrugs58, diseases as extraDiseases59 } from './drugs_extra58';
import { drugs as extraDrugs59, diseases as extraDiseases60 } from './drugs_extra59';
import { drugs as extraDrugs60, diseases as extraDiseases61 } from './drugs_extra60';
import { drugs as extraDrugs61, diseases as extraDiseases62 } from './drugs_extra61';
import { drugs as extraDrugs62, diseases as extraDiseases63 } from './drugs_extra62';

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
  ...extraDrugs20,
  ...extraDrugs21,
  ...extraDrugs22,
  ...extraDrugs23,
  ...extraDrugs24,
  ...extraDrugs25,
  ...extraDrugs26,
  ...extraDrugs27,
  ...extraDrugs28,
  ...extraDrugs29,
  ...extraDrugs30,
  ...extraDrugs31,
  ...extraDrugs32,
  ...extraDrugs33,
  ...extraDrugs34,
  ...extraDrugs35,
  ...extraDrugs36,
  ...extraDrugs37,
  ...extraDrugs38,
  ...extraDrugs39,
  ...extraDrugs40,
  ...extraDrugs41,
  ...extraDrugs42,
  ...extraDrugs43,
  ...extraDrugs44,
  ...extraDrugs45,
  ...extraDrugs46,
  ...extraDrugs47,
  ...extraDrugs48,
  ...extraDrugs49,
  ...extraDrugs50,
  ...extraDrugs51,
  ...extraDrugs52,
  ...extraDrugs53,
  ...extraDrugs54,
  ...extraDrugs55,
  ...extraDrugs56,
  ...extraDrugs57,
  ...extraDrugs58,
  ...extraDrugs59,
  ...extraDrugs60,
  ...extraDrugs61,
  ...extraDrugs62
];
export const diseases = [...importedDiseases, ...extraDiseases, ...extraDiseases2, ...extraDiseases3, ...extraDiseases4, ...extraDiseases5, ...extraDiseases6, ...extraDiseases7, ...extraDiseases8, ...extraDiseases9, ...extraDiseases10, ...extraDiseases11, ...extraDiseases12, ...extraDiseases13, ...extraDiseases14, ...extraDiseases15, ...extraDiseases16, ...extraDiseases17, ...extraDiseases18, ...extraDiseases19, ...extraDiseases20, ...extraDiseases21, ...extraDiseases22, ...extraDiseases23, ...extraDiseases24, ...extraDiseases25, ...extraDiseases26, ...extraDiseases27, ...extraDiseases28, ...extraDiseases29, ...extraDiseases30, ...extraDiseases31, ...extraDiseases32, ...extraDiseases33, ...extraDiseases34, ...extraDiseases35, ...extraDiseases36, ...extraDiseases37, ...extraDiseases38, ...extraDiseases39, ...extraDiseases40, ...extraDiseases41, ...extraDiseases42, ...extraDiseases43, ...extraDiseases44, ...extraDiseases45, ...extraDiseases46, ...extraDiseases47, ...extraDiseases48, ...extraDiseases49, ...extraDiseases50, ...extraDiseases51, ...extraDiseases52, ...extraDiseases53, ...extraDiseases54, ...extraDiseases55, ...extraDiseases56, ...extraDiseases57, ...extraDiseases58, ...extraDiseases59, ...extraDiseases60, ...extraDiseases61, ...extraDiseases62, ...extraDiseases63];
export const quickFacts = importedQuickFacts;

export const getSpecialtyById = (id) => SPECIALTIES.find(s => s.id === id);
