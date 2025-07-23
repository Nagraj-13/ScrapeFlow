import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodesHeader from "./NodesHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import  {NodeInput, NodeInputs} from "./NodeInputs";
import { NodeOutput, NodeOutputs } from "./NodeOutputs";

export const NodeComponent = memo((props: NodeProps)=>{
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type];

    return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
       <NodesHeader taskType={nodeData.type} />
       <NodeInputs>
            {task.inputs.map((input)=>(
                <NodeInput key={input.name} input={input} nodeId={props.id} />
            ))}
       </NodeInputs>
        <NodeOutputs>
            {task.outputs.map((output)=>(
                <NodeOutput key={output.name} output={output}  />
            ))}
       </NodeOutputs>
    </NodeCard>
})