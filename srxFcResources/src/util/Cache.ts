import  * as redisPool from  "redis-connection-pool"
import {conf} from "./redis_conf"
export const  REDIS=redisPool("myredispool",conf);

export  function set(key,val,time=600){
	return new Promise(function(resolve,reject){

		REDIS.set(key,val,function(err,data){
			if(time != -1){
				if(err){
					reject(err);
				}else{

					REDIS.expire(key,time);
					resolve(data);
				}
			}

		})
	});

}


export function get(key){

	return new Promise(function(resolve,reject){
		REDIS.get(key,function(err,data){
			if(err){
				reject(err)
			}else{
				resolve(data);

			}
		})

	})
}



export async  function udp(key,time=600){
	let k=await REDIS.expire(key,time);
	return k;
}

export async  function del(key){
	let k=await REDIS.del(key);
	return k;

}


