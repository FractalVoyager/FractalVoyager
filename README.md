## Fractal Voyager v0.0.0

To regenerate ANTLR parser/grammar (and associated files), run the following commands after antlr v4.7.1 is installed:
export CLASSPATH=".:/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH"
alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
antlr4 -Dlanguage=Cpp Fractal.g4 -visitor -no-listener

Note that this will override FractalVisitor.h and FractalBaseVisitor.h which we altered to change return types, so save these files before or remember to change them again (only a few bools returned overides)

To compile the cgen to wasm, run "make" in the root of the cgen folder.

To run the app, run "npm start" it may not work the first time if cgen was freshly compiled, but will eventually.
