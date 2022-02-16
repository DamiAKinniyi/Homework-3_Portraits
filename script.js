let doc = document.documentElement;
//Page Setup
//------------------------------------------------------------------------------//
//animate landing page loader
let landing = document.getElementById('landing-page')
//To set time interval for black background
//Could have done this with setTimeout()
setInterval(function(){
    landing.style.opacity= "0"}, 0)
//To set time interval to remove landing page
setInterval(()=>
    landing.style.display = "none",0)

//console.log(landing)
//console.log(document.getElementById('myImage').files)
//-------------------------------------------------------------------------//
//Import Libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'
import { RhinoCompute } from 'https://cdn.jsdelivr.net/npm/compute-rhino3d@0.13.0-beta/compute.rhino3d.module.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'
//---------------------------------------------------------------------------------//

//Set up Slider Events
//Declare sliders//
let image, width, height;

image = document.getElementById("myImage")
const imagePreview = document.getElementsByClassName("image_preview")[0];
image.addEventListener('change', imageChange);

function imageChange(){
    console.log(image.files)
    console.log(image.files[0])
    console.log(imagePreview)
    while(imagePreview.firstChild){
        console.log(imagePreview.firstChild)
        console.log(imagePreview.innerHTML)

        imagePreview.removeChild(imagePreview.firstChild)
    if (image.files.length === 0){
        alert('No Image Selected')
        imagePreview.innerHTML="No Image Selected"
        return      
    }else{
        alert('you have changed the image')
        updateImageDisplay()
    }   
}

function updateImageDisplay(){

    }
    let image2 = document.createElement('img');
    imagePreview.appendChild(image2);
    if(validFileType(image.files[0])){
        image2.src=URL.createObjectURL(image.files[0])}
        image2.alt= image.files[0].name

}
const fileTypes = ["image/png", "image/jpeg"];

function validFileType(file) {
    return fileTypes.includes(file.type);
  }
//image.setAttribute ('onchange', "imageChange()")

//imageChange()
const definitionName = 'Portraits.gh';