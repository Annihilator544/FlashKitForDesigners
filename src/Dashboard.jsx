import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Instagram, Linkedin, LucideAward, LucideCircleUserRound, LucideFolderOpen, LucideGauge, LucideLayoutDashboard, LucideLogOut, LucideMoreHorizontal, LucidePieChart, LucidePlus, LucideSettings, LucideTrash2, LucideTvMinimalPlay, LucideUsersRound, Twitter, Youtube } from "lucide-react";
import React, { useEffect } from "react";
import { useProject } from "plotNoFeatures/project";
import { observer } from "mobx-react-lite";
import * as api from "./plotNoFeatures/api";
import { Spinner } from "@blueprintjs/core";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

import PieChartDisplay from "./components/charts/PieChartDisplay";
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./components/ui/select";
import logo from "./assets/logo.svg" 
import ConnectAccount from "./components/ConnectAccount";
import { YoutubeMonthly } from "./components/charts/YoutubeMonthly";
import { useYoutubeData } from "store/use-youtube-data";
import { useAuthStore } from "store/use-auth-data";
import BarChartDisplay from "./components/charts/BarChartDisplay";
import RadarChartDisplay from "./components/charts/RadarChartDisplay";
import RadialChartDisplay from "./components/charts/RadialChartDisplay";
import LineChartDisplay from "./components/charts/LineChartDisplay";
import { Separator } from "./components/ui/separator";
import { InsightsChart } from "./components/charts/InsightsChart";
import { MonthlyEngagementChart } from "./components/charts/MonthlyEngagementChart";
import { TopContentCarousel } from "./components/TopContentCarousel";
import TemplateCard from "./components/TemplateCard";
import ChatWidget from "./components/ChatWidget";
import { useEngagementData } from "store/use-engagement-data";
import SidebarLayout from "layouts/SideBarLayout";
import DashboardHeader from "./components/DashboardHeader";
import { InstagramContentCarousel } from "./components/InstagramContentCarousel";
import { useInstagramData } from "store/use-instagram-data";

