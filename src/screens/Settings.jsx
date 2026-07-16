import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';
import { Plus, Trash2, Clock, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const { addToast } = useToast();
  
  const [times, setTimes] = useState(state.settings.notificationTimes || ['21:00']);

  const handleAddTime = () => {
    // Add default 12:00 time
    setTimes([...times, '12:00']);
  };

  const handleRemoveTime = (indexToRemove) => {
    if (times.length <= 1) {
      addToast('يجب إبقاء وقت إشعار واحد على الأقل', 'error');
      return;
    }
    setTimes(times.filter((_, idx) => idx !== indexToRemove));
  };

  const handleTimeChange = (index, value) => {
    const updated = [...times];
    updated[index] = value;
    setTimes(updated);
  };

  const handleSave = () => {
    // Check for duplicates
    const uniqueTimes = [...new Set(times)];
    if (uniqueTimes.length !== times.length) {
      addToast('يوجد أوقات مكررة، يرجى تعديلها أو حذفها', 'error');
      return;
    }

    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { 
        notificationTimes: times.sort() 
      }
    });
    
    addToast('تم حفظ إعدادات الإشعارات بنجاح', 'success');
  };

  // Calculate statistics of rotation
  const sentCount = state.settings.sentNotificationIds?.length || 0;

  return (
    <div className="flex flex-col gap-6 w-full pb-28 pt-4 px-4 min-h-screen relative">
      {/* Background Glow */}
      <div className="absolute top-[10%] right-[-10%] w-[50vh] h-[50vh] bg-accent-indigo/10 blur-[100px] rounded-full pointer-events-none" />

      <h1 className="text-3xl font-extrabold font-cairo text-white">الإعدادات</h1>
      
      <Card className="relative overflow-hidden border border-white/5 bg-bg-card/70 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold font-cairo text-white flex items-center gap-2">
            <Clock size={20} className="text-accent-cyan" />
            تنبيهات المراجعة اليومية
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            اضبط مواعيد متعددة خلال اليوم لتلقي بطاقات المراجعة السريعة. ستقوم الإشعارات بعرض محتوى جديد تماماً في كل مرة.
          </p>

          {/* Times List */}
          <div className="flex flex-col gap-3">
            {times.map((timeVal, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <input 
                  type="time" 
                  value={timeVal}
                  onChange={(e) => handleTimeChange(idx, e.target.value)}
                  className="bg-bg-elevated/80 border border-white/10 rounded-xl px-4 py-2 text-base font-bold text-white focus:outline-none focus:border-accent-cyan transition-colors text-center flex-1"
                />
                
                <button 
                  onClick={() => handleRemoveTime(idx)}
                  className="p-2.5 bg-accent-red/10 hover:bg-accent-red/20 rounded-xl text-accent-red border border-accent-red/10 transition-colors"
                  title="حذف هذا الوقت"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleAddTime}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
            >
              <Plus size={16} />
              إضافة وقت آخر
            </button>
            
            <button 
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl bg-accent-cyan text-bg-primary hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 font-bold text-sm shadow-glow-cyan"
            >
              حفظ المواعيد
            </button>
          </div>

          {/* No Repetition Status Card */}
          <div className="mt-2 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <ShieldCheck size={20} className="text-accent-emerald shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-white">نظام التدوير الذكي (بدون تكرار)</h4>
              <p className="text-xs text-text-secondary leading-relaxed mt-1">
                تلقيت حتى الآن <span className="font-bold text-accent-emerald">{sentCount}</span> بطاقة فريدة. لن يتكرر أي دواء أو مرض حتى تنهي كافة المحتوى المتاح بالكامل.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-white/5 bg-bg-card/70 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold font-cairo text-white">حول التطبيق</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary leading-relaxed">
            تطبيق RxRefresh هو تطبيق ويب تقدمي (PWA) مصمم خصيصاً لمساعدة الصيادلة على استرجاع وتحديث معلوماتهم الدوائية بأسلوب تفاعلي ممتع يعتمد على نظام التكرار المتباعد.
          </p>
          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-text-muted">
            الإصدار 1.0.0
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
