  
#include "FractalBaseVisitor.h"
#include <stdio.h>
#include <iostream>
#include "antlr4-runtime.h"
#include <complex.h>
#include <string>
#include <sstream>
#include <unordered_map>
#include <stdlib.h>


  // If c does not appear, then FractalStream will draw a picture in the dynamical plane. 
  // Since the script used vanishes instead of escapes, we colored the interior instead of the exterior. 



  class  myVisitor : public FractalBaseVisitor {

    std::stringstream output;
    int loopCounter = 0;
    bool param = false;
    bool orbit = false;
    bool stopsSecond = false;
    // int del;

public: 
    // myVisitor()  {} 

        int getType() {
      if(param) {
        return 0;
      } else {
        return 1;
      }
    }

  


    // cgen orbit function
    std::string cgenOrbit(FractalParser::ScriptContext* tree) {

      stopsSecond = false;
    

      orbit = true;
      // reset output
      output.str("");

      std::stringstream orbitdef;
      
      // math for im, re values is done in js, so just need the two values
      orbitdef << "EMSCRIPTEN_KEEPALIVE void orbit(double fixed_re, double fixed_im, double clicked_re, double clicked_im, int maxIters, double minRadius, double maxRadius, double_t *ptr){\n";
      // adds to output 
      visitScript(tree);

      std::stringstream initdefns;

    initdefns << "std::complex<double> z(clicked_re, clicked_im);\n";

    // means there is a c val - still need this for orbit in case there is an already dyn space
    if(param) {
      initdefns << "std::complex<double> c(fixed_re,fixed_im);\n";
    }

    std::stringstream ret;

    ret << orbitdef.str() << initdefns.str() << output.str() << "}\n";

    return ret.str();
      

    }



    // this is the main cgen function 
    std::string cgen(FractalParser::ScriptContext* tree) {
    
    // reset output??? - maybe reset loop counter and other stuff for re runs 
    // output.str("");
    
    std::stringstream fcndef; 

    fcndef << "int calcPixel(double z_re, double z_im, double c_re, double c_im, int maxIters, int minRadius, int maxRadius, int type) {\n";

    // add to output

    visitScript(tree);



    std::stringstream initdefns; 
    initdefns << "std::complex<double> z(z_re, z_im);\n";

    // means there is a c val
    if(param) {
      initdefns << "std::complex<double> c(c_re,c_im);\n";
    }

    std::stringstream ret;

    // Deal with nested for loops later - TODO 
    // returns 0 (in set) since it didnt return in the for loop
    ret << fcndef.str() << initdefns.str() << output.str() << "return 0;\n}\n";
    return ret.str();

  }


  // DONE   
  virtual antlrcpp::Any visitScript(FractalParser::ScriptContext *ctx) override {

    visitChildren(ctx);

    return ctx;

  }


  //////////////////////////////////////
  /////////////// commands ///////////// 
  //////////////////////////////////////

  // return result of expression ---- set var to expr  TEST
  virtual antlrcpp::Any visitSET_TO_COM(FractalParser::SET_TO_COMContext *ctx) override {
    // // std::cout<< "in settocom\n";
    // std::complex<double> res = visit(ctx->expression());
    output << "std::complex<double> " << ctx->variable()->getText() << "(";
    // adds to output
    visit(ctx->expression());
    output << ");\n";
    return  ctx;
  }
  

  // return result of the expression 
  // this is the same as set but allows it to be "edited in params tab in setting window"
  // TODO 
  virtual antlrcpp::Any visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }

  // only evalute if drawing paramter space - TODO - maybe make two functions so no need for if in calcPixles
  virtual antlrcpp::Any visitPAR_COM(FractalParser::PAR_COMContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }
  // only evalte if drawing dynamic space - TODO - maybe make two functions so no need for if in calcPixles
  virtual antlrcpp::Any visitDYN_COM(FractalParser::DYN_COMContext *ctx) override {
    return ctx; //visitChildren(ctx);
  }

  // don't think I'll need to override any of the other ones 



  ////////////// end ///////////////////
  /////////////// commands /////////////
  //////////////////////////////////////






  //////////////////////////////////////
  /// atom, variable, constant ///////// done 
  ///////////// numbers ////////////////


  /*
  Either a variable or a constant - just return DONE 
  */
  // virtual std::complex<double> visitAtom(FractalParser::AtomContext *ctx) override {

  // return visitChildren(ctx);
  // }

  // want to just return the value - it should ALWAYS already be in map DONE 
  virtual antlrcpp::Any visitVariable(FractalParser::VariableContext *ctx) override {
    // std:cout << ctx->getText() << "\n";

    // need to return the text - sjust printing z won't work because different syntax based on what expression its in
    // for now just do it this way - wont really work but for testing

    // can chekc here if it is c, if so, we are drawing param    - if I do this you can't use c in a dyn program at all
    if(ctx->getText() == "c") {
      param = true;
    }
    output << ctx->getText();
    return ctx; //inVars[ctx->getText()];
  }
  // // D
  // virtual std::complex<double> visitConstant(FractalParser::ConstantContext *ctx) override {
  //   // children will garunteed return a complex number, so hopefully this is fine 
  //   return visitChildren(ctx);
  // }


  // for pow expression and loop - I get the value a different way, so this is just for 
  // complex numbers - n is just real part TEST 
  virtual antlrcpp::Any visitN(FractalParser::NContext *ctx) override {
    double n = stod(ctx->getText());
    // std:cout << n << "n\n";
    output << "std::complex<double>(" << n << ",0)";
    return ctx; // std::complex<double>(n,0.);
  }

  // real part of complex number DONE 
  virtual antlrcpp::Any visitCpx_number_re(FractalParser::Cpx_number_reContext *ctx) override {
    double n = stod(ctx->getText());
    output << "std::complex<double>(" << n << ",0)";
    return ctx; //  std::complex<double>(n,0.);
  }

  // DONE 
  virtual antlrcpp::Any visitCpx_number_im(FractalParser::Cpx_number_imContext *ctx) override {
    std::string txt = ctx->getText();
    // jsut i so 1
    if(txt.length() == 1) {
      output << "std::complex<double>(0,1)";
      return ctx; // std::complex<double>(0.,1.);
    } else {
      txt.pop_back();
      double n = stod(txt);
      output << "std::complex<double>(0," << n << ")";
      return ctx;
    }
  }


  ////////////// end ///////////////////
  /// atom, variable, constant /////////
  //////////// numbers /////////////////

  //////////////////////////////////////
  //////////  EXPRESSIONS ////////////// done for now
  //////////////////////////////////////

  /*
  These are all the expressions 
  They return the result of the expression 
  */


 /*
 This is either a constant or a variable 
 Return the value of that constant or variable
 */
  virtual antlrcpp::Any visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *ctx) override { // TEST

    // cgen - try this for now but will prob have to do it recursively 
    // const std::complex<double> &res = visitChildren(ctx);
    if(ctx->MINUS()) {
      output << "-";
      // return std::complex<double>(-real(res), -imag(res));
    }
                                    // std::cout<< "made t past visitor call\n";

    visitChildren(ctx);
                                    // std::cout<< "made t past visitor call\n";

    
    return ctx; //  res;
  }

  // might have to do some special order of operations stuff here, but don't really think so
  virtual antlrcpp::Any visitPAREN_EXP(FractalParser::PAREN_EXPContext *ctx) override { // TEST
    // std:cout << "in paren\n";
    output << "(";
    visit(ctx->expression()); //visitChildren(ctx);
    output << ")";
    // std:cout << res << "ressss\n";
    // return visitChildren(ctx) ---- THIS SHOULD WORK BUT ISNT TODOOD
    return ctx; // res;
  }

  // this is only allowed for z^n when n is a positive integer which is error checked in parser
  virtual antlrcpp::Any visitPOW_EXP(FractalParser::POW_EXPContext *ctx) override {

    // get n 
    int n = stoi(ctx->n()->getText());
    if(n == 0) {
      output << "1";
    }
    for(int i = 0; i <n; i++) {
      if(i != 0) {
        output << "*";
      }
      visit(ctx->expression());

    }
    // pow is a big slow down
    //output << "pow("; 
    // get expression - always cpx num
    //const std::complex<double> &expr = visit(ctx->expression());
    // output << "," << n << ")";
    //return pow(expr, n);
    // std::complex<double>fake(0.,0.);
    return ctx; //  fake;
  }

  virtual antlrcpp::Any visitPLUS_EXP(FractalParser::PLUS_EXPContext *ctx) override {
    // std:cout << "plus\n";
    visit(ctx->expression(0));

    output << "+";

   visit(ctx->expression(1));

    // std:cout << left << right <<left+right <<"plus done\n";

    return ctx; // left+right;

  }

    virtual antlrcpp::Any visitTIMES_EXP(FractalParser::TIMES_EXPContext *ctx) override {
    // std:cout << "times\n";
    visit(ctx->expression(0));
    // std:cout << "left" << left << "\n";
    output << "*";
    visit(ctx->expression(1));
    // std:cout << right << left*right << "tims done\n";
    return ctx; // left*right;
  }

    virtual antlrcpp::Any visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *ctx) override {
      // std:cout << "divde\n";
      visit(ctx->expression(0));
      output << "/";
      visit(ctx->expression(1));
      return ctx; // left/right;
  }

  virtual antlrcpp::Any visitMINUS_EXP(FractalParser::MINUS_EXPContext *ctx) override {
    visit(ctx->expression(0));
    output << "-";
    visit(ctx->expression(1));
    return ctx; // left-right;
  }
    // THIS IS REALS ONLY - SO NOT FOR NOW 
    virtual antlrcpp::Any visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }

  // REALS ONLY
  virtual antlrcpp::Any visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }
    // DO THESE LATER -- HARD 
    virtual antlrcpp::Any visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *ctx) override {
      // https://en.cppreference.com/w/c/numeric/complex
    return ctx; // visitChildren(ctx);
  }


  /////////////// end //////////////////
  //////////  EXPRESSIONS //////////////
  //////////////////////////////////////



  //////////////////////////////////////
  /////////// CONDITIONS ///////////////  done
  //////////////////////////////////////

  virtual bool visitSTOPS_COND(FractalParser::STOPS_CONDContext *ctx) override {


    if(!stopsSecond) {
      // first pass
      output << "prev == ";
      visit(ctx->expression());
    } else {
      visit(ctx->expression());
    }


    return true;
  }

  // DONE
  virtual bool visitCOMP_COND(FractalParser::COMP_CONDContext *ctx) override {
    // get awhat type it is, do thing for each one
    

    output << "abs(";
    visit(ctx->expression(0));
    output << ")";

    

    // this works assuming everything is a complex number, which we are for now
    if(ctx->GT() && ctx->EQUALS()) {
      output << ">=";
      
    } else if(ctx->LT() && ctx->EQUALS()) {
      output << "<=";
    } else if(ctx->GT()) {
      output << ">";
    } else if(ctx->LT()) {
      output << "<";
    } else if(ctx->EQUALS()) {
      output << "==";
    } else {
      // std:cout << "------- ERROR ------ couldn't find token for comp command\n";
      
    }

    output << "abs(";
    visit(ctx->expression(1));
    output << ")";

    return false;

  }

  // DONE
  virtual bool visitVANISHES_COND(FractalParser::VANISHES_CONDContext *ctx) override {

    // TODO - maybe add conditoin that if it is passed maxRadius just return zero instead of keep trying with giant numbers which is slowing it down

    // std:cout << "in vanishes cond\n";
    output << "abs(";
    visit(ctx->expression());
    output << ") < minRadius";
    return false; // abs(expr) < minRadius;
  }

  // DONE
  virtual bool visitESCAPES_COND(FractalParser::ESCAPES_CONDContext *ctx) override {
    

    output << "abs(";




    // std:cout << "in scapes cond\n";
    visit(ctx->expression());

    // std::cout<< "hhhhbbbbbbbbbbbbbhhl\n";


    output << ") > maxRadius" ;
    
    return false;
    
  }

  // DONE
  virtual bool visitCOMB_COND(FractalParser::COMB_CONDContext *ctx) override {

    // // std:cout << "in comb cond\n";
    // bool left = visit(ctx->condition(0));
    // bool right = visit(ctx->condition(1));

    // if(ctx->XOR()) {
    //   return ((left || right) && !(left && right));
    // } else if(ctx->OR()) {
    //   return left || right;
    // } else if(ctx->AND()) {
    //   return left && right;
    // } else {
    //   // std:cout << "------ERROR------- comb cond no tokens found\n";
    //   return false;
    // }

    // TODO - change this to setting variables left and right to save time (only have to do once) - might be werid with what it is inside though

        // std:cout << "in comb cond\n";
    // bool left = visit(ctx->condition(0));
    // bool right = visit(ctx->condition(1));

    if(ctx->XOR()) {
      output << "((";
      visit(ctx->condition(0));
      output << " || ";
      visit(ctx->condition(1));
      output << ") && !(";
      visit(ctx->condition(0));
      output << " && ";
      visit(ctx->condition(1));
      output << "))";
      
    } else if(ctx->OR()) {
      visit(ctx->condition(0)); 
      output << " || ";
      visit(ctx->condition(1));
    } else if(ctx->AND()) {
      visit(ctx->condition(0)); 
      output << " && ";
      visit(ctx->condition(1));

    } else {
      // std:cout << "------ERROR------- comb cond no tokens found\n";
    }

    return false;

    

    //return visitChildren(ctx);
  }



  ////////////// end ///////////////////
  /////////// CONDITIONS ///////////////
  //////////////////////////////////////




  ////////////////////////////////////
  ////////////  LOOPS ////////////////      DONE 
  ////////////////////////////////////

    // DONE
    virtual antlrcpp::Any visitLoopDo(FractalParser::LoopDoContext *ctx) override {

      // std:cout << "in loopdo\n";
      return ctx;

      // not using this anymore but would rather
      // antlrcpp::Any condit = ctx->condition();
    //   int counter = 0; 
    //   do {
    //     // visit all commands - for now just throw out result
    //     int i = 0;
    //     while(ctx->command(i)) {
    //       visit(ctx->command(i));
    //       i++;
    //     }
    //     // increment
    //     counter++;
    //     // std:cout << "visited commands\n";
    //   }
    //   while (!visit(ctx->condition()) && (counter < iters));

    // // std:cout << counter << "\n";
    // result = counter;
    // return counter;
  }

  // iterate expr on var until comd DONE 
  virtual antlrcpp::Any  visitLoopIterateOn(FractalParser::LoopIterateOnContext *ctx) override {
    // std:cout << "in loop iterate on\n";
    // antlrcpp::Any expr = ctx->expression();
    return ctx; 
    // const std::string &var = ctx->variable()->getText();
    // int counter = 0;
    // do {
    //   // std:cout << "in do\n";
    //   // eval expr
    //   const std::complex<double> &res = visit(ctx->expression());
    //   // set to var -- make more efficent by only looking up on first visit or something
    //   addUpdate(var, res);
    //   counter++;
    // }
    // while(!visit(ctx->condition()) && (counter < iters));

    // result = counter;
    // return counter;

  }



    // ITERATE expression 'until' condition - var taken to be z  DONE 
    virtual antlrcpp::Any visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *ctx) override {



      // variable is taken to be z - (the one to iterate)
      // not sure wether to start at 1 or 0 - ask dan

      // copy output and delete current 
      std::stringstream oldOut;
      oldOut << output.str();
      output.str("");

      // create tmp string stream
      std::stringstream tmp;


      // old stuff
      tmp << "for(int i = 1; i < maxIters; i++) {\n";
      if(orbit) {
        tmp << "ptr[i*2-2] = real(z);\nptr[i*2-1] = imag(z);\n";
      }
      tmp << "z = ";
      visit(ctx->expression());
      // take out putput and clear
      tmp << output.str();
      output.str("");

      tmp << ";\n";
      tmp << "if(";

      // get if it is a stops 
      bool stops = visit(ctx->condition());
      // save output and delete 
      tmp << output.str();
      tmp << ") {\n";
      output.str("");


      // deal with the nested for loops later TODO
      if(orbit) {
        tmp << "break;\n}\n";
      } else {
        tmp << "return i;\n}\n";
      }

            // if it is a stops - do stops stuff
      if(stops) {
        stopsSecond = true;
        tmp << "prev = ";
        visit(ctx->condition());
        tmp << output.str() << ";\n";
        output.str("");
      }



    
      tmp << "}\n";


      if(stops) {

        output << "std::complex<double>prev(";
        visit(ctx->condition());
        output << ");\n";
        oldOut << output.str();
        output.str("");
      }

      oldOut << tmp.str();

      output << oldOut.str();

      return ctx;
      
    }

    // reapeat n times command - n must be positivie integer  DONE 
    virtual antlrcpp::Any visitLoopRepeat(FractalParser::LoopRepeatContext *ctx) override {
      return ctx;
      // std:cout << "in loop reapeat\n";
      int n = stoi(ctx->n()->getText());
      for(int i = 0; i < n; i++) {
        visit(ctx->command());
      }
      return ctx;
    }



  //////////////// end /////////////////
  //////////////  LOOPS ////////////////
  //////////////////////////////////////


  //////////////////////////////////////
  //////////////  IFS //////////////////   done 
  //////////////////////////////////////

  virtual antlrcpp::Any visitIF_THEN(FractalParser::IF_THENContext *ctx) override {
    return ctx;
    // std:cout << "in if then\n";
    bool cond = visit(ctx->condition());
    if(cond) {
      // std:cout << "VISITED!!!!\n";
      visit(ctx->command());
    }

    return ctx;
  }


  virtual antlrcpp::Any visitIF_THEN_ELSE(FractalParser::IF_THEN_ELSEContext *ctx) override {
    return ctx;
    // std:cout << "in if else\n";
    bool cond = visit(ctx->condition());
    if(cond) {
      visit(ctx->command(0));
    } else {
      visit(ctx->command(1));
    }
    return ctx;
  }



  ////////////// end ///////////////////
  //////////////  IFS //////////////////
  //////////////////////////////////////

  };













/*
-list out data types

https://stackoverflow.com/questions/71348386/emscripten-c-to-wasm-with-classes-error-undefined-symbol
*/

// https://www.antlr.org/api/Java/org/antlr/v4/runtime/RuleContext.html