
// Generated from Fractal.g4 by ANTLR 4.7.1

#pragma once


#include "antlr4-runtime.h"
#include "FractalParser.h"
#include <complex.h>



/**
 * This class defines an abstract visitor for a parse tree
 * produced by FractalParser.
 */
class  FractalVisitor : public antlr4::tree::AbstractParseTreeVisitor {
public:

  /**
   * Visit parse trees produced by FractalParser.
   */
  virtual int visitScript(FractalParser::ScriptContext *context) = 0;

    virtual std::complex<double> visitSET_TO_COM(FractalParser::SET_TO_COMContext *context) = 0;

    virtual std::complex<double> visitDEFAULT_TO_COM(FractalParser::DEFAULT_TO_COMContext *context) = 0;

    virtual antlrcpp::Any visitBLOCK_COM(FractalParser::BLOCK_COMContext *context) = 0;

    virtual antlrcpp::Any visitCOLOR_COM(FractalParser::COLOR_COMContext *context) = 0;

    virtual antlrcpp::Any visitPAR_COM(FractalParser::PAR_COMContext *context) = 0;

    virtual antlrcpp::Any visitDYN_COM(FractalParser::DYN_COMContext *context) = 0;

    virtual antlrcpp::Any visitIF_THEN_COM(FractalParser::IF_THEN_COMContext *context) = 0;

    virtual antlrcpp::Any visitLOOP_COM(FractalParser::LOOP_COMContext *context) = 0;

    virtual std::complex<double> visitN(FractalParser::NContext *context) = 0;

    virtual std::complex<double> visitConstant(FractalParser::ConstantContext *context) = 0;

    virtual std::complex<double> visitVariable(FractalParser::VariableContext *context) = 0;

    virtual std::complex<double> visitCpx_number_re(FractalParser::Cpx_number_reContext *context) = 0;

    virtual std::complex<double> visitCpx_number_im(FractalParser::Cpx_number_imContext *context) = 0;

    virtual std::complex<double> visitAtom(FractalParser::AtomContext *context) = 0;

    virtual std::complex<double> visitCpx_function(FractalParser::Cpx_functionContext *context) = 0;

    virtual std::complex<double> visitReal_function(FractalParser::Real_functionContext *context) = 0;

    virtual std::complex<double> visitPOW_EXP(FractalParser::POW_EXPContext *context) = 0;

    virtual std::complex<double> visitTIMES_EXP(FractalParser::TIMES_EXPContext *context) = 0;

    virtual std::complex<double> visitDIVIDE_EXP(FractalParser::DIVIDE_EXPContext *context) = 0;

    virtual std::complex<double> visitMINUS_EXP(FractalParser::MINUS_EXPContext *context) = 0;

    virtual std::complex<double> visitSIGNED_ATOM_EXP(FractalParser::SIGNED_ATOM_EXPContext *context) = 0;

    virtual std::complex<double> visitPLUS_EXP(FractalParser::PLUS_EXPContext *context) = 0;

    virtual std::complex<double> visitREDUCE_MOD_EXP(FractalParser::REDUCE_MOD_EXPContext *context) = 0;

    virtual std::complex<double> visitRE_FCN_EXP(FractalParser::RE_FCN_EXPContext *context) = 0;

    virtual std::complex<double> visitPAREN_EXP(FractalParser::PAREN_EXPContext *context) = 0;

    virtual std::complex<double> visitCPX_FCN_EXP(FractalParser::CPX_FCN_EXPContext *context) = 0;

    virtual bool visitSTOPS_COND(FractalParser::STOPS_CONDContext *context) = 0;

    virtual bool visitCOMP_COND(FractalParser::COMP_CONDContext *context) = 0;

    virtual bool visitVANISHES_COND(FractalParser::VANISHES_CONDContext *context) = 0;

    virtual bool visitESCAPES_COND(FractalParser::ESCAPES_CONDContext *context) = 0;

    virtual bool visitCOMB_COND(FractalParser::COMB_CONDContext *context) = 0;

    virtual antlrcpp::Any visitIF_THEN(FractalParser::IF_THENContext *context) = 0;

    virtual antlrcpp::Any visitIF_THEN_ELSE(FractalParser::IF_THEN_ELSEContext *context) = 0;

    virtual int visitLoopDo(FractalParser::LoopDoContext *context) = 0;

    virtual int visitLoopIterateOn(FractalParser::LoopIterateOnContext *context) = 0;

    virtual int visitLoopIterateEmpty(FractalParser::LoopIterateEmptyContext *context) = 0;

    virtual antlrcpp::Any visitLoopRepeat(FractalParser::LoopRepeatContext *context) = 0;

    virtual antlrcpp::Any visitFlagname(FractalParser::FlagnameContext *context) = 0;

    virtual antlrcpp::Any visitColor(FractalParser::ColorContext *context) = 0;

    virtual antlrcpp::Any visitColor_command(FractalParser::Color_commandContext *context) = 0;

    virtual antlrcpp::Any visitNum_type(FractalParser::Num_typeContext *context) = 0;

    virtual antlrcpp::Any visitProbe_command(FractalParser::Probe_commandContext *context) = 0;

    virtual antlrcpp::Any visitSaddle_drop(FractalParser::Saddle_dropContext *context) = 0;


};

