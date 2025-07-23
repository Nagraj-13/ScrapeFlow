"use client";

import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";

export default function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();

  const onDelete = () => {
    setEdges((eds) => eds.filter((e) => e.id !== props.id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            zIndex: 10, // Ensure it is above the canvas
          }}
          className="nodrag nopan"
        >
          <Button
            onClick={onDelete}
            variant="outline"
            size="icon"
            className="w-6 h-6 rounded-full text-xs shadow"
          >
            ×
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
