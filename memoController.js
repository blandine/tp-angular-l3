angular.module('memo').controller("MemoController", ["$scope", "$http", "MemoService", function ($scope, $http, memoService) {
    $scope.tabChamps = [];
    $scope.nameCurrentCard = "";

    memoService.getChampions().then(function (response) {
        var champions = response.data.data;

        for (var i = 0; i < 3; i++) {
            $scope.nbRandom = Math.floor((Math.random() * (Object.keys(champions)).length));
            var nomChamp = Object.keys(champions)[$scope.nbRandom];
            var champ0 = {};
            var champ1 = {};
            champ0.nom = nomChamp;
            champ0.img = nomChamp + "_0";
            champ1.nom = nomChamp;
            champ1.img = nomChamp + "_1";
            $scope.tabChamps.push(champ0);
            $scope.tabChamps.push(champ1);
        }
        memoService.shuffle($scope.tabChamps);

    });

    function displayCard(card) {
        card.childNodes[1].childNodes[1].style.visibility = "visible";
        card.childNodes[1].childNodes[3].style.visibility = "visible";
    }

    $scope.turnCard = function ($event) {
        var clickedCard = $event.currentTarget;
        if (!clickedCard.classList.contains('turned')) {
            switch (document.querySelectorAll('.turned').length) {
                case 0:
                    clickedCard.classList.add('turned');
                    displayCard(clickedCard);
                    $scope.nameCurrentCard = clickedCard.childNodes[1].childNodes[3].textContent;
                    break;
                case 1:
                    if ($scope.nameCurrentCard == clickedCard.childNodes[1].childNodes[3].textContent) {
                        clickedCard.classList.add('validated');
                        displayCard($event.currentTarget);
                        document.querySelector('.turned').classList.replace('turned', 'validated');
                        if (document.querySelectorAll('.validated').length == $scope.tabChamps.length) {
                            alert('vous avez gagné !');
                        }
                        break;
                    } else {
                        clickedCard.classList.add('turned');
                        displayCard($event.currentTarget);
                        $scope.nameCurrentCard = "";
                        break;
                    }

                default:
                    var turned = document.querySelectorAll('.turned');
                    var i;
                    for (i = 0; i < turned.length; i++) {
                        turned[i].classList.remove('turned');
                        turned[i].childNodes[1].childNodes[1].style.visibility = "hidden";
                        turned[i].childNodes[1].childNodes[3].style.visibility = "hidden";
                    }
                    clickedCard.classList.add('turned');
                    displayCard($event.currentTarget);
                    $scope.nameCurrentCard = clickedCard.childNodes[1].childNodes[3].textContent;
                    break;
            }
        }

    };

}]);