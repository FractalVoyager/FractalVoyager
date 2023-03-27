// https://tomassetti.me/listeners-and-visitors/
// https://tomassetti.me/getting-started-antlr-cpp/

// not including the runtime - is in demo, difference with the ex from gtihub, probablty needed
// for wasm - understand this more

#include <iostream>
#include <stdio.h>
#include "FractalParser.h"
#include "FractalLexer.h"
#include "FractalBaseVisitor.h" 
#include "FractalVisitor.h"
#include "antlr4-runtime.h"
#include "MyVisitor.h"
#include <complex.h>
#include <emscripten/emscripten.h>

// #include "libantlr4-runtime.a"



std::string outputCode;
int length;
int type;

using namespace std;
using namespace antlr4;

int main(int argc, const char* argv[]) { return 0; }


// this if thing in ex makes it so it runs the emscripten way if emscripten is defined?,
// then the else block runs the lexer+parser in the more normal way that is shown in the examples online 
#ifdef __EMSCRIPTEN__



/*

CGEN: 

- function cgen() takes a string returns the length of the cgened code string so we know how much to allocate for ptr
- function getCgen() takes a ptr and returns 0 for param space (if there is a c var), or 1 for dyn space, and writes to that pointer the code 

*/


// function for cwrap here 
extern "C" {



  // EMSCRIPTEN_KEEPALIVE void run_script(const char *stream, int type, double fixedVarRe, double fixedVarIm, double critRe, double critIm, 
  // double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale,  uint8_t *ptr) {

    EMSCRIPTEN_KEEPALIVE int cgen(const char *stream) {




    // turn the input into antlr format 
    antlr4::ANTLRInputStream input(stream);
    // creaate lexer, get tokens, parse
    FractalLexer lexer(&input);
    antlr4::CommonTokenStream tokens(&lexer);
    FractalParser parser(&tokens);
    // call script method - this scriptContext contains method to access the text caputred by the rule
    FractalParser::ScriptContext* tree = parser.script();


    //////////////////////////////////////////////////////////////////////////////////////////////////// - TODO get rid of
  
    std::string crit = "z"; // can have this set by the user 
    // variable to set screen point to 
    std::string screen = "c"; // can have this set by the user
    std::complex<double> crit_point(0.,0.); 

    //myVisitor visitor(16, 4., 0.1, crit, screen, crit_point); // CHANGE
    myVisitor visitor; // CHANGE


    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // generate headers
    std::stringstream headers; 
    headers << "#include <math.h>\n#include <stdint.h>\n#include <complex.h>\n#include<stdio.h>\n#include <emscripten/emscripten.h>\n";
    // std::cout << headers.str();
    // generate defns
    // if starting as dyn fcn, will only need 
    std::stringstream defns;
    // onle need one because z is always set to 0 unless there is a set in script (may need to handle this additionally)
    defns << "int calcPixel(double z_re, double z_im, double c_re, double c_im, int maxIters, int minRadius, int maxRadius, int type);\n";
    defns << "int getIdx(int x, int y, int width, int color);\n" ;// gonna wanna change this when I have more complex coloring

    // "main" (big loops) fcn 
    std::stringstream bigLoops;
    // fcn defn
                                                                      // only need these fixed vars for clicked on dyn
    bigLoops << "EMSCRIPTEN_KEEPALIVE void genPixles(int type, int color, double fixed_re, double fixed_im, int maxIters, double iterMult, double minRadius, double maxRadius, double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr)\n{\n";
    bigLoops << "for (int x = 0; x < floor(newCanWidth); x++){\nfor (int y = 0; y < floor(newCanHeight); y++){\n double screen_re = (((widthScale * x) + startX) - width / 2.) / (height  /2.);\ndouble screen_im = -(((heightScale * y) + startY) - height /2.) / (height /2.);\n";
    bigLoops << "int iterations;\nif(type == 0) {\niterations = calcPixel(0.,0.,screen_re,screen_im, maxIters, minRadius, maxRadius, type);\n} else if(type == 1) {\niterations = calcPixel(screen_re, screen_im, fixed_re, fixed_im, maxIters, minRadius, maxRadius, type);\n}\nptr[getIdx(x, y, width, 0)] = round(iterations * iterMult);\n ptr[getIdx(x, y, width, 3)] = 255;\n}\n}\n}\n";

    // generate getIdx
    std::stringstream getIdx;
    getIdx << "int getIdx(int x, int y, int width, int color){\nint red = y * (width * 4) + x * 4;\nreturn red + color;\n}\n";

    std::string codeBody = visitor.cgen(tree);


    std::string orbit = visitor.cgenOrbit(tree);


    std::stringstream tmp; 
    tmp << headers.str() << defns.str() << getIdx.str() << codeBody << "extern \"C\" {\n" << bigLoops.str() << orbit << "}\n";
    outputCode = tmp.str();
    type = visitor.getType();
    // std::cout << visitor.getType() << "adfsgas\n";

    

    return outputCode.length() + 1;




  }

  EMSCRIPTEN_KEEPALIVE int getCgen(uint8_t *ptr) {

    
    // for(int i =0; i < outputCode.length(); i++) {
    //   ptr[i] = outputCode.at(i);
    //   // std::cout << ptr[i]<< "\n";
    // }
    // ptr[outputCode.length()] = '\0';

    // instead 
    std::strcpy(reinterpret_cast<char*>(ptr), outputCode.c_str());



    std::cout << type << "\n";



    return type;

  }
}

  #else

  int main(int, const char **) { return 0; }

  


#endif