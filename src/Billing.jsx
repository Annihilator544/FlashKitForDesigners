import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card";

const flashkit = [
    "1 user",
    "Branded assests"
]

const flashkitPro = [
    "1 users",
    "Non-Branded Assets",
    "AI Powered",
]

const flashkitSocial = [
    "1 users",
    "Non-Branded Assets",
    "Advanced AI assistance",
    "Engagement Quality Score",
    "Social Media Analytics",
]

function onClickButton(flashkit) {
    localStorage.setItem("flashkitPlan", flashkit);
    window.location.href = "/dashboard";
}

function Billing() {
  return (
    <div className="flex h-screen p-10 gap-10">
        <Card className="basis-1/3 flex flex-col">
            <CardHeader>
                <CardTitle>FlashKit Unlimited</CardTitle>
            </CardHeader>
            <CardContent>
            <div>
                {flashkit.map((flashkit, index) => (
                    <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                        {flashkit}
                        </p>
                    </div>
                    </div>
                ))}
            </div>
            </CardContent>
            <CardFooter className="mt-auto">
                {localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ? <Button className="w-full py-2 rounded-md" variant="outline" onClick={()=>window.location.href="/dashboard"}>Current Plan</Button> : 
                <Button className="w-full py-2 rounded-md" onClick={()=>onClickButton("FLASHKITUNLIMITED")}>Subscribe</Button>}
            </CardFooter>
        </Card>
        <Card className="basis-1/3 flex flex-col">
            <CardHeader>
                <CardTitle>FlashKit Pro</CardTitle>
            </CardHeader>
            <CardContent>
            <div>
                {flashkitPro.map((flashkitPro, index) => (
                    <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                        {flashkitPro}
                        </p>
                    </div>
                    </div>
                ))}
            </div>
            </CardContent>
            <CardFooter className="mt-auto">
            {localStorage.getItem("flashkitPlan") === "FLASHKITPRO" ? <Button className="w-full py-2 rounded-md" variant="outline" onClick={()=>window.location.href="/dashboard"}>Current Plan</Button> : 
                <Button className="w-full py-2 rounded-md" onClick={()=>onClickButton("FLASHKITPRO")}>Subscribe</Button>}
            </CardFooter>
        </Card>
        <Card className="basis-1/3 flex flex-col">
            <CardHeader>
                <CardTitle>FlashKit Social</CardTitle>
            </CardHeader>
            <CardContent>
            <div>
                {flashkitSocial.map((flashkitSocial, index) => (
                    <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                        {flashkitSocial}
                        </p>
                    </div>
                    </div>
                ))}
            </div>
            </CardContent>
            <CardFooter className="mt-auto">
            {localStorage.getItem("flashkitPlan") === "FLASHKITSOCIAL" ? <Button className="w-full py-2 rounded-md" variant="outline" onClick={()=>window.location.href="/dashboard"}>Current Plan</Button> : 
                <Button className="w-full py-2 rounded-md" onClick={()=>onClickButton("FLASHKITSOCIAL")}>Subscribe</Button>}
            </CardFooter>
        </Card>
    </div>
  );
}

export default Billing;