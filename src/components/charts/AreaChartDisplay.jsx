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

export const description = "An area chart with icons"

const chartData = [
  { month: "January", Instagram: 186, TikTok: 80 , Twitter: 100, Youtube: 50, LinkedIn: 30},
  { month: "February", Instagram: 305, TikTok: 200 , Twitter: 150, Youtube: 100, LinkedIn: 50},
  { month: "March", Instagram: 237, TikTok: 120 , Twitter: 100, Youtube: 80, LinkedIn: 40},
  { month: "April", Instagram: 73, TikTok: 190 , Twitter: 120, Youtube: 90, LinkedIn: 60},
  { month: "May", Instagram: 209, TikTok: 130 , Twitter: 110, Youtube: 70, LinkedIn: 20},
  { month: "June", Instagram: 214, TikTok: 140 , Twitter: 130, Youtube: 80, LinkedIn: 40},
]

const chartConfig = {
  Instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-1))",
    icon: TrendingDown,
  },
  TikTok: {
    label: "TikTok",
    color: "hsl(var(--chart-2))",
    icon: TrendingUp,
  },
  Twitter: {
    label: "Twitter",
    color: "hsl(var(--chart-3))",
    icon: TrendingDown,
  },
  Youtube: {
    label: "Youtube",
    color: "hsl(var(--chart-4))",
    icon: TrendingUp,
  },
  LinkedIn:{
    label: "LinkedIn",
    color: "hsl(var(--chart-5))",
    icon: TrendingDown,
  }
}

export function AreaChartDisplay() {
  return (
    <Card className="flex-1 ">
      <CardHeader>
        <CardTitle>Area Chart - Icons</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-6">
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
              dataKey="TikTok"
              type="natural"
              fill="var(--color-TikTok)"
              fillOpacity={0.4}
              stroke="var(--color-TikTok)"
              stackId="a"
            />
            <Area
              dataKey="Instagram"
              type="natural"
              fill="var(--color-Instagram)"
              fillOpacity={0.4}
              stroke="var(--color-Instagram)"
              stackId="a"
            />
            <Area
              dataKey="Twitter"
              type="natural"
              fill="var(--color-Twitter)"
              fillOpacity={0.4}
              stroke="var(--color-Twitter)"
              stackId="a"
            />
            <Area
              dataKey="Youtube"
              type="natural"
              fill="var(--color-Youtube)"
              fillOpacity={0.4}
              stroke="var(--color-Youtube)"
              stackId="a"
            />
            <Area
              dataKey="LinkedIn"
              type="natural"
              fill="var(--color-LinkedIn)"
              fillOpacity={0.4}
              stroke="var(--color-LinkedIn)"
              stackId="a"
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
