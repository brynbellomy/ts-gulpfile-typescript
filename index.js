"use strict";

var gulp = require('gulp'),
    β = require('cli-components-build'),
    fs = require('fs'),
    path = require('path')


exports.checkTsconfig = (opts) => {
    return (done) => {
        let options = {
            projectRoot: opts.projectRoot || path.resolve('.'),
        }

        gulp.task('ts:check-tsconfig', done => {
            const nonexistent = β.tsconfig().files
                                 .map(file => {
                                     const fullpath = path.join(options.projectRoot, file)
                                     return fs.existsSync(fullpath) ? false : fullpath
                                 })
                                 .filter(file => file !== false)

            if (nonexistent.length > 0) {
                throw new Error('[check-tsconfig] The following files were not found:\n - ' + nonexistent.join('\n - '))
            }
            done()
        })
    }
}





