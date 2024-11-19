import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { LucideHeart, LucideMessageSquare, LucideSend, LucideTrendingUp } from "lucide-react"

export function InstagramContentCarousel({CarouselItems}) {
  return (
    <Card>
        <Carousel
        opts={{
            align: "start",
        }}
        className="w-full p-5"
        >
            <CardHeader className="flex-row justify-between">
                <CardTitle className="text-lg">
                    Top Content By Reach
                </CardTitle>
                <div>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </CardHeader>
        <CarouselContent>
            {CarouselItems.map((carouselItem) => (
            <CarouselItem key={carouselItem.id} className="md:basis-1/2 lg:basis-1/5">
                <div className="p-1">
                <Card className=" overflow-hidden">
                    <CardContent className="grid grid-rows-2 aspect-square p-0">
                        <div className=" bg-cover bg-no-repeat overflow-hidden">
                            <img src={carouselItem.media_url} alt="placeholder" className="" />
                        </div>
                        <div className="p-2 flex flex-col justify-between">
                            <p className=" text-sm text-ellipsis font-semibold">{carouselItem.caption}</p>
                            <p className="text-secondary text-sm">{carouselItem.timestamp.split('T')[0]}</p>
                            <div className="grid grid-cols-2">
                                <div className="flex gap-1"><LucideHeart className="h-4 w-4 my-auto"/> <p>{carouselItem.like_count}</p></div>
                                <div className="flex gap-1"><LucideTrendingUp className="h-4 w-4 my-auto"/> <p>1.3k</p></div>
                                <div className="flex gap-1"><LucideMessageSquare className="h-4 w-4 my-auto"/> <p>{carouselItem.comments_count}</p></div>
                                <div className="flex gap-1"><LucideSend className="h-4 w-4 my-auto"/> <p>435</p></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    </Card>
  )
}
