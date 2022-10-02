import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Globe from 'globe.gl'
import './App.css'

// import './style.css';
import * as THREE from 'three';
import { GreaterStencilFunc } from 'three';


const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow', 'brown', 'pink']);
const elem = document.getElementById('moon');

/// goble.gl creating globe
var world = Globe()
  .globeImageUrl('/images/lunar_surface.jpg')
  .bumpImageUrl('/images/gradient.jpg')
  .backgroundImageUrl('public/images/stars.jpg')
  .pointAltitude('size')
  .pointColor('color')
  .showAtmosphere(false) // moon has no atmosphere
  .labelText('label')
  .labelSize(1)
  .labelDotRadius(0.4)
  .labelColor(d => colorScale(d.label))
  .labelLabel(d => `
        <div><b>${d.label}</b></div>
        <div>${d.lat}-${d.lng} </div>
        <div><i>${d.date}</i></div>
      `)
  .onLabelClick(d => d.date)
  (elem);

//(document.getElementById('moon'));
fetch('public/points.json').then(r => r.json()).then(landingSites => {
  world.labelsData(landingSites);
});
export default Globe;
