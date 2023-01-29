import React, {useEffect, useState} from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import {getNodes} from "./transportLayer";
import {NodeType} from "./types";

function App() {
    const [selectedItem, setSelectedItem] = useState(null);
    let [parentKey] = useState(null);
    const [showEdit, setShowEdit] = useState(true);
    const [treeData, setTreeData] = useState([]);

    let resultArr: NodeType[]
    useEffect(() => {
        fetchTreeData().then()
    }, [])
    //functions
    const fetchTreeData = async () => {
        const result = await getNodes();
        setTreeData(result);
    }
    const onSelect = (selectedKeys: React.Key[]) => {
        getParentKey(selectedKeys[0], treeData)
    };
    const findNode = (node: NodeType, level: any) => {
        if (node.children) {
            node.children.forEach((nodeKey) => {
                // @ts-ignore
                if (nodeKey.key === level) {
                    resultArr = node.children
                }
                findNode(nodeKey, level);
            })
        }
        return resultArr;
    }
    const getParentKey = (key: any, tree: string | any[]): unknown => {
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node?.children) {
                if (node?.children?.every((item: any) => item?.parentKey === key)) {
                    parentKey = node?.key;
                } else if (getParentKey(key, node?.children)) {
                    parentKey = getParentKey(key, node?.children);
                }
            }
        }
        return parentKey
    };
    const handleContextMenuClick = (actionKey ?: string) => {
        switch (actionKey) {
            case 'add':
                return alert('add')
            case 'cut':
                return alert('cut')
            case 'paste':
                return alert('paste')
            case 'delete':
                return handleUpdateTree(treeData)
            default:
                break
        }
    }
    const handleUpdateTree = (tree: NodeType[]) => {
        const rootNode = tree
        findNode(tree[0], parentKey)
        if (rootNode[0].key === parentKey) {
            return console.log('root node :', rootNode[0].key)
        } else {
            console.log('child node', resultArr[0].key)
        }
        const findAndUpdateTree = (array: NodeType[], id: any) => {
            array.map((item, index) => {
                if (item.children.length === 0 && item.key === id) {
                    array.splice(index, 1)
                } else findAndUpdateTree(item.children || [], id)
            })
            return array
        }

        const rootNodes = [...tree]
        const FindAndDeleteTree = findAndUpdateTree(rootNodes, resultArr[0].key)
        setTreeData(FindAndDeleteTree)
    }
    const handleUpdateNode = (key: string, data: any) => {

    }
    return (
        <AppContext.Provider
            value={{
                treeData,
                updateTreeData: handleUpdateTree
            }}
        >
            <div className="App">
                <Sidebar>
                    <ExtendedTree onSelect={onSelect} handleContextMenuClick={handleContextMenuClick}/>
                </Sidebar>
                {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode}/>}
            </div>
        </AppContext.Provider>
    );
}

export default App;
