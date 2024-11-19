import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  Legend,
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

export const description = "A bar chart displaying YouTube channel statistics";

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
};

const dummyData = [
  { month: "Jan", views: 4000, likes: 2400, comments: 240 },
  { month: "Feb", views: 3000, likes: 1398, comments: 221 },
  { month: "Mar", views: 2000, likes: 980, comments: 229 },
  { month: "Apr", views: 2780, likes: 3908, comments: 200 },
  { month: "May", views: 1890, likes: 4800, comments: 218 },
  { month: "Jun", views: 2390, likes: 3800, comments: 250 },
];

function BarChartDisplay() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Channel Engagement</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto "
        >
          <BarChart
            width={600}
            height={300}
            data={dummyData}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            {/* <Legend /> */}
            <Bar
              dataKey="views"
              fill={chartConfig.views.color}
              name={chartConfig.views.label}
            >
              {/* <LabelList dataKey="views" position="top" /> */}
            </Bar>
            <Bar
              dataKey="likes"
              fill={chartConfig.likes.color}
              name={chartConfig.likes.label}
            >
              {/* <LabelList dataKey="likes" position="top" /> */}
            </Bar>
            <Bar
              dataKey="comments"
              fill={chartConfig.comments.color}
              name={chartConfig.comments.label}
            >
              {/* <LabelList dataKey="comments" position="top" /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Engagement up by 10% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing views, likes, and comments over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartDisplay;
