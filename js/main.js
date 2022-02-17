import WebScene from 'https://js.arcgis.com/4.22/@arcgis/core/WebScene.js'
import SceneView from 'https://js.arcgis.com/4.22/@arcgis/core/views/SceneView.js'
import FeatureLayer from "https://js.arcgis.com/4.22/@arcgis/core/layers/FeatureLayer.js"
import ActionBar from './ActionBar.js'
import ExtrudeRenderer from './ExtrudeRenderer.js'
import MyTimeSlider from './MyTimeSlider.js'

const websceneId = '3dae0e6160b44357a1c41982f573d8ee' 

const layer = new FeatureLayer({
  url: "https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Skredområde/FeatureServer/0",
  renderer: new ExtrudeRenderer('#f71000','Height'),
  opacity: 0.5
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
  environment: {
    lighting: {
      directShadowsEnabled: true,
      date: new Date("Sun May 15 2019 16:00:00 GMT+0100 (CET)")
    }
  },
  padding: {
    left: 49
  }
})

const timeSlider = new MyTimeSlider(view, new Date(2022, 0, 1), new Date(2022, 0, 9), 'days')

view.ui.add(timeSlider, 'bottom-left')

const actionBar = new ActionBar(view)
const { title, description, thumbnailUrl, avgRating } = scene.portalItem
document.querySelector("#header-title").textContent = title
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false


