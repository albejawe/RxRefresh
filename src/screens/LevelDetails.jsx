import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Play, CheckCircle } from 'lucide-react';
import { getSpecialtyById, drugs, diseases } from '../content/data';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../contexts/AppContext';

export default function LevelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const specialty = getSpecialtyById(id);
  const { state } = useAppContext();
  
  if (!specialty) return <div className="p-4">Level not found</div>;

  const levelDrugs = drugs.filter(d => d.specialty === id);
  const levelDiseases = diseases.filter(d => d.specialty === id);
  const allItems = [...levelDiseases, ...levelDrugs];

  const totalItems = allItems.length;
  const completedCount = allItems.filter(item => state.completedCards.includes(item.id)).length;
  
  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      <header className="flex items-center gap-4 py-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
          <ChevronRight size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-cairo text-gradient" style={{ backgroundImage: `linear-gradient(to left, ${specialty.color}, #fff)` }}>
            {specialty.icon} {specialty.nameAr}
          </h1>
          <p className="text-text-secondary text-sm" dir="ltr">{specialty.name}</p>
        </div>
      </header>

      {/* Progress & Start Quiz */}
      <Card className="p-6 flex flex-col gap-4 relative overflow-hidden" style={{ borderColor: `${specialty.color}40` }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full pointer-events-none" style={{ backgroundColor: specialty.color }} />
        
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-sm text-text-secondary">التقدم</span>
            <span className="font-bold text-lg" style={{ color: specialty.color }}>{completedCount} / {totalItems}</span>
          </div>
          <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${totalItems ? (completedCount/totalItems)*100 : 0}%`, backgroundColor: specialty.color }}
            />
          </div>
        </div>

        <Link to={`/quiz/${id}`} className="btn-primary w-full flex items-center justify-center gap-2" style={{ backgroundColor: specialty.color, shadowColor: specialty.color }}>
          <Play size={18} className="fill-current" />
          <span>اختبر معلوماتك</span>
        </Link>
      </Card>

      {/* Cards List */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold font-cairo mb-2 text-lg">المحتوى ({totalItems})</h3>
        
        {allItems.map(item => {
          const isCompleted = state.completedCards.includes(item.id);
          return (
            <Link key={item.id} to={`/card/${item.id}`}>
              <Card hoverable className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center text-2xl border border-white/5 shadow-inner">
                  {item.icon || '💊'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold font-cairo text-lg leading-tight flex items-center gap-2">
                    {item.nameAr}
                    {isCompleted && <CheckCircle size={16} className="text-accent-green" />}
                  </h4>
                  <span className="text-text-secondary text-sm block mt-1" dir="ltr">{item.name}</span>
                </div>
                <div className="text-text-muted">
                  <ChevronRight size={20} className="rotate-180" />
                </div>
              </Card>
            </Link>
          );
        })}
        {totalItems === 0 && (
          <p className="text-text-muted text-center py-8">جاري إضافة المحتوى...</p>
        )}
      </div>
    </div>
  );
}
