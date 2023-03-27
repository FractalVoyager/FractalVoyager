
// Generated from Fractal.g4 by ANTLR 4.7.1

#pragma once


#include "antlr4-runtime.h"




class  FractalParser : public antlr4::Parser {
public:
  enum {
    T__0 = 1, T__1 = 2, T__2 = 3, T__3 = 4, T__4 = 5, T__5 = 6, T__6 = 7, 
    T__7 = 8, T__8 = 9, T__9 = 10, T__10 = 11, T__11 = 12, T__12 = 13, T__13 = 14, 
    T__14 = 15, T__15 = 16, T__16 = 17, T__17 = 18, T__18 = 19, T__19 = 20, 
    T__20 = 21, T__21 = 22, T__22 = 23, T__23 = 24, T__24 = 25, T__25 = 26, 
    T__26 = 27, T__27 = 28, T__28 = 29, T__29 = 30, T__30 = 31, T__31 = 32, 
    T__32 = 33, T__33 = 34, T__34 = 35, T__35 = 36, T__36 = 37, T__37 = 38, 
    T__38 = 39, T__39 = 40, T__40 = 41, T__41 = 42, POS_INT = 43, NUMBER = 44, 
    CPX_NUMBER_IM = 45, STOPS = 46, PIXEL = 47, ITERATE = 48, EXP = 49, 
    COS = 50, SIN = 51, TAN = 52, COSH = 53, SINH = 54, TANH = 55, RE = 56, 
    IM = 57, BAR = 58, ARG = 59, LOG = 60, SQRT = 61, ARCCOS = 62, ARCSIN = 63, 
    ARCTAN = 64, POW = 65, PLUS = 66, MINUS = 67, TIMES = 68, DIVIDE = 69, 
    EQUALS = 70, GT = 71, LT = 72, OR = 73, AND = 74, XOR = 75, VARIABLE = 76, 
    LPAREN = 77, RPAREN = 78, WS = 79, COMMENT = 80
  };

  enum {
    RuleScript = 0, RuleCommand = 1, RuleN = 2, RuleConstant = 3, RuleVariable = 4, 
    RuleCpx_number_re = 5, RuleCpx_number_im = 6, RuleAtom = 7, RuleCpx_function = 8, 
    RuleReal_function = 9, RuleExpression = 10, RuleCondition = 11, RuleIf_then = 12, 
    RuleLoop = 13, RuleFlagname = 14, RuleColor = 15, RuleColor_command = 16, 
    RuleNum_type = 17, RuleProbe_command = 18, RuleSaddle_drop = 19
  };

  FractalParser(antlr4::TokenStream *input);
  ~FractalParser();

  virtual std::string getGrammarFileName() const override;
  virtual const antlr4::atn::ATN& getATN() const override { return _atn; };
  virtual const std::vector<std::string>& getTokenNames() const override { return _tokenNames; }; // deprecated: use vocabulary instead.
  virtual const std::vector<std::string>& getRuleNames() const override;
  virtual antlr4::dfa::Vocabulary& getVocabulary() const override;


  class ScriptContext;
  class CommandContext;
  class NContext;
  class ConstantContext;
  class VariableContext;
  class Cpx_number_reContext;
  class Cpx_number_imContext;
  class AtomContext;
  class Cpx_functionContext;
  class Real_functionContext;
  class ExpressionContext;
  class ConditionContext;
  class If_thenContext;
  class LoopContext;
  class FlagnameContext;
  class ColorContext;
  class Color_commandContext;
  class Num_typeContext;
  class Probe_commandContext;
  class Saddle_dropContext; 

  class  ScriptContext : public antlr4::ParserRuleContext {
  public:
    ScriptContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    std::vector<CommandContext *> command();
    CommandContext* command(size_t i);

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  ScriptContext* script();

  class  CommandContext : public antlr4::ParserRuleContext {
  public:
    CommandContext(antlr4::ParserRuleContext *parent, size_t invokingState);
   
    CommandContext() : antlr4::ParserRuleContext() { }
    void copyFrom(CommandContext *context);
    using antlr4::ParserRuleContext::copyFrom;

    virtual size_t getRuleIndex() const override;

   
  };

  class  BLOCK_COMContext : public CommandContext {
  public:
    BLOCK_COMContext(CommandContext *ctx);

