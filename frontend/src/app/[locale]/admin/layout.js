import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { redirect } from 'next/navigation'
import { getSession } from '@/app/actions/AuthActions'


export default async function AdminLayout({ children }) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={{}} />
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
