//functions
//---------

function resizeAppContainer(){
    if(window.innerWidth > 768) // medium and above
    {
        document.querySelector("#app_container").classList.add("w-50");
        document.querySelector("#app_container").classList.remove("w-75");

    }
    else if(window.innerWidth >= 576 && window.innerWidth <= 768) // small
    {
        document.querySelector("#app_container").classList.remove("w-50");
        document.querySelector("#app_container").classList.add("w-75");
    }
    else    // extra small
    {
        document.querySelector("#app_container").classList.remove("w-75");
    }
}

// event listeners
//----------------

window.addEventListener('resize', resizeAppContainer);

window.addEventListener('load', resizeAppContainer);
