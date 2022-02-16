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
//-------------------------------------------------------------------------//