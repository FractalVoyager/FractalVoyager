## Fractal Voyager v0.0.0

To regenerate ANTLR parser/grammar (and associated files), run the following commands after antlr v4.7.1 is installed:
export CLASSPATH=".:/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH"
alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
antlr4 -Dlanguage=Cpp Fractal.g4 -visitor -no-listener

Note that this will override FractalVisitor.h and FractalBaseVisitor.h which we altered to change return types, so save these files before or remember to change them again (only a few bools returned overides)

To compile the cgen to wasm, run "make" in the root of the cgen folder.

To run the app, run "npm start" it may not work the first time if cgen was freshly compiled, but will eventually.

## TODO

what to do to fix styling:

- terminal DONE
  - minimize option DONE
  - set a max height DONE
- make it so viewer container is the width of the calcuated width of the pixle area DONE
  - then make it so the controls take the rest of the possible width DONE
- on terminal resize (or screen resize)... update sizes of cans DONE
- shrink text boxes horizontally DONE
- fix error that everything fails if screen is a square "or less" canvcomponent line 54 DONE
- when extra horizontal space... either max options longer, or keep download button to the left DONE
- when height of options will overflow screen size.... popup modals SORTA DONE, just need to amke the buttons actualyl do things
- for the width... when the min width is reached, they start pushing up the viewer, at this point, make pop up modals so viewer never gets pushed up DONE

# bug fixes

refer to SYE final paper section 6 for further explanations (p. 55)

- terminal output consistency (3)
  - log everything
  - log at the correct time
- stlying (4)

- stuff starts to break after lots of actions (6)
  - cleanup useffects??? ... research
- seperate state for orbits from pixles (7)
  - would make updates work when in orbit, (weird because some stuff is for orbit)
- make the chunks of the controls componenets - can pass down setStates (8)

# features

- better errror handling if malformed script entered (8)
- pop up c++ editor to pass to emception (9)
- automatic cycle detection (10)
- multiple colors... stops near 1 vs stops near 2 (11)
- draw a line across canvas in paramter plane... get julia set fractals out of it (12)

## Done

- click and drag outside of fractal registers as click on fractal (1)
- panning and zooming bug fixes (2)
  - after box zoom still pan and zoom correctly and vise versa DONE
  - after pan or zoom, box zoom correctly DONE
  - zoom correctly when not centered at the origin DONE
  - panning always consistent, go across halfway DONE
  - zoom doesnt work after entered numbers DONE
- host somewhere (7)
  - github pages?
- once orbit is drawn, cannot pan or anything like that (5)
  - disallow these
