"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = exports.REDIS = void 0;
const redisPool = require("redis-connection-pool");
const redis_conf_1 = require("./redis_conf");
exports.REDIS = redisPool("myredispool", redis_conf_1.conf);
function set(key, val, time = 30) {
    return new Promise(function (resolve, reject) {
        exports.REDIS.set(key, val, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(data);
                console.log("看看里边是什么", data);
                exports.REDIS.expire(key, time);
            }
        });
    });
}
exports.set = set;
function get(key) {
    return new Promise(function (resolve, reject) {
        exports.REDIS.get(key, function (err, data) {
            if (err) {
                reject(err);
                ///resolve(0);
                console.log("查询出现错误");
            }
            else {
                resolve(data);
                console.log("查询出来数据啦", data);
            }
        });
    });
}
exports.get = get;
/*
export const Cache=redisPool("myredispool",conf);




export async function  save(key,val,time="60"){
     new Promise(function(resolve,reject){
        Cache.set(key,val,function(err,rows){
               if (err) {
                        reject(err);
                      } else {
                    //	Cache.expire('key',time);
                           resolve(rows);
                           console.log("回调的是啥",rows);
                      }
        });
        Cache.expire(key,time);
        
     })
  }
  
  export async function get(key){
      return new Promise(function(resolve,reject){
        Cache.get(key,function(err,rows){
                   if (err) {
                            reject(err);
                          } else {
                            resolve(rows);
                          }
            });
        
    })
      
      
  }
  
  */ 
//# sourceMappingURL=Cache.js.map