import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const { addToast } = useToast();
  const [time, setTime] = useState(state.settings.notificationTime || '21:00');

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { notificationTime: time }
    });
    
    addToast('تم حفظ الإعدادات بنجاح', 'success');
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-20 pt-4 px-2">
      <h1 className="text-2xl font-bold font-cairo">الإعدادات</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>إشعارات درس اليوم</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            اختر وقتاً مناسباً لتلقي إشعار الدرس اليومي.
          </p>
          
          <div className="flex items-center gap-4">
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-lg font-bold w-full focus:outline-none focus:border-accent-cyan transition-colors text-center"
            />
          </div>
          
          <Button onClick={handleSave} className="w-full mt-2">حفظ التغييرات</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>حول التطبيق</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary leading-relaxed">
            تطبيق RxRefresh هو تطبيق ويب تقدمي (PWA) مصمم خصيصاً لمساعدة الصيادلة على استرجاع وتحديث معلوماتهم الدوائية بأسلوب تفاعلي ممتع يعتمد على نظام التكرار المتباعد.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-text-muted">
            الإصدار 1.0.0
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
