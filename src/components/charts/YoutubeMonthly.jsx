import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { useYoutubeData } from "store/use-youtube-data"

export const description = "An area chart with icons"

function transformData(inputData) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    return Object.entries(inputData).map(([dateString, data]) => {
      const [year, monthNumber] = dateString.split('-');
      const monthIndex = parseInt(monthNumber, 10) - 1; // Convert to 0-based index
      
      return {
        month: monthNames[monthIndex] + ' ' + year,
        views: data.views,
        subscribers: data.subscribers,
        comments: data.comments,
      };
    });
  }

const chartConfig = {
    views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
    icon: TrendingDown,
  },
    subscribers: {
        label: "Subscribers",
        color: "hsl(var(--chart-2))",
        icon: TrendingUp,
    },
    comments: {
        label: "Comments",
        color: "hsl(var(--chart-3))",
        icon: TrendingDown,
    },
}

export function YoutubeMonthly() {
    const { data } = useYoutubeData();
    const chartData = transformData(data.monthly);
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Youtube Metrics</CardTitle>
        <CardDescription>
          Showing for the last 5 Years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-[250px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="views"
              type="natural"
              fill="var(--color-views)"
              fillOpacity={0.4}
              stroke="var(--color-views)"
              stackId="a"
            />
            <Area
              dataKey="subscribers"
              type="natural"
              fill="var(--color-subscribers)"
              fillOpacity={0.4}
              stroke="var(--color-subscribers)"
              stackId="b"
            />
            <Area
              dataKey="comments"
              type="natural"
              fill="var(--color-comments)"
              fillOpacity={0.4}
              stroke="var(--color-comments)"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          {/* <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  )
}
