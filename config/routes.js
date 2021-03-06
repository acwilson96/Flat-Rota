/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // Device Controller
  
  'post /device/get': {
    controller: 'DeviceController',
    action: 'get'
  },

  'post /device/create': {
    controller: 'DeviceController',
    action: 'create'
  },

  'post /device/destroy': {
    controller: 'DeviceController',
    action: 'destroy'
  },

  // User Controller

  'post /user/get': {
    controller: 'UserController',
    action: 'get'
  },

  'post /user/create': {
    controller: 'UserController',
    action: 'create'
  },

  'post /user/destroy': {
    controller: 'UserController',
    action: 'destroy'
  },

  'post /user/update': {
    controller: 'UserController',
    action: 'update'
  },

  // Flat Controller

  'post /flat/get': {
    controller: 'FlatController',
    action: 'get'
  },

  'post /flat/create': {
    controller: 'FlatController',
    action: 'create'
  },

  'post /flat/destroy': {
    controller: 'FlatController',
    action: 'destroy'
  },

  'post /flat/update': {
    controller: 'FlatController',
    action: 'update'
  },

  'post /flat/leave': {
    controller: 'FlatController',
    action: 'leave'
  },

  // Item Controller

  'post /item/get': {
    controller: 'ItemController',
    action: 'get'
  },

  'post /item/create': {
    controller: 'ItemController',
    action: 'create'
  },

  'post /item/destroy': {
    controller: 'ItemController',
    action: 'destroy'
  },

  'post /item/update': {
    controller: 'ItemController',
    action: 'update'
  },

  'post /item/setstatus': {
    controller: 'ItemController',
    action: 'setstatus'
  },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
