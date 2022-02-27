function roughScale(x, base) {
    const parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    const valeur = (parsed + 1);
    return valeur;
}

function signalement($scope, $http) {
    $http.get('http://localhost:9000/listeSignalement')
        .success(function(data) {
            $scope.listeSignalement = data;
            // console.log(data);
        })

    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })

    $http.get('http://localhost:9000/listeStatut')
        .success(function(data) {
            $scope.listeStatut = data;
        })

    $scope.deleteSignalement = function($chiffre) {
        $http.get('http://localhost:9000/deleteSignalement/' + $chiffre)
            .success(function(data) {
                $scope.deleteSignaux = data;
                alert('Donnée supprimé 😪😪😪 ');
            })
    }

    $scope.updateSignalement = function($chiffre) {
        var selectElement = document.getElementById("Statut");
        var valeurSelectionner = selectElement.options[selectElement.selectedIndex].value;
        var textSelectionner = selectElement.options[selectElement.selectedIndex].text;
        console.log(valeurSelectionner);
        console.log(textSelectionner);
        $http.get('http://localhost:9000/updateSignalement/' + $chiffre + '/' + valeurSelectionner)
            .success(function(data) {
                $scope.updateSignaux = data;
                alert('Donnée insérer 😊😊😊 ');
            })
    }

    $scope.affecterSignalement = function($idProbleme, $idRegion) {
        $http.get('http://localhost:9000/affectationParRegion/' + $idProbleme + '/' + $idRegion)
            .success(function(data) {
                alert(data);
            })
    }
}

function region($scope, $http) {
    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $scope.deleteRegion = function($chiffre) {
        $http.get('http://localhost:9000/deleteRegion/' + $chiffre)
            .success(function(data) {
                $scope.deleteSignaux = data;
                alert('Région supprimée 😪😪😪 ');
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
                alert('Donnée inserer 😊😊😊 ');
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
        $http.get('http://localhost:9000/listeStat')
            .success(function(data) {
                $scope.listeStatistique = data;
                region = $scope.listeStatistique;
                lab();
                console.log(labe);
            })
    }
    $scope.affichageStatByRegion = function($id) {
        $http.get('http://localhost:9000/listeliste/' + $id)
            .success(function(data) {
                $scope.listeStat = data;
                console.log(data);
            })
    }

    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })

    $scope.affichageStatByRegion = function($id) {
        $http.get('http://localhost:9000/listeliste/' + $id)
            .success(function(data) {
                $scope.listeStat = data;
            })
    }

    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $scope.chart = function($id) {
        $http.get('http://localhost:9000/statByStatut/mande/' + $id)
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
        $http.get('http://localhost:9000/listeStat')
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
        $http.get('http://localhost:9000/statByStatut/' + $id)
            .success(function(data) {
                $scope.listeStatStatut = data;
            })
    }
}

function controlRecherche($scope, $http) {
    $http.get('http://localhost:9000/listeRegion')
        .success(function(data) {
            $scope.listeRegion = data;
        })
    $http.get('http://localhost:9000/listeStatut')
        .success(function(data) {
            $scope.listeStatut = data;
        })
    $http.get('http://localhost:9000/lista')
        .success(function(data) {
            $scope.listeProb = data;
        })
    $scope.listeProbleme = null;
    $scope.pasResu = false;
    $scope.resu = false;
    $scope.erreur = false;
    $scope.listeRechercheRegion = function() {
        $http.get('http://localhost:9000/listeRechercheRegion/' + $scope.recherche)
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
        console.log('http://localhost:9000/listeRechercheProbleme/' + $scope.recherche);
        $http.get('http://localhost:9000/listeRechercheProbleme/' + $scope.recherche)
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
        $http.get('http://localhost:9000/listeRechercheProblemeParRegion/' + $scope.recherche)
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
        var region = document.getElementById('region').options[document.getElementById('region').selectedIndex].value;
        var stat = document.getElementById('stat').options[document.getElementById('stat').selectedIndex].value;
        $scope.listeProbleme = [];
        $http.get('http://localhost:9000/listeRecherchePro/' + blem + '=' + region + '!' + stat)
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
}

function utilisateur($scope, $http) {
    $http.get('http://localhost:9000/listeUtilisateur')
        .success(function(data) {
            $scope.listeUtilisateur = data;
        })
}

function controlUtilisateur($scope, $http) {
    $http.get('http://localhost:9000/listeUtilisateur')
        .success(function(data) {
            $scope.listeUtilisateur = data;
        })
}

function controlDelete($scope, $http) {
    $scope.deleteSignalement = function() {
        $http.get('http://localhost:9000/deleteSignalement')
            .success(function(data) {
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
        $http.get('http://localhost:9000/valideConnex/' + loginAdmin + '/' + passwordAdmin)
            .success(function(data) {
                if (data == 0) {
                    alert("Problème de connexion!! Veuillez réessayer");
                } else {
                    window.location.replace("Statistique.html");
                }
            })
    }
}

function connexChefRegion($scope, $http) {
    $scope.connection = function() {
        var loginChefRegion = document.getElementById("loginChefRegion").value;
        var passwordChefRegion = document.getElementById("passwordChefRegion").value;
        console.log(loginChefRegion);
        console.log(passwordChefRegion);
        $http.get('http://localhost:9000/seConnecertChefRegion/' + loginChefRegion + '/' + passwordChefRegion)
            .success(function(data) {
                if (data == 0) {
                    alert("Problème de connexion!! Veuillez réessayer");
                } else {
                    window.location.replace("InfoRegion.html");
                }
            })
    }
}

function listeChefRegion($scope, $http) {
    $http.get('http://localhost:9000//liste/listeChefRegion')
        .success(function(data) {
            $scope.listeChefRegion = data;
            console.log(data);
        })
}