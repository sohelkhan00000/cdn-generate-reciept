let moblNav = document.getElementById("nav-links");
let linkbtn = document.getElementById("linkmblmenu");
let eleBody = document.getElementsByTagName("body");


linkbtn.addEventListener("click", () => {
    moblNav.classList.toggle("d-block");
});

var jsLoad = (filePath, deferType, ele, callBack) => {

    let isExist = false;
    document.querySelectorAll('script').forEach((e) => {
        if (e.src == filePath) {
            isExist = true;
            return false;
        }
    })

    if (!isExist) {
        const script = document.createElement('script');
        script.src = filePath;
        script.defer = deferType;

        script.onload = () => {
            callBack(true, 'Script loaded successfuly');
        };
        script.onerror = () => {
            callBack(false, 'Error occurred while loading script');
        };
        document[ele].appendChild(script);
    }
    else {
        callBack(false, 'Script file already exist');
    }
}

var cssLoad = (filePath, ele, callBack) => {

    let isExist = false;
    document.querySelectorAll('link').forEach((e) => {
        if (e.src == filePath) {
            isExist = true;
            return false;
        }
    })

    if (!isExist) {
        const link = document.createElement('link');
        link.href = filePath;
        link.rel = 'stylesheet';
        link.type = 'text/css';

        link.onload = () => {
            callBack(true, 'Style loaded successfuly');
        };
        link.onerror = () => {
            callBack(false, 'Error occurred while loading style');
        };
        document[ele].appendChild(link);
    }
    else {
        callBack(false, 'Style file already exist');
    }
}

eleBody[0].addEventListener("click", () => {
    jsLoad('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', true, 'body', (suc, msg) => {
        //console.log('html2pdf file '+msg);
    });
}, { once: true });


var loadGA = (masg) => {
    jsLoad('https://www.googletagmanager.com/gtag/js?id=G-907KZKCQJD', true, 'head', (suc, msg) => {
        if (suc) {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-907KZKCQJD');
        }
        console.log(masg + ' ' + msg);
    });
}

['focus', 'scroll', 'mousemove', 'touchstart', 'click'].forEach((e) => {
    document.addEventListener(e, () => {
        loadGA('me');
    }, { once: true });
})

window.addEventListener("load", (e) => {
    loadGA('le');
    jsLoad('https://cdn.jsdelivr.net/gh/sohelkhan00000/cdn-generate-reciept@16c4640/assets/js/generate-receipt.js', true, 'body', () => {

    })

    cssLoad('https://cdn.jsdelivr.net/gh/sohelkhan00000/cdn-generate-reciept@16c4640/assets/plugins/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css', 'head', () => {

    });

    cssLoad('https://cdn.jsdelivr.net/gh/sohelkhan00000/cdn-generate-reciept@16c4640/assets/style/main.css', 'head', () => {

    });

    cssLoad('https://cdn.jsdelivr.net/gh/sohelkhan00000/cdn-generate-reciept@16c4640/assets/style/generate-receipt.css', 'head', () => {

    });
}, { once: true });
