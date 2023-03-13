  
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



    std::unordered_map<std::string,std::complex<double>> inVars = {};

    ////// this stuff for stops 
    std::complex<double> prev_val;
    bool prev_val_def = false;


    int result;
    
    // how many iterations to go to get to the max or min radius 
    int iters;
    // when to call it infinity - 2 for mandlebrot set 
    double maxRadius;
    // when to call 0 
    double minRadius; 
    // the variable in the script that we are setting to the critical value ---- DYN ONLY
    std::string crit_var;
    // the variable in the script that we are setting to the screen value 
    std::string screen_var;
    std::complex<double> crit_point;

    /////////////////
    //// code gen ///
    /////////////////
    //std::string &bl = "s";
    std::stringstream output;
    int loopCounter = 0;

    

    // std::cout << output << "\n";

    // std::cout << "" << output << "   string stream\n";






public: 
  myVisitor(int iters, double maxRadius, double minRadius, std::string& crit_var, std::string& screen, std::complex<double> crit_point) : iters(iters), maxRadius(maxRadius), minRadius(minRadius), crit_var(crit_var), screen_var(screen), crit_point(crit_point) {}



  // this is the main cgen function - for now just return have it return an int - and make this part just a function for calculating the point
    std::string cgen(FractalParser::ScriptContext* tree) {
    output << "#include <complex.h>\nextern \"C\"{\n";

    // maybe include that other stuff taht doesn't change here, and jsut call gen 
    output << "int gen(double re, double im) {\n";
    // screen var to point 
    output << "std::complex<double> " << screen_var << "(re, im);\n";
    // critical value 
    output << "std::complex<double> " << crit_var << crit_point << ";\n";

    // int res = visitScript(tree);
    visitScript(tree);
   //output << "return result" << itoa(loopCounter) << ";\n}\n";
    output << "return result0" << ";\n}\n}\n";
    std::cout << output.str() << "\n";

    // do I need to redefine critical point each time? and the other "global varaibles"? 
    // or only the variables changing for each pass?

    return output.str();

  }

  // function takes a point in complex plane, and evaluates it with the script
  int evalPoint(std::complex<double> point, FractalParser::ScriptContext* tree) {


    // output.str("hello");
    // output << "hello";

    // std::cout << "in eval point\n";

    // set variable we are changing to the point
    inVars[screen_var] = point;
    // add critical point variable to map - this works for now but shouldnt go here --- TODO
    inVars[crit_var] = crit_point;
    // get result/ go through tree
    int res = visitScript(tree);
    // clear instance variables
    inVars.clear();
    return res;
  }

  void addUpdate(const std::string &text, const std::complex<double> &val) {

    inVars[text] = val;
    // if(inVars.count(text) == 0) {
    //   inVars.insert(make_pair(text, val));
    // } else {
    //   inVars[text] = val;
    // }
    return;
  }

  
  virtual int visitScript(FractalParser::ScriptContext *ctx) override {
    // std:cout << "running script\n";
    visitChildren(ctx);
    // std:cout << "done running script\n";
    // not sure how to find iterations to return, will also eventaully be a color - maybe for now get an variable
    return result;

  }


  //////////////////////////////////////
  /////////////// commands ///////////// done for now 
  //////////////////////////////////////

  // return result of expression ---- set var to expr DONE 
  virtual std::complex<double> visitSET_TO_COM(FractalParser::SET_TO_COMContext *ctx) override {
    // std::cout << "in settocom\n";
    std::complex<double> res = visit(ctx->expression());

    // now strat is to not even visit variable (just set it here TODO make a function to set it)
    const std::string &text = ctx->variable()->getText();

    inVars[text] = res;

    // add/update map
    // if(inVars.count(text) == 0) {

    //   inVars.insert(make_pair(text, res));
    // } else {
    //   inVars[text] = res;
    // }
    return res;
  }
  

  // return result of the expression 
  // this is the same as set but allows it to be "edited in params tab in setting window"
  virtual std::complex<double> visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  // only evalute if drawing paramter space - figure out return later 
  virtual antlrcpp::Any visitPAR_COM(FractalParser::PAR_COMContext *ctx) override {
    return visitChildren(ctx);
  }
  // only evalte if drawing dynamic space - figure out return later
  virtual antlrcpp::Any visitDYN_COM(FractalParser::DYN_COMContext *ctx) override {
    return visitChildren(ctx);
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
  virtual std::complex<double> visitVariable(FractalParser::VariableContext *ctx) override {
    // std:cout << ctx->getText() << "\n";

    // need to return the text - sjust printing z won't work because different syntax based on what expression its in
    // for now just do it this way - wont really work but for testing
    output << ctx->getText();
    return inVars[ctx->getText()];
  }
  // // D
  // virtual std::complex<double> visitConstant(FractalParser::ConstantContext *ctx) override {
  //   // children will garunteed return a complex number, so hopefully this is fine 
  //   return visitChildren(ctx);
  // }


  // for pow expression and loop - I get the value a different way, so this is just for 
  // complex numbers - n is just real part DONE 
  virtual std::complex<double> visitN(FractalParser::NContext *ctx) override {
    double n = stod(ctx->getText());
    // std:cout << n << "n\n";
    output << n;
    return std::complex<double>(n,0.);
  }

  // real part of complex number DONE 
  virtual std::complex<double> visitCpx_number_re(FractalParser::Cpx_number_reContext *ctx) override {
    double n = stod(ctx->getText());
    return std::complex<double>(n,0.);
  }

  // DONE 
  virtual std::complex<double> visitCpx_number_im(FractalParser::Cpx_number_imContext *ctx) override {
    std::string txt = ctx->getText();
    // jsut i so 1
    if(txt.length() == 1) {
      return std::complex<double>(0.,1.);
    } else {
      txt.pop_back();
      double n = stod(txt);
      return std::complex<double>(0.,n);
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
  virtual std::complex<double> visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *ctx) override {

    // cgen - try this for now but will prob have to do it recursively 
    



    const std::complex<double> &res = visitChildren(ctx);
    if(ctx->MINUS()) {
      output << "-";
      return std::complex<double>(-real(res), -imag(res));
    }
    
    return res;
  }

  // might have to do some special order of operations stuff here, but don't really think so
  virtual std::complex<double> visitPAREN_EXP(FractalParser::PAREN_EXPContext *ctx) override {
    // std:cout << "in paren\n";
    const std::complex<double> &res = visit(ctx->expression()); //visitChildren(ctx);
    // std:cout << res << "ressss\n";
    // return visitChildren(ctx) ---- THIS SHOULD WORK BUT ISNT TODOOD
    return res;
  }

  // this is only allowed for z^n when n is a positive integer which is error checked in parser
  virtual std::complex<double> visitPOW_EXP(FractalParser::POW_EXPContext *ctx) override {

    // std:cout << ctx->getText() << "      --- pow exp\n";

    

    // get n 
    int n = stoi(ctx->n()->getText());
    output << "pow("; 
    // get expression - always cpx num
    const std::complex<double> &expr = visit(ctx->expression());
    output << "," << n << ")";
    return pow(expr, n);
  }

  virtual std::complex<double> visitPLUS_EXP(FractalParser::PLUS_EXPContext *ctx) override {
    // std:cout << "plus\n";
    const std::complex<double> &left = visit(ctx->expression(0));

    output << "+";

    const std::complex<double> &right = visit(ctx->expression(1));

    // std:cout << left << right <<left+right <<"plus done\n";

    return left+right;

  }

    virtual std::complex<double> visitTIMES_EXP(FractalParser::TIMES_EXPContext *ctx) override {
    // std:cout << "times\n";
    const std::complex<double> &left = visit(ctx->expression(0));
    // std:cout << "left" << left << "\n";
    const std::complex<double> &right = visit(ctx->expression(1));
    // std:cout << right << left*right << "tims done\n";
    return left*right;
  }

    virtual std::complex<double> visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *ctx) override {
      // std:cout << "divde\n";
      const std::complex<double> &left = visit(ctx->expression(0));
      const std::complex<double> &right = visit(ctx->expression(1));
      return left/right;
  }

  virtual std::complex<double> visitMINUS_EXP(FractalParser::MINUS_EXPContext *ctx) override {
    const std::complex<double> &left = visit(ctx->expression(0));
    const std::complex<double> &right = visit(ctx->expression(1));
    return left-right;
  }
    // THIS IS REALS ONLY - SO NOT FOR NOW 
    virtual std::complex<double> visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  // DO THESE LATER -- HARD 
  virtual std::complex<double> visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }
    // DO THESE LATER -- HARD 
    virtual std::complex<double> visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }


  /////////////// end //////////////////
  //////////  EXPRESSIONS //////////////
  //////////////////////////////////////



  //////////////////////////////////////
  /////////// CONDITIONS ///////////////  done
  //////////////////////////////////////

  // DONE
  virtual bool visitSTOPS_COND(FractalParser::STOPS_CONDContext *ctx) override {
    // std:cout << "in stops command\n";
    if(!prev_val_def) {
      prev_val_def = true;
      // std:cout << "prev not there\n";
      // can do this once I make the return types of real functions and cpx function std::complex<double>
      // prev_val = visit(ctx->expression());
      const std::complex<double> &p = visit(ctx->expression());
      prev_val = p;

      return false;
    } else {
      const std::complex<double> &val = visit(ctx->expression());
      bool toR = (val == prev_val);
      prev_val = val;
      return toR;
    }
  }

  // DONE
  virtual bool visitCOMP_COND(FractalParser::COMP_CONDContext *ctx) override {
    // get awhat type it is, do thing for each one
    const std::complex<double> &left = visit(ctx->expression(0));
    const std::complex<double> &right = visit(ctx->expression(1));


    // this works assuming everything is a complex number, which we are for now
    if(ctx->GT() && ctx->EQUALS()) {
      return abs(left) >= abs(right);
    } else if(ctx->LT() && ctx->EQUALS()) {
      return abs(left) <= abs(right);
    } else if(ctx->GT()) {
      return abs(left) > abs(right);
    } else if(ctx->LT()) {
      return abs(left) < abs(right);
    } else if(ctx->EQUALS()) {
      return abs(left) == abs(right);
    } else {
      // std:cout << "------- ERROR ------ couldn't find token for comp command\n";
      return false;
    }

  }

  // DONE
  virtual bool visitVANISHES_COND(FractalParser::VANISHES_CONDContext *ctx) override {
    // std:cout << "in vanishes cond\n";
    const std::complex<double> &expr = visit(ctx->expression());
    return abs(expr) < minRadius;
  }

  // DONE
  virtual bool visitESCAPES_COND(FractalParser::ESCAPES_CONDContext *ctx) override {
    

    output << "abs(";



    // std:cout << "in scapes cond\n";
    const std::complex<double> &expr = visit(ctx->expression());

    output << ") > " << maxRadius;
    
    return abs(expr) > maxRadius;
    
  }

  // DONE
  virtual bool visitCOMB_COND(FractalParser::COMB_CONDContext *ctx) override {

    // std:cout << "in comb cond\n";
    bool left = visit(ctx->condition(0));
    bool right = visit(ctx->condition(1));

    if(ctx->XOR()) {
      return ((left || right) && !(left && right));
    } else if(ctx->OR()) {
      return left || right;
    } else if(ctx->AND()) {
      return left && right;
    } else {
      // std:cout << "------ERROR------- comb cond no tokens found\n";
      return false;
    }

    

    //return visitChildren(ctx);
  }



  ////////////// end ///////////////////
  /////////// CONDITIONS ///////////////
  //////////////////////////////////////




  ////////////////////////////////////
  ////////////  LOOPS ////////////////      DONE 
  ////////////////////////////////////

    // DONE
    virtual int visitLoopDo(FractalParser::LoopDoContext *ctx) override {

      // std:cout << "in loopdo\n";

      // not using this anymore but would rather
      // antlrcpp::Any condit = ctx->condition();
      int counter = 0; 
      do {
        // visit all commands - for now just throw out result
        int i = 0;
        while(ctx->command(i)) {
          visit(ctx->command(i));
          i++;
        }
        // increment
        counter++;
        // std:cout << "visited commands\n";
      }
      while (!visit(ctx->condition()) && (counter < iters));

    // std:cout << counter << "\n";
    result = counter;
    return counter;
  }

  // iterate expr on var until comd DONE 
  virtual int visitLoopIterateOn(FractalParser::LoopIterateOnContext *ctx) override {
    // std:cout << "in loop iterate on\n";
    // antlrcpp::Any expr = ctx->expression();
    const std::string &var = ctx->variable()->getText();
    int counter = 0;
    do {
      // std:cout << "in do\n";
      // eval expr
      const std::complex<double> &res = visit(ctx->expression());
      // set to var -- make more efficent by only looking up on first visit or something
      addUpdate(var, res);
      counter++;
    }
    while(!visit(ctx->condition()) && (counter < iters));

    result = counter;
    return counter;

  }



    // ITERATE expression 'until' condition - var taken to be z  DONE 
    virtual int visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *ctx) override {
      // std:cout << "in loop iterate empty\n";
      // variable is taken to be z - (the one to iterate)


      // cgen ///////// 
      
      // output << "int counter" << itoa(loopCounter) << " = 0\n";
      output << "int counter0 = 0;\n";
      // loopCounter++;
      output << "while(true) {\n";
      // cgen expression and set to z
      output << "z = "; 
      visit(ctx->expression());
      output << ";\n";
      output << "counter0++;\n";
      output << "if(";
      visit(ctx->condition());
      //output << "|| " << "counter" << itoa(loopCounter) << " >= " << iters << ") {\n break;\n}\nint result" << itoa(loopCounter) << " = counter" << itoa(loopCounter) << ";\n"; 
      output << "|| " << "counter0 >= " << iters << ") {\n break;\n}\n}\nint result0 = counter0;\n"; 


      // const std::string &var = "z";
      // int counter = 0;
      // do {
      //   const std::complex<double> &res = visit(ctx->expression());
      //   addUpdate(var, res);
      //   counter++;
      // }
      // while(!visit(ctx->condition()) && (counter < iters));

      // result = counter;
      // return counter;
      return 0;
      
    }

    // reapeat n times command - n must be positivie integer  DONE 
    virtual antlrcpp::Any visitLoopRepeat(FractalParser::LoopRepeatContext *ctx) override {
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
    // std:cout << "in if then\n";
    bool cond = visit(ctx->condition());
    if(cond) {
      // std:cout << "VISITED!!!!\n";
      visit(ctx->command());
    }

    return ctx;
  }


  virtual antlrcpp::Any visitIF_THEN_ELSE(FractalParser::IF_THEN_ELSEContext *ctx) override {
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