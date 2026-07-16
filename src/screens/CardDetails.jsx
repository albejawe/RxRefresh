import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Info, ShieldAlert, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { drugs, diseases, getSpecialtyById } from '../content/data';
import { Card, CardContent } from '../components/ui/Card';

export default function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = drugs.find(d => d.id === id) || diseases.find(d => d.id === id);
  
  if (!item) return <div className="p-4 text-center mt-20">عنصر غير موجود</div>;

  const specialty = getSpecialtyById(item.specialty);
  const isDisease = item.type === 'disease';

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md pt-4 pb-4 border-b border-white/5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
          <ChevronRight size={24} />
        </button>
        <div className="flex-1">
          <div className="text-sm font-bold opacity-80" style={{ color: specialty?.color }}>
            {specialty?.nameAr}
          </div>
        </div>
      </header>

      {/* Main Title Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card elevated className="overflow-hidden relative border-t-4" style={{ borderTopColor: specialty?.color }}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full pointer-events-none" style={{ backgroundColor: specialty?.color }} />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center text-4xl shadow-inner border border-white/5">
                {item.icon || (isDisease ? '🩺' : '💊')}
              </div>
              <div>
                <h1 className="text-3xl font-bold font-cairo mb-1">{item.nameAr}</h1>
                <p className="text-xl font-bold text-text-secondary" dir="ltr">{item.name}</p>
                {item.altNames && (
                  <p className="text-sm text-text-muted mt-2">
                    <span className="opacity-70">الأسماء الشائعة: </span>
                    <span dir="ltr">{item.altNames.join(', ')}</span>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content based on type */}
      {!isDisease ? (
        // DRUG TEMPLATE
        <>
          <Section delay={0.1} title="آلية العمل" icon={<Zap className="text-accent-amber" />} color={specialty?.color}>
            {item.mechanism && (
              <div className="flex flex-col gap-4">
                <p className="font-bold text-lg leading-relaxed">{item.mechanism.tagline}</p>
                <div className="bg-bg-elevated/50 p-4 rounded-xl border border-white/5 space-y-3 relative before:absolute before:right-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
                  {item.mechanism.flow?.map((step, idx) => (
                    <div key={idx} className={`relative pl-4 pr-6 ${step.text === '↓' ? 'text-center opacity-50 pr-0' : ''}`}>
                      {step.text !== '↓' && (
                        <div className={`absolute right-[2px] top-2 w-2 h-2 rounded-full ${step.isKey ? 'bg-accent-cyan shadow-[0_0_8px_#06B6D4]' : 'bg-white/30'}`} />
                      )}
                      <span className={step.isKey ? 'font-bold text-accent-cyan' : ''} dangerouslySetInnerHTML={{__html: step.text}} />
                    </div>
                  ))}
                </div>
                {item.mechanism.keyInsight && (
                  <div className="bg-accent-indigo/10 border border-accent-indigo/20 p-4 rounded-xl font-bold text-sm">
                    {item.mechanism.keyInsight}
                  </div>
                )}
              </div>
            )}
          </Section>

          <Section delay={0.2} title="معلومات سريعة" icon={<Info className="text-accent-cyan" />} color={specialty?.color}>
            {item.quickInfo && (
              <div className="flex flex-col gap-4">
                <InfoRow label="الفئة (Class)" value={item.quickInfo.class} />
                <InfoRow label="دواعي الاستعمال (Indications)" value={item.quickInfo.indications?.join(' • ')} />
                <InfoRow label="موانع الاستعمال (Contraindications)" value={item.quickInfo.contraindications?.join(' • ')} isAlert />
                <InfoRow label="التداخلات (Interactions)" value={item.quickInfo.interactions?.join(' || ')} />
                <InfoRow label="الجرعة (Dose)" value={item.quickInfo.dose} dir="ltr" />
                {item.quickInfo.goldenRule && (
                  <div className="mt-2 bg-accent-amber/10 border border-accent-amber/30 text-accent-amber p-4 rounded-xl font-bold">
                    {item.quickInfo.goldenRule}
                  </div>
                )}
              </div>
            )}
          </Section>
        </>
      ) : (
        // DISEASE TEMPLATE
        <>
          <Section delay={0.1} title="نظرة عامة" icon={<Info className="text-accent-cyan" />} color={specialty?.color}>
            <p className="leading-relaxed text-lg">{item.overview}</p>
          </Section>
          
          <Section delay={0.2} title="الفيزيولوجيا المرضية" icon={<Zap className="text-accent-amber" />} color={specialty?.color}>
            {item.pathophysiology && (
              <div className="flex flex-col gap-4">
                <p className="font-bold">{item.pathophysiology.summary}</p>
                <div className="bg-bg-elevated/50 p-4 rounded-xl border border-white/5 space-y-2">
                  {item.pathophysiology.flow?.map((step, idx) => (
                    <div key={idx} className={`text-center ${step === '↓' ? 'opacity-50 text-sm' : 'font-semibold bg-white/5 py-2 px-4 rounded-lg'}`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section delay={0.3} title="الفئات الدوائية" icon={<ShieldAlert className="text-accent-green" />} color={specialty?.color}>
            <div className="flex flex-col gap-3">
              {item.drugClasses?.map((dc, idx) => (
                <div key={idx} className="bg-bg-elevated/50 p-4 rounded-xl border border-white/5">
                  <h4 className="font-bold text-accent-cyan flex items-center gap-2 mb-2" dir="ltr">
                    {dc.class} <span className="text-sm text-text-secondary font-normal" dir="rtl">({dc.classAr})</span>
                  </h4>
                  <p className="text-sm mb-1"><span className="opacity-60">أمثلة: </span><span dir="ltr">{dc.examples}</span></p>
                  <p className="text-sm mb-1"><span className="opacity-60">الآلية: </span>{dc.mechanism}</p>
                  {dc.sideEffect && <p className="text-sm text-accent-red/80 mb-1"><span className="opacity-60">أثر جانبي: </span>{dc.sideEffect}</p>}
                  {dc.bestFor && <p className="text-sm text-accent-green/80"><span className="opacity-60">الأفضل لـ: </span>{dc.bestFor}</p>}
                </div>
              ))}
            </div>
          </Section>

          {item.keyPoints && (
            <Section delay={0.4} title="نقاط هامة" icon={<CheckCircle className="text-accent-indigo" />} color={specialty?.color}>
              <ul className="space-y-2">
                {item.keyPoints.map((kp, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/5 p-3 rounded-lg">
                    <span className="mt-1">{kp.startsWith('🎯') || kp.startsWith('❌') ? '' : '•'}</span>
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </>
      )}

      {/* Scenario Section (Both) */}
      {item.scenario && (
        <Section delay={0.5} title="سيناريو سريري" icon={<ShieldAlert className="text-accent-pink" />} color={specialty?.color}>
          <div className="flex flex-col gap-3">
            <p className="font-bold text-lg">{item.scenario.setup}</p>
            <p className="text-accent-cyan font-bold p-3 bg-accent-cyan/10 rounded-lg">{item.scenario.question}</p>
            <div className="bg-bg-elevated p-4 rounded-xl border border-white/5">
              <h5 className="font-bold mb-2 opacity-70 text-sm">التفسير:</h5>
              <ul className="list-disc list-inside space-y-1 mb-4 text-sm">
                {item.scenario.reasoning?.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <div className="bg-accent-pink/10 text-accent-pink p-3 rounded-lg font-bold text-sm">
                {item.scenario.lesson}
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

const Section = ({ title, icon, children, delay = 0, color }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
        {icon}
        <h3 className="font-bold font-cairo text-lg">{title}</h3>
      </div>
      <CardContent className="p-5">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const InfoRow = ({ label, value, isAlert, dir = 'rtl' }) => (
  <div className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0">
    <span className="text-sm font-bold opacity-60">{label}</span>
    <span className={`font-semibold ${isAlert ? 'text-accent-red' : ''}`} dir={dir}>{value}</span>
  </div>
);
