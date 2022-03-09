/**
 * 环境配置封装
 */
 const env = import.meta.env.MODE || 'prod';
 const EnvConfig = {
     development:{
         baseApi:'/api',
         mockApi:'https://www.fastmock.site/mock/9bbf1894ff9a9c7a0ee340e7c1bce6a0/api'
     },
     test:{
         baseApi:'//test.futurefe.com/api',
         mockApi:'https://www.fastmock.site/mock/9bbf1894ff9a9c7a0ee340e7c1bce6a0/api'
     },
     production:{
         baseApi:'//futurefe.com/api',
         mockApi:'https://www.fastmock.site/mock/9bbf1894ff9a9c7a0ee340e7c1bce6a0/api'
     }
 }
 export default {
     env,
     mock:false,
     namespace:'manager',
     ...EnvConfig[env]
 }