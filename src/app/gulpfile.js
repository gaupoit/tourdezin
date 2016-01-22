'use strict'
var gulp = require("gulp");
var eslint = require("gulp-eslint");
var gulpNodemon = require("gulp-nodemon");
var shell = require("gulp-shell");

gulp.task("dev", function() {
	return gulpNodemon({
		script: "server.js",
		watch: "*.js",
		exec: "./node_modules/.bin/babel-node",
		args: ["--port", "8080"]
	});
});

gulp.task("migrate", shell.task([
	"./node_modules/.bin/sequelize db:migrate"
]));
	