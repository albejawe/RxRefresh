import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Info, ShieldAlert, CheckCircle, Activity, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { drugs, diseases, getSpecialtyById } from '../content/data';
import { Card, CardContent } from '../components/ui/Card';

export default function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = drugs.find(d => d.id === id) || diseases.find(d => d.id === id);
  
  if (!item) return <div className="p-4 text-center mt-20 text-text-muted">عنصر غير موجود</div>;

  const specialty = getSpecialtyById(item.specialty);
  const isDisease = item.type === 'disease';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 w-full pb-8 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background ambient light */}
      <div 
        className="fixed top-[0%] left-[-20%] w-[100vw] h-[100vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: specialty?.color }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/60 backdrop-blur-xl pt-4 pb-4 border-b border-white/5 flex items-center gap-4 px-4 shadow-glass-sm">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/10">
          <ChevronRight size={24} className="text-white" />
        </button>
        <div className="flex-1">
          <div className="text-sm font-bold uppercase tracking-wider" style={{ color: specialty?.color }}>
            {specialty?.nameAr}
          </div>
        </div>
      </header>

      <div className="px-4 flex flex-col gap-6 relative z-10">
        
        {/* Main Title Card */}
        <motion.div variants={itemVariants}>
          <Card elevated className="overflow-hidden relative p-[1px]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
            <div className="relative bg-bg-card/80 backdrop-blur-2xl rounded-[15px] p-6 h-full flex items-start gap-5">
              
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner relative overflow-hidden shrink-0"
                style={{ background: `linear-gradient(135deg, ${specialty?.color}40 0%, rgba(255,255,255,0.05) 100%)`, border: `1px solid ${specialty?.color}40` }}
              >
                <div className="absolute inset-0 bg-white/5" />
                <span className="drop-shadow-lg relative z-10">{item.icon || (isDisease ? '🩺' : '💊')}</span>
              </div>
              
              <div>
                <h1 className="text-3xl font-extrabold font-cairo mb-1 text-white">{item.nameAr}</h1>
                <p className="text-xl font-bold text-text-secondary tracking-wide" dir="ltr">{item.name}</p>
                {item.altNames && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.altNames.map((alt, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-text-muted tracking-wide" dir="ltr">
                        {alt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content based on type */}
        {!isDisease ? (
          // DRUG TEMPLATE
          <>
            <Section title="آلية العمل" icon={<Activity className="text-white drop-shadow-md" />} color={specialty?.color}>
              {item.mechanism && (
                <div className="flex flex-col gap-5">
                  <p className="font-extrabold text-lg leading-relaxed text-white">{item.mechanism.tagline}</p>
                  
                  <div className="relative pt-2 pb-2">
                    {/* Animated vertical connection line */}
                    <div className="absolute right-4 top-4 bottom-4 w-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div 
                        className="w-full h-1/3 rounded-full" 
                        style={{ backgroundColor: specialty?.color }}
                        animate={{ y: ["0%", "300%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {item.mechanism.flow?.map((step, idx) => {
                        if (step.text === '↓') return null; // Skip old arrows since we use a custom visual line
                        return (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            className="relative pr-10 pl-4"
                          >
                            <div 
                              className={`absolute right-[11px] top-2 w-3 h-3 rounded-full border-2 ${step.isKey ? 'bg-bg-primary' : 'bg-white/20 border-transparent'}`} 
                              style={step.isKey ? { borderColor: specialty?.color, boxShadow: `0 0 10px ${specialty?.color}` } : {}}
                            />
                            <div className={`p-4 rounded-xl glass-card ${step.isKey ? 'border border-white/20 bg-white/5' : 'bg-transparent border-none p-0'}`}>
                              <span className={step.isKey ? 'font-bold text-white' : 'text-text-secondary font-medium'} dangerouslySetInnerHTML={{__html: step.text}} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {item.mechanism.keyInsight && (
                    <div className="glass-premium p-4 rounded-xl flex items-start gap-3 mt-2 border-l-4" style={{ borderLeftColor: specialty?.color }}>
                      <Star size={20} style={{ color: specialty?.color }} className="shrink-0 mt-0.5" />
                      <p className="font-bold text-sm text-white leading-relaxed">{item.mechanism.keyInsight.replace('💡', '')}</p>
                    </div>
                  )}
                </div>
              )}
            </Section>

            <Section title="معلومات سريعة" icon={<Info className="text-white drop-shadow-md" />} color={specialty?.color}>
              {item.quickInfo && (
                <div className="flex flex-col gap-4">
                  <InfoRow label="الفئة (Class)" value={item.quickInfo.class} />
                  <InfoRow label="دواعي الاستعمال (Indications)" value={item.quickInfo.indications?.join(' • ')} />
                  <InfoRow label="موانع الاستعمال (Contraindications)" value={item.quickInfo.contraindications?.join(' • ')} isAlert />
                  <InfoRow label="التداخلات (Interactions)" value={item.quickInfo.interactions?.join(' || ')} />
                  <InfoRow label="الجرعة (Dose)" value={item.quickInfo.dose} dir="ltr" />
                  
                  {item.quickInfo.goldenRule && (
                    <div className="mt-4 bg-gradient-to-r from-accent-amber/20 to-transparent border border-accent-amber/30 text-accent-amber p-4 rounded-xl font-bold flex gap-3">
                       <Zap size={20} className="shrink-0" />
                       <span>{item.quickInfo.goldenRule.replace('⭐', '')}</span>
                    </div>
                  )}
                </div>
              )}
            </Section>
          </>
        ) : (
          // DISEASE TEMPLATE
          <>
            <Section title="نظرة عامة" icon={<Info className="text-white" />} color={specialty?.color}>
              <p className="leading-relaxed text-lg font-medium text-white/90">{item.overview}</p>
            </Section>
            
            <Section title="الفيزيولوجيا المرضية" icon={<Activity className="text-white" />} color={specialty?.color}>
              {item.pathophysiology && (
                <div className="flex flex-col gap-5">
                  <p className="font-extrabold text-white">{item.pathophysiology.summary}</p>
                  <div className="glass-card p-5 rounded-2xl space-y-3 relative">
                    {item.pathophysiology.flow?.map((step, idx) => (
                      <div key={idx} className={`text-center ${step === '↓' ? 'opacity-30 text-xs' : 'font-bold bg-white/5 py-3 px-4 rounded-xl border border-white/5 text-white/90 shadow-sm'}`}>
                        {step === '↓' ? '▼' : step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>

            <Section title="الفئات الدوائية" icon={<ShieldAlert className="text-white" />} color={specialty?.color}>
              <div className="flex flex-col gap-4">
                {item.drugClasses?.map((dc, idx) => (
                  <div key={idx} className="glass-premium p-5 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/10">
                    <div className="absolute top-0 right-0 w-1.5 h-full" style={{ backgroundColor: specialty?.color }} />
                    <h4 className="font-extrabold text-white flex flex-col gap-1 mb-3">
                      <span className="text-lg" dir="ltr">{dc.class}</span>
                      <span className="text-sm text-text-secondary opacity-80" dir="rtl">{dc.classAr}</span>
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col"><span className="text-xs font-bold text-text-muted uppercase tracking-wider">أمثلة</span><span className="font-semibold text-white/90" dir="ltr">{dc.examples}</span></div>
                      <div className="flex flex-col"><span className="text-xs font-bold text-text-muted uppercase tracking-wider">الآلية</span><span className="font-medium text-white/80">{dc.mechanism}</span></div>
                      {dc.bestFor && <div className="flex flex-col mt-2 pt-2 border-t border-white/5"><span className="text-xs font-bold text-accent-emerald uppercase tracking-wider">الأفضل لـ</span><span className="font-bold text-white">{dc.bestFor}</span></div>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {item.keyPoints && (
              <Section title="نقاط هامة" icon={<CheckCircle className="text-white" />} color={specialty?.color}>
                <div className="space-y-3">
                  {item.keyPoints.map((kp, idx) => {
                    const isAlert = kp.includes('❌');
                    const cleanText = kp.replace('🎯', '').replace('❌', '');
                    return (
                      <div key={idx} className={`flex items-start gap-3 glass-card p-4 rounded-xl border ${isAlert ? 'border-accent-red/30 bg-accent-red/5' : 'border-white/5'}`}>
                        <div className={`mt-1 rounded-full p-1 ${isAlert ? 'bg-accent-red/20' : 'bg-white/10'}`}>
                          {isAlert ? <Zap size={14} className="text-accent-red" /> : <CheckCircle size={14} className="text-white/80" />}
                        </div>
                        <span className="font-bold text-white/90 leading-relaxed">{cleanText}</span>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}
          </>
        )}

        {/* Scenario Section (Both) */}
        {item.scenario && (
          <Section title="سيناريو سريري" icon={<ShieldAlert className="text-white" />} color={specialty?.color}>
            <div className="flex flex-col gap-4">
              <p className="font-extrabold text-lg text-white leading-relaxed">{item.scenario.setup}</p>
              
              <div className="p-4 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: specialty?.color }} />
                <p className="font-extrabold text-white relative z-10 drop-shadow-md text-lg">❔ {item.scenario.question}</p>
              </div>
              
              <div className="glass-card p-5 rounded-2xl mt-2">
                <h5 className="font-bold mb-3 text-sm text-text-muted tracking-wider uppercase">التفسير العلمي:</h5>
                <ul className="space-y-2 mb-5 text-sm font-medium text-white/80">
                  {item.scenario.reasoning?.map((r, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-accent-cyan mt-1">•</span> <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl font-bold text-sm text-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-accent-indigo/20 flex items-center justify-center shrink-0">
                     <CheckCircle size={16} className="text-accent-indigo" />
                   </div>
                  {item.scenario.lesson.replace('📌', '')}
                </div>
              </div>
            </div>
          </Section>
        )}
      </div>
    </motion.div>
  );
}

const Section = ({ title, icon, children, color }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-0 bg-transparent shadow-none">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
            style={{ background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.2) 100%)` }}
          >
            {icon}
          </div>
          <h3 className="font-extrabold font-cairo text-xl text-white">{title}</h3>
        </div>
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InfoRow = ({ label, value, isAlert, dir = 'rtl' }) => (
  <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4 last:border-0 last:pb-0">
    <span className="text-xs font-bold text-text-muted tracking-wider uppercase">{label}</span>
    <span className={`font-bold text-base ${isAlert ? 'text-accent-red drop-shadow-md' : 'text-white/90'}`} dir={dir}>{value}</span>
  </div>
);
