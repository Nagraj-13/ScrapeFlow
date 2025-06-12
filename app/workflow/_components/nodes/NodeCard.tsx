"use client"
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import { setConfig } from 'next/config';
import React, { ReactNode } from 'react'

function NodeCard({children, nodeId, isSelected}: {children: ReactNode, nodeId:string, isSelected: boolean}) {
  const {getNode, setCenter} =useReactFlow();
  return (
    <div  
    onDoubleClick={()=>{
      const node = getNode(nodeId);
      if(!node) return;
      const {position, measured} = node;
      if(!position || !measured) return;
      const {width, height} = measured;
      const x= position.x / 2;
      const y= position.y / 2;
      if(x === undefined||y === undefined)return;
      setCenter(x,y,{
        zoom : 1,
        duration: 500

      });
    }}
    className={cn('rounded-md cursor-point bg-background border-2 border-separate w-auto text-sx gap-1 flex flex-col', isSelected && 'border-primary')}>
      {children}
    </div>
  )
}

export default NodeCard
