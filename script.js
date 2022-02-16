//animate landing page loader
let landing = document.getElementById('landing-page')
//To set time interval for black background
//Could have done this with setTimeout()
setInterval(function(){
    landing.style.opacity= "0"}, 3000)
//To set time interval to remove landing page
setInterval(()=>
    landing.style.display = "none",3300)

console.log(landing)
console.log(document.getElementById('myImage').innerHTML)
//-------------------------------------------------------------------------//
//Import Libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'
import { RhinoCompute } from 'https://cdn.jsdelivr.net/npm/compute-rhino3d@0.13.0-beta/compute.rhino3d.module.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'


const definitionName = 'Portraits.gh'