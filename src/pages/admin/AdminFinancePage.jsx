import { PageHeading, StatCard, SectionCard, formatNumber } from './AdminShared.jsx';
import { Download, CreditCard, CarFront, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockHourlyRevenue } from '../../data/mockData';

export default function AdminFinancePage(props) {
  const { exportData, totalRevenue, vehicles } = props;
  return (

    <div className="space-y-6">
      <PageHeading eyebrow="Parking revenue" title="รายงานรายรับค่าจอด" description="รายรับจากค่าจอดรถของลานจอด ตามข้อมูลจำลองในระบบ" action={<button onClick={() => exportData('การเงิน')} className="inline-flex items-center gap-2 rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#172B4D] hover:bg-[#F5F7FA]"><Download size={16} /> ดาวน์โหลด CSV</button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="รายรับตามข้อมูลตัวอย่าง" value={`${formatNumber(totalRevenue)} บาท`} hint="รวมข้อมูลรายชั่วโมงในกราฟ" icon={CreditCard} />
        <StatCard label="จำนวนรถในข้อมูล" value={`${formatNumber(vehicles.length)} คัน`} hint="รายการรถตัวอย่าง" icon={CarFront} />
        <StatCard label="ชำระเงินแล้ว" value={`${formatNumber(vehicles.filter((car) => car.paid).length)} คัน`} hint="จากรายการรถตัวอย่าง" icon={CheckCircle2} tone="green" />
      </div>
      <SectionCard title="รายรับตามช่วงเวลา" description="หน่วย: บาท">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHourlyRevenue} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EF" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#7A869A', fontSize: 12 }} axisLine={{ stroke: '#E3E8EF' }} tickLine={false} />
              <YAxis tick={{ fill: '#7A869A', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => [`${formatNumber(value)} บาท`, 'รายรับ']} contentStyle={{ border: '1px solid #E3E8EF', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="revenue" name="รายรับ" fill="#1685F8" radius={[5, 5, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
