var pam = document.querySelector('#pam')
var paths = pam.querySelectorAll('.map__image a')
var links = pam.querySelectorAll('.map__list a')

if (NodeList.prototype.forEach=== undefined) {
	NodeList.prototype.forEach=function(callback){
		[].forEach.call(this,callback)
	}
}

var activeArea=function(id){
	pam.querySelectorAll('.is-active').forEach(function(item){
		item.classList.remove('is-active')
	})
	if(id !== undefined){
		document.querySelector('#list-'+id).classList.add('is-active')
		document.querySelector('#region-'+id).classList.add('is-active')
	}
}

paths.forEach(function(path){
	path.addEventListener("mouseenter",function(e){
		var id=this.id.replace('region-','')
		activeArea(id)
	})
})

links.forEach(function(link){
	link.addEventListener('mouseenter',function(){
		var id=this.id.replace('list-','')
		activeArea(id)
	})
})
pam.addEventListener('mouseover',function(){
	activeArea()
})


