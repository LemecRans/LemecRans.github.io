// function getLienUrl() {
//     var lien = document.URL.substring(document.URL.lastIndexOf("=") + 1);
//     console.log(lien);
//     return lien;
// }

function controlTestLien($scope,$http){
    var lien = document.URL.substring(document.URL.lastIndexOf("=") + 1);
    console.log(lien);
    $http.get('http://localhost:9000/allRegionById/'+lien)
    .success(function(data){
        $scope.region=data;
        console.log(data);
    });

    $http.get('http://localhost:9000/listeliste/'+lien)
    .success(function(data){
        $scope.listeStat=data;
    })
}

controlTestLien();
