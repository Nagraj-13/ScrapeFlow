"use client";

import ToolTipWrapper from "@/components/ToolTipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { WorkFlow } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteWorkFlowDialog from "./DeleteWorkFlowDialog";
const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};
const WorkFlowCard = ({ workflow }: { workflow: WorkFlow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px">
        <div
          className={cn(
            "w-10 h-10 flex rounded-full items-center justify-center",
            statusColors[workflow.status as WorkflowStatus]
          )}
        >
          {isDraft ? (
            <FileTextIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </div>
        <div className="">
          <h3 className="text-base font-bold text-muted-foreground flex items-center">
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className="flex items-center hover:underline"
            >
              {workflow.name}
            </Link>
            {isDraft && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full">
                Draft
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkFlowActions workflowName={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
};

function WorkFlowActions({workflowName, workflowId}:{workflowName: string, workflowId: string}) {
  const [showDeleteDilog, setShowDeleteDilog] = useState(false);
  return (
    <>
      <DeleteWorkFlowDialog open={showDeleteDilog} setOpen={setShowDeleteDilog} workflowName={workflowName} workflowId={workflowId}/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <ToolTipWrapper content={"More Actions"}>
                <div className="flex items-center justify-center w-full h-full">
                  <MoreVerticalIcon size={18} />
                </div>
              </ToolTipWrapper>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive flex items-center gap-2"
              onSelect={() => {
                setShowDeleteDilog((prev) => !prev);
              }}
            >
              <TrashIcon size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
    </>
  );
}

export default WorkFlowCard;
