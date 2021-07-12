<template>
  <svg width="100%"
       height="500"
       style="background-color:skyblue">

  </svg>
</template>
<script>
import { ref, toRefs, reactive, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";
// import d3tip from "d3-tip";
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
 *
 * 3: .data .select .selectAll .enter .exit等等 的return都是Selection类型的值
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
   *
   * treemap只继承了node;
   */
  const treemap = d3.hierarchy(data, (d) => d.children);
  treemap.x0 = 0;
  treemap.y0 = 0;
  let index = -1;
  treemap.eachBefore((n) => {
    n.y = ++index * 48 + 24;
    n.x = n.depth * 12;
  });
  // console.log(treemap);
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
  console.log(g);
  g.append("text")
    .attr("class", "node-text")
    .attr("x", 35)
    .attr("y", -5)
    .attr("fill", "white")
    .text((d) => {
      const date = new Date();
      const format = d3.timeFormat("%c");
      return `
     ${format(date)}
      `;
    });
  g.append("text")
    .attr("class", "node-text-name")
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
  g.append("circle")
    .attr("r", 3.5)
    .attr('cx', 10)
    .attr("stroke-width", 2.5)
    .attr("fill", "white")
    .style('cursor','pointer')
    .style("stroke", "green")
    .on('click',(e,{ data })=>{
      console.log(data.name)
    })

  /**
   * links: 返回的是连接父亲节点和子节点的数组对象;
   *
   *        source -> 父亲节点
   *        target -> 孩子节点
   */
  const linkArr = treemap.links();
  const link = d3.select("svg").selectAll(".trace-link").data(linkArr);
  link
    .enter()
    .insert("path", "g")
    .attr("class", "trace-link")
    .attr("fill", "rgba(0,0,0,0)")
    .attr("stroke", "rgba(0, 0, 0, 0.1)")
    .attr("stroke-width", 2)
    .attr("d", () => {
      const o = { x: treemap.y0 + 35, y: treemap.x0 };
      return diagonal({ source: o, target: o });
    })
    .transition()
    .duration(400)
    .attr("d", diagonal);
}
function diagonal(d) {
  return `M${d.source.x + 10} ${d.source.y + 5}
    L${d.source.x + 10} ${d.target.y - 30}
    L${d.target.x + 10} ${d.target.y - 20}
    L${d.target.x + 10} ${d.target.y - 5}`;
}
function updateDate() {
  const timer = setInterval(() => {
    d3.selectAll(".node-text").text((d) => {
      // d 是每一个节点node
      const date = new Date();
      const format = d3.timeFormat("%c");
      return `
     ${format(date)}
      `;
    });
  }, 1000);
  return timer;
}

/**
 * d3.tree: create a new tidy tree layout;
 */
function initTree() {}

export default {
  name: "D3",
  setup(prop) {
    let timer;
    onMounted(() => {
      initTree();
      initHierarchy();
      timer = updateDate();
      //   initTree();
      //   initD3();
      //   draw();
    });
    onUnmounted(() => {
      clearInterval(timer);
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
