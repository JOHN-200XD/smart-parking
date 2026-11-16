import { PageHeading, StatCard, SectionCard, StatusBadge, DetailItem } from './AdminShared.jsx';
import { Download, Plus, Search, Pencil, Trash2, X, Building2, CheckCircle2 } from 'lucide-react';

export default function AdminCompaniesPage(props) {
  const { companyStats, exportData, openCreateCompany, companySearch, setCompanySearch, filteredCompanies, companies, selectedCompanyId, setSelectedCompanyId, openEditCompany, deleteCompany, selectedCompany, companyModalOpen, handleCompanySubmit, editingCompanyId, companyForm, setCompanyForm, setCompanyModalOpen } = props;
  return (

    <div className="space-y-6">
      <PageHeading
        eyebrow="Platform management"
        title="อาคารจอด"
        description="เพิ่ม แก้ไข อาคารจอด"
        action={(
          <div className="flex flex-wrap gap-2">
            <button onClick={() => exportData('อาคาร')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#172B4D] hover:bg-[#F5F7FA]"><Download size={16} /> ส่งออกข้อมูล</button>
            <button onClick={openCreateCompany} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1685F8] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#0866C6]"><Plus size={16} /> เพิ่มอาคารจอด</button>
          </div>
        )}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="อาคารทั้งหมด" value={companyStats.totalCompanies} icon={Building2} />
        <StatCard label="อาคารที่ใช้งาน" value={companyStats.activeCompanies} icon={CheckCircle2} tone="green" />
      </div>
      <SectionCard title="รายชื่ออาคาร" description="ค้นหาอาคารด้วยชื่อหรือรหัส และแก้ไขข้อมูลได้จากรายการนี้">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
            <input value={companySearch} onChange={(event) => setCompanySearch(event.target.value)} placeholder="ค้นหาชื่อหรือรหัสอาคาร" className="w-full rounded-lg border border-[#E3E8EF] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1685F8]" />
          </div>
          <span className="text-xs text-[#7A869A]">พบ {filteredCompanies.length} จาก {companies.length} อาคาร</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[#F5F7FA] text-xs text-[#5E6C84]">
              <tr>
                <th className="rounded-l-lg px-3 py-3 font-semibold">อาคาร</th>
                <th className="px-3 py-3 font-semibold">จำนวนสาขา</th>
                <th className="px-3 py-3 font-semibold">ลานจอด</th>
                <th className="px-3 py-3 font-semibold">สถานะ</th>
                <th className="rounded-r-lg px-3 py-3 text-center font-semibold" aria-label="การดำเนินการ" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8EF]">
              {filteredCompanies.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FBFD]">
                  <td className="px-3 py-4"><p className="font-semibold text-[#172B4D]">{item.name}</p><p className="mt-0.5 text-xs text-[#7A869A]">รหัส {item.code}</p></td>
                  <td className="px-3 py-4 text-[#5E6C84]">{item.branchCount}</td>
                  <td className="px-3 py-4 text-[#5E6C84]">{item.parkingLotCount}</td>
                  <td className="px-3 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-3 py-4"><div className="flex flex-wrap items-center justify-end gap-2"><button onClick={() => setSelectedCompanyId(item.id)} className="rounded-lg border border-[#1685F8]/30 bg-[#F2F8FF] px-2.5 py-1.5 text-xs font-semibold text-[#0866C6] hover:bg-[#E6F2FF]">รายละเอียด</button><button onClick={() => openEditCompany(item)} className="inline-flex items-center gap-1 rounded-lg border border-[#E3E8EF] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#5E6C84] hover:border-[#1685F8]/40 hover:bg-[#F5F7FA]"><Pencil size={13} /> แก้ไข</button><button onClick={() => deleteCompany(item)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100" aria-label={`ลบอาคาร ${item.name}`}><Trash2 size={13} /> ลบ</button></div></td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && <tr><td colSpan="5" className="py-8 text-center text-sm text-[#7A869A]">ไม่พบอาคารที่ค้นหา</td></tr>}
            </tbody>
          </table>
        </div>
      </SectionCard>
      {selectedCompany && (
        <SectionCard title="รายละเอียดอาคาร" description={`รหัสอาคาร ${selectedCompany.code}`} action={<div className="flex gap-3"><button onClick={() => openEditCompany(selectedCompany)} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1685F8]"><Pencil size={13} /> แก้ไข</button><button onClick={() => setSelectedCompanyId(null)} className="text-xs font-semibold text-[#5E6C84]">ปิดรายละเอียด</button></div>}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="ชื่ออาคาร" value={selectedCompany.name} />
            <DetailItem label="จำนวนสาขา" value={`${selectedCompany.branchCount} สาขา`} />
            <DetailItem label="จำนวนลานจอด" value={`${selectedCompany.parkingLotCount} ลาน`} />
          </div>
        </SectionCard>
      )}

      {companyModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-label={editingCompanyId ? 'แก้ไขอาคาร' : 'เพิ่มอาคาร'}>
          <form onSubmit={handleCompanySubmit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E3E8EF] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E3E8EF] px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-[#172B4D]">{editingCompanyId ? 'แก้ไขข้อมูลอาคาร' : 'เพิ่มอาคารใหม่'}</h2>
                <p className="mt-1 text-xs text-[#7A869A]">ข้อมูลจะบันทึกใน Mock Data ของเบราว์เซอร์นี้</p>
              </div>
              <button type="button" onClick={() => setCompanyModalOpen(false)} className="rounded-lg p-2 text-[#7A869A] hover:bg-[#F5F7FA]" aria-label="ปิด"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <label className="space-y-1.5 sm:col-span-2"><span className="text-xs font-semibold text-[#5E6C84]">ชื่ออาคาร</span><input required value={companyForm.name} onChange={(event) => setCompanyForm({ ...companyForm, name: event.target.value })} placeholder="เช่น Metro Parking" className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">รหัสอาคาร</span><input required value={companyForm.code} onChange={(event) => setCompanyForm({ ...companyForm, code: event.target.value.toUpperCase() })} placeholder="เช่น MTP" className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm uppercase outline-none focus:border-[#1685F8]" /></label>
              <label className="space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">จำนวนสาขา</span><input type="number" min="0" value={companyForm.branchCount} onChange={(event) => setCompanyForm({ ...companyForm, branchCount: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">จำนวนลานจอด</span><input type="number" min="0" value={companyForm.parkingLotCount} onChange={(event) => setCompanyForm({ ...companyForm, parkingLotCount: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <div className="border-t border-[#E3E8EF] pt-4 sm:col-span-2"><h3 className="text-sm font-semibold text-[#172B4D]">Parking Pricing & Exit Policy</h3><p className="mt-1 text-xs text-[#7A869A]">กำหนดค่าจอดและเวลานำรถออกหลังชำระเงิน</p></div>
              <label className="space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">Parking rate per hour (THB)</span><input type="number" min="0" step="0.01" required value={companyForm.hourlyRate} onChange={(event) => setCompanyForm({ ...companyForm, hourlyRate: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">Exit grace period after payment (minutes)</span><input type="number" min="0" step="1" required value={companyForm.paidExitGracePeriodMinutes} onChange={(event) => setCompanyForm({ ...companyForm, paidExitGracePeriodMinutes: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="space-y-1.5 sm:col-span-2"><span className="text-xs font-semibold text-[#5E6C84]">Additional fee per hour after grace period (THB)</span><input type="number" min="0" step="0.01" required value={companyForm.overstayHourlyRate} onChange={(event) => setCompanyForm({ ...companyForm, overstayHourlyRate: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#E3E8EF] px-5 py-4">
              <button type="button" onClick={() => setCompanyModalOpen(false)} className="rounded-lg border border-[#E3E8EF] px-4 py-2.5 text-sm font-semibold text-[#5E6C84] hover:bg-[#F5F7FA]">ยกเลิก</button>
              <button type="submit" className="rounded-lg bg-[#1685F8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0866C6]">{editingCompanyId ? 'บันทึกการแก้ไข' : 'เพิ่มอาคาร'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
