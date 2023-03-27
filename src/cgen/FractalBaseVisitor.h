
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

  virtual antlrcpp::Any visitScript(FractalParser::ScriptContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitSET_TO_COM(FractalParser::SET_TO_COMContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *ctx) override {
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

  virtual antlrcpp::Any visitN(FractalParser::NContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitConstant(FractalParser::ConstantContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitVariable(FractalParser::VariableContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitCpx_number_re(FractalParser::Cpx_number_reContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitCpx_number_im(FractalParser::Cpx_number_imContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitAtom(FractalParser::AtomContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitCpx_function(FractalParser::Cpx_functionContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitReal_function(FractalParser::Real_functionContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitPOW_EXP(FractalParser::POW_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitTIMES_EXP(FractalParser::TIMES_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitMINUS_EXP(FractalParser::MINUS_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitPLUS_EXP(FractalParser::PLUS_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitPAREN_EXP(FractalParser::PAREN_EXPContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *ctx) override {
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

  virtual antlrcpp::Any visitLoopDo(FractalParser::LoopDoContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitLoopIterateOn(FractalParser::LoopIterateOnContext *ctx) override {
    return visitChildren(ctx);
  }

  virtual antlrcpp::Any visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *ctx) override {
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

