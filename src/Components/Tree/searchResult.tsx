import React from 'react';
import { NodeType } from '../../types';
import OrgchartIcon from "../SvgIcons/orgchart";
interface Props {
	SearchItem: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ SearchItem }: Props) {
	// @ts-ignore
	let uniqSearch = [...new Set(SearchItem)]
	return <div  className='search-result' style={{height: 200, overflow: 'auto',padding:'1rem'}}>
		{uniqSearch.map(item => (
			<div key={item.key}>
					<h5 style={{display:'flex',alignItems:"center" ,justifyContent: 'space-between'}}>
						{item.title}
						<div  style={{width:'1.5rem',height:'1.5rem' , color : 'orange'}}>
							<OrgchartIcon/>
						</div>
					</h5>
			</div>
		))
		}
	</div>
}
export default SearchResult;
