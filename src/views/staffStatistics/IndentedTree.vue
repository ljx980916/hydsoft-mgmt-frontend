<template>
  <div class="relative">
    <div ref="treeContainer">
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
const bgColorMap = new Map([
  [1 , '#6587F6'],
  [2 , '#E8ECFF'],
  [3 , '#F6F8FC'],
  [4 , '#FFFFFF']
])

export default defineComponent({
  name: 'IndentedTree',
  props: {
    treeData: {
      type: Object,
      required: true
    },
    width : {
      type : Number,
      default : 300
    },
    scale : {
      type : Number,
      default : 1
    },
    nodeName : {
      type : String,
      default : 'name'
    }
  },
  mounted() {
    this.createTree();
  },
  updated(){
    this.createTree();
  },
  methods: {
    createTree() {
      let _this=this
      // 禁用拖拽行为
      var ElementView = joint.dia.ElementView.extend({
        pointerdown: function () { },
        pointermove: function () { },
        pointerup: function () { }
    });
    var LinkView = joint.dia.LinkView.extend({
        addVertex: function (evt, x, y) { },
        removeVertex: function (endType) { },
        pointerdown: function (evt, x, y) { }
    });
      const graph = new joint.dia.Graph();
      
      let currentY = 0;

      function calculatePosition(node, level=0) {
        let divideLen = (''+node[_this.nodeName]).split(/-/gi).length
        let x = 0
        x = level * 14 + (8* (divideLen-1))

        // if(divideLen === 2){
        //   x = level * 41
        // }else if(divideLen===3 ){
        //   x = level * 51
        // }else if(divideLen===4 ){
        //   x = level * 61
        // }else{
        //  x = level * 50 + ((divideLen===3?15:20) * (divideLen-1))
        // }
        node.x = x
        node.y = currentY;
        currentY += 40;
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            calculatePosition(
              node.children[i],
              level + 1
            );
          }
        }
      }
      // Clone the tree data to avoid modifying the original data
      const clonedTree = JSON.parse(JSON.stringify(this.treeData));

      // Calculate positions for each node in the tree
      calculatePosition(clonedTree, 0, 0);
      const paper = new joint.dia.Paper({
        el: this.$refs.treeContainer,
        model: graph,
        width: this.width,
        height: currentY*this.scale,
        gridSize: 1,
        elementView: ElementView,
        linkView: LinkView
      });
      paper.scale(this.scale)
      function createNode(node) {
        let divideLen = (''+node[_this.nodeName]).split(/-/gi).length
        const rect = new joint.shapes.standard.Rectangle({
          position: { x: node.x, y: node.y },
          size: { width: 60+((divideLen-1)*38), height: 32 },
          attrs: {
            body: { 
                    fill: bgColorMap.get(divideLen) || 'lightblue', 
                    stroke: '#E0E6F1',//边框颜色
                    'stroke-width': 1,//边框大小 
                  },
            label: { text: node[_this.nodeName],fill : divideLen===1?"#F5ECFE":"#778092",'font-size': 12,textVerticalAnchor: '0.4em' },
          }
        });
        graph.addCell(rect);

        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = createNode(node.children[i]);

            const link = new joint.shapes.standard.Link({
              source: { id: rect.id },
              target: { id: child.id },
              router: { name: 'manhattan' }
            });
            link.source(rect, {
                selector: 'body',
                anchor: {
                    name: 'bottomLeft',
                    args: {
                        dx: 10,
                        dy: 0
                    }
                }
            });
            link.attr({
                line: {
                    stroke: '#E0E6F1',
                    strokeWidth: 1,
                    sourceMarker: {
                        'type': 'path',
                        'stroke': 'transparent',
                        'fill': 'transparent',
                        'd': 'M 10 -5 0 0 10 5 Z'
                    },
                    targetMarker: {
                        'type': 'path',
                        'stroke': 'transparent',
                        'fill': 'transparent',
                        'd': 'M 10 -5 0 0 10 5 Z'
                    }
                }
            });
            graph.addCell(link);
          }
        }

        return rect;
      }

      createNode(clonedTree);
    }
  }
})
</script>

<style scoped>
.relative{
  position: relative;
}
.mask {
  position:absolute;
  left: 0;
  top:0;
  right:0;
  bottom:0;
  z-index: 1;
}
</style>
