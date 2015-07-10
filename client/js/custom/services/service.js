'use strict';
app.factory('BannerFactory', function ($resource,API_URL) {
    return $resource(':url', {}, {
        query: { method: 'GET', isArray: true, url:API_URL+'banners', params: {}},
        create: { method: 'POST', url:API_URL+'banners?access_token=:access_token', params: {access_token:'@access_token'}},
        show: { method: 'GET', url:API_URL+'banners/:id', params: {id: '@id'}},
        update: { method: 'PUT', url:API_URL+'banners/:id?access_token=:access_token', params: {id: '@id',access_token:'@access_token'}},
        delete: { method: 'DELETE', url:API_URL+'banners/:id?access_token=:access_token',params: {id: '@id',access_token:'@access_token'}}
    })
});