import React, {useContext, useMemo, useRef, useState} from 'react';
import AppContext from '../../appContext';
import {NodeType} from '../../types';
import Node from './node';
import SearchResult from './searchResult';
import {Input, Tree} from 'antd';
import Collapse from "../Collapse";
const {Search} = Input;
interface Props {
    handleContextMenuClick: (key: string) => void;
    onSelect: (selectedKeys: React.Key[]) => unknown;
    resultKey?: any
}
const TreeExtended: React.FC<Props> = ({handleContextMenuClick, onSelect}) => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [SearchKeys, setSearchKeys] = React.useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(false);
    const searchedKeyword = useRef(null);
    const [SearchNodeStore, setSearchNodeStore] = useState([]);
    const [searchResultVisible, setSearchResultVisible] = useState(true);
    const {treeData} = useContext(AppContext);
    // @ts-ignore
    const onExpand = (newExpandedKeys?: any) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(true);
    };
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchKeys(e.target.value);
    };
    let resultSearch: any = null;
    const searchForTitle=(element: NodeType, matchingTitle: string)=> {
        if (element.title.includes(matchingTitle)) {
            return element;
        } else if (element.children != null) {
            for (let i = 0; resultSearch == null && i < element.children.length; i++) {
                resultSearch = searchForTitle(element.children[i], matchingTitle);
            }
            return resultSearch;
        }
        return null;
    }
    const handlePressEnter = () => {
        // @ts-ignore
        const findNodeSearch = searchForTitle(treeData[0], SearchKeys);
        if (findNodeSearch === null) {
            alert("عبارتی که جستجو کرده اید وجود ندارد!")
            setSearchNodeStore([...findNodeSearch])
        } else {
            setSearchNodeStore([...SearchNodeStore, findNodeSearch])
            setSearchResultVisible(true)
        }

    }
    const titleRenderer = (node?: NodeType,) => {
        return <Node node={node} handleContextMenuClick={handleContextMenuClick}/>
    }
    return (
        <div className='tree-wrap'>
            <Search style={{marginBottom: 8}} ref={searchedKeyword}
                    value={SearchKeys} placeholder="جستجو" onChange={handleSearchInputChange}
                    onPressEnter={handlePressEnter}/>
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                treeData={treeData}
                titleRender={titleRenderer}
            />
            {searchResultVisible &&
                <div style={{marginTop: '30rem', overflow: 'auto'}}>
                    <Collapse>
                        <SearchResult SearchItem={SearchNodeStore}/>
                    </Collapse>
                </div>

            }
        </div>
    );
};

export default TreeExtended;
