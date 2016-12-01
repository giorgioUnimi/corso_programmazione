var app = angular.module('app1', ['lbServices']);
	app.controller('app1Controller',
		['$scope', 'Todo',function($scope,Todo) {
			$scope.todos=[];
			$scope.todosdone=[];
			$scope.newTodo ={
				name:"",
				desc:"",
				important:false
			}

			$scope.aggiungitodo=function(){

				console.log("aggiungo "+$scope.newTodo);

				
			}

			$scope.cancellatodo=function(idtodo){
				
				console.log("cancella "+$scope.newTodo  + " " + idtodo);
				Todo.deleteById(idtodo);
						$scope.todos=[];
						$scope.todosdone  = [];
						getTodos();
			}

			$scope.eseguitodo=function(idtodo){
				
				console.log("esegui "+$scope.newTodo + " " + idtodo);
				for(i=0;i<$scope.todos.length;i++){
					if($scope.todos[i].id==idtodo){
						$scope.todos[i].done = true;
						Todo.upsert($scope.todos[i]).$promise.then(function(){
						$scope.todos=[];
						$scope.todosdone  = [];
						getTodos();	
						});
						
						break;
					}
				}
				
			}



			function getTodos() {
				Todo
				.find()
				.$promise
				.then(function(results) {
					for(i=0;i<results.length;i++)
					{
						if(results[i].done===false || results[i].done === null){
							$scope.todos.push(results[i]);
						}else
						{
							$scope.todosdone.push(results[i]);
						}
					}
				
				console.log(results);
				});
				}

			getTodos();

		}]);
