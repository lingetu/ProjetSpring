import { BASE_URL } from '../app/shared/constants/urls';

(function(window) {
    window.__env = window.__env || {};
  
    // API url
    window.__env.apiUrl = `${BASE_URL}/api`;
  
    // Other variables
    window.__env.enableDebug = true;
  }(this));
  