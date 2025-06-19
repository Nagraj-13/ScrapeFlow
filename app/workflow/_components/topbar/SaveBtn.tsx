"use client"
import { UpdateWorkFlow } from '@/actions/workflows/updateWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function SaveBtn({workflowId}:{workflowId:string}) {
    const {toObject} = useReactFlow();
    const saveMutation = useMutation({
        mutationFn: UpdateWorkFlow,
        onSuccess: ()=> {
            toast.success("Workflow saved Successfully", {id:"saved-workflow"})
        },
        onError: ()=> {
            toast.error("Something went wrong",{id:"saved-workflow"})
        }
    })
  return (
   <Button
        variant="outline"
        disabled={saveMutation.isPending}
        className='flex items-center gap-2'
        onClick={()=> {
            const workflowDefination = JSON.stringify(toObject());
            toast.loading("Saving workflow...", {id:"saved-workflow"})
            saveMutation.mutate({
                id: workflowId,
                defination:workflowDefination
            })
        }
        }
   >
        <CheckIcon size={16} className='stroke-primary-400' />
        Save
   </Button>
  )
}

export default SaveBtn
