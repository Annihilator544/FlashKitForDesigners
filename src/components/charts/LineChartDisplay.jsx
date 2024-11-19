import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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

export const description = "A line chart displaying YouTube channel statistics";

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

function LineChartDisplay() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Performance Trends</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-6">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-80">
          <ResponsiveContainer>
            <LineChart data={dummyData} margin={{ top: 20, right: 10, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="views"
                stroke={chartConfig.views.color}
                name={chartConfig.views.label}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke={chartConfig.likes.color}
                name={chartConfig.likes.label}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke={chartConfig.comments.color}
                name={chartConfig.comments.label}
              />
              <Line
                type="monotone"
                dataKey="shares"
                stroke={chartConfig.shares.color}
                name={chartConfig.shares.label}
              />
              <Line
                type="monotone"
                dataKey="watchTime"
                stroke={chartConfig.watchTime.color}
                name={chartConfig.watchTime.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Visualizing key performance indicators over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default LineChartDisplay;
