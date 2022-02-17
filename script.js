//Page Setup
//------------------------------------------------------------------------------//
//animate landing page loader
let landing = document.getElementById('landing-page')
//To set time interval for black background
//Could have done this with setTimeout()
setInterval(function(){
    landing.style.opacity= "0"}, 3000)
//To set time interval to remove landing page
setInterval(()=>
    landing.style.display = "none",3300)

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
//Set up Image Selection and Preview--------------------------------------//
let image;
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
    }
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
//-----------------------------------------------------------//

//Setup Parameter Sliders-----------------------------------------//
let width, height;

width = document.getElementById("width")
width.addEventListener('click',  onSliderChange,false)
width.addEventListener('touchend',  onSliderChange,false)

height = document.getElementById("height")
height.addEventListener('click', onSliderChange,false)
height.addEventListener('touchend', onSliderChange,false)


const definitionName = 'Portraits 2.gh';
const loader = new Rhino3dmLoader()
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/')

let rhino, definition, doc
rhino3dm().then(async m => {
    console.log('Loaded rhino3dm.')
    rhino = m // global


    //RhinoCompute.url = getAuth( 'RHINO_COMPUTE_URL' ) // RhinoCompute server url. Use http://localhost:8081 if debugging locally.
    //RhinoCompute.apiKey = getAuth( 'RHINO_COMPUTE_KEY' )  // RhinoCompute server api key. Leave blank if debugging locally.
    
    RhinoCompute.url = 'http://localhost:8081/' //if debugging locally.


    // load a grasshopper file!
    const url = definitionName
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const arr = new Uint8Array(buffer)
    definition = arr

    init()
    compute()
})

async function compute() {


    const param1 = new RhinoCompute.Grasshopper.DataTree('Image Width')
    param1.append([0], [width.valueAsNumber])
    console.log(param1)

    const param2 = new RhinoCompute.Grasshopper.DataTree('Image Height')
    param2.append([0], [height.valueAsNumber])
    console.log(param2)

    // clear values
    const trees = []
    trees.push(param1)
    trees.push(param2)

    const res = await RhinoCompute.Grasshopper.evaluateDefinition(definition, trees)
    console.log(res)
        


    doc = new rhino.File3dm()

    // hide spinner
    document.getElementById('container').style.display = 'none'

    for (let i = 0; i < res.values.length; i++) {

        for (const [key, value] of Object.entries(res.values[i].InnerTree)) {
            for (const d of value) {

                const data = JSON.parse(d.data)
                //console.log(data)
                const rhinoObject = rhino.CommonObject.decode(data)
                doc.objects().add(rhinoObject, null)

            }
        }
    }


    // clear objects from scene
    scene.traverse(child => {
        if (child.type === "Object3D") {
            scene.remove(child)
        }
    })


    const buffer = new Uint8Array(doc.toByteArray()).buffer
    loader.parse(buffer, function (object) {
        //object.rotation.z = Math.PI

        scene.add(object)
        console.log(scene)
        // hide spinner
        document.getElementById('container').style.display = 'none'

    })
}


function onSliderChange() {
    // show spinner
    document.getElementById('container').style.display = 'flex'
    compute()
}



// BOILERPLATE //
let scene, camera, renderer, controls

function init() {

    THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );
    


    // create a scene and a camera
    scene = new THREE.Scene()
    scene.background = new THREE.Color(1, 1, 1)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z=50


    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    

    // add some controls to orbit the camera
    controls = new OrbitControls(camera, renderer.domElement)

    const Axis = new THREE.AxesHelper(5)
    scene.add(Axis)

    // add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.intensity = 2
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight()
    scene.add(ambientLight)

    console.log(scene)

    animate()
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
