

import { DeleteWrokflow } from '@/actions/workflows/deleteWorkflow';
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { AlertDialogCancel, AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { useMutation } from '@tanstack/react-query';
import React, {useState} from 'react'
import { toast } from 'sonner';

interface Props {
    open: boolean,
    setOpen: (open:boolean) => void;
    workflowName: String,
    workflowId: string
}
function DeleteWorkFlowDialog({open,setOpen, workflowName, workflowId}: Props) {
    const [confirmText, setConfirmText] = useState("")
    const deleteMutation = useMutation({
        mutationFn: DeleteWrokflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully",{id:workflowId} )
            setConfirmText("")
        },
        onError: () => {
            toast.error("Something went wrong",{id:workflowId} )
        }
    })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure ?    
                </AlertDialogTitle> 
                <AlertDialogDescription>
                    If you delete this workflow you won't be able to recover import PropTypes from 'prop-types'
                    <div className='flex flex-col py-4 gap-2'>
                        <p> If you are sure, enter <b>{workflowName}</b></p>
                        <Input 
                            value={confirmText}
                            onChange={(e)=> setConfirmText(e.target.value)}
                        />
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setConfirmText("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText!==workflowName || deleteMutation.isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    onClick={()=>{
                        toast.loading("Deleting workflow", {id: workflowId});
                        deleteMutation.mutate(workflowId)
                    }}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkFlowDialog
