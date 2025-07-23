import { GetWorkFlowsForUser } from '@/actions/workflows/getWorkFlowsForUsers'
import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitFor'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import React, { Suspense } from 'react'
import { AlertCircle, InboxIcon } from 'lucide-react'
import CreateWorkFlowDialog from './_components/CreateWorkFlowDialog'
import WorkFlowCard from './_components/WorkFlowCard'

function page() {
  return (
    <div className='flex-1 flex flex-col h-full'>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>Work Flows</h1>
                <p className='text-muted-foreground'>Manage your workflow</p>
            </div>
            <CreateWorkFlowDialog  />
        </div>

        <div className='h-full py-6 '>
            <Suspense fallback={<UserWorkFlowSkeleton/>}> 
                <UserWorkFlows/>
            </Suspense>
        </div>
        
    </div>
  )
}

function UserWorkFlowSkeleton(){
    return (
        <div className='space-y-2'>
            {[1,2,3,4].map((i)=>(
                <Skeleton key={i} className='h-32 w-full'/>
            ))}
        </div>
    )
}

async function UserWorkFlows(){
    const workFlows = await GetWorkFlowsForUser();
    if(!workFlows){
        <Alert>
            <AlertCircle/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something went wrong. Please try again
            </AlertDescription>
        </Alert>
    }

    if(workFlows.length === 0){
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className='stroke-primary' />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className="font-bold">No Workflow created yet</p>
                    <p className="text-sm text-muted-foreground">
                        Click the button below to create your first workflow.
                    </p>
                </div>
                <CreateWorkFlowDialog triggerText="Create your first Workflow" />
            </div>
        )
    }
    return <div className='grid grid-cols-1 gaqp-4'>

        {
            workFlows.map((workflow, index)=>(
                <WorkFlowCard key={index} workflow={workflow}/>
            ))
        }
    </div>
}

export default page
