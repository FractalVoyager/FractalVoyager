#include "FractalBaseVisitor.h"
#include <stdio.h>
#include <iostream>
#include "antlr4-runtime.h"
#include <complex.h>
#include <string>
#include <sstream>
#include <unordered_map>
#include <stdlib.h>

/* 
this is my custom visitor class, it overrides visotor functions from base visitor and fractal visiotr
when we traerse the tree, every time we hit a node, we either run the auto generated funciton for that node 
in base visitor which is just to visit children, or if the fcn is overriden here we run this fcn
*/


class  myVisitor : public FractalBaseVisitor {
    // output string stream that gets built up
    std::stringstream output;
    // TODO nested loops
    int loopCounter = 0;
    // If c does not appear, then this will set the type to dynmical plane initallly and z gets set to screen val and is iterated
    bool param = false;
    // if we are genning the oribt fcn
    bool orbit = false;
    // helper var for stops condition
    bool stopsSecond = false;

public: 
      // fcn to get type
      int getType() {
      if(param) {
        return 0;
      } else {
        return 1;
      }
    }

    // cgen orbit function
    std::string cgenOrbit(FractalParser::ScriptContext* tree) {

      // reset stopsSecond 
      stopsSecond = false;
      // set orbit to true
      orbit = true;
      // reset output
      output.str("");
      // gen orbit def
      std::stringstream orbitdef;
      // math for im, re values is done in js, so just need the two values
      orbitdef << "EMSCRIPTEN_KEEPALIVE void orbit(double fixed_re, double fixed_im, double clicked_re, double clicked_im, int maxIters, double minRadius, double maxRadius, double_t *ptr, double epsilon, int orbitNum){\n";
      // adds to output by traversing the tree
      visitScript(tree);
      // defns 
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
    // defn
    std::stringstream fcndef; 
    fcndef << "int calcPixel(double z_re, double z_im, double c_re, double c_im, int maxIters, double minRadius, double maxRadius, int type, double epsilon) {\n";

    // add to output
    visitScript(tree);

    // defns to start
    std::stringstream initdefns; 
    initdefns << "std::complex<double> z(z_re, z_im);\n";


    // means there is a c val b/c param space - if so, need to set it to c passed in 
    if(param) {
      initdefns << "std::complex<double> c(c_re,c_im);\n";
    }

    std::stringstream ret;

    ret << fcndef.str() << initdefns.str() << output.str() << "return 0;\n}\n";
    return ret.str();

  }


  // don't really need to override this one - this is the root node
  virtual antlrcpp::Any visitScript(FractalParser::ScriptContext *ctx) override {
    visitChildren(ctx);
    return ctx;
  }


  //////////////////////////////////////
  /////////////// commands ///////////// 
  //////////////////////////////////////

  // set a variable to the result of an expression
  virtual antlrcpp::Any visitSET_TO_COM(FractalParser::SET_TO_COMContext *ctx) override {
    // get the var name
    std::string name = ctx->variable()->getText();
    // if its z - we want to reset not re initalize 
    if(name == "z") {
      output << name << " = ";
      visit(ctx->expression());
      output << ";\n";
    // otherwise initalize a new variable 
    } else {
    output << "std::complex<double> " << ctx->variable()->getText() << "(";
    // visit the expressioin which will add the expression to output
    visit(ctx->expression());
    // close paren
    output << ");\n";

    }

    return  ctx;
  }
  

