

// Generated from Fractal.g4 by ANTLR 4.7.1

#pragma once


#include "antlr4-runtime.h"
#include "FractalVisitor.h"


/**
 * This class provides an empty implementation of FractalVisitor, which can be
 * extended to create a visitor which only needs to handle a subset of the available methods.
 */
class  FractalBaseVisitor : public FractalVisitor {
public:

 virtual int visitScript(FractalParser::ScriptContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitSET_TO_COM(FractalParser::SET_TO_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitBLOCK_COM(FractalParser::BLOCK_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitCOLOR_COM(FractalParser::COLOR_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitPAR_COM(FractalParser::PAR_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitDYN_COM(FractalParser::DYN_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitIF_THEN_COM(FractalParser::IF_THEN_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitLOOP_COM(FractalParser::LOOP_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitN(FractalParser::NContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitConstant(FractalParser::ConstantContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitVariable(FractalParser::VariableContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitCpx_number_re(FractalParser::Cpx_number_reContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitCpx_number_im(FractalParser::Cpx_number_imContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitAtom(FractalParser::AtomContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitCpx_function(FractalParser::Cpx_functionContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitReal_function(FractalParser::Real_functionContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitPOW_EXP(FractalParser::POW_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitTIMES_EXP(FractalParser::TIMES_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitMINUS_EXP(FractalParser::MINUS_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitPLUS_EXP(FractalParser::PLUS_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitPAREN_EXP(FractalParser::PAREN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual std::complex<double> visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual bool visitSTOPS_COND(FractalParser::STOPS_CONDContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual bool visitCOMP_COND(FractalParser::COMP_CONDContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual bool visitVANISHES_COND(FractalParser::VANISHES_CONDContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual bool visitESCAPES_COND(FractalParser::ESCAPES_CONDContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual bool visitCOMB_COND(FractalParser::COMB_CONDContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitIF_THEN(FractalParser::IF_THENContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitIF_THEN_ELSE(FractalParser::IF_THEN_ELSEContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual int visitLoopDo(FractalParser::LoopDoContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual int visitLoopIterateOn(FractalParser::LoopIterateOnContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual int visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitLoopRepeat(FractalParser::LoopRepeatContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitFlagname(FractalParser::FlagnameContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitColor(FractalParser::ColorContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitColor_command(FractalParser::Color_commandContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitNum_type(FractalParser::Num_typeContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitProbe_command(FractalParser::Probe_commandContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitSaddle_drop(FractalParser::Saddle_dropContext *ctx) override {
    return visitChildren(ctx);
  }


};

