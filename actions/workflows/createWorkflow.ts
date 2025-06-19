"use server"
import {  createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow'
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';
import { redirect } from 'next/navigation';
import { AppNode } from '@/types/appNode';
import { Edge } from '@xyflow/react';
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';

export async function CreateWorkflow(form: createWorkflowSchemaType){
    const {success, data} = createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form Data")
    }
    const {userId} = auth();

    if(!userId){
        throw new Error("Unauthenticated")
    }

    const initialWorkflow : {nodes: AppNode[], edges:Edge[]} = {
        nodes: [],
        edges: [],
    }
    initialWorkflow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

    const results = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            defination: JSON.stringify(initialWorkflow),
            ...data,
        },
    });

    if(!results){
        throw new Error("Failed to create workflow")
    }
    redirect(`/workflow/editor/${results.id}`);
}