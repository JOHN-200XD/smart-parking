import { PageHeading, SectionCard } from '../components/AdminShared.jsx';
import { Plus, Pencil, Trash2, Users, X } from 'lucide-react';

export default function AdminPermissionsPage(props) {
  const { setAddAdminModalOpen, selectedRole, setSelectedRole, rolePermissions, toggleRolePermission, PERMISSION_OPTIONS, manageableUsers, userPermissionOverrides, companies, openUserPermissionEditor, editingPermissionUser, userPermissionDraft, setUserPermissionDraft, deleteManagedUser, saveUserPermissions, addAdminModalOpen, handleAddAdmin, adminForm, setAdminForm, setEditingPermissionUserId } = props;
  return (

    <div className="space-y-6">
      <PageHeading eyebrow="Access control" title="ผู้ใช้งานและสิทธิ์" description="กำหนดเมนูที่ Company Admin และ Staff สามารถเข้าถึงได้" action={<button onClick={() => setAddAdminModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1685F8] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#0866C6]"><Plus size={16} /> เพิ่มผู้ดูแล</button>} />
      <SectionCard title="กำหนดสิทธิ์ตามบทบาท" description="การเปลี่ยนแปลงจะบันทึกไว้ใน Local Storage ของเครื่องนี้">
        <div className="mb-4 grid grid-cols-2 gap-2 sm:max-w-md">
          {[{ key: 'admin', label: 'Company Admin' }, { key: 'staff', label: 'Staff' }].map((role) => (
            <button key={role.key} onClick={() => setSelectedRole(role.key)} className={`rounded-lg border px-4 py-3 text-sm font-semibold ${selectedRole === role.key ? 'border-[#1685F8] bg-[#F2F8FF] text-[#1685F8]' : 'border-[#E3E8EF] text-[#5E6C84] hover:bg-[#F5F7FA]'}`}>{role.label}</button>
          ))}
        </div>
        <div className="space-y-2">
          {PERMISSION_OPTIONS.map((permission) => (
            <label key={permission.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#E3E8EF] px-4 py-3 text-sm hover:bg-[#F9FBFD]">
              <span className="text-[#172B4D]">{permission.label}</span>
              <input type="checkbox" checked={(rolePermissions[selectedRole] || []).includes(permission.key)} onChange={() => toggleRolePermission(selectedRole, permission.key)} className="h-4 w-4 accent-[#1685F8]" />
            </label>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="โปรไฟล์ผู้ดูแลและสิทธิ์" description="สิทธิ์ของแต่ละคนเริ่มต้นตาม Role และปรับแยกเป็นรายบุคคลได้">
        {manageableUsers.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {manageableUsers.map((user) => {
              const permissions = userPermissionOverrides[user.id] || rolePermissions[user.role] || user.permissions || [];
              const companyName = companies.find((item) => item.id === user.companyId)?.name;
              return (
                <article key={user.id} className="rounded-xl border border-[#E3E8EF] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2F8FF] text-[#1685F8]"><Users size={19} /></div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[#172B4D]">{user.name}</h3>
                        <p className="truncate text-xs text-[#7A869A]">@{user.username}</p>
                      </div>
                    </div>
                    <button onClick={() => openUserPermissionEditor(user)} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#E3E8EF] px-3 py-2 text-xs font-semibold text-[#5E6C84] hover:bg-[#F5F7FA]"><Pencil size={13} /> แก้ไข</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F2F8FF] px-2.5 py-1 text-[11px] font-semibold text-[#1685F8]">{user.role === 'admin' ? 'Company Admin' : 'Staff'}</span>
                    {companyName && <span className="rounded-full bg-[#F5F7FA] px-2.5 py-1 text-[11px] text-[#5E6C84]">{companyName}</span>}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {permissions.length > 0
                      ? permissions.map((key) => <span key={key} className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">{PERMISSION_OPTIONS.find((permission) => permission.key === key)?.label || key}</span>)
                      : <span className="text-xs text-[#7A869A]">ยังไม่มีสิทธิ์ที่กำหนด</span>}
                  </div>
                </article>
              );
            })}
          </div>
        ) : <p className="text-sm text-[#7A869A]">ยังไม่มีโปรไฟล์ผู้ดูแล</p>}
      </SectionCard>
      {editingPermissionUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-label={`แก้ไขสิทธิ์ ${editingPermissionUser.name}`}>
          <div className="w-full max-w-lg rounded-2xl border border-[#E3E8EF] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E3E8EF] px-5 py-4">
              <div><h2 className="text-base font-bold text-[#172B4D]">แก้ไขสิทธิ์ผู้ดูแล</h2><p className="mt-1 text-xs text-[#7A869A]">{editingPermissionUser.name} · {editingPermissionUser.role === 'admin' ? 'Company Admin' : 'Staff'}</p></div>
              <button type="button" onClick={() => setEditingPermissionUserId(null)} className="rounded-lg p-2 text-[#7A869A] hover:bg-[#F5F7FA]" aria-label="ปิด"><X size={18} /></button>
            </div>
            <div className="space-y-2 p-5">
              {PERMISSION_OPTIONS.map((permission) => (
                <label key={permission.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#E3E8EF] px-4 py-3 text-sm hover:bg-[#F9FBFD]">
                  <span className="text-[#172B4D]">{permission.label}</span>
                  <input type="checkbox" checked={userPermissionDraft.includes(permission.key)} onChange={() => setUserPermissionDraft((current) => current.includes(permission.key) ? current.filter((key) => key !== permission.key) : [...current, permission.key])} className="h-4 w-4 accent-[#1685F8]" />
                </label>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E3E8EF] px-5 py-4">
              <button type="button" onClick={() => deleteManagedUser(editingPermissionUser)} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100"><Trash2 size={15} /> ลบผู้ดูแล</button>
              <div className="ml-auto flex gap-2">
                <button type="button" onClick={() => setEditingPermissionUserId(null)} className="rounded-lg border border-[#E3E8EF] px-4 py-2.5 text-sm font-semibold text-[#5E6C84] hover:bg-[#F5F7FA]">ยกเลิก</button>
                <button type="button" onClick={saveUserPermissions} className="rounded-lg bg-[#1685F8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0866C6]">บันทึกสิทธิ์</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {addAdminModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-label="เพิ่มผู้ดูแล">
          <form onSubmit={handleAddAdmin} className="w-full max-w-md rounded-2xl border border-[#E3E8EF] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E3E8EF] px-5 py-4">
              <div><h2 className="text-base font-bold text-[#172B4D]">เพิ่มผู้ดูแล</h2><p className="mt-1 text-xs text-[#7A869A]">สิทธิ์เริ่มต้นจะอิงตาม Role ที่เลือก</p></div>
              <button type="button" onClick={() => setAddAdminModalOpen(false)} className="rounded-lg p-2 text-[#7A869A] hover:bg-[#F5F7FA]" aria-label="ปิด"><X size={18} /></button>
            </div>
            <div className="space-y-4 p-5">
              <label className="block space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">ชื่อผู้ดูแล</span><input required value={adminForm.name} onChange={(event) => setAdminForm({ ...adminForm, name: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="block space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">ชื่อผู้ใช้</span><input required value={adminForm.username} onChange={(event) => setAdminForm({ ...adminForm, username: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="block space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">รหัสผ่าน</span><input type="password" required value={adminForm.password} onChange={(event) => setAdminForm({ ...adminForm, password: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]" /></label>
              <label className="block space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">Role และสิทธิ์ตั้งต้น</span><select value={adminForm.role} onChange={(event) => setAdminForm({ ...adminForm, role: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]"><option value="admin">Company Admin</option><option value="staff">Staff</option></select></label>
              <label className="block space-y-1.5"><span className="text-xs font-semibold text-[#5E6C84]">อาคาร</span><select value={adminForm.companyId} onChange={(event) => setAdminForm({ ...adminForm, companyId: event.target.value })} className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1685F8]"><option value="">เลือกอาคาร</option>{companies.map((companyItem) => <option key={companyItem.id} value={companyItem.id}>{companyItem.name}</option>)}</select></label>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#E3E8EF] px-5 py-4">
              <button type="button" onClick={() => setAddAdminModalOpen(false)} className="rounded-lg border border-[#E3E8EF] px-4 py-2.5 text-sm font-semibold text-[#5E6C84] hover:bg-[#F5F7FA]">ยกเลิก</button>
              <button type="submit" className="rounded-lg bg-[#1685F8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0866C6]">เพิ่มผู้ดูแล</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
