export const conf={
   	   host: '127.0.0.1',
	   port: 6379, 
	   max_clients: 30,
	   perform_checks: false, 
	   database: 0,
	    no_ready_check:true,
	   options: {
	     auth_pass: '123456'   ///在redis安装目录下 进行 设置 requirepass  123456
	   }
}