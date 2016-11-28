var App = angular.module("App", []);

App.factory("api", function ($http, books, json) {
    return {
        list: function () {
            $http.get("/books").then(function (resp) {
                //resp是一个响应对象
                //books = resp.data;//不能直接赋值
                resp.data.map(function (obj) {
                    books.push(obj);
                });
                console.log("get", resp);
            }, function (resp) {
                //带有错误信息的resp
                console.log(resp);
            });
        },
        save: function () {

        },
        update: function () {
            console.log("update", books);
        },
        del: function (id) {
            books.map(function (book, index) {
                console.log("deling:",id);
                if (book._id === id) {
                    books.splice(index, 1);
                    
                }
            });
        }
    }
});
App.factory("books", function () {
    return [];
});
App.factory("json", function () {
    return {};
});
App.controller("list", function ($scope, api, json, books) {
    api.list();
    $scope.books = books;
    $scope.del = function (obj) {
        var book_id = obj.book._id;
        api.del(book_id);
    }
    $scope.update = function () {
        api.update();
    }
});
App.controller("page", function ($scope, $http) {

});
App.controller("book", function ($scope, $http) {

});