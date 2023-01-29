import React from 'react';
import { NodeType } from '../../types';
import {ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
	node: NodeType;
	handleContextMenuClick?: (key?: string) => unknown;
}
function Node({node ,handleContextMenuClick}: Props) {
	return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
			<ContextMenuTriggerEx
        id={node.key}
        title={node.title}
       />
      <ContextMenuEx  id={node.key}>
        <ContextMenuItemEx handleClick={()=>handleContextMenuClick('add')}  title={'افزودن زیرشاخه'}/>
        <ContextMenuItemEx handleClick={()=>handleContextMenuClick('cut')}  title={'برش'}/>
        <ContextMenuItemEx handleClick={()=>handleContextMenuClick('paste')}  title={'چسباندن'}/>
        <ContextMenuItemEx handleClick={()=>handleContextMenuClick('delete')} title={'حذف'}/>
      </ContextMenuEx>
    </div>
  );
}
export default React.memo(Node)
