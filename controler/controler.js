var etat=0;
function roughScale(x, base) {
    const parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    const valeur = (parsed + 1);
    return valeur;
}

function signalement($scope, $http) {
    $http.get('https://tri2022.herokuapp.com/listeSignalement')
        .success(function(data) {
            $scope.listeSignalement = data;
        })
    $http.get('https://tri2022.herokuapp.com/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $http.get('https://tri2022.herokuapp.com/listeStatut')
        .success(function(data) {
            $scope.listeStatut = data;
        })
    $scope.deleteSignalement = function($chiffre) {
        //        console.log("Ato ambony : "+$chiffre);
        $http.get('https://tri2022.herokuapp.com/deleteSignalement/' + $chiffre)
            .success(function(data) {
                $scope.deleteSignaux = data;
                alert('Vofafa lelike😂😂 ');
                //            console.log("Ato ambany : "+$chiffre);
            })
    }
    $scope.listesignalRegion = function() {
        console.log($id);
	    $http.get('https://tri2022.herokuapp.com/getSignalementRegion/Sofia' )
	        .success(function(data) {
	        	$scope.getSignalementRegion = data;   
	       })
		//console.log('kjkjkj');
	}
    $scope.listesignalChef = function() {
		var id = document.getElementById("testid").value;
	    $http.get('https://tri2022.herokuapp.com/getSignalementByRegion/'+id )
	        .success(function(data) {
	        	$scope.getSignalementParRegion = data;   
	       })
    }
    $scope.proche = function($x,$y) {
        console.log('https://tri2022.herokuapp.com/proche/'+$x+'/'+$y);
        $http.get('http://localhost:9000/proche/'+$x+'/'+$y )
            .success(function(data) {
                $scope.proche = data;   
           })
    }
    $scope.affecterSignalement = function($blem) {
        $http.get('https://tri2022.herokuapp.com/affectationParRegion/'+$blem+'/20' )
            .success(function(data) {
                alert('Vita le update 😊😊 ');   
           })
    }
    $scope.updateSignalement = function($chiffre) {

        var selectElement = document.getElementById("Statut");
        var valeurSelectionner = selectElement.options[selectElement.selectedIndex].value;
        var textSelectionner = selectElement.options[selectElement.selectedIndex].text;
        console.log(valeurSelectionner);
        console.log(textSelectionner);
        $http.get('https://tri2022.herokuapp.com/updateSignalement/' + $chiffre + '/' + valeurSelectionner)
            .success(function(data) {
                $scope.updateSignaux = data;
                alert('Vita le update 😊😊 ');
            })
    }
    $scope.updateSignalement = function($chiffre) {
        $http.get('https://tri2022.herokuapp.com/updateSignalement/' + $chiffre + '/' + valeurSelectionner)
            .success(function(data) {
                $scope.updateSignaux = data;
                alert('Vita le update 😊😊 ');
            })
    }
}

function region($scope, $http) {
    var stat;
    var stati;
    var id = [];
    var labe = [];
    var des = [];
    var coordonnex=[];
    var coordonneY=[];
    var idR;
    var x;
    var y;

    $scope.connection = function() {
        var loginChef = document.getElementById("loginChef").value;
        var passwordChef = document.getElementById("mdpChef").value;
        $http.get('https://tri2022.herokuapp.com/valideConnexChef/' + loginChef + '/' + passwordChef)
            .success(function(data) {
                if (data == 0) {
                    alert("Diso le login eeee 😤😤😤😤😤");
                } else {
                    stati=data;
                    window.location.replace("AcceuilChef.html");
                    // alert("Marina le login eeee 😤😤😤😤😤");
                }
            })
    }
    $http.get('https://tri2022.herokuapp.com/getSignalementRegion' )
        .success(function(data) {
            console.log(data);
        $scope.getSignalementRegion = data;
        stat=$scope.getSignalementRegion;
        lab();
        if(labe.length>0){
            carte();
        }
    });

    function lab() {
        if(stat!=null){
            for (var i = 0; i < stat.length; i++) {
                labe[i] = stat[i].designationProbleme;
                id[i] = stat[i].idSignalement;
                coordonnex[i]=stat[i].coordonneX;
                coordonneY[i]=stat[i].coordonneY;
                des[i]=stat[i].descriptionProbleme;
            }
        }
    }

    function carte() {
        let mapOptions = {
        center:[coordonnex[0],coordonneY[0]],
        zoom:15
        }
        let map = new L.map('map' , mapOptions);
        let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);
        let customIcon = {
            iconUrl:"https://image.flaticon.com/icons/png/512/1397/1397898.png",
            iconSize:[40,40]
        }

        let myIcon = L.icon(customIcon);
        //let myIcon = L.divIcon();

        let iconOptions = {
            title:"Signalement",
            draggable:false,
            icon:myIcon
        }
        let marker = [];
        var pop="";
        for (let i = 0; i < labe.length; i++) {
            let a=18.9099;
            pop=labe[i];
            console.log(pop);
            marker[i]= new L.Marker([coordonnex[i], coordonneY[i]] , iconOptions);
            marker[i].addTo(map);
            marker[i].bindPopup("Problème :"+pop+"\n "+"<a data-toggle=\"modal\" data-target=\"#Analamanga\" title=\"Quick View\" class=\"quick-view modal-view detail-link\" href=\"#\" >voir plus</a>").openPopup();
        }
        marker[labe.length-1].closePopup();
    }
    $http.get('https://tri2022.herokuapp.com/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        });

    $http.get('https://tri2022.herokuapp.com/infoChef')
    .success(function(data) {
        $scope.ChefRegion = data;
        console.log(data);
    });
    /*$http.get('https://tri2022.herokuapp.com/getSignalementRegion/'+stati )
        .success(function(data) {
        $scope.getSignalementRegion = data;
        stat=$scope.getSignalementRegion;
        lab();
        //carte();
    });*/
    $scope.deleteRegion = function($chiffre) {
        $http.get('http://localhost:9000/deleteRegion/' + $chiffre)
            .success(function(data) {
                $scope.deleteSignaux = data;
                alert('Vohafafa 😂😂 ');
                //            console.log("Ato ambany : "+$chiffre);
            })
    }

    $scope.ajouterRegion = function() {
        var designationRegion = document.getElementById('designationRegion').value;
        localStorage.setItem("designationRegion", designationRegion);
        var coordonneeX = document.getElementById('coordonneX').value;
        localStorage.setItem("coordonneX", coordonneX);
        var coordonneeY = document.getElementById('coordonneY').value;
        localStorage.setItem("coordonneY", coordonneY);
        var coordonneeX1 = document.getElementById('coordonneX1').value;
        localStorage.setItem("coordonneX1", coordonneX1);
        var coordonneeY1 = document.getElementById('coordonneY1').value;
        localStorage.setItem("coordonneY1", coordonneY1);
        $http.get('http://localhost:9000/insertRegion/' + designationRegion + '/' + coordonneeX + '/' + coordonneeY + '/' + coordonneeX1 + '/' + coordonneeY1)
            .success(function(data) {
                $scope.liste = data;
                alert('Donnee inserer 😂😂 ');
            })
    }
}

function controlRegion($scope, $http) {
    $scope.affichageRegion = function() {
        $http.get('http://localhost:9000/listeRegion')
            .success(function(data) {
                $scope.listeRegion = data;
            })
    }
}

function controlStat($scope, $http) {
    var region;
    var stat;
    var labe = [];
    var val = [];
    var labe1 = [];
    var val1 = [];

    function lab() {
        for (var i = 0; i < region.length; i++) {
            labe[i] = region[i].designationProbleme;
            val[i] = region[i].pourcentage;
        }
    }

    function lab1() {
        for (var i = 0; i < stat.length; i++) {
            labe1[i] = stat[i].etatStatut;
            val1[i] = stat[i].pourcentage;
        }
    }
    $scope.affichageStatistique = function() {
        $http.get('https://tri2022.herokuapp.com/listeStat')
            .success(function(data) {
                $scope.listeStatistique = data;
                region = $scope.listeStatistique;
                lab();
                console.log(labe);
            })
    }
    $scope.affichageStatByRegion = function($id) {
        $http.get('https://tri2022.herokuapp.com/listeliste/' + $id)
            .success(function(data) {
                $scope.listeStat = data;
            })
    }

    $http.get('https://tri2022.herokuapp.com/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })

    $scope.affichageStatByRegion = function($id) {
        $http.get('https://tri2022.herokuapp.com/listeliste/' + $id)
            .success(function(data) {
                $scope.listeStat = data;
            })
    }

    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $scope.chart = function($id) {
        $http.get('https://tri2022.herokuapp.com/statByStatut/mande/' + $id)
            .success(function(data) {
                $scope.listeStatStatut = data;
                stat = $scope.listeStatStatut;
                lab1();
                console.log(labe1);
                console.log(stat[1].pourcentage);
            })
        var options = {
            chart: {
                height: 320,
                type: 'donut',
            },
            labels: labe1,
            series: val1,
            colors: ["#4680ff", "#0e9e4a", "#ffba57"],
            legend: {
                show: true,
                position: 'bottom',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true
                            },
                            value: {
                                show: true
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false,
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
        var chart = new ApexCharts(
            document.querySelector("#pie-chart-2"),
            options
        );
        chart.render();
    };
    $scope.chart1 = function() {
        $http.get('https://tri2022.herokuapp.com/listeStat')
            .success(function(data) {
                $scope.listeStatistique = data;
                region = $scope.listeStatistique;
                lab();
                // console.log(labe);
            })
        var options = {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#ffba57"],
            stroke: {
                show: false,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Problème signalé',
                data: val,
            }, ],
            xaxis: {
                categories: labe,
            },
            yaxis: {
                title: {
                    text: 'Statistique globale'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return +val + "%"
                    }
                }
            }
        }
        var chart = new ApexCharts(
            document.querySelector("#bar-chart-1"),
            options
        );
        chart.render();
    };

    $scope.affichageStatByStatut = function($id) {
        $http.get('https://tri2022.herokuapp.com/statByStatut/' + $id)
            .success(function(data) {
                $scope.listeStatStatut = data;
            })
    }
}

function controlRecherche($scope, $http) {
    $http.get('https://tri2022.herokuapp.com/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $http.get('https://tri2022.herokuapp.com/listeStatut')
        .success(function(data) {
            $scope.listeStatut = data;
        })
    $http.get('https://tri2022.herokuapp.com/lista')
        .success(function(data) {
            $scope.listeProb = data;
        })
    $scope.listeProbleme = null;
    $scope.pasResu = false;
    $scope.resu = false;
    $scope.erreur = false;
    $scope.listeRechercheRegion = function() {
        $http.get('https://tri2022.herokuapp.com/listeRechercheRegion/' + $scope.recherche)
            .success(function(data) {
                $scope.erreur = false;
                $scope.recherche = "";
                if (data != 'err') {
                    if (data != '') {
                        $scope.listeRegion = data;
                        $scope.resu = true;
                        $scope.pasResu = false;
                    } else {
                        $scope.resu = false;
                        $scope.pasResu = true;
                    }
                } else {
                    $scope.resu = false;
                    $scope.pasResu = false;
                    $scope.erreur = true;
                }
            })
    }

    $scope.listeRechercheProbleme = function() {
        $scope.listeProbleme = [];
        console.log('https://tri2022.herokuapp.com/listeRechercheProbleme/' + $scope.recherche);
        $http.get('https://tri2022.herokuapp.com/listeRechercheProbleme/' + $scope.recherche)
            .success(function(data) {
                $scope.erreur = false;
                $scope.recherche = "";
                if (data != 'err') {
                    if (data != '') {
                        $scope.listeProbleme = data;
                        $scope.resu = true;
                        $scope.pasResu = false;
                    } else {
                        $scope.resu = false;
                        $scope.pasResu = true;
                    }
                } else {
                    $scope.resu = false;
                    $scope.pasResu = false;
                    $scope.erreur = true;
                }
            })
    }

    $scope.listeRechercheProblemeParRegion = function() {
        $scope.listeProbleme = [];
        $http.get('https://tri2022.herokuapp.com/listeRechercheProblemeParRegion/' + $scope.recherche)
            .success(function(data) {
                $scope.erreur = false;
                $scope.recherche = "";
                if (data != 'err') {
                    if (data != '') {
                        $scope.listeProbleme = data;
                        $scope.resu = true;
                        $scope.pasResu = false;
                    } else {
                        $scope.resu = false;
                        $scope.pasResu = true;
                    }
                } else {
                    $scope.resu = false;
                    $scope.pasResu = false;
                    $scope.erreur = true;
                }
            })
    }
    $scope.listeRecherchePro = function() {
        var blem = document.getElementById('bleme').options[document.getElementById('bleme').selectedIndex].value;
        if(document.getElementById('region')!=null){
            var region = document.getElementById('region').options[document.getElementById('region').selectedIndex].value;
        }
        else{
            var region="";
        }
        var stat = document.getElementById('stat').options[document.getElementById('stat').selectedIndex].value;
        $scope.listeProbleme = [];
        console.log('https://tri2022.herokuapp.com/listeRecherchePro/' + blem + '=' + region + '!' + stat);
        $http.get('https://tri2022.herokuapp.com/listeRecherchePro/' + blem + '=' + region + '!' + stat)
        .success(function(data) {
            $scope.erreur = false;
            $scope.recherche = "";
            if (data != 'err') {
                if (data != '') {
                    $scope.listeProbleme = data;
                    $scope.resu = true;
                    $scope.pasResu = false;
                } else {
                    $scope.resu = false;
                    $scope.pasResu = true;
                }
            } else {
                $scope.resu = false;
                $scope.pasResu = false;
                $scope.erreur = true;
            }
        })   
    }
    $scope.searchSignalParDate = function() {
    	var valuedate1 = document.getElementById('daty1').value;
    	var valuedate2 = document.getElementById('daty2').value;
    	
    	if(valuedate2==''){
    		//valuedate2=null;
            console.log('https://tri2022.herokuapp.com/listeRechercheProblemeParDate/'+valuedate1+'/Now()');
    		$http.get('https://tri2022.herokuapp.com/listeRechercheProblemeParDate/'+valuedate1+'/Now()' )
            .success(function(data) {
            	$scope.listeProbleme = data;   
           })
    	}
    	else{

            console.log('https://tri2022.herokuapp.com/listeRechercheProblemeParDate/'+valuedate1+'/'+valuedate2);
    		$http.get('https://tri2022.herokuapp.com/listeRechercheProblemeParDate/'+valuedate1+'/'+valuedate2 )
            .success(function(data) {
            	$scope.listeProbleme = data;   
           })
    	}
    	
    }
}

function utilisateur($scope, $http) {
    $http.get('https://tri2022.herokuapp.com/listeUtilisateur')
        .success(function(data) {
            $scope.listeUtilisateur = data;
        })
}

function controlUtilisateur($scope, $http) {
    $http.get('https://tri2022.herokuapp.com/listeUtilisateur')
        .success(function(data) {
            $scope.listeUtilisateur = data;
        })
}

function controlDelete($scope, $http) {
    $scope.deleteSignalement = function() {
        // console.log("Ambony "+$idSignalement);
        $http.get('https://tri2022.herokuapp.com/deleteSignalement')
            .success(function(data) {
                // console.log("Ambany "+$idSignalement);
                $scope.erreur = false;
                $scope.id = "";
                if (data != 'err') {
                    if (data != '') {
                        $scope.listeProblemeRegion = data;
                        $scope.resu = true;
                        $scope.pasResu = false;
                    } else {
                        $scope.resu = false;
                        $scope.pasResu = true;
                    }
                } else {
                    $scope.resu = false;
                    $scope.pasResu = false;
                    $scope.erreur = true;
                }
            })
    }
}

function connexAdmin($scope, $http) {
    $scope.connectionAdmin = function() {
        var loginAdmin = document.getElementById("loginAdmin").value;
        var passwordAdmin = document.getElementById("mdpAdmin").value;
        $http.get('https://tri2022.herokuapp.com/valideConnex/' + loginAdmin + '/' + passwordAdmin)
            .success(function(data) {
                // console.log("Tonga le donnees");
                // console.log(loginAdmin);
                // console.log(passwordAdmin);
                // console.log(data);
                if (data == 0) {
                    alert("Diso le login eeee 😤😤😤😤😤");
                } else {
                    //alert($scope.seConnecter=data);
                    window.location.replace("Statistique.html");
                    console.log("Amboary amizay fa efa mandeha io ");
                    // alert("Marina le login eeee 😤😤😤😤😤");
                }
            })
    }
}

function connexChef($scope, $http) {
    $scope.connection = function() {
        var loginChef = document.getElementById("loginChef").value;
        var passwordChef = document.getElementById("mdpChef").value;
        $http.get('https://tri2022.herokuapp.com/valideConnexChef/' + loginChef + '/' + passwordChef)
            .success(function(data) {
                // console.log("Tonga le donnees");
                // console.log(loginAdmin);
                // console.log(passwordAdmin);
                // console.log(data);
                if (data == 0) {
                    alert("Diso le login eeee 😤😤😤😤😤");
                } else {
                    //alert($scope.seConnecter=data);
                    window.location.replace("AcceuilChef.html");
                    
                    console.log("Amboary amizay fa efa mandeha io ");
                    // alert("Marina le login eeee 😤😤😤😤😤");
                }
            })
    }
}

/*function getSignaRegion($scope, $http) {
    $scope.signalId = function() {
        var name = document.getElementById("testname").value;
	    $http.get('https://tri2022.herokuapp.com/getSignalementRegion/'+name )
	        .success(function(data) {
	        	$scope.getSignalementRegion = data;   
	       })
    }
}

/*function connexion($scope,$http){
    $scope.connexion=function($login,$mdp){
        $log=$scope.login+'°'+$scope.mdp;
        $http.get('https://tri2022.herokuapp.com/login/'+$log);
        .success(function(data){
            $scope.listeutilisateur=data;
        })
    }
}*/
