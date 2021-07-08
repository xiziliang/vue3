<template>
  <svg width="100%"
       height="500"
       style="background-color:skyblue">
  </svg>
</template>
<script>
import { ref, toRefs, reactive, onMounted } from "vue";
import * as d3 from "d3";
import d3tip from "d3-tip";
const data = {
  name: "Eve",
  children: [
    {
      name: "Cain",
    },
    {
      name: "Seth",
      children: [
        {
          name: "Enos",
        },
        {
          name: "Noam",
        },
      ],
    },
    {
      name: "Abel",
    },
    {
      name: "Awan",
      children: [
        {
          name: "Enoch",
        },
      ],
    },
    {
      name: "Azura",
    },
  ],
};

/**
 * 坑1: d3tip添加class,需要在全局css样式中去添加样式.
 *
 * 坑2: 必须要单独放在事件的回调中,和别的事件一起使用位置会错乱
 */
function initD3tip() {
  const tips = d3tip()
    .attr("class", "tips")
    .offset([-4, 96])
    .direction((d) => {
      return "n";
    })
    .html((...params) => {
      console.log(params);
      return "我是svg的tips";
    });
  const svg = d3.select(".box").append("svg");
  const tip = d3
    .select(".box")
    .append("div")
    .classed("ishide", true)
    .classed("tips", true)
    .attr("color", "#E54C17")
    .text(() => "svg的tips");

  svg
    .attr("class", "demo")
    .attr("width", 200)
    .attr("height", 200)
    .attr("style", "background-color:red")
    .on("mouseover", () => {
      svg.classed("hover", true);
      tip.classed("ishide", false);
    })
    .on("mouseout", () => {
      svg.classed("hover", false);
      tip.classed("ishide", true);
    });
  return {
    svg,
  };
}

/**
 * data 不采用enter和exit则选择的是和data相对应的dom元素.
 *
 * enter 选取的是dom元素比data数据少的差值.
 *
 * exit 选取得的是dom元素比data数据多的差值.
 */
function draw() {
  const data = [1, 2, 3, 4, 5];
  const line = d3.select("svg").selectAll(".trace-node").data(data);
  line
    .attr("x", 20)
    .attr("y", 30)
    .attr("fill", "skyblue")
    .classed("ok", true)
    .text("我是div")
    .call((...params) => {
      console.log(
        "call",
        params[0]._groups[0].find((x) => x)
      );
    });
  line
    .enter()
    .append("text")
    .attr("class", "trace-node")
    .attr("x", (d) => {
      return 40 * d;
    })
    .attr("y", (d) => {
      return 30;
    })
    .attr("stroke", "white")
    .attr("background-color", "skyblue")
    .text((d) => "你好" + d);
}

/**
 * d3.hierarchy: 自定义的层级布局;
 */
function initHierarchy() {
  /**
   * d3.hierarchy: {Node} -> 返回的是处理后的根节点的map;是一种NODE类型的对象;
   *
   * {Node} 可以通过遍历的方法对所有的节点进行添加属性;
   */
  const treemap = d3.hierarchy(data, (d) => d.children);
  treemap.x0 = 0;
  treemap.y0 = 0;
  let index = -1;
  treemap.eachBefore((n) => {
    n.y = ++index * 48 + 24;
    n.x = n.depth * 12;
  });
  console.log(treemap);
  /**descendants：获取所有后代并存放在一个数组中, 返回值仅仅是一个数组*/
  const nodes = treemap.descendants();

  /**ancestors: 获取所有的父亲节点（包括直接和间接） */
  const parent = nodes[6].ancestors().sort((a, b) => a.depth - b.depth);

  const node = d3.select("svg").selectAll(".tract-node").data(nodes);
  const g = node
    .enter()
    .append("g")
    .style("opacity", 0)
    .attr("class", "trace-node")
    .attr("transform", `translate(${treemap.x0},${treemap.y0})`);
  g.append("text")
    .attr("class", "node-text")
    .attr("x", 35)
    .attr("y", -5)
    .attr("fill", "white")
    .html(() => {
      const date = new Date();
      return `
     ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}
      `;
    });
  g.append("text")
    .attr("class", "node-text")
    .attr("x", 35)
    .attr("y", 16)
    .attr("fill", "white")
    .html((node) => {
      return `
     ${node.data.name}
      `;
    });
  g.append("rect")
    .attr("height", 42)
    .attr("ry", 2)
    .attr("rx", 2)
    .attr("y", -22)
    .attr("x", 20)
    .attr("width", "100%")
    .attr("fill", "rgba(0,0,0,0)");
  g.transition()
    .duration(400)
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .style("opacity", 1);

  /**
   * links: 返回的是连接父亲节点和子节点的数组对象;
   *
   *        source -> 父亲节点
   *        target -> 孩子节点
   */
  const links = treemap.links();
}

/**
 * d3.tree: create a new tidy tree layout;
 */
function initTree() {
  //   const svg = d3.select("svg");
}
export default {
  name: "D3",
  setup(prop) {
    onMounted(() => {
      initHierarchy();
      //   initTree();
      //   initD3();
      //   draw();
    });
    return {};
  },
};
</script>
<style>
.hover {
  background-color: #ccc;
}
.ishide {
  display: none !important;
}

.trace-node rect:hover {
  fill: rgba(0, 0, 0, 0.05);
}
</style>
