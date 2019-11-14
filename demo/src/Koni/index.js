import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni, RegisterCommand } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { KoniContextMenu } from '../components/EditorContextMenu';
import { KoniToolbar } from '../components/EditorToolbar';
import { KoniItemPanel } from '../components/EditorItemPanel';
import { KoniDetailPanel } from '../components/EditorDetailPanel';
import KoniCustomNode from './shape/nodes/KoniCustomNode';
import styles from '../Flow/index.less';

class KoniPage extends React.PureComponent {
  componentDidMount() {
    const { graph } = this.graphNode;
    graph.on('beforechange', function(ev) {
      // console.log('beforechange', ev);
    });
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
        {/* <RegisterCommand
          name="copyAdjacent"
          config={{
            enable() {
              return false;
            },
          }}
          extend="copyAdjacent"
        /> */}
        {/* <RegisterCommand name="delete" config={{ shortcutCodes: [] }} extend="delete" /> */}
        <RegisterCommand name="undo" config={{ shortcutCodes: [] }} extend="undo" />
        <KoniCustomNode />
        <KoniContextMenu />
      </GGEditor>
    );
  }
}

export default KoniPage;
