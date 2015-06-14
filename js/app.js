
var sticky = angular.module("sticky",['ngRoute']);


//Angular Js Services

sticky.service('noteService', ['$http', function($http){
	var data = [
	{id:1,title:"Note1",text:"simple text"},
	{id:2,title:"Note2",text:"simple text"},
	{id:3,title:"Note3",text:"simple text"},
	{id:4,title:"Note4",text:"simple text"},
	{id:5,title:"Note5",text:"simple text"},
	{id:6,title:"Note6",text:"simple text"},
	{id:7,title:"Note7",text:"simple text"},
	{id:8,title:"Note8",text:"simple text"},
	{id:9,title:"Note9",text:"simple text"},
	{id:10,title:"Note10",text:"simple text"}
	];

	this.notes = function(){
		return data;
	};
	this.addnotes = function(noteTitle,noteText){
		var current_index = data.length;
		var id = current_index+1;
		data.push({
			id:id,title:noteTitle,text:noteText
		});
		return data;
	};

	this.deletenotes = function(id){
		var oldNotes = data;
                data = [];

                angular.forEach(oldNotes, function (note) {
                    if (note.id !== id) data.push(note);
                });
                return data;
    }
}]);

//Angular JS Directives
	sticky.directive("tooltipd",function(){
		return {
			restrict:"C",
			link:function(scope,element,attrs){
			element.bind("mouseover",function(){
				//$scope.tooltip = true;
				alert("hi");
			});
			}

		}
	});


//Angular JS controllers

sticky.controller('mainCtrl', ['$scope','$timeout','noteService', function($scope,$timeout,noteService){
		$scope.popup = false;
		$scope.tooltip = false;
		

		$scope.listofnotes = noteService.notes();
		var showhide = function(){
			$scope.popup = true;
			$scope.loader = false;
		};
		$scope.addNew = function(){
			$scope.loader = true;
			$timeout(showhide,1000);
		};

		$scope.addnote = function(){
			$scope.listofnotes = noteService.addnotes($scope.title,$scope.titletext);
			$scope.title="";
			$scope.titletext = "";
			$scope.popup = false;
		};

		$scope.deletenote = function(id){
			$scope.listofnotes = noteService.deletenotes(id);
			//noteService.notes();
			//alert(noteService.deletenotes(id));
			//alert(id);
			//console.log(noteService.deletenotes(id));
		};

}]);
/*
var dir = angular.module("dir",[]);

dir.directive("helloWorld",function(){
	return {
		scope:{
			//color:'@colorAttr'
			//color:'@'

			color: '='
			//sayHello:'&amp;'
		},
		restrict:"AE",
		replace:"true",
		template:'<p style="background-color:{{ color }}">Hello World',
		link:function(scope,element,attrs){
			element.bind("click",function(){
				element.css("background-color","white");
				scope.$apply(function(){
					scope.color = "white";
				});
			});

			element.bind("mouseover",function(){
				element.css("cursor",'pointer');
			});


		}
	};
});

dir.directive("outputText",function(){
	return {
		transclude:true,
		scope:{},
		template:"<div ng-transclude></div>"
	};
});

dir.controller('MainCtrl', ['$scope', function($scope){
	$scope.name="World";
	$scope.hobby = "Love Angular Js";
}]);

*/