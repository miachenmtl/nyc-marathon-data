/* global Plotly */
import React, { Component } from 'react';
import Data from './Data';

class Plot extends Component {
  state = {
    data: {
      x: Data.x,
      y: Data.y,
      text: Data.names,
      hoverinfo: 'x + y + text',
      hoveron: 'points',
      type: 'scatter',
      mode: 'markers',
    },
    layout: {
      title: "",
      margin: {
        t: "10px"
      },
      xaxis: {
        title: 'Year'
      },
      yaxis: {
        title: 'Time',
        tickformat: "%H:%M:%S"
      },
      hovermode: 'closest'
    },
    zoomedOut: true
  }
  componentDidMount() {
    this.drawPlot();
  }
  componentDidUpdate() {
    this.drawPlot();
  }
  drawPlot() {
    let plotID = document.getElementById("PLOT");
    Plotly.newPlot(plotID, [this.state.data], this.state.layout);
    plotID.on('plotly_click', this.onPlotClick.bind(this));
  }
  onPlotClick(data) {
    const year = data.points[0].x;
    let newData = this.state.data;
    let newLayout = this.state.layout;
    let place = [];
    let newTimes = [];
    let newNames = [];
    let i;
    if (this.state.zoomedOut) {
      for (i = 1; i <= 100; i++) {
        place.push(i);
      }
      for (i = 0; i < this.state.data.x.length; i++) {
        if (newData.x[i] === year) {
          newTimes.push(this.state.data.y[i]);
          newNames.push(this.state.data.text[i]);
        }
      }
      newData.x = place;
      newData.y = newTimes;
      newData.text = newNames;
      newLayout.title = year;
      newLayout.xaxis.title = "Place";
      this.setState({
        data: newData,
        layout: newLayout,
        zoomedOut: false
      });
    }
  }
  handleZoomOut() {
    console.log("zoom out");
    const newData = {
      x: Data.x,
      y: Data.y,
      text: Data.names,
      hoverinfo: 'x + y + text',
      hoveron: 'points',
      type: 'scatter',
      mode: 'markers'
    };
    var newLayout = this.state.layout;
    newLayout.title = "";
    newLayout.xaxis.title = "Year";
    this.setState({
      data: newData,
      layout: newLayout,
      zoomedOut: true
    });
  }
  render() {
    return (
      <div>
        <div id="PLOT"></div>
        <button id="ZoomOut" onClick={this.handleZoomOut.bind(this)}>Zoom Out</button>
      </div>
    )
  }
}

export default Plot;
