function drawGraph (data) {
  let graph = {
    title: [{
      left: 'center',
      subtext: '好评率'
      // text: data.title
    }, {
      left: '25%',
      top: 'center',
      textAlign: 'center',
      text: '点赞/差评',
      color: '#123151'
      // text: data.title
    }, {
      left: '75%',
      top: 'center',
      textAlign: 'center',
      text: '点赞/播放',
      color: '#123151'
      // text: data.title
    }],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      name: '点赞/差评',
      radius: ['50%', '70%'],
      center: ['25%', '50%'],
      data: [
        {value: data.data[0].like, name: '点赞'},
        {value: data.data[0].dislike, name: '差评'}
      ]
    }, {
      type: 'pie',
      name: '点赞/播放',
      radius: ['50%', '70%'],
      center: ['75%', '50%'],
      data: [
        {value: data.data[0].like, name: '点赞'},
        {value: data.data[0].view, name: '播放'}
      ]
    }]
  }
  return graph
}
export default drawGraph
