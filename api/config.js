/**
 * This is the default configuration file for app. All settings use default or
 * development values.
 * 
 * For production use, another conf file, with production settings, should be
 * placed at the path indicated by 'conf_external_path'. If such file is found,
 * it will be used instead of this file.
 * 
 * @type {{conf_external_path: string, conf_mongoose: {host: string, port:
 *       number, db_name: string}, conf_server: {name: string, version: string,
 *       host: string, port: number}, conf_token: {expireAfterSeconds: number},
 *       conf_api_client: {clients: *[]}}}
 */
module.exports = {

	// Log settings
	conf_log : {
		name : 'jobportal_log',
		console : true,
		log_file : __dirname + '/log/app.log'
	},

	// MongoDB settings.
	conf_sequelize : {
		host : '127.0.0.1',
		db_name : 'jobnode',
		user : 'root',
		password : 'hrhk',
		dialect : "mysql", // or 'sqlite', 'postgres', 'mariadb'
		port : 3306, // or 5432 (for postgres)
		timestamp : false
		
	},

	// Server settings.
	conf_server : {
		name : 'Job Portal webservice',
		version : '0.0.1',
		host : '127.0.0.1',
		port : 8000
	}
};