import WebScene from 'https://js.arcgis.com/4.22/@arcgis/core/WebScene.js'
import SceneView from 'https://js.arcgis.com/4.22/@arcgis/core/views/SceneView.js'
import FeatureLayer from "https://js.arcgis.com/4.22/@arcgis/core/layers/FeatureLayer.js"
import TimeSlider from 'https://js.arcgis.com/4.22/@arcgis/core/widgets/TimeSlider.js'
import ActionBar from './ActionBar.js'
import ExtrudeRenderer from './ExtrudeRenderer.js'


const websceneId = '3dae0e6160b44357a1c41982f573d8ee' 

const layer = new FeatureLayer({
  url: "https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Skredområde/FeatureServer/0",
  renderer: new ExtrudeRenderer('#f71000','Height')
});

const scene = new WebScene({
  portalItem: {
    id: websceneId
  }
});

scene.add(layer)
await scene.load()


const view = new SceneView({
  map: scene,
  container: "viewDiv",
  padding: {
    left: 49
  }
});

 // time slider widget initialization
 const timeSlider = new TimeSlider({
  container: "timeSlider",
  view: view,
  timeVisible: true, // show the time stamps on the timeslider
  loop: true
});

view.ui.add(timeSlider, 'bottom-left')

view.whenLayerView(layer).then((lv) => {
  // around up the full time extent to full hour
  timeSlider.fullTimeExtent = {
    start: new Date(2021,11,31),
    end: new Date(2022,0,9),
  }
  timeSlider.stops = { 
    interval: {
      value: 1,
      unit: "days"
    }
  }
  timeSlider.timeExtent = {
    start: new Date(2021, 11, 31), 
    end: new Date(2022, 0, 1)
  }
})

const actionBar = new ActionBar(view)
const { title, description, thumbnailUrl, avgRating } = scene.portalItem
document.querySelector("#header-title").textContent = title
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false


