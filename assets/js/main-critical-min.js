var jsLoad=(e,s,r,t)=>{let a=!1;if(document.querySelectorAll("script").forEach(s=>{if(s.src==e)return a=!0,!1}),a)t(!1,"Script file already exist");else{let l=document.createElement("script");l.src=e,l.defer=s,l.onload=()=>{t(!0,"Script loaded successfuly")},l.onerror=()=>{t(!1,"Error occurred while loading script")},document[r].appendChild(l)}},cssLoad=(e,s,r)=>{let t=!1;if(document.querySelectorAll("link").forEach(s=>{if(s.href==e)return t=!0,!1}),t)r(!1,"Style file already exist");else{let a=document.createElement("link");a.href=e,a.rel="stylesheet",a.type="text/css",a.as="style",a.onload=()=>{r(!0,"Style loaded successfuly")},a.onerror=()=>{r(!1,"Error occurred while loading style")},document[s].appendChild(a)}},loadGA=()=>{jsLoad("https://www.googletagmanager.com/gtag/js?id=G-907KZKCQJD",!0,"head",(e,s)=>{if(e){function r(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],r("js",new Date),r("config","G-907KZKCQJD")}})},lAll=()=>{loadGA(),cssLoad(server.serverPath+"assets/plugins/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css","head",(e,s)=>{e&&cssLoad(server.serverPath+"assets/style/main"+server.serverStyle,"head",(e,s)=>{e&&("/"!=server.serverPage?cssLoad(server.serverPath+"assets/style/fuel-receipt"+server.serverStyle,"head",(e,s)=>{e&&REle(server.serverPath+"assets/style/fuel-receipt-critical"+server.serverStyle,"link",(e,s)=>{})}):cssLoad(server.serverPath+"assets/style/generate-receipt"+server.serverStyle,"head",(e,s)=>{e&&REle(server.serverPath+"assets/style/main-critical"+server.serverStyle,"link",(e,s)=>{})}))})}),jsLoad("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",!0,"body",(e,s)=>{e&&jsLoad(server.serverPath+"assets/js/main"+server.serverScript,!0,"body",(e,s)=>{e&&("/"!=server.serverPage?jsLoad(server.serverPath+"assets/js/fuel-receipt"+server.serverScript,!0,"body",(e,s)=>{}):jsLoad(server.serverPath+"assets/js/generate-receipt"+server.serverScript,!0,"body",(e,s)=>{}))})})},REle=(e,s,r)=>{document.querySelectorAll([s]).forEach(s=>{if(s.href==e)return s.remove(),r(!0,"file removed"),!1;r(!1,"file not found")})};["focus","scroll","mousemove","touchstart","click"].forEach(e=>{document.addEventListener(e,()=>{lAll()},{once:!0})}),window.addEventListener("load",e=>{loadGA()},{once:!0});