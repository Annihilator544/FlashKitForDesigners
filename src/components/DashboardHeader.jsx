import React from 'react';
import { Button } from "./ui/button";
import { 
  Layout, 
  Film, 
  Image, 
  FileText, 
  Share2, 
  Globe, 
  Upload,
  MoreHorizontal,
} from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col m-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#f35b53] to-[#ff9b88] p-8 rounded-lg mb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Explore Flashkit</h1>
        <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
          Check out latest features
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-5 gap-4 mb-8 md:grid-cols-10">
        <ToolButton icon={<FileText />} label="Doc" color="text-cyan-500" />
        <ToolButton icon={<Layout />} label="Canvas" color="text-green-500" />
        <ToolButton icon={<Image />} label="Graphics" color="text-orange-500" />
        <ToolButton icon={<Share2 />} label="Share" color="text-pink-500" />
        <ToolButton icon={<Film />} label="Video" color="text-purple-500" />
        <ToolButton icon={<FileText />} label="Print" color="text-indigo-500" />
        <ToolButton icon={<Globe />} label="Website" color="text-blue-500" />
        <ToolButton icon={<Layout />} label="Custom" color="text-gray-500" />
        <ToolButton icon={<Upload />} label="Upload" color="text-slate-500" />
        <ToolButton icon={<MoreHorizontal />} label="More" color="text-gray-700" />
      </div>
    </div>
  );
};

const ToolButton = ({ icon, label, color }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        className={`w-12 h-12 rounded-full ${color} hover:bg-gray-100`}
      >
        {icon}
      </Button>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
};


export default DashboardHeader;