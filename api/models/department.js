var Sequelize = require('sequelize');  

exports.department=function(sequelize, DataTypes) {
		  var deptshema = sequelize.define("department", {
			    title:{ type : Sequelize.STRING,
			    validate :{notNull : true}
			    }
			  });
		   return deptshema;
			};

