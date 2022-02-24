let $map = document.querySelector('#map')

class LeafletMap{

    constructor(){
        this.map = null;
        this.bounds = [];
    }
   async load (element){
       return new Promise ((resolve,reject)=>{
            $script('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',()=>{
                this.map = L.map(element,{scrollWheelZoom: false})
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors,<a href="https://creatibecommons.org/licenses/by-sa/2.0">',
                    maxZoom: 18,
                }).addTo(this.map); 
                resolve()
            })
       }) 
    }
    addMarker(lat,lng, text,status){
        let point = [lat,lng]
        this.bounds.push(point)
        return new LeafletMarker(point,text,this.map)
    }
    centrer (){
        this.map.fitBounds(this.bounds)
    }
}

const initMap = async function() {
    console.log("je traite")
    let map = new LeafletMap();
    let hoverMarker = null
    let activeMarker = null
   await map.load($map)
   Array.from(document.querySelectorAll('.js-marker')).forEach((item)=> {
        let marker = map.addMarker(item.dataset.lat,item.dataset.lng,item.dataset.type,item.dataset.status)
        console.log(item.dataset.status)
        
        item.addEventListener('mouseover', ()=>{
            if(hoverMarker !==null) hoverMarker.unsetActive()
            marker.setActive()
            hoverMarker = marker
        })
        item.addEventListener('mouseleave', ()=>{
            if(hoverMarker!==null) marker.unsetActive()
        })
        marker.addEventListener('click', ()=>{
            console.log(item.innerHTML)
            if(activeMarker!==null) activeMarker.resetContent()
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
       
    })
   map.centrer()
   
}
class LeafletMarker{
    constructor(point ,text , map,status){
        this.text = text
        this.popup = L.popup({
            autoClose :false,
            closeOnEscapeKey : false,
            closeButton : true,
            closeOnClick : false,
            className : "marker",
            maxWidth : 400
        })
        .setLatLng(point)
        .setContent(text)
        .openOn(map)
        // this.setColor(status)
    }
  
    setActive (){
        this.popup.getElement().classList.add("is-active")
    }
    unsetActive(){
        this.popup.getElement().classList.remove("is-active")
    }
    addEventListener(event, callback){
        this.popup.addEventListener('add', ()=>{
            this.popup.getElement().addEventListener(event,callback)
        })
    }
    setContent(text){
        this.popup.setContent(text)
        this.popup.getElement().classList.add('is-expended')
        this.popup.update()
    }
    resetContent(){
        this.popup.setContent(this.text)
        this.popup.getElement().classList.remove('is-expended')
        this.popup.update()
    }
}
if($map !== null){
    initMap()
}