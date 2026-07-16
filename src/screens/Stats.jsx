import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export default function Stats() {
  const { state } = useAppContext();
  
  // Calculate success rate from quizHistory
  const totalAnswers = state.quizHistory.length;
  const correctAnswers = state.quizHistory.filter(h => h.correct).length;
  const successRate = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
  
  const pieData = [
    { name: 'Correct', value: successRate },
    { name: 'Incorrect', value: 100 - successRate }
  ];
  const COLORS = ['#10B981', '#ef444440']; // Green and faded red

  // Dummy progression data for line chart
  const lineData = [
    { name: 'السبت', rate: 40 },
    { name: 'الأحد', rate: 45 },
    { name: 'الاثنين', rate: 55 },
    { name: 'الثلاثاء', rate: 60 },
    { name: 'اليوم', rate: successRate || 65 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-20 pt-4">
      <h1 className="text-2xl font-bold font-cairo px-2">الإحصائيات</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">🔥</div>
          <div className="text-2xl font-bold">{state.userStats.streak}</div>
          <div className="text-sm text-text-secondary">أيام متتالية</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">⭐</div>
          <div className="text-2xl font-bold">{state.userStats.totalPoints}</div>
          <div className="text-sm text-text-secondary">إجمالي النقاط</div>
        </Card>
      </div>

      <Card elevated>
        <CardHeader>
          <CardTitle>معدل النجاح الإجمالي</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold font-cairo">{successRate}%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>مؤشر التحسن</CardTitle>
        </CardHeader>
        <CardContent className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A2233', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#06B6D4' }}
              />
              <Line type="monotone" dataKey="rate" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
