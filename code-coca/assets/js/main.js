let moblNav = document.getElementById("side-menu");
let linkbtn = document.getElementById("nav-mobile");
let siteSubmenu = document.querySelectorAll('.page-sidebar h4');

class pageControls {
    constructor() {
        this['copy-btn'] = document.querySelector('#copy-btn');
        this['code-data'] = document.querySelector("#code-data");
    }
}

var pageControlsObj = new pageControls();

linkbtn.addEventListener("click", () => {
    moblNav.classList.toggle("d-block");
});


siteSubmenu.forEach((e, i, arr) => {
    e.addEventListener('click', () => {
        siteSubmenu.forEach((el, i, arr) => {
            if (e.id != el.id) {
                document.querySelector(`[data-tm="${el.id}"]`).classList.remove('d-block')
            }
        });
        document.querySelector(`[data-tm="${e.id}"]`).classList.toggle('d-block')
    })
});


pageControlsObj["copy-btn"].addEventListener('click', () => {

    const cb = navigator.clipboard;
    cb.writeText(pageControlsObj["code-data"].innerText).then(() => {

        pageControlsObj["copy-btn"].innerHTML = '<span class="icon-right"></span> Capied!';

        setTimeout(() => {
            pageControlsObj["copy-btn"].innerHTML = '<span class="icon-copy"></span> Copy code';
        }, 4000)

    });

})


var cssLoad = (filePath, ele, CB) => {

    let isExist = false;
    document.querySelectorAll('link').forEach((e) => {
        if (e.href == filePath) {
            isExist = true;
            return false;
        }
    })

    if (!isExist) {
        const link = document.createElement('link');
        link.href = filePath;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.as = 'style';

        link.onload = () => {
            CB(true, 'Style loaded successfuly');
        };
        link.onerror = () => {
            CB(false, 'Error occurred while loading style');
        };
        document[ele].appendChild(link);
    }
    else {
        CB(false, 'Style file already exist');
    }
}

['focus', 'scroll', 'mousemove', 'touchstart', 'click'].forEach((e) => {
    document.addEventListener(e, () => {
        cssLoad(server.serverPath + 'code-coca/assets/plugin/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css', 'head', (sucA, msgA) => {
         //console.log(msgA);
        });
    }, { once: true });
});
