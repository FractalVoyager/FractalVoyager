## Fractal Voyager v0.0.0

To regenerate ANTLR parser/grammar (and associated files), run the following commands after antlr v4.7.1 is installed:
export CLASSPATH=".:/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH"
alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
antlr4 -Dlanguage=Cpp Fractal.g4 -visitor -no-listener

Note that this will override FractalVisitor.h and FractalBaseVisitor.h which we altered to change return types, so save these files before or remember to change them again (only a few bools returned overides)

To compile the cgen to wasm, run "make" in the root of the cgen folder.

To run the app, run "npm start" it may not work the first time if cgen was freshly compiled, but will eventually.

## TODO

# bug fixes

refer to SYE final paper section 6 for further explanations (p. 55)

- panning and zooming bug fixes (2)

  - after box zoom still pan and zoom correctly ONLY ONE NOT DONE
  - zoom correctly when not centered at the origin
  - panning always consistent, go across halfway
  - zoom doesnt work after entered numbers

- terminal output consistency (3)
  - log everything
  - log at the correct time
- stlying (4)
  - on options overflow (height or width - 50%)... popup modal instead
  - options and header not expanding with screen size
  - re render page on screen resize
- once orbit is drawn, cannot pan or anything like that (5)
  - either disallow these, or make them work (seperate state)
- stuff starts to break after lots of actions (6)
  - cleanup useffects??? ... research
- host somewhere (7)
  - github pages?

# features

- better errror handling if malformed script entered (8)
- pop up c++ editor to pass to emception (9)
- automatic cycle detection (10)
- multiple colors... stops near 1 vs stops near 2 (11)
- draw a line across canvas in paramter plane... get julia set fractals out of it (12)

## Done

- click and drag outside of fractal registers as click on fractal (1)
