import * as React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "../ui/chart";

export const description = "A radar chart displaying YouTube channel statistics";

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-3))",
  },
  shares: {
    label: "Shares",
    color: "hsl(var(--chart-4))",
  },
  watchTime: {
    label: "Watch Time",
    color: "hsl(var(--chart-5))",
  },
};

const dummyData = [
  { month: "Jan", views: 4000, likes: 2400, comments: 240, shares: 400, watchTime: 800 },
  { month: "Feb", views: 3000, likes: 1398, comments: 221, shares: 300, watchTime: 700 },
  { month: "Mar", views: 2000, likes: 980, comments: 229, shares: 200, watchTime: 650 },
  { month: "Apr", views: 2780, likes: 3908, comments: 200, shares: 350, watchTime: 780 },
  { month: "May", views: 1890, likes: 4800, comments: 218, shares: 450, watchTime: 820 },
  { month: "Jun", views: 2390, likes: 3800, comments: 250, shares: 500, watchTime: 900 },
];

function RadarChartDisplay() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Channel Performance Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-6">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[400px]">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={dummyData}
            width={500}
            height={400}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="month" />
            <PolarRadiusAxis angle={30} domain={[0, 5000]} />
            <Tooltip content={<ChartTooltipContent />} />
            {/* <Legend /> */}
            <Radar
              name={chartConfig.views.label}
              dataKey="views"
              stroke={chartConfig.views.color}
              fill={chartConfig.views.color}
              fillOpacity={0.6}
            />
            <Radar
              name={chartConfig.likes.label}
              dataKey="likes"
              stroke={chartConfig.likes.color}
              fill={chartConfig.likes.color}
              fillOpacity={0.6}
            />
            <Radar
              name={chartConfig.comments.label}
              dataKey="comments"
              stroke={chartConfig.comments.color}
              fill={chartConfig.comments.color}
              fillOpacity={0.6}
            />
            <Radar
              name={chartConfig.shares.label}
              dataKey="shares"
              stroke={chartConfig.shares.color}
              fill={chartConfig.shares.color}
              fillOpacity={0.6}
            />
            <Radar
              name={chartConfig.watchTime.label}
              dataKey="watchTime"
              stroke={chartConfig.watchTime.color}
              fill={chartConfig.watchTime.color}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Visual comparison of channel metrics over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadarChartDisplay;
