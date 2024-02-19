import { Tree, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview';
import { DndProvider } from 'react-dnd';
import initialData from './sample-default.json';
import { useState } from 'react';
import TypeIcon from './TypeIcon';

function MyTreeView() {
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData: any) => setTreeData(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div className="flex items-center h-5 text-[12px] my-1" style={{ marginLeft: depth * 10 }} onClick={onToggle}>
            {node.droppable && (
              <div className="flex items-center">
                {isOpen ? (
                  <div className="material-symbols-outlined text-[20px]">keyboard_arrow_down</div>
                ) : (
                  <div className="material-symbols-outlined text-[20px]">keyboard_arrow_right</div>
                )}
              </div>
            )}
            <TypeIcon droppable={node.droppable} isOpen={isOpen} fileType={node.data?.fileType} />
            <div className="px-1">{node.text}</div>
          </div>
        )}
      />
    </DndProvider>
  );
}

export default MyTreeView;
