var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
require('babel-register');// gulp mocha use es6 must import

gulp.task('default',['webpack-dev-server']);

gulp.task('build-dev',['webpack:build-dev'],function(){
    gulp.watch(['src/**/*'],['webpack:build-dev'])
});

gulp.task('build',['webpack:build']);

gulp.task('webpack:build',function(callback){
    var myConfig = Object.create(webpackConfig);
    //cheap-module-eval-source-map,eval,sourcemap
    // myConfig.devtool = "sourcemap";
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env":{"NODE_ENV":JSON.stringify("production")}
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    );
    webpack(myConfig,function (err,stats) {
        if(err) throw new gutil.PluginError('webpack:build',err);
        gutil.log('[webpack:build]',stats.toString({colors:true}));
        callback();
    });
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
myDevConfig.cache = true;

var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev',function(callback){
    devCompiler.run(function (err,stats) {
        if(err) throw new gutil.PluginError('webpack:build-dev',err);
        gutil.log('[webpack:build-dev]',stats.toString({colors:true}));
        callback();
    });
});

gulp.task('webpack-dev-server',function(callback){
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "sourcemap";
    myConfig.debug = true;
    myConfig.cache = true;
    // myConfig.entry.tt.unshift('webpack-dev-server/client?http://localhost:8080/','webpack/hot/dev-server');
    var item;
    for(var i in myConfig.entry ){
        item = myConfig.entry[i];
        if(Array.isArray(item)){
            item.unshift('webpack/hot/dev-server');
        }else{
            myConfig.entry[i]=['webpack/hot/dev-server',item];
        }
    }
    var host = "localhost";
    var port = 8081;
    var portStr = port==80?'':(':'+port);
    var url = 'http://'+host+portStr+'/webpack-dev-server/';
    myConfig.plugins = myConfig.plugins.concat(
        new OpenBrowserPlugin({url:url})
    );
    new WebpackDevServer(webpack(myConfig),{
        hot:true,
        historyApiFallback:true,
        publicPath:myConfig.output.publicPath,
        stats:{colors:true}
    }).listen(port,host,function(err){
        if(err) throw new gutil.PluginError('webpack-dev-server',err);
        gutil.log('[webpack-dev-server]',url);
    });
});

gulp.task('test:console',function(callback){
    process.env.NODE_ENV = 'test';
    gulp.src('test/**/*.spec.js')
        .pipe(mocha({
            require:['./test/setup.js']
        }));
});

gulp.task('test',function(callback){
    process.env.NODE_ENV = 'test';
    gulp.src('test/**/*.spec.js')
        .pipe(mocha({
            require:['./test/setup.js'],
            reporter:'xunit',
            reporterOptions:{
                output:'report/report.xml'
            }
        }));
});

/*
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');

var paths = {
    src : 'src/!**!/!*.*',
    output : 'public/js/app/r-page/!*',
    devFile : 'public/js/app/r-page/!**!/!*.js',
    outputFile : 'public/js/app/r-page'
};

gulp.task('clean',function(){
    del(paths.output);
});

gulp.task('compile',['clean'],function(){
    return gulp.src(paths.src)
        .pipe(babel({presets:['react']}))
        .pipe(gulp.dest(paths.outputFile))
});


gulp.task('build',['compile'],function(){
    return gulp.src(paths.devFile)
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify({preserveComments:'all'})).on('error',gutil.log)
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.outputFile));
});

gulp.task('watch',function(){
    gulp.watch(paths.src,['build'])
});

gulp.task('default',['watch']);*/
