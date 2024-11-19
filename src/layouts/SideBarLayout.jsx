import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { Separator } from "../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb"
import { LucideBell, LucideSearch, LucideSettings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { useAuthStore } from "store/use-auth-data"
import { Input } from "components/ui/input"
 
export default function SidebarLayout({ children }) {
  const { user } = useAuthStore();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Menu
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <search className=" min-w-80 flex">
          <div className="relative flex flex-1 items-center">
            <Input
              type="search"
              placeholder="Search ..."
            />
            <div className="absolute right-3 text-gray-400">
              <LucideSearch className="h-5"/>
            </div>
          </div>
          </search>
          <div className="flex gap-2 mr-8">
            <LucideSettings className="h-5" />
            <LucideBell className="h-5" />
            <Avatar className= "m-auto h-5 w-5">
            {user&&user.photoURL ? <AvatarImage src={user.photoURL} /> :
              <AvatarImage src="https://github.com/shadcn.png" />
            }
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          </div>
        </header>
        <div className="">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}