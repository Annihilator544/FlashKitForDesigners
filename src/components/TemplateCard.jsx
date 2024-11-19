import { useJsonData } from "store/use-json-data";
import { Card, CardContent } from "./ui/card";

function TemplateCard({ url , jsonURL}){
    const { setData } = useJsonData();
    async function ParseJson(jsonURL){
        await fetch(jsonURL).then(response => response.json()).then(data => setData(data));
        window.location.href = `/canvas?json=TRUE`;
    }
    return (
        <button onClick={() => ParseJson(jsonURL)}>
            <Card className=" overflow-hidden min-w-28 max-w-40">
                <CardContent className="p-0">
                    <img src={url} alt="img" className="w-full"/>
                </CardContent>
            </Card>
        </button>
    )
}

export default TemplateCard;