  // this is the same as set but allows it to be "edited in params tab in setting window"
  // TODO 
  virtual antlrcpp::Any visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }

  // only evalute if drawing paramter space 
  virtual antlrcpp::Any visitPAR_COM(FractalParser::PAR_COMContext *ctx) override {

    // never param space for orbit
    if(orbit) {
      return ctx;
    }
    // if the type is 0, do command
    output << "if (type == 0) {\n";
    visit(ctx->command());
    output << "}\n";

    
    return ctx; 
  }
  // only evalte if drawing dynamic space 
  virtual antlrcpp::Any visitDYN_COM(FractalParser::DYN_COMContext *ctx) override {

    // always dyn space in orbit
    if(orbit) {
      visit(ctx->command());
      return ctx;
    }
    output << "if (type == 1) {\n";
    visit(ctx->command());
    output << "}\n";



    
    return ctx; 
  }

  // block just works because it will visit all children
  // don't think I'll need to override any of the other command


  ////////////// end ///////////////////
  /////////////// commands /////////////
  //////////////////////////////////////


  //////////////////////////////////////
  /// atom, variable, constant ///////// 
  ///////////// numbers ////////////////

  // don't need to worry about atoms because we always jsut get text out of it, no need for override - never get visited

  // variable is like z or c or any other user defined varaible
  virtual antlrcpp::Any visitVariable(FractalParser::VariableContext *ctx) override {

    // can chekc here if it is c, if so, we are drawing param, so set the global var of that
    if(ctx->getText() == "c") {
      param = true;
    }
    // add the varaible text to the output
    output << ctx->getText();
    return ctx;
  }


  // for pow expression and loop - I get the value a different way, so this is just for 
  // complex numbers - n is just real part 
  virtual antlrcpp::Any visitN(FractalParser::NContext *ctx) override {
    double n = stod(ctx->getText());
    // complex number with real part n - TODO probably don't need to cast here
    output << "std::complex<double>(" << n << ",0)";
    return ctx; 
  }

  // real part of complex number 
  virtual antlrcpp::Any visitCpx_number_re(FractalParser::Cpx_number_reContext *ctx) override {
    double n = stod(ctx->getText());
    // output a complex number real part
    output << "std::complex<double>(" << n << ",0)";
    return ctx; 
  }

  // DONE 
  virtual antlrcpp::Any visitCpx_number_im(FractalParser::Cpx_number_imContext *ctx) override {
    std::string txt = ctx->getText();
    // jsut i so 1
    if(txt.length() == 1) {
      output << "std::complex<double>(0,1)";
      return ctx; 
    } else {
      // take off i 
      txt.pop_back();
      double n = stod(txt);
      // cpx number that is just imag part
      output << "std::complex<double>(0," << n << ")";
      return ctx;
    }
  }


  ////////////// end ///////////////////
  /// atom, variable, constant /////////
  //////////// numbers /////////////////

  //////////////////////////////////////
  //////////  EXPRESSIONS ////////////// 
  //////////////////////////////////////

 /*
 This is either a constant or a variable 
 */
  virtual antlrcpp::Any visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *ctx) override { 

    // if there is a minus - need to append a minus smbol to the atom
    if(ctx->MINUS()) {
      output << "-";
    }
    // this will add the atom to the output 
    visitChildren(ctx);
    return ctx; 
  }

  // (expression)
  virtual antlrcpp::Any visitPAREN_EXP(FractalParser::PAREN_EXPContext *ctx) override { 
    // output open paren, then visit expression which will add it to output, then close 
    output << "(";
    visit(ctx->expression()); 
    output << ")";
    return ctx; 
  }

  // this is only allowed for z^n when n is a positive integer which is error checked in lexer
  virtual antlrcpp::Any visitPOW_EXP(FractalParser::POW_EXPContext *ctx) override {

    // get n text
    int n = stoi(ctx->n()->getText());
    // z^0 = 1 
    if(n == 0) {
      output << "1";
    }
    // using pow(z,4) slows it down tremendously vs ust many multipliers - like 10x slower
    for(int i = 0; i <n; i++) {
      if(i != 0) {
        output << "*";
      }
      // visit the exression that we are powing
      visit(ctx->expression());

    }
    return ctx; 
  }

  // exp + exp
  virtual antlrcpp::Any visitPLUS_EXP(FractalParser::PLUS_EXPContext *ctx) override {
    // output left 
    visit(ctx->expression(0));
    // plus
    output << "+";
    // output right 
   visit(ctx->expression(1));
    return ctx; 
  }

    virtual antlrcpp::Any visitTIMES_EXP(FractalParser::TIMES_EXPContext *ctx) override {
    visit(ctx->expression(0));
    output << "*";
    visit(ctx->expression(1));
    return ctx; 
  }

    virtual antlrcpp::Any visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *ctx) override {
      visit(ctx->expression(0));
      output << "/";
      visit(ctx->expression(1));
      return ctx; 
  }

  virtual antlrcpp::Any visitMINUS_EXP(FractalParser::MINUS_EXPContext *ctx) override {
    visit(ctx->expression(0));
    output << "-";
    visit(ctx->expression(1));
    return ctx; 
  }
    // THIS IS REALS ONLY - SO NOT FOR NOW 
    virtual antlrcpp::Any visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }

  // REALS ONLY
  virtual antlrcpp::Any visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *ctx) override {
    return ctx; // visitChildren(ctx);
  }
    // cos(exp) etc
    virtual antlrcpp::Any visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *ctx) override {
      // using the cpp cpx math fcns that alreadly have these cpx fcns built in
      // https://en.cppreference.com/w/c/numeric/complex



      if(ctx->cpx_function()->EXP()) {
        output << "exp(";

      } else if(ctx->cpx_function()->COS()) {
        output << "cos(";


      } else if(ctx->cpx_function()->SIN()) {
        output << "sin(";

      } else if(ctx->cpx_function()->TAN()) {
        output << "tan(";

      } else if(ctx->cpx_function()->COSH()) {
        output << "cosh(";

      } else if(ctx->cpx_function()->SINH()) {
        output << "sinh(";
        
      } else if(ctx->cpx_function()->TANH()) {
        output << "tanh(";

      } else if(ctx->cpx_function()->RE()) {
        output << "real(";

      } else if(ctx->cpx_function()->IM()) {
        output << "imag(";

      } else if(ctx->cpx_function()->BAR()) {
        output << "conj(";

      } else if(ctx->cpx_function()->ARG()) {
        output << "arg(";

      } else if(ctx->cpx_function()->LOG()) {
        output << "log(";
        
      } else if(ctx->cpx_function()->SQRT()) {
        output << "sqrt(";

      }
      visit(ctx->expression()); 
      output << ")";

    return ctx; 
  }


  /////////////// end //////////////////
  //////////  EXPRESSIONS //////////////
  //////////////////////////////////////



  //////////////////////////////////////
  /////////// CONDITIONS ///////////////  
  //////////////////////////////////////

  // this one is tricky - if the var we are iterating is less than epislon from the previous pass thorugh loop it is true
  virtual bool visitSTOPS_COND(FractalParser::STOPS_CONDContext *ctx) override {

    // on first pass
    if(!stopsSecond) {
      // difference between previous and current (in expression)
      output << "abs(abs(prev) - abs( ";
      visit(ctx->expression());
      // less than epsilon 
      output << ")) < epsilon";
    } else {
      // on second pass, just give back expression
      visit(ctx->expression());
    }
    // return true which means we have a stops conditon
    return true;
  }

  // equals or <= etc ,,,,, exp COND exp
  virtual bool visitCOMP_COND(FractalParser::COMP_CONDContext *ctx) override {
    // usings abs to get the norm of the complex number

    // if there it is just an equals - TODO thing should probably not be first but don't want to mess with it for now
    if(ctx->EQUALS()) {
    output << "abs(";
    output << "abs(";
    // will output expression on left 
    visit(ctx->expression(0));
    output << ")";
    output << "-abs(";
    visit(ctx->expression(1));
    output << "))";
    output << " < epsilon";
    // not a stops conditin
    return false;
    }
    
    // always output aboslute value of left 
    output << "abs(";
    visit(ctx->expression(0));
    output << ")";

    // this works assuming everything is a complex number, which we are for now
    // output condition
    if(ctx->GT() && ctx->EQUALS()) {
      output << ">=";
      
    } else if(ctx->LT() && ctx->EQUALS()) {
      output << "<=";
    } else if(ctx->GT()) {
      output << ">";
    } else if(ctx->LT()) {
      output << "<";
    } else {      
    }

    // value of right side 
    output << "abs(";
    visit(ctx->expression(1));
    output << ")";

    return false;

  }

  // exp becomes 0 , or less than min radius
  virtual bool visitVANISHES_COND(FractalParser::VANISHES_CONDContext *ctx) override {
    // abs of expr < minRad
    output << "abs(";
    visit(ctx->expression());
    output << ") < minRadius";
    // not stops 
    return false; 
  }

  // exp becomes infinately , or more than maxRadius
  virtual bool visitESCAPES_COND(FractalParser::ESCAPES_CONDContext *ctx) override {
    
    // abs of expr > maxRad
    output << "abs(";
    visit(ctx->expression());
    output << ") > maxRadius" ;
    
    return false;
    
  }

  // combinataions of conditions 
  virtual bool visitCOMB_COND(FractalParser::COMB_CONDContext *ctx) override {

   
    // exclusive or - output logic for that
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
      // or 
    } else if(ctx->OR()) {
      visit(ctx->condition(0)); 
      output << " || ";
      visit(ctx->condition(1));
      // and 
    } else if(ctx->AND()) {
      visit(ctx->condition(0)); 
      output << " && ";
      visit(ctx->condition(1));

    } else {
    }

    return false;

    }



  ////////////// end ///////////////////
  /////////// CONDITIONS ///////////////
  //////////////////////////////////////




  ////////////////////////////////////
  ////////////  LOOPS ////////////////      
  ////////////////////////////////////

    // do (commands) until cond
    virtual antlrcpp::Any visitLoopDo(FractalParser::LoopDoContext *ctx) override {


      // copy output and delete current 
      std::stringstream oldOut;
      oldOut << output.str();
      output.str("");

      // create tmp string stream
      std::stringstream tmp;

      // old stuff
      tmp << "for(int i = 1; i < maxIters; i++) {\n";
      if(orbit) {
        // TODO probably wrong but I think this will always be z
        tmp << "ptr[i*2-2] = real(z);\nptr[i*2-1] = imag(z);\n";
      }
      // visit commands
      int i = 0;
      while(ctx->command(i)){
        visit(ctx->command(i));
        i++;
      }

      // get condition
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

      // stops stuff 
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

  // iterate expr on var until comd 
  virtual antlrcpp::Any  visitLoopIterateOn(FractalParser::LoopIterateOnContext *ctx) override {



      // copy output and delete current 
      std::stringstream oldOut;
      oldOut << output.str();
      output.str("");

      // create tmp string stream
      std::stringstream tmp;

      // get var str
      std::string var = ctx->variable()->getText();


      // old stuff
      tmp << "for(int i = 1; i < maxIters; i++) {\n";
      if(orbit) {
        tmp << "ptr[i*2-2] = real(" << var << ");\nptr[i*2-1] = imag(" << var << ");\n";
      }
      tmp << var << " = ";
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


    return ctx; 

  }



    // ITERATE expression 'until' condition - var taken to be z  
    virtual antlrcpp::Any visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *ctx) override {

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

    // reapeat n times command - n must be positivie integer  TODO
    virtual antlrcpp::Any visitLoopRepeat(FractalParser::LoopRepeatContext *ctx) override {


      return ctx;

    }



  //////////////// end /////////////////
  //////////////  LOOPS ////////////////
  //////////////////////////////////////


  //////////////////////////////////////
  //////////////  IFS //////////////////   
  //////////////////////////////////////

  virtual antlrcpp::Any visitIF_THEN(FractalParser::IF_THENContext *ctx) override {
    
    // if cond run command - adds to outpu

    output << "if(";
    visit(ctx->condition());
    output << ") {\n";
    visit(ctx->command());
    output << "}\n";


    return ctx;
  }


  virtual antlrcpp::Any visitIF_THEN_ELSE(FractalParser::IF_THEN_ELSEContext *ctx) override {

    // if conditno run command 0, else run command 2 in this context
    

    output << "if(";
    visit(ctx->condition());
    output << ") {\n";
    visit(ctx->command(0));
    output << "} else {\n";
    visit(ctx->command(1));
    output << "}\n";

    return ctx;
  }


  ////////////// end ///////////////////
  //////////////  IFS //////////////////
  //////////////////////////////////////

  };