    std::vector<CommandContext *> command();
    CommandContext* command(size_t i);
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  DYN_COMContext : public CommandContext {
  public:
    DYN_COMContext(CommandContext *ctx);

    CommandContext *command();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  SET_TO_COMContext : public CommandContext {
  public:
    SET_TO_COMContext(CommandContext *ctx);

    VariableContext *variable();
    ExpressionContext *expression();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  DEFAULT_TO_COMContext : public CommandContext {
  public:
    DEFAULT_TO_COMContext(CommandContext *ctx);

    VariableContext *variable();
    ExpressionContext *expression();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  COLOR_COMContext : public CommandContext {
  public:
    COLOR_COMContext(CommandContext *ctx);

    Color_commandContext *color_command();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  IF_THEN_COMContext : public CommandContext {
  public:
    IF_THEN_COMContext(CommandContext *ctx);

    If_thenContext *if_then();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  PAR_COMContext : public CommandContext {
  public:
    PAR_COMContext(CommandContext *ctx);

    CommandContext *command();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  LOOP_COMContext : public CommandContext {
  public:
    LOOP_COMContext(CommandContext *ctx);

    LoopContext *loop();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  CommandContext* command();

  class  NContext : public antlr4::ParserRuleContext {
  public:
    NContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *POS_INT();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  NContext* n();

  class  ConstantContext : public antlr4::ParserRuleContext {
  public:
    ConstantContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    Cpx_number_reContext *cpx_number_re();
    Cpx_number_imContext *cpx_number_im();
    NContext *n();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  ConstantContext* constant();

  class  VariableContext : public antlr4::ParserRuleContext {
  public:
    VariableContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *VARIABLE();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  VariableContext* variable();

  class  Cpx_number_reContext : public antlr4::ParserRuleContext {
  public:
    Cpx_number_reContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *NUMBER();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Cpx_number_reContext* cpx_number_re();

  class  Cpx_number_imContext : public antlr4::ParserRuleContext {
  public:
    Cpx_number_imContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *CPX_NUMBER_IM();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Cpx_number_imContext* cpx_number_im();

  class  AtomContext : public antlr4::ParserRuleContext {
  public:
    AtomContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    ConstantContext *constant();
    VariableContext *variable();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  AtomContext* atom();

  class  Cpx_functionContext : public antlr4::ParserRuleContext {
  public:
    Cpx_functionContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *EXP();
    antlr4::tree::TerminalNode *COS();
    antlr4::tree::TerminalNode *SIN();
    antlr4::tree::TerminalNode *TAN();
    antlr4::tree::TerminalNode *COSH();
    antlr4::tree::TerminalNode *SINH();
    antlr4::tree::TerminalNode *TANH();
    antlr4::tree::TerminalNode *RE();
    antlr4::tree::TerminalNode *IM();
    antlr4::tree::TerminalNode *BAR();
    antlr4::tree::TerminalNode *ARG();
    antlr4::tree::TerminalNode *LOG();
    antlr4::tree::TerminalNode *SQRT();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Cpx_functionContext* cpx_function();

  class  Real_functionContext : public antlr4::ParserRuleContext {
  public:
    Real_functionContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    antlr4::tree::TerminalNode *ARCCOS();
    antlr4::tree::TerminalNode *ARCSIN();
    antlr4::tree::TerminalNode *ARCTAN();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Real_functionContext* real_function();

  class  ExpressionContext : public antlr4::ParserRuleContext {
  public:
    ExpressionContext(antlr4::ParserRuleContext *parent, size_t invokingState);
   
    ExpressionContext() : antlr4::ParserRuleContext() { }
    void copyFrom(ExpressionContext *context);
    using antlr4::ParserRuleContext::copyFrom;

    virtual size_t getRuleIndex() const override;

   
  };

  class  POW_EXPContext : public ExpressionContext {
  public:
    POW_EXPContext(ExpressionContext *ctx);

    ExpressionContext *expression();
    antlr4::tree::TerminalNode *POW();
    NContext *n();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  TIMES_EXPContext : public ExpressionContext {
  public:
    TIMES_EXPContext(ExpressionContext *ctx);

    std::vector<ExpressionContext *> expression();
    ExpressionContext* expression(size_t i);
    antlr4::tree::TerminalNode *TIMES();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  DIVIDE_EXPContext : public ExpressionContext {
  public:
    DIVIDE_EXPContext(ExpressionContext *ctx);

    std::vector<ExpressionContext *> expression();
    ExpressionContext* expression(size_t i);
    antlr4::tree::TerminalNode *DIVIDE();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  MINUS_EXPContext : public ExpressionContext {
  public:
    MINUS_EXPContext(ExpressionContext *ctx);

    std::vector<ExpressionContext *> expression();
    ExpressionContext* expression(size_t i);
    antlr4::tree::TerminalNode *MINUS();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  SIGNED_ATOM_EXPContext : public ExpressionContext {
  public:
    SIGNED_ATOM_EXPContext(ExpressionContext *ctx);

    AtomContext *atom();
    antlr4::tree::TerminalNode *PLUS();
    antlr4::tree::TerminalNode *MINUS();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  PLUS_EXPContext : public ExpressionContext {
  public:
    PLUS_EXPContext(ExpressionContext *ctx);

    FractalParser::ExpressionContext *left = nullptr;
    FractalParser::ExpressionContext *right = nullptr;
    antlr4::tree::TerminalNode *PLUS();
    std::vector<ExpressionContext *> expression();
    ExpressionContext* expression(size_t i);
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  REDUCE_MOD_EXPContext : public ExpressionContext {
  public:
    REDUCE_MOD_EXPContext(ExpressionContext *ctx);

    VariableContext *variable();
    ExpressionContext *expression();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  RE_FCN_EXPContext : public ExpressionContext {
  public:
    RE_FCN_EXPContext(ExpressionContext *ctx);

    Real_functionContext *real_function();
    antlr4::tree::TerminalNode *LPAREN();
    ExpressionContext *expression();
    antlr4::tree::TerminalNode *RPAREN();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  PAREN_EXPContext : public ExpressionContext {
  public:
    PAREN_EXPContext(ExpressionContext *ctx);

    antlr4::tree::TerminalNode *LPAREN();
    ExpressionContext *expression();
    antlr4::tree::TerminalNode *RPAREN();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  CPX_FCN_EXPContext : public ExpressionContext {
  public:
    CPX_FCN_EXPContext(ExpressionContext *ctx);

    Cpx_functionContext *cpx_function();
    antlr4::tree::TerminalNode *LPAREN();
    ExpressionContext *expression();
    antlr4::tree::TerminalNode *RPAREN();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  ExpressionContext* expression();
  ExpressionContext* expression(int precedence);
  class  ConditionContext : public antlr4::ParserRuleContext {
  public:
    ConditionContext(antlr4::ParserRuleContext *parent, size_t invokingState);
   
    ConditionContext() : antlr4::ParserRuleContext() { }
    void copyFrom(ConditionContext *context);
    using antlr4::ParserRuleContext::copyFrom;

    virtual size_t getRuleIndex() const override;

   
  };

  class  STOPS_CONDContext : public ConditionContext {
  public:
    STOPS_CONDContext(ConditionContext *ctx);

    ExpressionContext *expression();
    antlr4::tree::TerminalNode *STOPS();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  COMP_CONDContext : public ConditionContext {
  public:
    COMP_CONDContext(ConditionContext *ctx);

    std::vector<ExpressionContext *> expression();
    ExpressionContext* expression(size_t i);
    antlr4::tree::TerminalNode *GT();
    antlr4::tree::TerminalNode *LT();
    antlr4::tree::TerminalNode *EQUALS();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  VANISHES_CONDContext : public ConditionContext {
  public:
    VANISHES_CONDContext(ConditionContext *ctx);

    ExpressionContext *expression();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  ESCAPES_CONDContext : public ConditionContext {
  public:
    ESCAPES_CONDContext(ConditionContext *ctx);

    ExpressionContext *expression();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  COMB_CONDContext : public ConditionContext {
  public:
    COMB_CONDContext(ConditionContext *ctx);

    std::vector<ConditionContext *> condition();
    ConditionContext* condition(size_t i);
    antlr4::tree::TerminalNode *OR();
    antlr4::tree::TerminalNode *AND();
    antlr4::tree::TerminalNode *XOR();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  ConditionContext* condition();
  ConditionContext* condition(int precedence);
  class  If_thenContext : public antlr4::ParserRuleContext {
  public:
    If_thenContext(antlr4::ParserRuleContext *parent, size_t invokingState);
   
    If_thenContext() : antlr4::ParserRuleContext() { }
    void copyFrom(If_thenContext *context);
    using antlr4::ParserRuleContext::copyFrom;

    virtual size_t getRuleIndex() const override;

   
  };

  class  IF_THENContext : public If_thenContext {
  public:
    IF_THENContext(If_thenContext *ctx);

    ConditionContext *condition();
    CommandContext *command();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  IF_THEN_ELSEContext : public If_thenContext {
  public:
    IF_THEN_ELSEContext(If_thenContext *ctx);

    ConditionContext *condition();
    std::vector<CommandContext *> command();
    CommandContext* command(size_t i);
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  If_thenContext* if_then();

  class  LoopContext : public antlr4::ParserRuleContext {
  public:
    LoopContext(antlr4::ParserRuleContext *parent, size_t invokingState);
   
    LoopContext() : antlr4::ParserRuleContext() { }
    void copyFrom(LoopContext *context);
    using antlr4::ParserRuleContext::copyFrom;

    virtual size_t getRuleIndex() const override;

   
  };

  class  LoopRepeatContext : public LoopContext {
  public:
    LoopRepeatContext(LoopContext *ctx);

    NContext *n();
    CommandContext *command();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  LoopIterateOnContext : public LoopContext {
  public:
    LoopIterateOnContext(LoopContext *ctx);

    antlr4::tree::TerminalNode *ITERATE();
    ExpressionContext *expression();
    VariableContext *variable();
    ConditionContext *condition();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  LoopDoContext : public LoopContext {
  public:
    LoopDoContext(LoopContext *ctx);

    ConditionContext *condition();
    std::vector<CommandContext *> command();
    CommandContext* command(size_t i);
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  class  LoopIterateEmptyContext : public LoopContext {
  public:
    LoopIterateEmptyContext(LoopContext *ctx);

    antlr4::tree::TerminalNode *ITERATE();
    ExpressionContext *expression();
    ConditionContext *condition();
    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
  };

  LoopContext* loop();

  class  FlagnameContext : public antlr4::ParserRuleContext {
  public:
    FlagnameContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  FlagnameContext* flagname();

  class  ColorContext : public antlr4::ParserRuleContext {
  public:
    ColorContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  ColorContext* color();

  class  Color_commandContext : public antlr4::ParserRuleContext {
  public:
    Color_commandContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    FlagnameContext *flagname();
    ColorContext *color();
    VariableContext *variable();
    NContext *n();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Color_commandContext* color_command();

  class  Num_typeContext : public antlr4::ParserRuleContext {
  public:
    Num_typeContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Num_typeContext* num_type();

  class  Probe_commandContext : public antlr4::ParserRuleContext {
  public:
    Probe_commandContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    Num_typeContext *num_type();
    CommandContext *command();
    VariableContext *variable();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Probe_commandContext* probe_command();

  class  Saddle_dropContext : public antlr4::ParserRuleContext {
  public:
    Saddle_dropContext(antlr4::ParserRuleContext *parent, size_t invokingState);
    virtual size_t getRuleIndex() const override;
    VariableContext *variable();
    antlr4::tree::TerminalNode *EQUALS();
    antlr4::tree::TerminalNode *LPAREN();
    ExpressionContext *expression();
    antlr4::tree::TerminalNode *RPAREN();

    virtual antlrcpp::Any accept(antlr4::tree::ParseTreeVisitor *visitor) override;
   
  };

  Saddle_dropContext* saddle_drop();


  virtual bool sempred(antlr4::RuleContext *_localctx, size_t ruleIndex, size_t predicateIndex) override;
  bool expressionSempred(ExpressionContext *_localctx, size_t predicateIndex);
  bool conditionSempred(ConditionContext *_localctx, size_t predicateIndex);

private:
  static std::vector<antlr4::dfa::DFA> _decisionToDFA;
  static antlr4::atn::PredictionContextCache _sharedContextCache;
  static std::vector<std::string> _ruleNames;
  static std::vector<std::string> _tokenNames;

  static std::vector<std::string> _literalNames;
  static std::vector<std::string> _symbolicNames;
  static antlr4::dfa::Vocabulary _vocabulary;
  static antlr4::atn::ATN _atn;
  static std::vector<uint16_t> _serializedATN;


  struct Initializer {
    Initializer();
  };
  static Initializer _init;
};

