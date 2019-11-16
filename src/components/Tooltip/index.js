import React from 'react';
import G6 from '@antv/g6';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';

require('@antv/g6/build/plugin.tool.tooltip');
// require('@antv/g6/plugins/tool.tooltip');

const G6Tooltip = G6.Plugins['tool.tooltip'];

class Tooltip extends React.Component {
  tooltip = null;

  get currentPage() {
    const { editor } = this.props;
    return editor.getCurrentPage();
  }

  constructor(props) {
    super(props);
    this.bindEvent();
  }

  componentDidMount() {
    this.init();
    this.bindPage();
  }

  init() {
    const { options } = this.props;
    this.tooltip = new G6Tooltip({
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
                max-width:100px;
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
      ...options,
    });
  }

  bindPage() {
    if (!this.tooltip || !this.currentPage) {
      return;
    }

    const graph = this.currentPage.getGraph();

    this.tooltip.graph = graph;

    this.tooltip.init();
  }

  bindEvent() {
    const { onAfterAddPage } = this.props;

    onAfterAddPage(() => {
      this.bindPage();
    });
  }

  render() {
    return null;
  }
}

export default withGGEditorContext(Tooltip);
