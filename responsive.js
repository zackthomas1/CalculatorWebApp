//functions
//---------

function resizeCalcContainer(){
    if(window.innerWidth > 768) // medium and above
    {
        document.querySelector("#calc_container").classList.add("w-50");
        document.querySelector("#calc_container").classList.remove("w-75");

    }
    else if(window.innerWidth >= 576 && window.innerWidth <= 768) // small
    {
        document.querySelector("#calc_container").classList.remove("w-50");
        document.querySelector("#calc_container").classList.add("w-75");
    }
    else    // extra small
    {
        document.querySelector("#calc_container").classList.remove("w-75");
    }
}

// event listeners
//----------------

window.addEventListener('resize', function(e){
    resizeCalcContainer();
});

window.addEventListener('load', function(e){
    resizeCalcContainer();
})
