describe.only('source-map', function () {

	var assert = require('chai').assert;
	var path = require("path");
	var grunt = require("grunt");
	var execFile = require("child_process").execFile;
	var stripAnsi = require('strip-ansi');

	require('../index.js').color(false);

	var formatter = path.resolve('index.js');
	var fixtures = "test/fixtures";

	var pathSeperator = path.sep ? path.sep : (process.platform === "win32" ? "\\" : "/");

	var escape = function (str) {
		/*
		str = str.replace(/ /g, '/s');
		str = str.replace(/\t/g, '\\t');
		str = str.replace(/\r/g, '\\r');
		*/
		return str;
	};

	var runCliTest = function (commandArray, expectedExitCode, expectedOutput, done) {

		var proc = execFile('./node_modules/.bin/eslint', commandArray, function (error, stdout) {
				if (error) {
					done(error);
					return;
				}
				var buffer = stdout;
				buffer = "[" + escape(stripAnsi(buffer)) + "]";
				expectedOutput = "[" + escape(expectedOutput) + "]";
				assert.strictEqual(buffer, expectedOutput);
				assert.strictEqual(proc.exitCode, expectedExitCode);
				done();
		});
	};

	describe("when enabled", function () {

		describe("on a coffeescript source-map with fileurl //# sourceMappingURL", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-coffee/config.json", fixtures + "/source-map-coffee/main-fileurl.js"];

			it("should return exitCode 0, with some problems and report positions in source files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-coffee/enabled-path-fileurl.txt", "utf8");
				// apply local absolute path
				expected = expected.replace(/\$_PATH_\$/g, path.resolve('./test/fixtures/source-map-coffee') + pathSeperator);

				runCliTest(topic, 0, expected, done);
			});
		});

		describe("on a coffeescript source-map with dataurl //# sourceMappingURL", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-coffee/config.json", fixtures + "/source-map-coffee/main-dataurl.js" ];

			it("should return exitCode 0, with some problems and report positions in source files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-coffee/enabled-path-dataurl.txt", "utf8");

				runCliTest(topic, 0, expected, done);
			});
		});

		describe("on a coffeescript source-map with relative fileurl on path reporter", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-relative/config.json", fixtures + "/source-map-relative/main.js"];

			it("should return exitCode 0, with some problems and report positions in source files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-relative/path.txt", "utf8");
				// apply local absolute path to sibling directory
				expected = expected.replace(/\$_PATH_\$/g, path.resolve('./test/fixtures/source-map-coffee') + pathSeperator);
				runCliTest(topic, 0, expected, done);
			});
		});

		describe("on a typescript source-map with //@ sourceMappingURL and two source files", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-typescript/config.json", fixtures + "/source-map-typescript/main.js"];

			it("should return exitCode 0, with some problems and report positions in source files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-typescript/enabled-path.txt", "utf8");
				// apply local absolute path
				expected = expected.replace(/\$_PATH_\$/g, path.resolve('./test/fixtures/source-map-typescript') + pathSeperator);

				runCliTest(topic, 0, expected, done);
			});
		});
	});
	/*describe("when not enabled", function () {

		describe("on a coffeescript source-map with //# sourceMappingURL", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-coffee/config.json", fixtures + "/source-map-coffee/main-fileurl.js"];

			it("should return exitCode 0, with some problems and report positions in linted files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-coffee/disabled-path-fileurl.txt", "utf8");
				// apply local absolute path
				expected = expected.replace(/\$_PATH_\$/g, path.resolve('./test/fixtures/source-map-coffee') + pathSeperator);

				runCliTest(topic, 0, expected, done);
			});
		});

		describe("on a typescript source-map with //@ sourceMappingURL and two source files", function () {

			var topic = [ "-f", formatter, "-c", fixtures + "/source-map-typescript/config.json", fixtures + "/source-map-typescript/main.js"];

			it("should return exitCode 0, with some problems and report positions in linted files", function (done) {

				var expected = grunt.file.read(fixtures + "/source-map-typescript/disabled-path.txt", "utf8");
				expected = expected.replace(/\$_PATH_\$/g, path.resolve('./test/fixtures/source-map-typescript') + pathSeperator);

				runCliTest(topic, 0, expected, done);
			});
		});
	});*/
});
