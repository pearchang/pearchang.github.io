var app = angular.module("demo", ['angular-toArrayFilter']);

app.controller('productController', ['$scope', 'Product', function ($scope, Product) {
    $scope.products = Product.products;
    $scope.productTypes = [];
    $scope.productBrands = [];
    $scope.filterTypes = [];
    $scope.filterBrands = [];

    Product.products.forEach(function (product) {
        if (0 > $scope.productTypes.indexOf(product.type)) {
            $scope.productTypes.push(product.type);
        }
        if (0 > $scope.productBrands.indexOf(product.brand)) {
            $scope.productBrands.push(product.brand);
        }
    });

    $scope.productFilter = function(product) {
        if ($scope.searchKey !== undefined && $scope.searchKey.length > 0) {
            console.log($scope.searchKey);
            var filterByKey = true;
            if (product.name.toUpperCase().indexOf($scope.searchKey.toUpperCase()) > -1) {
                return true;
            }
            if (product.brand.toUpperCase().indexOf($scope.searchKey.toUpperCase()) > -1) {
                return true;
            }
        }
        if (Object.keys($scope.filterTypes).length > 0) {
            var filterByType = true;
            for (type in $scope.filterTypes) {
                if ($scope.filterTypes[type]) {
                    if (product.type.indexOf(type) > -1) {
                        return true;
                    }
                }
            }
        }

        if (Object.keys($scope.filterBrands).length > 0) {
            var filterByBrand = true;
            for (brand in $scope.filterBrands) {
                if ($scope.filterBrands[brand]) {
                    if (product.brand.indexOf(brand) > -1) {
                        return true;
                    }
                }
            }
        }

        if (filterByKey || filterByType || filterByBrand) {
            return false;
        }

        return true;
    };
}]);

app.controller('cartController', ['$scope', 'Cart', function ($scope, Cart) {
    $scope.$on('cart.update', function(event) {
        $scope.cart = Cart;
        $scope.$apply();
    });
    $scope.cart = Cart;
}]);

app.directive( "addToCart", [ 'Cart', function( Cart ) {
    return {
        restrict: "A",
        link: function( scope, element, attrs ) {
            element.bind( "click", function() {
                Cart.addToCart(JSON.parse(($(this).val())));
            });
        }
    }
}]);

app.service( 'Product', [ '$rootScope', function( $rootScope ) {
    var Product = {
        products: [
            {
                "id": "1",
                "name": "Nike",
                "image": "shoes",
                "type": "shoes",
                "brand": "Nike",
                "price": "1000",
                "description": "Description for product",
            },
            {
                "id": "2",
                "name": "Adidas",
                "image": "shoes",
                "type": "shoes",
                "brand": "Adidas",
                "price": "1200",
                "description": "Description for product",
            },
            {
                "id": "3",
                "name": "Neblance",
                "image": "shoes",
                "type": "shoes",
                "brand": "Neblance",
                "price": "1500",
                "description": "Description for product",
            },
            {
                "id": "4",
                "name": "Puma",
                "image": "shoes",
                "type": "shoes",
                "brand": "Puma",
                "price": "1100",
                "description": "Description for product",
            },
            {
                "id": "5",
                "name": "Vans",
                "image": "shoes",
                "type": "shoes",
                "brand": "Vans",
                "price": "1500",
                "description": "Description for product",
            },
            {
                "id": "6",
                "name": "Sport pants",
                "image": "pants",
                "type": "pants",
                "brand": "Others",
                "price": "1300",
                "description": "Description for product",
            },
            {
                "id": "7",
                "name": "Nike shirts",
                "image": "shirts",
                "type": "shirts",
                "brand": "Nike",
                "price": "300",
                "description": "Description for product",
            },
            {
                "id": "8",
                "name": "Whtie shirts",
                "image": "shirts",
                "type": "shirts",
                "brand": "Others",
                "price": "300",
                "description": "Description for product",
            },
        ],
    }
    return Product;
}]);

app.service( 'Cart', [ '$rootScope', function( $rootScope ) {
    var cart = {
        orders: [
        ],
        count: 0,
        amount: 0,
        addToCart: function ( product ) {
            cart.count += 1;
            cart.amount  += Number(product.price);

            var tmp = [];
            var exist = false;

            cart.orders.forEach(function(v, k) {
                if (v.id == product.id) {
                    v.count += 1;
                    exist = true;
                }
                tmp.push(v);
            });

            if (false == exist) {
                product.count = 1;
                tmp.push(product);
            }

            cart.orders = tmp;

            $rootScope.$broadcast( 'cart.update' );
        }
    }
    return cart;
}]);
