let moblNav = document.getElementById("side-menu");
let linkbtn = document.getElementById("nav-mobile");
let siteSubmenu = document.querySelectorAll('.page-sidebar h4');

class pageControls {
    constructor() {
        this['copy-btn'] = document.querySelectorAll('.copy-btn');
        this['code-data'] = document.querySelectorAll(".code-data");
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
                document.querySelector(`[data-tm="${el.id}"]`).classList.remove('active');
                document.querySelector(`#${el.id}`).classList.remove('active');
            }
        });
        document.querySelector(`[data-tm="${e.id}"]`).classList.toggle('active');
        document.querySelector(`#${e.id}`).classList.toggle('active');
    })
});

pageControlsObj["copy-btn"].forEach((el, index, arr) => {
    el.addEventListener('click', () => {
        const cb = navigator.clipboard;
        cb.writeText(pageControlsObj["code-data"][index].innerText).then(() => {

            el.innerHTML = '<span class="icon-right"></span> Capied!';

            setTimeout(() => {
                el.innerHTML = '<span class="icon-copy"></span> Copy code';
            }, 4000)

        });
    });
});

var cssLoad = (filePath, ele, fix, CB) => {

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
        //document[ele].insertBefore(link,ele.firstChild )
        //document[ele].appendChild(link);
        if (fix == 'top') {
            document[ele].prepend(link);
        }
        else {
            document[ele].appendChild(link);
        }

    }
    else {
        CB(false, 'Style file already exist');
    }
}

['focus', 'scroll', 'mousemove', 'touchstart', 'click'].forEach((e) => {
    document.addEventListener(e, () => {
        cssLoad(server.serverPath + 'code-coca/assets/plugin/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css', 'head', 'top', (sucA, msgA) => {
            cssLoad(server.serverPath + 'code-coca/assets/style/main' + server.serverStyle, 'head', 'bottom', (sucA, msgA) => {
                //console.log(msgA);
            });
        });
    }, { once: true });
});
