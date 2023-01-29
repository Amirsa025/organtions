import React, { useState } from "react";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";

const style = {
    collapsed: {
        display: "none"
    },
    expanded: {
        display: "block",
    },
    buttonStyle: {
        display:"flex",
        border:"none",
        AlignItems: "center",
        justifyContent:"center",
        borderRadius :"50%"
    }
};

function Collapse(props:any) {
    const [isCollapsed, setCollapsed] = useState(props.collapsed);
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    return (
        <div>
                <div  style={{display:'flex',alignItems:"center" ,justifyContent: 'center', padding:" 1rem 0"}}>
                    <button style={style.buttonStyle} onClick={() => toggleCollapse()}>
                        {isCollapsed ?
                            <div style={{width:'1.5rem',height:'1.5rem' , color : 'orange'}}>
                                <ArrowDownIcon/>
                            </div>:
                            <div style={{width:'1.5rem',height:'1.5rem' , color : 'orange'}}>
                                <ArrowUpIcon/>
                            </div>}
                    </button>
                </div>
            <div
                className="collapse-content"
                style={isCollapsed ? style.collapsed : style.expanded}
                aria-expanded={isCollapsed}
            >
                {props.children}
            </div>
        </div>
    );
}

export default Collapse;
