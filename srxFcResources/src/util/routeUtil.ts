import * as fs from 'fs';
import * as path from 'path';
import * as express from "express"
import Log4js from './logs';
const Logger = Log4js.getLogger('error');

var up1=path.resolve(__dirname, '..');
 function Routes(){
	let sz=[];

		const files = searchFiles( up1 +"/controller", [], ".ts"); ////查询整个目录及根目录
		files.forEach(async function (item, index) {
			try{
				let  r= require(item);

				sz.push({path:"/"+getName(item),route:r.default});

			}catch(e){
				Logger.error("-----util  /  routeUtil  /  Routes  ------",e);
			}

		});

	return sz;
}

export function quaxian(){
	let qx=[];

	const files = searchFiles( up1 +"/controller", [], ".ts"); ////查询整个目录及根目录
	files.forEach(async function (item, index) {
		try{
			let  r= require(item);

			qx.push({path:"/"+getName(item),qx:r.default.permissiom,ms:r.default.des});

		}catch(e){
			Logger.error("-----util  /  routeUtil  /  quaxian  ------",e);
		}

	});

	return qx;
}

function getName(paths) {

	let s1 = paths.split("/");
	let s = s1[s1.length - 1];
	let name = s.substr(0, s.length - 3);
	return name;
}


function searchFiles(path, sz, format) {
	const allpath = sz;
	let all = fs.readdirSync(path);
	for (let i = 0; i < all.length; i++) {
		if (fs.lstatSync(path + "/" + all[i]).isDirectory()) {
			searchFiles(path + "/" + all[i], allpath, format);
		} else {
			if (all[i].substring(all[i].length - format.length, all[i].length) == format) {
				allpath.push(path + "/" + all[i])
			}
		}

	}
	return allpath;
}


export default Routes;