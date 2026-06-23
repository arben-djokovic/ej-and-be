import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({children}) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={{}} />
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
