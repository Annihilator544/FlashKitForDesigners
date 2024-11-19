import {
    ChevronRight,
    LucideCircleUserRound,
    LucideFileText,
    LucideFolder,
    LucideGem,
    LucideHome,
    LucideLayoutDashboard,
    LucidePieChart,
    LucidePlus,
  } from "lucide-react"
  
  import { NavUser } from "components/nav-user"
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
  } from "components/ui/sidebar"
import { TabsList, TabsTrigger } from "./ui/tabs"
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"
import { CollapsibleContent } from "@radix-ui/react-collapsible"
import { Badge } from "./ui/badge"
import logo from "../assets/logo.png"
import flashkit from "../assets/flashkit.png"
import flashkitPro from "../assets/flashkitPro.png"
import flashkitSocial from "../assets/flashkitSocial.png"

  export function AppSidebar({
    ...props
  }) {
    return (
        <TabsList className=" bg-[#f6f8f9] border-r rounded-none sticky p-0">
            <Sidebar collapsible="icon" {...props}>
                {/* <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground gap-0">
                        <div
                            className="flex aspect-square size-8 items-center group-data-[collapsible=icon]:justify-center justify-end rounded-lg text-sidebar-primary-foreground">
                            <img src={logo} alt="Logo" className="h-6" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            {localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ? 
                            <img src={flashkit} alt="flashkit logo" className="h-8" />
                            : localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ?
                            <img src={flashkitSocial} alt="flashkit logo" className="h-8" />
                            : <img src={flashkitPro} alt="flashkit logo" className="h-8" /> }
                        </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                </SidebarHeader> */}
                <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:gap-0">
                        <div
                            className="flex items-center group-data-[collapsible=icon]:justify-center justify-end rounded-lg text-sidebar-primary-foreground">
                            <img src={logo} alt="Logo" className="h-6 " />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                            {localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ? 
                            <img src={flashkit} alt="flashkit logo" className="h-8" />
                            : localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ?
                            <img src={flashkitSocial} alt="flashkit logo" className="h-8" />
                            : <img src={flashkitPro} alt="flashkit logo" className="h-8" /> }
                        </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                        <TabsTrigger value="home" className="p-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LucideHome className="h-5"/> Home
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </TabsTrigger>
                        <SidebarMenuItem>
                                <SidebarMenuButton className="font-semibold" onClick={()=>window.location.href="/canvas?id=create_new_design"}>
                                <div  className="bg-[#ef8a80] p-[2px] rounded-sm ">
                                    <LucidePlus size={14} fill="#fff"  color="#fff" className=''/>
                                </div>
                                Create New
                                </SidebarMenuButton>
                        </SidebarMenuItem> 
                        <TabsTrigger value="templates" className="p-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LucideLayoutDashboard className="h-5"/> Template Hub
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </TabsTrigger>
                        { localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ? <SidebarMenu>
                                <Collapsible
                                    asChild
                                    defaultOpen={true}
                                    className="group/collapsible">
                                    <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className=" font-semibold">
                                        <LucidePieChart className="h-5"/> Analytics
                                        <ChevronRight
                                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                        <TabsTrigger value="instagram" className="p-0">
                                            <SidebarMenuSubItem >
                                            <SidebarMenuSubButton asChild>
                                                <span>Instagram</span>
                                            </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </TabsTrigger>
                                        </SidebarMenuSub>
                                        <SidebarMenuSub>
                                        <TabsTrigger value="twitter" className="p-0">
                                            <SidebarMenuSubItem >
                                            <SidebarMenuSubButton asChild>
                                                <span>Twitter</span>
                                            </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </TabsTrigger>
                                        </SidebarMenuSub>
                                        <SidebarMenuSub>
                                        <TabsTrigger value="youtube" className="p-0">
                                            <SidebarMenuSubItem >
                                            <SidebarMenuSubButton asChild>
                                                <span>Youtube</span>
                                            </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </TabsTrigger>
                                        </SidebarMenuSub>
                                        <SidebarMenuSub>
                                        <TabsTrigger value="linkedIn" className="p-0">
                                            <SidebarMenuSubItem >
                                            <SidebarMenuSubButton asChild>
                                                <span>LinkedIn</span>
                                            </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </TabsTrigger>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu> : <></> }
                        {/* { localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ? <TabsTrigger value="mediakit" className="p-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                <LucideFileText className="h-5"/> Media Kit
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </TabsTrigger> : <></> } */}
                        <TabsTrigger value="projects" className="p-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                <LucideFolder className="h-5"/> Projects
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="p-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                <LucideCircleUserRound className="h-5"/> Profile
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </TabsTrigger>
                            { localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ?<SidebarMenuItem>
                                <SidebarMenuButton className="font-semibold" onClick={()=>window.location.href="/billing"}>
                                    <LucideGem className="h-5"/> Upgrade<Badge className="bg-[#ffeae9] text-[#F56B63] rounded-sm">Pro</Badge>
                                </SidebarMenuButton>
                            </SidebarMenuItem> 
                            : 
                            <></>}
                    </SidebarMenu>
                </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                <NavUser />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </TabsList>
    );
  }
  