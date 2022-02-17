const getSymbol = (color) => {
  return {
    type: "polygon-3d", // autocasts as new PolygonSymbol3D()
    symbolLayers: [
      {
        type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
        castShadows: true,
        material: {
          color: color
        },
        edges: {
          type: "solid",
          color: "#999",
          size: 0.5
        }
      }
    ]
  }
}

export default class ExtrudeRenderer {
  constructor(color, extrudeField){
    this.color = color
    
    return {
      type: "simple",
      symbol: getSymbol(color),
      visualVariables: [
        {
          type: "size",
          field: extrudeField
        }
      ]
    }
  }
}