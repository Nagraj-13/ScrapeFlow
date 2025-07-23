import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get HTML from Page",
    icon: (props:LucideProps) => (
        <CodeIcon className="stroke-pink-400" {...props} />
    ),
    isEntryPoint: true,
    inputs: [
      {
          name: "Web page",
          type: TaskParamType.BROWSER_INSTANCE,
          required:true
      }
    ],
    outputs:[
        {
            name: "Html",
            type: TaskParamType.STRING
        },
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ]
}