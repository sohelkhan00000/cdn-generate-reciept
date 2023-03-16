var jsLoad = (filePath, deferType, ele, CB) => {

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
            CB(true, 'Script loaded successfuly');
        };
        script.onerror = () => {
            CB(false, 'Error occurred while loading script');
        };
        document[ele].appendChild(script);
    }
    else {
        CB(false, 'Script file already exist');
    }
}

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

var loadGA = () => {
    jsLoad('https://www.googletagmanager.com/gtag/js?id=G-907KZKCQJD', true, 'head', (suc, msg) => {
        if (suc) {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-907KZKCQJD');
        }
        console.log('GA ' + msg);
    });
}

var lAll = ()=>{
    loadGA();
   

    cssLoad(server.serverPath +'assets/plugins/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css', 'head', (sucA,msgA) => {
        if(sucA)
        {
            cssLoad(server.serverPath +'assets/style/main.css', 'head', (sucF,msgF) => {
                if(sucF)
                {
                    cssLoad(server.serverPath +'assets/style/generate-receipt.css', 'head', (sucS,msgS) => {
                        if(sucS)
                        {
                            REle(server.serverPath +'assets/style/main-critical.css','link',(sucT,msgT)=>{
                                console.log('Critical css '+ msgT);
                            });
                        }
                    });
                }
            });
        }
    });


    jsLoad(server.serverPath +'assets/js/main.js', true, 'body', (sucA,msgA) => {
        if(sucA)
        {
            jsLoad(server.serverPath +'assets/js/generate-receipt.js', true, 'body', (sucB, msgB) => {
                if(sucB)
                {
                    jsLoad('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', true, 'body', (suc, msg) => {});
                }
            });
           
        }
    });
    


}

var REle = (filePath, eleName, CB)=>{
 
    document.querySelectorAll([eleName]).forEach((e) => {
        if (e.href == filePath) {
            e.remove();
            CB(true, 'file removed')
            return false;
        }
        else
        {
            CB(false, 'file not found')
        }
    })
 
}



['focus', 'scroll', 'mousemove', 'touchstart', 'click'].forEach((e) => {
    document.addEventListener(e, () => {
        lAll();
    }, { once: true });
})

window.addEventListener("load", (e) => {
   // lAll();

}, { once: true });
