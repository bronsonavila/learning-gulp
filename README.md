# Learning Gulp

## About

This project was created by completing [Automate Web Development With Gulp JS](https://www.udemy.com/learn-gulp/) by Andrew Mead. I highly recommend the course; however, it has not been updated since May 2016. As a result, several adjustments have been made to this project to account for ES6 syntax, deprecated libraries, and best practices.

If you are enrolled in [Automate Web Development With Gulp JS](https://www.udemy.com/learn-gulp/) and are consulting this project for additional guidance, please be aware that I did not use the [livereload](https://www.npmjs.com/package/livereload) server that was used by Andrew.  I recommend using [live-server](https://www.npmjs.com/package/live-server) instead.  Additionally, this project does not include a LESS task, as my personal preference is to use SASS.

## Libraries

### Minification

- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

### Concatenation

- [gulp-concat](https://www.npmjs.com/package/gulp-concat)

### CSS Compression

- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)

### Autoprefixer

- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
  - Adds CSS vendor prefixes

### Error Handling

- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
  - Handles errors without Gulp crashing on watch tasks

### Source Maps

- [gulp-sourcemaps](https://www.npmjs.com/package/source-map)
  - Allows you to inspect the individual contents of original/unconcatenated files (e.g., CSS, JS), even though the browser is just using one single concatenated file to generate content

### SCSS

- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
  - NOTE: When using a "partial" SCSS file, the file should be prefixed with an underscore for SASS to recognize the file as a partial

### Babel

- [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)

### Handlebars

- [gulp-wrap](https://www.npmjs.com/package/gulp-wrap)
- [gulp-declare](https://www.npmjs.com/package/gulp-declare)
- [gulp-handlebars](https://www.npmjs.com/package/gulp-handlebars)
- [handlebars](https://www.npmjs.com/package/handlebars)

### Image Compression

- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
  - Image minification (lossy and lossless)
- [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant/v/0.1.0)
  - Lossy compression for PNG files
- [imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress)
  - Lossy compression for JPEG files

### Deleting Files/Folders

- [del](https://www.npmjs.com/package/del)

### Zipping Files/Folders

- [gulp-zip](https://www.npmjs.com/package/gulp-zip)
