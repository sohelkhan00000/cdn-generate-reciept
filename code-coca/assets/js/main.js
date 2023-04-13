class pageControls {
    constructor() {
        this['copy-btn'] = document.querySelectorAll('.copy-btn');
        this['code-data'] = document.querySelectorAll('.code-data');
        this['nav-mobile'] = document.getElementById('nav-mobile');
        this['side-menu'] = document.getElementById('side-menu');
        this['site-sub-menu'] = document.querySelectorAll('.page-sidebar h4');
    }
}

var pageControlsObj = new pageControls();

pageControlsObj['nav-mobile'].addEventListener("click", () => {
    pageControlsObj['side-menu'].classList.toggle("d-block");
});


pageControlsObj['site-sub-menu'].forEach((e, i, arr) => {
    e.addEventListener('click', () => {
        pageControlsObj['site-sub-menu'].forEach((el, i, arr) => {
            if (e.id != el.id) {
                document.querySelector(`[data-tm="${el.id}"]`).classList.remove('active');
                document.querySelector(`#${el.id}`).classList.remove('active');
            }
        });
        document.querySelector(`[data-tm="${e.id}"]`).classList.toggle('active');
        document.querySelector(`#${e.id}`).classList.toggle('active');
    })
});

pageControlsObj["copy-btn"].forEach((el, ind, arr) => {
    el.addEventListener('click', () => {
        const cb = navigator.clipboard;
        cb.writeText(pageControlsObj["code-data"][ind].innerText).then(() => {

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
    });

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

var metaTags = (e, obj, appendto, CB) => {

    document.querySelectorAll(e).forEach((el) => {

        if (Object.keys(obj).length && el.name && el.name != '') {
            Object.keys(obj).some((ele) => {

                if (ele == el.name) {
                    delete obj[ele]
                    isExist = true;
                    return true;
                }
            });
        }

    });

    Object.keys(obj).some((el) => {
        const link = document.createElement(e);
        link.name = el;
        link.content = obj[el];
        document[appendto].prepend(link);
        CB(true, el+' meta tag added');
    });

}

var htmlTags = (e, obj, appendto, CB) => {
    if (!document.querySelectorAll(e).length) {
        const link = document.createElement(e);
        link.innerHTML = obj.html;
        document[appendto].prepend(link);
        CB(true, 'title tag added');
    }
    else {

        document.querySelectorAll(e).forEach((el) => {
            el.innerHTML = obj.html;
        });
    }
}

Object.keys(tags).some((el) => {
    if (el == 'meta') {
     
        metaTags(el, tags[el], 'head', (suc, msg) => {});
    }
    else if(el == 'title'){
        htmlTags(el, tags[el], 'head', (suc, msg) => {});
    }
});

['focus', 'scroll', 'mousemove', 'touchstart', 'click'].forEach((e) => {
    document.addEventListener(e, () => {
        cssLoad(server.serverPath + 'code-coca/assets/plugin/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css', 'head', 'top', (sucA, msgA) => {
            cssLoad(server.serverPath + 'code-coca/assets/style/main' + server.serverStyle, 'head', 'bottom', (sucA, msgA) => {
                //console.log(msgA);
            });
        });
    }, { once: true });
});
