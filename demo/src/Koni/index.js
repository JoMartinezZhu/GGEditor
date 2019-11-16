import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni, RegisterCommand, Tooltip } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { KoniContextMenu } from '../components/EditorContextMenu';
import { KoniToolbar } from '../components/EditorToolbar';
import { KoniItemPanel } from '../components/EditorItemPanel';
import { KoniDetailPanel } from '../components/EditorDetailPanel';
import KoniCustomNode from './shape/nodes/KoniCustomNode';
import styles from '../Flow/index.less';

class KoniPage extends React.PureComponent {
  componentDidMount() {
    // 这里可以拿到 graph
    const { graph } = this.graphNode;
    console.log('graph', graph);
  }

  render() {
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <KoniToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <KoniItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Koni ref={e => (this.graphNode = e)} className={styles.koni} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <KoniDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        {/* 禁止点击 + ( hover 出现) 这个符号 ，自动生成节点 Node*/}
        <RegisterCommand
          name="copyAdjacent"
          config={{
            enable() {
              return false;
            },
          }}
          extend="copyAdjacent"
        />
        <RegisterCommand name="undo" config={{ shortcutCodes: [] }} extend="undo" />
        <KoniCustomNode />
        <KoniContextMenu />
        {/* 自定义 Tooltip 的显示 options 的参数可以查看 @antv/g6/plugins/tool.tooltip */}
        <Tooltip
          options={{
            getTooltip({ item }) {
              if (item) {
                const model = item.getModel();
                return `
                  <div class="g6-tooltip" style="
                    position: absolute;
                    zIndex: 8;
                    transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    background-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0px 0px 10px #aeaeae;
                    border-radius: 3px;
                    color: rgb(87, 87, 87);
                    line-height: 20px;
                    padding: 10px;
                    max-width:200px;
                    height:auto;
                  ">
                    <p class="g6-tooltip-title" style="margin:0;">
                    ${model.text}
                    </p>
                  </div>
                `;
              }

              return null;
            },
          }}
        />
      </GGEditor>
    );
  }
}

export default KoniPage;
