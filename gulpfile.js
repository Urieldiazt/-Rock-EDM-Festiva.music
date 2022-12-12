const {src, dest, watch, parallel} = require('gulp');

//sass
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');

//js
const terserJs = require('gulp-terser-js');

//imagenes
const imgmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache')

function css(done){
    src('src/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/css'))

    done();
}

function vesrsionImgMin(done){
    const opciones = {
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imgmin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function versionWebp(done){
    const opciones = {
        quality:50
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
        
}

function versionAvif(done){
    const opciones = {
        quality:50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();

}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(terserJs())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/js'))
    done();    
}

function dev(done){
    watch('src/scss/**/*.scss', css)    
    watch('src/js/**/*.js', javaScript)
    done();
}




exports.css = css;
exports.vesrsionImgMin = vesrsionImgMin;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.javaScript = javaScript;
exports.dev = parallel(vesrsionImgMin, versionWebp, versionAvif, javaScript, dev);