function DashBoard({ store }) {
  const { data } = useYoutubeData();
  const { user } = useAuthStore();
  const [mediaKitData, setMediaKitData] = React.useState([]);
  const [boldDesigns, setBoldDesigns] = React.useState([]);
  const [minimalDesigns, setMinimalDesigns] = React.useState([]);
  const [classicDesigns, setClassicDesigns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { Engagement, setEngagement } = useEngagementData();
  const {instagramData} = useInstagramData();
  console.log(instagramData);
  const getEQSScore = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("https://uibtscb6a4mio6htt6rdpuqc640hbnof.lambda-url.eu-west-2.on.aws/", {
        method: 'POST',
        body: JSON.stringify({
          data : userData
        })
      });

      const data = await response.json();
      console.log(data);
      setEngagement(data);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  async function getDesignTemplates() {
    await fetch("https://api.polotno.com/api/get-templates?size=1080x1080&query=&per_page=10&page=1&KEY=iRIwFHCuH539pYGokN6n").then((res) =>res.json()).then((res) => {
      setMediaKitData(res.items);
    });
    await fetch("https://api.polotno.com/api/get-templates?size=851x315&query=&per_page=10&page=1&KEY=iRIwFHCuH539pYGokN6n").then((res) =>res.json()).then((res) => {
      setBoldDesigns(res.items);
    });
    await fetch("https://api.polotno.com/api/get-templates?size=1080x1920&query=&per_page=10&page=1&KEY=iRIwFHCuH539pYGokN6n").then((res) =>res.json()).then((res) => {
      setMinimalDesigns(res.items);
    });
    await fetch("https://api.polotno.com/api/get-templates?size=1280x720&query=&per_page=10&page=1&KEY=iRIwFHCuH539pYGokN6n").then((res)=>res.json()).then((res) => {
      setClassicDesigns(res.items);
    });
  }
  useEffect(() => {
    getDesignTemplates();
  }, []);
  return (
    <>
      <div className="flex">
        <Tabs className="flex flex-1 " defaultValue="home" >
        <SidebarLayout>
        <div className=" flex">
            <TabsContent value="home" className="flex-1 overflow-y-auto">
              <DashboardHeader/>
              <div>
                {localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ? 
                <>
                <div className="m-10  flex justify-around flex-wrap">
                    <div className="flex gap-4">
                        <Avatar className= "m-auto">
                        {user&&user.photoURL ? <AvatarImage src={user.photoURL} /> :
                          <AvatarImage src="https://github.com/shadcn.png" />
                        }
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="my-auto space-y-1">
                          <p className=" font-bold mt-2 text-xl mr-auto">@{user&&user.displayName ? user.displayName.replace(" ","") : "Set Up Profile"}</p>
                          <div className="flex justify-between gap-2">
                            <p className="text-[#6E7C87] font-medium text-sm">Profile Status</p>
                            <div className="text-[#E1A100] bg-[#fdf5e1] text-center font-semibold flex pr-2 py-[2px] rounded-sm"><LucideAward className="h-4 my-auto"/>Gold</div>
                          </div>
                        </div>
                    </div>
                  <Separator orientation="vertical" className="mx-4"/>
                  <div className=" flex flex-col gap-2">
                      <div className=" text-base font-semibold Inter flex gap-2"><LucideGauge className="h-5 my-auto"/> EQS Score</div>
                      <p className=" text-2xl font-semibold">{Engagement && typeof Engagement ==='object' && Object.keys(Engagement).length > 0 ? Engagement.engagementMetrics.score * 10 : 79} %</p>
                      <div className="flex text-sm font-medium gap-1"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                      {data && typeof data === 'object' && Object.keys(data).length > 0 ?<Button className={"w-full" + loading ? " opacity-90 ":""} onClick={()=>getEQSScore(data)}>{loading ? "Loading ...":" Generate EQS Score"}</Button> : <></>}
                  </div>
                  <Separator orientation="vertical" className="mx-4"/>
                  <div className=" flex flex-col gap-2">
                      <div className=" text-base font-semibold Inter flex gap-2"><LucideUsersRound className="h-5 my-auto"/> Followers</div>
                      <p className=" text-2xl font-semibold">23000</p>
                      <div className="flex text-sm font-medium gap-1"><p className="text-[#FF9500]">-0.4%</p><p className="text-secondary"> than last week</p></div>
                  </div>
                  <Separator orientation="vertical" className="mx-4"/>
                  <div className=" flex flex-col gap-2">
                      <div className=" text-base font-semibold Inter flex gap-2"><LucideUsersRound className="h-5 my-auto"/> Engagement</div>
                      <div className="flex text-sm font-medium gap-1"><p className=" text-2xl font-semibold">{Engagement && typeof Engagement ==='object' && Object.keys(Engagement).length > 0 ? Engagement.engagementMetrics.details.recentEngagementScore : 9.2}</p><p className="text-secondary mt-auto mb-1"> / 10</p></div>
                      <div className="flex text-sm font-medium gap-1"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                  </div>
                </div>
                <Separator className="mx-8"/>
                <div className="m-10">
                    <div className="flex gap-6">
                    <InsightsChart/> 
                    <MonthlyEngagementChart/>
                    </div>
                </div>
                </> 
                : <></>}
                <div className="m-10">
                  <div className="justify-between flex flex-col mb-10">
                  <p className=" text-lg font-semibold mt-10">Start Building</p>
                  <p className="text-[#6E7C87] font-medium text-sm">Choose a template and craft eye-catching stats</p>
                  </div>
                  <DashboardProjects store={store} />
                </div>
                <div className="m-10">
                  <p className="text-lg font-semibold">Templates for you</p>
                  <p className="text-secondary font-medium text-sm mb-5">Choose a template and craft eye-catching stats</p>
                  <div className="flex  gap-3">
                  {
                    mediaKitData.slice(1,6).map((item)=>{
                      return(
                        <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                      )
                    })
                  }
                  </div>
                </div>
                </div>
            </TabsContent>
            <TabsContent value="youtube" className="flex-1 p-10 space-y-6">
            <p className=" text-3xl font-semibold">Youtube Analytics</p>
            <div>
              <p className="text-secondary font-medium text-lg">Overview</p>
              <div className="flex gap-5 mt-3">
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Total Followers</p>
                      <p className="text-3xl font-semibold">127K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Total Engagement</p>
                      <p className="text-3xl font-semibold">127K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Daily Visitors</p>
                      <p className="text-3xl font-semibold">5.3K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
              </div>
            </div>
            <div>
              <p className="text-secondary font-medium text-lg">Audience</p>
              { data && typeof data === 'object' && Object.keys(data).length > 0 ?
                      <div className="flex-1 mt-3">
                        <div className="flex-1 p-4 flex gap-4">
                          <PieChartDisplay/>
                          <YoutubeMonthly/>
                          
                        </div>
                        <div className="flex-1 p-4 flex gap-4 flex-wrap">
                          <RadarChartDisplay/>
                          <RadialChartDisplay/>
                        </div>
                        <div className="flex-1 p-4 flex gap-4 flex-wrap">
                          <BarChartDisplay/>
                          <LineChartDisplay/>
                        </div>
                      </div>
                      :
                      <div className="flex gap-5 mt-3">
                        <InsightsChart/>
                        <MonthlyEngagementChart/>
                      </div>
                } 
            </div>
            <div>
                <p className="text-secondary font-medium text-lg mb-3">Top Content</p>
                <TopContentCarousel />
            </div>
            </TabsContent>
            <TabsContent value="instagram" className="flex-1 p-10 space-y-6">
            <p className=" text-3xl font-semibold">Instagram Analytics</p>
            <div>
              <p className="text-secondary font-medium text-lg">Overview</p>
              <div className="flex gap-5 mt-3">
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Total Followers</p>
                      <p className="text-3xl font-semibold">127K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Total Engagement</p>
                      <p className="text-3xl font-semibold">127K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 shadow-md">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold">Daily Visitors</p>
                      <p className="text-3xl font-semibold">5.3K</p>
                      <div className="flex text-sm font-medium gap-1 mt-6"><p className="text-[#34C759]">+20%</p><p className="text-secondary"> than last week</p></div>
                    </CardContent>
                  </Card>
              </div>
            </div>
            <div>
              <p className="text-secondary font-medium text-lg">Audience</p>
              { data && typeof data === 'object' && Object.keys(data).length > 0 ?
                      <div className="flex-1 mt-3">
                        <div className="flex-1 p-4 flex gap-4">
                          <PieChartDisplay/>
                          <YoutubeMonthly/>
                        </div>
                        <div className="flex-1 p-4 flex gap-4 flex-wrap">
                          <RadarChartDisplay/>
                          <RadialChartDisplay/>
                        </div>
                        <div className="flex-1 p-4 flex gap-4 flex-wrap">
                          <BarChartDisplay/>
                          <LineChartDisplay/>
                        </div>
                      </div>
                      :
                      <div className="flex gap-5 mt-3">
                        <InsightsChart/>
                        <MonthlyEngagementChart/>
                      </div>
                } 
            </div>
            <div>
                <p className="text-secondary font-medium text-lg mb-3">Top Content</p>
                {instagramData && <InstagramContentCarousel CarouselItems={instagramData} />}
            </div>
            </TabsContent>
            {/* <TabsContent value="mediakit" className="flex-1 p-10 space-y-6">
              <p className=" text-3xl font-semibold">Media Kit</p>
              <div>
                <p className="text-lg font-semibold">Templates for you</p>
                <p className="text-secondary font-medium text-sm mb-5">Choose a template and craft eye-catching stats</p>
                <div className="flex flex-wrap gap-3">
                {
                  mediaKitData.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Bold</p>
                <div className="flex flex-wrap gap-3">
                {
                  boldDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Minimal</p>
                <div className="flex flex-wrap gap-3">
                {
                  minimalDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Classic</p>
                <div className="flex flex-wrap gap-3">
                {
                  classicDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
            </TabsContent> */}
            <TabsContent value="profile" className="flex-1">
              <div className="m-10">
                <ConnectAccount/>
              </div>
              <div className="m-10">
              {Engagement && typeof Engagement ==='object' && Object.keys(Engagement).length > 0 ?
                <Card className="flex gap-4">
                  <CardContent className="flex-1 p-6">
                  <pre>{Engagement.analysis[0].text}</pre>
                  </CardContent>
                </Card>
                :<></>
              }
              </div>
            </TabsContent>
            <TabsContent value="templates" className="flex-1 p-10 space-y-6">
            <p className=" text-3xl font-semibold">Templates</p>
              <div>
                <p className="text-lg font-semibold">Templates for you</p>
                <p className="text-secondary font-medium text-sm mb-5">Choose a template and craft eye-catching stats</p>
                <div className="flex flex-wrap gap-3">
                {
                  mediaKitData.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Bold</p>
                <div className="flex flex-wrap gap-3">
                {
                  boldDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Minimal</p>
                <div className="flex flex-wrap gap-3">
                {
                  minimalDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Classic</p>
                <div className="flex flex-wrap gap-3">
                {
                  classicDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
            </TabsContent>
            <TabsContent value="projects" className="flex-1 p-10 space-y-6">
            <p className=" text-3xl font-semibold">Projects</p>
              <div>
                <p className="text-lg font-semibold">Recent Projects for you</p>
                <p className="text-secondary font-medium text-sm mb-5">Choose a template and craft eye-catching stats</p>
                <div className="flex flex-wrap gap-3">
                {
                  mediaKitData.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Bold</p>
                <div className="flex flex-wrap gap-3">
                {
                  boldDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Minimal</p>
                <div className="flex flex-wrap gap-3">
                {
                  minimalDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold mb-5">Classic</p>
                <div className="flex flex-wrap gap-3">
                {
                  classicDesigns.map((item)=>{
                    return(
                      <TemplateCard url={item.preview} jsonURL={item.json} store={store}/>
                    )
                  })
                }
                </div>
              </div>
            </TabsContent>
        </div>
        </SidebarLayout>
        </Tabs>
        {localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ? 
        <div className="w-[15%] border-2 border-black my-2 mr-4">
            <p className="my-auto">Ad Space</p>
        </div>
        : <></>}
      </div>
      {localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ? 
        <></>
        : 
        <ChatWidget />}
    </>
  );
}

const DashboardProjects = observer(({ store }) => {
  const project = useProject();
  const [designsLoadings, setDesignsLoading] = React.useState(false);
  const [designs, setDesigns] = React.useState([]);

  const loadDesigns = async () => {
    setDesignsLoading(true);
    const list = await api.listDesigns();
    setDesigns(list);
    setDesignsLoading(false);
  };

  const handleProjectDelete = ({ id }) => {
    setDesigns(designs.filter((design) => design.id !== id));
    api.deleteDesign({ id });
  };

  React.useEffect(() => {
    loadDesigns();
  }, [project.cloudEnabled, project.designsLength]);
  return (
    <div className="flex flex-col flex-wrap">
      <div className="flex gap-5 flex-wrap">
        <Button
          variant="dotted"
          className="px-10 py-8 aspect-square h-full"
            onClick={async () => {
              window.location.href = `/canvas?id=create_new_design`;
            }}
          >
            <LucidePlus className=" h-4"/>Create new project
        </Button>
      {!designsLoadings && !designs.length && (
        <div style={{ paddingTop: '20px', textAlign: 'center', opacity: 0.6 }}>
          You have no designs yet.
        </div>
      )}
      {designsLoadings && (
        <div style={{ paddingTop: '20px', textAlign: 'center', opacity: 0.6 }}>
          Loading designs...
        </div>
      )}
      {designs.map((design) => (
        <DesignCard
          key={design.id}
          design={design}
          onDelete={handleProjectDelete}
        />
      ))}
      </div>
    </div>
  );});

  const DesignCard = observer(({ design, store, onDelete }) => {
    const [loading, setLoading] = React.useState(false);
    const [previewURL, setPreviewURL] = React.useState(design.previewURL);
  
    React.useEffect(() => {
      const load = async () => {
        const url = await api.getPreview({ id: design.id });
        setPreviewURL(url);
      };
      load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    const handleSelect = async () => {
      setLoading(true);
      window.location.href = `/canvas?id=${design.id}`;
      setLoading(false);
    };
  
    return (
      <Card
        style={{  padding: '3px', position: 'relative' }}
        interactive
        className="fit-content w-fit mb-auto mx-1"
        onClick={() => {
          handleSelect();
        }}
      >
        <div className="rounded-lg overflow-hidden">
        <img src={previewURL} style={{ width: '100%' }} alt="url" />
        </div>
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '3px',
          }}
        >
          {design.name || 'Untitled'}
        </div>
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Spinner />
          </div>
        )}
        <div
          style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
        <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="p-2"><LucideMoreHorizontal className="h-4"/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white mx-1">
          <DropdownMenuItem className="flex gap-2" onClick={() => {
                    handleSelect();
                  }}>
              <LucideFolderOpen className='h-4'/>Open
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2" onClick={() => {
                    if (window.confirm('Are you sure you want to delete it?')) {
                      onDelete({ id: design.id });
                    }
                  }}>
              <LucideTrash2 className='h-4'/>Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </Card>
    );
  });

export default DashBoard;