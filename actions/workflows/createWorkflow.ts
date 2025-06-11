"use server"
import {  createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow'
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';
import { redirect } from 'next/navigation';

export async function CreateWorkflow(form: createWorkflowSchemaType){
    const {success, data} = createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form Data")
    }
    const {userId} = auth();

    if(!userId){
        throw new Error("Unauthenticated")
    }

    const results = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            defination: "TODO",
            ...data,
        },
    });

    if(!results){
        throw new Error("Failed to create workflow")
    }
    redirect(`/workflow/editor/${results.id}`);
}