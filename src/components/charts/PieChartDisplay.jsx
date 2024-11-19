import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { useYoutubeData } from "store/use-youtube-data"

export const description = "A donut chart with text"

const chartConfig = {
  views: {
    label: "views",
  },
  year2019: {
    label: "2019",
    color: "hsl(var(--chart-1))",
  },
  year2020: {
    label: "2020",
    color: "hsl(var(--chart-2))",
  },
  year2021: {
    label: "2021",
    color: "hsl(var(--chart-3))",
  },
  year2022: {
    label: "2022",
    color: "hsl(var(--chart-4))",
  },
  
  year2023: {
    label: "2023",
    color: "hsl(var(--chart-1))",
  },
  year2024: {
    label: "2024",
    color: "hsl(var(--chart-5))",
  },
}

function PieChartDisplay() {
  
  const { data } = useYoutubeData();
  function transformData(inputData) {
  
    return Object.entries(inputData).map(([dateString, data]) => {
      const year = dateString;
      return {
        year: year,
        views: data.views,
        fill: `var(--color-year${year})`,
      };
    });
  }
  const chartData = transformData(data.yearly);
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.views, 0)
  }, [chartData])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Engagement Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="views"
              nameKey="year"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Views
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total views for the last 5 years
        </div>
      </CardFooter>
    </Card>
  )
}

export default PieChartDisplay