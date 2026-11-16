import { PageHeading, SectionCard } from './AdminShared.jsx';
import { Download } from 'lucide-react';
import { mockSlotHeatmap, mockCarBrands } from '../../data/mockData';

export default function AdminActivityPage(props) {
  const { exportData } = props;
  return (

    <div className="space-y-6">
      <PageHeading eyebrow="Usage analytics" title="การใช้งานและ Heatmap" description="ดูความหนาแน่นของช่องจอดและสถิติรุ่นรถจากข้อมูลจำลอง" action={<button onClick={() => exportData('กิจกรรม')} className="inline-flex items-center gap-2 rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#172B4D] hover:bg-[#F5F7FA]"><Download size={16} /> ดาวน์โหลด CSV</button>} />
      <SectionCard title="ความหนาแน่นของช่องจอด" description="เปอร์เซ็นต์เป็นค่าความถี่การใช้งานจำลอง ไม่ใช่สถานะว่าง/ไม่ว่างแบบเรียลไทม์">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#5E6C84]">
          <span>น้อย</span>
          <span className="h-4 w-4 rounded bg-sky-200" aria-hidden="true" />
          <span className="h-4 w-4 rounded bg-lime-300" aria-hidden="true" />
          <span className="h-4 w-4 rounded bg-amber-300" aria-hidden="true" />
          <span className="h-4 w-4 rounded bg-orange-500" aria-hidden="true" />
          <span className="h-4 w-4 rounded bg-rose-600" aria-hidden="true" />
          <span>มาก</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {mockSlotHeatmap.map((item) => {
            const heatLevel = item.density >= 85
              ? 'bg-rose-600 text-white'
              : item.density >= 70
                ? 'bg-orange-500 text-white'
                : item.density >= 50
                  ? 'bg-amber-300 text-[#172B4D]'
                  : item.density >= 30
                    ? 'bg-lime-300 text-[#172B4D]'
                    : 'bg-sky-200 text-[#172B4D]';
            const secondaryText = item.density >= 70 ? 'text-white/90' : 'text-[#334155]';
            return (
              <div key={item.slot} className={`rounded-lg border border-black/5 p-3.5 ${heatLevel}`}>
                <span className="font-sans text-sm font-bold">{item.slot}</span>
                <p className={`mt-3 text-xs ${secondaryText}`}>ความหนาแน่น: {item.label}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>
      <SectionCard title="รุ่นรถและระยะเวลาจอดเฉลี่ย" description="สถิติรถยนต์ที่เข้ามาใช้บริการจากข้อมูลจำลอง">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-xs text-[#7A869A]"><tr className="border-b border-[#E3E8EF]"><th className="pb-3 font-medium">รุ่นรถยนต์</th><th className="pb-3 font-medium">จำนวนรถ</th><th className="pb-3 font-medium">จอดเฉลี่ย</th></tr></thead>
            <tbody className="divide-y divide-[#E3E8EF]">{mockCarBrands.map((car) => <tr key={car.brand}><td className="py-3.5 font-semibold text-[#172B4D]">{car.brand}</td><td className="py-3.5 text-[#5E6C84]">{car.count} คัน</td><td className="py-3.5 text-[#5E6C84]">{car.avgHours} ชั่วโมง</td></tr>)}</tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
