import axios from 'axios'

export default function(url = '', options = {}, type = 'GET'){
     let optionsStr = '';
     for(let key in options){
        optionsStr +=  key + '=' +options[key] + '&'  
     }
     if(optionsStr){
        optionsStr = optionsStr.substr(0,optionsStr.lastIndexOf('&'))
     }
     
     if(type.toUpperCase() === 'GET'){
        url += '?' + optionsStr +'&wu='+ randomCode(10)
        return axios.get(url,{withCredentials:true})    
     }else if(type.toUpperCase() === 'POST'){
        return axios.post(url, options,{withCredentials:true})
     }

}
function randomCode(length) {
   let chars = ['0','1','2','3','4','5','6','7','8','9'];
   let result = "";
   for(let i = 0; i < length ; i ++) {
       let index = Math.ceil(Math.random()*9);
       result += chars[index];
   }
   return result;
}