import * as React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PolarAngleAxis,
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

export const description = "A radial bar chart displaying YouTube channel statistics";

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
  { name: "Views", value: 4000, fill: chartConfig.views.color },
  { name: "Likes", value: 2400, fill: chartConfig.likes.color },
  { name: "Comments", value: 240, fill: chartConfig.comments.color },
  { name: "Shares", value: 400, fill: chartConfig.shares.color },
  { name: "Watch Time", value: 800, fill: chartConfig.watchTime.color },
];

function RadialChartDisplay() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Channel Metrics Overview</CardTitle>
        <CardDescription>As of June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 pb-6">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[400px]">
          <RadialBarChart
            width={500}
            height={400}
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            data={dummyData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 5000]}
              angleAxisId={0}
              tick={false}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            />
            {/* <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            /> */}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Circular representation of key channel metrics
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadialChartDisplay;
