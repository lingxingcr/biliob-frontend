var parse = require("date-fns/parse");
var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawGraph(data) {
  var datedelta =
    parse(data.data[data.data.length - 1].datetime) - parse(data.datetime);
  if (datedelta < 60 * 60 * 24 * 30 * 1000) {
    data.data.push({
      view: 0,
      danmaku: 0,
      like: 0,
      dislike: 0,
      share: 0,
      favorite: 0,
      coin: 0,
      datetime: format(
        convertDateToUTC(new Date(data.datetime)),
        "YYYY-MM-DD HH:mm"
      )
    });
  }
  let graph = {
    title: {
      left: "center",
      top: "-5px",
      subtext: "各项指标总量"
    },
    legend: {
      data: ["播放", "弹幕", "收藏", "分享", "硬币", "点赞", "差评"],
      bottom: "5px"
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter"
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "5vmax"
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    grid: {
      top: "27vmax",
      bottom: "70vmax",
      left: "40px",
      right: "60px"
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false
      },
      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              "日期：" +
              format(
                convertDateToUTC(new Date(params.value)),
                "YYYY-MM-DD HH:mm"
              )
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        name: "其他指标",
        min: "dataMin",
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 10000) + "万";
            }
          }
        }
      },
      {
        type: "value",
        name: "播放量",
        splitLine: {
          show: false
        },
        min: "dataMin",
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 10000) + "万";
            }
          }
        }
      }
    ],
    dataset: {
      source: data.data.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      })
    },
    series: [
      {
        type: "line",
        dimensions: ["datetime", "view"],
        name: "播放",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 1
      },
      {
        type: "line",
        dimensions: ["datetime", "danmaku"],
        name: "弹幕",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["datetime", "coin"],
        name: "硬币",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["datetime", "favorite"],
        name: "收藏",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["datetime", "share"],
        name: "分享",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["datetime", "like"],
        name: "点赞",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["datetime", "dislike"],
        name: "差评",
        smooth: true,
        showSymbol: false,
        yAxisIndex: 0
      }
    ]
  };
  return graph;
}
export default drawGraph;
