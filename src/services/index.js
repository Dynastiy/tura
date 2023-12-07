import Vue from 'vue'

// Main App Domain
import appDomain from "./appDomain.js";
Vue.prototype.appDomain = appDomain 

// Middleware Domain Services 
import middleware from "./middleware.js";
Vue.prototype.middleware = middleware 

// Withdrawal Domain Services 
import withdrawal from "./withdrawal.js";
Vue.prototype.withdrawal = withdrawal 