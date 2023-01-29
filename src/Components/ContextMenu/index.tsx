// @ts-nocheck
import React from 'react';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';

export function ContextMenuTriggerEx({ id, title }) {
    return (<ContextMenuTrigger

        id={id}
    >
        {title}
    </ContextMenuTrigger>)
}

export function ContextMenuEx({ id, children }) {
    return (<ContextMenu
        appendTo="body"
        animation="zoom"
        hideOnLeave={false}
        id={id}>
        {children}
    </ContextMenu>)
}

export function ContextMenuItemEx({ title ,handleClick}) {
    return (
        <ContextMenuItem
            preventClose={true}

            onClick={handleClick}>{title}</ContextMenuItem>
    );
}
// const handleClick = ()=>{
//         console.log("clik")
// }
