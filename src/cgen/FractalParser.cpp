
// Generated from Fractal.g4 by ANTLR 4.7.1


#include "FractalVisitor.h"

#include "FractalParser.h"


using namespace antlrcpp;
using namespace antlr4;

FractalParser::FractalParser(TokenStream *input) : Parser(input) {
  _interpreter = new atn::ParserATNSimulator(this, _atn, _decisionToDFA, _sharedContextCache);
}

FractalParser::~FractalParser() {
  delete _interpreter;
}

std::string FractalParser::getGrammarFileName() const {
  return "Fractal.g4";
}

const std::vector<std::string>& FractalParser::getRuleNames() const {
  return _ruleNames;
}

dfa::Vocabulary& FractalParser::getVocabulary() const {
  return _vocabulary;
}


//----------------- ScriptContext ------------------------------------------------------------------

FractalParser::ScriptContext::ScriptContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

std::vector<FractalParser::CommandContext *> FractalParser::ScriptContext::command() {
  return getRuleContexts<FractalParser::CommandContext>();
}

FractalParser::CommandContext* FractalParser::ScriptContext::command(size_t i) {
  return getRuleContext<FractalParser::CommandContext>(i);
}


size_t FractalParser::ScriptContext::getRuleIndex() const {
  return FractalParser::RuleScript;
}

antlrcpp::Any FractalParser::ScriptContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitScript(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::ScriptContext* FractalParser::script() {
  ScriptContext *_localctx = _tracker.createInstance<ScriptContext>(_ctx, getState());
  enterRule(_localctx, 0, FractalParser::RuleScript);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(43); 
    _errHandler->sync(this);
    _la = _input->LA(1);
    do {
      setState(40);
      command();
      setState(41);
      match(FractalParser::T__0);
      setState(45); 
      _errHandler->sync(this);
      _la = _input->LA(1);
    } while ((((_la & ~ 0x3fULL) == 0) &&
      ((1ULL << _la) & ((1ULL << FractalParser::T__1)
      | (1ULL << FractalParser::T__3)
      | (1ULL << FractalParser::T__4)
      | (1ULL << FractalParser::T__5)
      | (1ULL << FractalParser::T__7)
      | (1ULL << FractalParser::T__8)
      | (1ULL << FractalParser::T__13)
      | (1ULL << FractalParser::T__16)
      | (1ULL << FractalParser::T__19)
      | (1ULL << FractalParser::T__32)
      | (1ULL << FractalParser::ITERATE))) != 0));
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- CommandContext ------------------------------------------------------------------

FractalParser::CommandContext::CommandContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::CommandContext::getRuleIndex() const {
  return FractalParser::RuleCommand;
}

void FractalParser::CommandContext::copyFrom(CommandContext *ctx) {
  ParserRuleContext::copyFrom(ctx);
}

//----------------- BLOCK_COMContext ------------------------------------------------------------------

std::vector<FractalParser::CommandContext *> FractalParser::BLOCK_COMContext::command() {
  return getRuleContexts<FractalParser::CommandContext>();
}

FractalParser::CommandContext* FractalParser::BLOCK_COMContext::command(size_t i) {
  return getRuleContext<FractalParser::CommandContext>(i);
}

FractalParser::BLOCK_COMContext::BLOCK_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::BLOCK_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitBLOCK_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- DYN_COMContext ------------------------------------------------------------------

FractalParser::CommandContext* FractalParser::DYN_COMContext::command() {
  return getRuleContext<FractalParser::CommandContext>(0);
}

FractalParser::DYN_COMContext::DYN_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::DYN_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitDYN_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- SET_TO_COMContext ------------------------------------------------------------------

FractalParser::VariableContext* FractalParser::SET_TO_COMContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

FractalParser::ExpressionContext* FractalParser::SET_TO_COMContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::SET_TO_COMContext::SET_TO_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::SET_TO_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitSET_TO_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- DEFAULT_TO_COMContext ------------------------------------------------------------------

FractalParser::VariableContext* FractalParser::DEFAULT_TO_COMContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

FractalParser::ExpressionContext* FractalParser::DEFAULT_TO_COMContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::DEFAULT_TO_COMContext::DEFAULT_TO_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::DEFAULT_TO_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitDEFAULT_TO_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- COLOR_COMContext ------------------------------------------------------------------

FractalParser::Color_commandContext* FractalParser::COLOR_COMContext::color_command() {
  return getRuleContext<FractalParser::Color_commandContext>(0);
}

FractalParser::COLOR_COMContext::COLOR_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::COLOR_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCOLOR_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- IF_THEN_COMContext ------------------------------------------------------------------

FractalParser::If_thenContext* FractalParser::IF_THEN_COMContext::if_then() {
  return getRuleContext<FractalParser::If_thenContext>(0);
}

FractalParser::IF_THEN_COMContext::IF_THEN_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::IF_THEN_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitIF_THEN_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- PAR_COMContext ------------------------------------------------------------------

FractalParser::CommandContext* FractalParser::PAR_COMContext::command() {
  return getRuleContext<FractalParser::CommandContext>(0);
}

FractalParser::PAR_COMContext::PAR_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::PAR_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitPAR_COM(this);
  else
    return visitor->visitChildren(this);
}
//----------------- LOOP_COMContext ------------------------------------------------------------------

FractalParser::LoopContext* FractalParser::LOOP_COMContext::loop() {
  return getRuleContext<FractalParser::LoopContext>(0);
}

FractalParser::LOOP_COMContext::LOOP_COMContext(CommandContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::LOOP_COMContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitLOOP_COM(this);
  else
    return visitor->visitChildren(this);
}
FractalParser::CommandContext* FractalParser::command() {
  CommandContext *_localctx = _tracker.createInstance<CommandContext>(_ctx, getState());
  enterRule(_localctx, 2, FractalParser::RuleCommand);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(72);
    _errHandler->sync(this);
    switch (_input->LA(1)) {
      case FractalParser::T__1: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::SET_TO_COMContext>(_localctx));
        enterOuterAlt(_localctx, 1);
        setState(47);
        match(FractalParser::T__1);
        setState(48);
        variable();
        setState(49);
        match(FractalParser::T__2);
        setState(50);
        expression(0);
        break;
      }

      case FractalParser::T__3: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::DEFAULT_TO_COMContext>(_localctx));
        enterOuterAlt(_localctx, 2);
        setState(52);
        match(FractalParser::T__3);
        setState(53);
        variable();
        setState(54);
        match(FractalParser::T__2);
        setState(55);
        expression(0);
        break;
      }

      case FractalParser::T__4:
      case FractalParser::T__5: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::BLOCK_COMContext>(_localctx));
        enterOuterAlt(_localctx, 3);
        setState(57);
        _la = _input->LA(1);
        if (!(_la == FractalParser::T__4

        || _la == FractalParser::T__5)) {
        _errHandler->recoverInline(this);
        }
        else {
          _errHandler->reportMatch(this);
          consume();
        }
        setState(59); 
        _errHandler->sync(this);
        _la = _input->LA(1);
        do {
          setState(58);
          command();
          setState(61); 
          _errHandler->sync(this);
          _la = _input->LA(1);
        } while ((((_la & ~ 0x3fULL) == 0) &&
          ((1ULL << _la) & ((1ULL << FractalParser::T__1)
          | (1ULL << FractalParser::T__3)
          | (1ULL << FractalParser::T__4)
          | (1ULL << FractalParser::T__5)
          | (1ULL << FractalParser::T__7)
          | (1ULL << FractalParser::T__8)
          | (1ULL << FractalParser::T__13)
          | (1ULL << FractalParser::T__16)
          | (1ULL << FractalParser::T__19)
          | (1ULL << FractalParser::T__32)
          | (1ULL << FractalParser::ITERATE))) != 0));
        setState(63);
        match(FractalParser::T__6);
        break;
      }

      case FractalParser::T__32: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::COLOR_COMContext>(_localctx));
        enterOuterAlt(_localctx, 4);
        setState(65);
        color_command();
        break;
      }

      case FractalParser::T__7: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::PAR_COMContext>(_localctx));
        enterOuterAlt(_localctx, 5);
        setState(66);
        match(FractalParser::T__7);
        setState(67);
        command();
        break;
      }

      case FractalParser::T__8: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::DYN_COMContext>(_localctx));
        enterOuterAlt(_localctx, 6);
        setState(68);
        match(FractalParser::T__8);
        setState(69);
        command();
        break;
      }

      case FractalParser::T__13: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::IF_THEN_COMContext>(_localctx));
        enterOuterAlt(_localctx, 7);
        setState(70);
        if_then();
        break;
      }

      case FractalParser::T__16:
      case FractalParser::T__19:
      case FractalParser::ITERATE: {
        _localctx = dynamic_cast<CommandContext *>(_tracker.createInstance<FractalParser::LOOP_COMContext>(_localctx));
        enterOuterAlt(_localctx, 8);
        setState(71);
        loop();
        break;
      }

    default:
      throw NoViableAltException(this);
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- NContext ------------------------------------------------------------------

FractalParser::NContext::NContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::NContext::POS_INT() {
  return getToken(FractalParser::POS_INT, 0);
}


size_t FractalParser::NContext::getRuleIndex() const {
  return FractalParser::RuleN;
}

antlrcpp::Any FractalParser::NContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitN(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::NContext* FractalParser::n() {
  NContext *_localctx = _tracker.createInstance<NContext>(_ctx, getState());
  enterRule(_localctx, 4, FractalParser::RuleN);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(74);
    match(FractalParser::POS_INT);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- ConstantContext ------------------------------------------------------------------

FractalParser::ConstantContext::ConstantContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

FractalParser::Cpx_number_reContext* FractalParser::ConstantContext::cpx_number_re() {
  return getRuleContext<FractalParser::Cpx_number_reContext>(0);
}

FractalParser::Cpx_number_imContext* FractalParser::ConstantContext::cpx_number_im() {
  return getRuleContext<FractalParser::Cpx_number_imContext>(0);
}

FractalParser::NContext* FractalParser::ConstantContext::n() {
  return getRuleContext<FractalParser::NContext>(0);
}


size_t FractalParser::ConstantContext::getRuleIndex() const {
  return FractalParser::RuleConstant;
}

antlrcpp::Any FractalParser::ConstantContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitConstant(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::ConstantContext* FractalParser::constant() {
  ConstantContext *_localctx = _tracker.createInstance<ConstantContext>(_ctx, getState());
  enterRule(_localctx, 6, FractalParser::RuleConstant);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(79);
    _errHandler->sync(this);
    switch (_input->LA(1)) {
      case FractalParser::NUMBER: {
        enterOuterAlt(_localctx, 1);
        setState(76);
        cpx_number_re();
        break;
      }

      case FractalParser::CPX_NUMBER_IM: {
        enterOuterAlt(_localctx, 2);
        setState(77);
        cpx_number_im();
        break;
      }

      case FractalParser::POS_INT: {
        enterOuterAlt(_localctx, 3);
        setState(78);
        n();
        break;
      }

    default:
      throw NoViableAltException(this);
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- VariableContext ------------------------------------------------------------------

FractalParser::VariableContext::VariableContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::VariableContext::VARIABLE() {
  return getToken(FractalParser::VARIABLE, 0);
}


size_t FractalParser::VariableContext::getRuleIndex() const {
  return FractalParser::RuleVariable;
}

antlrcpp::Any FractalParser::VariableContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitVariable(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::VariableContext* FractalParser::variable() {
  VariableContext *_localctx = _tracker.createInstance<VariableContext>(_ctx, getState());
  enterRule(_localctx, 8, FractalParser::RuleVariable);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(81);
    match(FractalParser::VARIABLE);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Cpx_number_reContext ------------------------------------------------------------------

FractalParser::Cpx_number_reContext::Cpx_number_reContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::Cpx_number_reContext::NUMBER() {
  return getToken(FractalParser::NUMBER, 0);
}


size_t FractalParser::Cpx_number_reContext::getRuleIndex() const {
  return FractalParser::RuleCpx_number_re;
}

antlrcpp::Any FractalParser::Cpx_number_reContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCpx_number_re(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Cpx_number_reContext* FractalParser::cpx_number_re() {
  Cpx_number_reContext *_localctx = _tracker.createInstance<Cpx_number_reContext>(_ctx, getState());
  enterRule(_localctx, 10, FractalParser::RuleCpx_number_re);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(83);
    match(FractalParser::NUMBER);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Cpx_number_imContext ------------------------------------------------------------------

FractalParser::Cpx_number_imContext::Cpx_number_imContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::Cpx_number_imContext::CPX_NUMBER_IM() {
  return getToken(FractalParser::CPX_NUMBER_IM, 0);
}


size_t FractalParser::Cpx_number_imContext::getRuleIndex() const {
  return FractalParser::RuleCpx_number_im;
}

antlrcpp::Any FractalParser::Cpx_number_imContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCpx_number_im(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Cpx_number_imContext* FractalParser::cpx_number_im() {
  Cpx_number_imContext *_localctx = _tracker.createInstance<Cpx_number_imContext>(_ctx, getState());
  enterRule(_localctx, 12, FractalParser::RuleCpx_number_im);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(85);
    match(FractalParser::CPX_NUMBER_IM);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- AtomContext ------------------------------------------------------------------

FractalParser::AtomContext::AtomContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

FractalParser::ConstantContext* FractalParser::AtomContext::constant() {
  return getRuleContext<FractalParser::ConstantContext>(0);
}

FractalParser::VariableContext* FractalParser::AtomContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}


size_t FractalParser::AtomContext::getRuleIndex() const {
  return FractalParser::RuleAtom;
}

antlrcpp::Any FractalParser::AtomContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitAtom(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::AtomContext* FractalParser::atom() {
  AtomContext *_localctx = _tracker.createInstance<AtomContext>(_ctx, getState());
  enterRule(_localctx, 14, FractalParser::RuleAtom);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(89);
    _errHandler->sync(this);
    switch (_input->LA(1)) {
      case FractalParser::POS_INT:
      case FractalParser::NUMBER:
      case FractalParser::CPX_NUMBER_IM: {
        enterOuterAlt(_localctx, 1);
        setState(87);
        constant();
        break;
      }

      case FractalParser::VARIABLE: {
        enterOuterAlt(_localctx, 2);
        setState(88);
        variable();
        break;
      }

    default:
      throw NoViableAltException(this);
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Cpx_functionContext ------------------------------------------------------------------

FractalParser::Cpx_functionContext::Cpx_functionContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::Cpx_functionContext::EXP() {
  return getToken(FractalParser::EXP, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::COS() {
  return getToken(FractalParser::COS, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::SIN() {
  return getToken(FractalParser::SIN, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::TAN() {
  return getToken(FractalParser::TAN, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::COSH() {
  return getToken(FractalParser::COSH, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::SINH() {
  return getToken(FractalParser::SINH, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::TANH() {
  return getToken(FractalParser::TANH, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::RE() {
  return getToken(FractalParser::RE, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::IM() {
  return getToken(FractalParser::IM, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::BAR() {
  return getToken(FractalParser::BAR, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::ARG() {
  return getToken(FractalParser::ARG, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::LOG() {
  return getToken(FractalParser::LOG, 0);
}

tree::TerminalNode* FractalParser::Cpx_functionContext::SQRT() {
  return getToken(FractalParser::SQRT, 0);
}


size_t FractalParser::Cpx_functionContext::getRuleIndex() const {
  return FractalParser::RuleCpx_function;
}

antlrcpp::Any FractalParser::Cpx_functionContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCpx_function(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Cpx_functionContext* FractalParser::cpx_function() {
  Cpx_functionContext *_localctx = _tracker.createInstance<Cpx_functionContext>(_ctx, getState());
  enterRule(_localctx, 16, FractalParser::RuleCpx_function);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(91);
    _la = _input->LA(1);
    if (!((((_la & ~ 0x3fULL) == 0) &&
      ((1ULL << _la) & ((1ULL << FractalParser::EXP)
      | (1ULL << FractalParser::COS)
      | (1ULL << FractalParser::SIN)
      | (1ULL << FractalParser::TAN)
      | (1ULL << FractalParser::COSH)
      | (1ULL << FractalParser::SINH)
      | (1ULL << FractalParser::TANH)
      | (1ULL << FractalParser::RE)
      | (1ULL << FractalParser::IM)
      | (1ULL << FractalParser::BAR)
      | (1ULL << FractalParser::ARG)
      | (1ULL << FractalParser::LOG)
      | (1ULL << FractalParser::SQRT))) != 0))) {
    _errHandler->recoverInline(this);
    }
    else {
      _errHandler->reportMatch(this);
      consume();
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Real_functionContext ------------------------------------------------------------------

FractalParser::Real_functionContext::Real_functionContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

tree::TerminalNode* FractalParser::Real_functionContext::ARCCOS() {
  return getToken(FractalParser::ARCCOS, 0);
}

tree::TerminalNode* FractalParser::Real_functionContext::ARCSIN() {
  return getToken(FractalParser::ARCSIN, 0);
}

tree::TerminalNode* FractalParser::Real_functionContext::ARCTAN() {
  return getToken(FractalParser::ARCTAN, 0);
}


size_t FractalParser::Real_functionContext::getRuleIndex() const {
  return FractalParser::RuleReal_function;
}

antlrcpp::Any FractalParser::Real_functionContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitReal_function(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Real_functionContext* FractalParser::real_function() {
  Real_functionContext *_localctx = _tracker.createInstance<Real_functionContext>(_ctx, getState());
  enterRule(_localctx, 18, FractalParser::RuleReal_function);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(93);
    _la = _input->LA(1);
    if (!(((((_la - 62) & ~ 0x3fULL) == 0) &&
      ((1ULL << (_la - 62)) & ((1ULL << (FractalParser::ARCCOS - 62))
      | (1ULL << (FractalParser::ARCSIN - 62))
      | (1ULL << (FractalParser::ARCTAN - 62)))) != 0))) {
    _errHandler->recoverInline(this);
    }
    else {
      _errHandler->reportMatch(this);
      consume();
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- ExpressionContext ------------------------------------------------------------------

FractalParser::ExpressionContext::ExpressionContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::ExpressionContext::getRuleIndex() const {
  return FractalParser::RuleExpression;
}

void FractalParser::ExpressionContext::copyFrom(ExpressionContext *ctx) {
  ParserRuleContext::copyFrom(ctx);
}

//----------------- POW_EXPContext ------------------------------------------------------------------

FractalParser::ExpressionContext* FractalParser::POW_EXPContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::POW_EXPContext::POW() {
  return getToken(FractalParser::POW, 0);
}

FractalParser::NContext* FractalParser::POW_EXPContext::n() {
  return getRuleContext<FractalParser::NContext>(0);
}

FractalParser::POW_EXPContext::POW_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::POW_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitPOW_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- TIMES_EXPContext ------------------------------------------------------------------

std::vector<FractalParser::ExpressionContext *> FractalParser::TIMES_EXPContext::expression() {
  return getRuleContexts<FractalParser::ExpressionContext>();
}

FractalParser::ExpressionContext* FractalParser::TIMES_EXPContext::expression(size_t i) {
  return getRuleContext<FractalParser::ExpressionContext>(i);
}

tree::TerminalNode* FractalParser::TIMES_EXPContext::TIMES() {
  return getToken(FractalParser::TIMES, 0);
}

FractalParser::TIMES_EXPContext::TIMES_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::TIMES_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitTIMES_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- DIVIDE_EXPContext ------------------------------------------------------------------

std::vector<FractalParser::ExpressionContext *> FractalParser::DIVIDE_EXPContext::expression() {
  return getRuleContexts<FractalParser::ExpressionContext>();
}

FractalParser::ExpressionContext* FractalParser::DIVIDE_EXPContext::expression(size_t i) {
  return getRuleContext<FractalParser::ExpressionContext>(i);
}

tree::TerminalNode* FractalParser::DIVIDE_EXPContext::DIVIDE() {
  return getToken(FractalParser::DIVIDE, 0);
}

FractalParser::DIVIDE_EXPContext::DIVIDE_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::DIVIDE_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitDIVIDE_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- MINUS_EXPContext ------------------------------------------------------------------

std::vector<FractalParser::ExpressionContext *> FractalParser::MINUS_EXPContext::expression() {
  return getRuleContexts<FractalParser::ExpressionContext>();
}

FractalParser::ExpressionContext* FractalParser::MINUS_EXPContext::expression(size_t i) {
  return getRuleContext<FractalParser::ExpressionContext>(i);
}

tree::TerminalNode* FractalParser::MINUS_EXPContext::MINUS() {
  return getToken(FractalParser::MINUS, 0);
}

FractalParser::MINUS_EXPContext::MINUS_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::MINUS_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitMINUS_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- SIGNED_ATOM_EXPContext ------------------------------------------------------------------

FractalParser::AtomContext* FractalParser::SIGNED_ATOM_EXPContext::atom() {
  return getRuleContext<FractalParser::AtomContext>(0);
}

tree::TerminalNode* FractalParser::SIGNED_ATOM_EXPContext::PLUS() {
  return getToken(FractalParser::PLUS, 0);
}

tree::TerminalNode* FractalParser::SIGNED_ATOM_EXPContext::MINUS() {
  return getToken(FractalParser::MINUS, 0);
}

FractalParser::SIGNED_ATOM_EXPContext::SIGNED_ATOM_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::SIGNED_ATOM_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitSIGNED_ATOM_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- PLUS_EXPContext ------------------------------------------------------------------

tree::TerminalNode* FractalParser::PLUS_EXPContext::PLUS() {
  return getToken(FractalParser::PLUS, 0);
}

std::vector<FractalParser::ExpressionContext *> FractalParser::PLUS_EXPContext::expression() {
  return getRuleContexts<FractalParser::ExpressionContext>();
}

FractalParser::ExpressionContext* FractalParser::PLUS_EXPContext::expression(size_t i) {
  return getRuleContext<FractalParser::ExpressionContext>(i);
}

FractalParser::PLUS_EXPContext::PLUS_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::PLUS_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitPLUS_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- REDUCE_MOD_EXPContext ------------------------------------------------------------------

FractalParser::VariableContext* FractalParser::REDUCE_MOD_EXPContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

FractalParser::ExpressionContext* FractalParser::REDUCE_MOD_EXPContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::REDUCE_MOD_EXPContext::REDUCE_MOD_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::REDUCE_MOD_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitREDUCE_MOD_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- RE_FCN_EXPContext ------------------------------------------------------------------

FractalParser::Real_functionContext* FractalParser::RE_FCN_EXPContext::real_function() {
  return getRuleContext<FractalParser::Real_functionContext>(0);
}

tree::TerminalNode* FractalParser::RE_FCN_EXPContext::LPAREN() {
  return getToken(FractalParser::LPAREN, 0);
}

FractalParser::ExpressionContext* FractalParser::RE_FCN_EXPContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::RE_FCN_EXPContext::RPAREN() {
  return getToken(FractalParser::RPAREN, 0);
}

FractalParser::RE_FCN_EXPContext::RE_FCN_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::RE_FCN_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitRE_FCN_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- PAREN_EXPContext ------------------------------------------------------------------

tree::TerminalNode* FractalParser::PAREN_EXPContext::LPAREN() {
  return getToken(FractalParser::LPAREN, 0);
}

FractalParser::ExpressionContext* FractalParser::PAREN_EXPContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::PAREN_EXPContext::RPAREN() {
  return getToken(FractalParser::RPAREN, 0);
}

FractalParser::PAREN_EXPContext::PAREN_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::PAREN_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitPAREN_EXP(this);
  else
    return visitor->visitChildren(this);
}
//----------------- CPX_FCN_EXPContext ------------------------------------------------------------------

FractalParser::Cpx_functionContext* FractalParser::CPX_FCN_EXPContext::cpx_function() {
  return getRuleContext<FractalParser::Cpx_functionContext>(0);
}

tree::TerminalNode* FractalParser::CPX_FCN_EXPContext::LPAREN() {
  return getToken(FractalParser::LPAREN, 0);
}

FractalParser::ExpressionContext* FractalParser::CPX_FCN_EXPContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::CPX_FCN_EXPContext::RPAREN() {
  return getToken(FractalParser::RPAREN, 0);
}

FractalParser::CPX_FCN_EXPContext::CPX_FCN_EXPContext(ExpressionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::CPX_FCN_EXPContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCPX_FCN_EXP(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::ExpressionContext* FractalParser::expression() {
   return expression(0);
}

FractalParser::ExpressionContext* FractalParser::expression(int precedence) {
  ParserRuleContext *parentContext = _ctx;
  size_t parentState = getState();
  FractalParser::ExpressionContext *_localctx = _tracker.createInstance<ExpressionContext>(_ctx, parentState);
  FractalParser::ExpressionContext *previousContext = _localctx;
  size_t startState = 20;
  enterRecursionRule(_localctx, 20, FractalParser::RuleExpression, precedence);

    size_t _la = 0;

  auto onExit = finally([=] {
    unrollRecursionContexts(parentContext);
  });
  try {
    size_t alt;
    enterOuterAlt(_localctx, 1);
    setState(119);
    _errHandler->sync(this);
    switch (_input->LA(1)) {
      case FractalParser::POS_INT:
      case FractalParser::NUMBER:
      case FractalParser::CPX_NUMBER_IM:
      case FractalParser::PLUS:
      case FractalParser::MINUS:
      case FractalParser::VARIABLE: {
        _localctx = _tracker.createInstance<SIGNED_ATOM_EXPContext>(_localctx);
        _ctx = _localctx;
        previousContext = _localctx;

        setState(97);
        _errHandler->sync(this);

        _la = _input->LA(1);
        if (_la == FractalParser::PLUS

        || _la == FractalParser::MINUS) {
          setState(96);
          _la = _input->LA(1);
          if (!(_la == FractalParser::PLUS

          || _la == FractalParser::MINUS)) {
          _errHandler->recoverInline(this);
          }
          else {
            _errHandler->reportMatch(this);
            consume();
          }
        }
        setState(99);
        atom();
        break;
      }

      case FractalParser::EXP:
      case FractalParser::COS:
      case FractalParser::SIN:
      case FractalParser::TAN:
      case FractalParser::COSH:
      case FractalParser::SINH:
      case FractalParser::TANH:
      case FractalParser::RE:
      case FractalParser::IM:
      case FractalParser::BAR:
      case FractalParser::ARG:
      case FractalParser::LOG:
      case FractalParser::SQRT: {
        _localctx = _tracker.createInstance<CPX_FCN_EXPContext>(_localctx);
        _ctx = _localctx;
        previousContext = _localctx;
        setState(100);
        cpx_function();
        setState(101);
        match(FractalParser::LPAREN);
        setState(102);
        expression(0);
        setState(103);
        match(FractalParser::RPAREN);
        break;
      }

      case FractalParser::ARCCOS:
      case FractalParser::ARCSIN:
      case FractalParser::ARCTAN: {
        _localctx = _tracker.createInstance<RE_FCN_EXPContext>(_localctx);
        _ctx = _localctx;
        previousContext = _localctx;
        setState(105);
        real_function();
        setState(106);
        match(FractalParser::LPAREN);
        setState(107);
        expression(0);
        setState(108);
        match(FractalParser::RPAREN);
        break;
      }

      case FractalParser::T__9: {
        _localctx = _tracker.createInstance<REDUCE_MOD_EXPContext>(_localctx);
        _ctx = _localctx;
        previousContext = _localctx;
        setState(110);
        match(FractalParser::T__9);
        setState(111);
        variable();
        setState(112);
        match(FractalParser::T__10);
        setState(113);
        expression(2);
        break;
      }

      case FractalParser::LPAREN: {
        _localctx = _tracker.createInstance<PAREN_EXPContext>(_localctx);
        _ctx = _localctx;
        previousContext = _localctx;
        setState(115);
        match(FractalParser::LPAREN);
        setState(116);
        expression(0);
        setState(117);
        match(FractalParser::RPAREN);
        break;
      }

    default:
      throw NoViableAltException(this);
    }
    _ctx->stop = _input->LT(-1);
    setState(138);
    _errHandler->sync(this);
    alt = getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 8, _ctx);
    while (alt != 2 && alt != atn::ATN::INVALID_ALT_NUMBER) {
      if (alt == 1) {
        if (!_parseListeners.empty())
          triggerExitRuleEvent();
        previousContext = _localctx;
        setState(136);
        _errHandler->sync(this);
        switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 7, _ctx)) {
        case 1: {
          auto newContext = _tracker.createInstance<TIMES_EXPContext>(_tracker.createInstance<ExpressionContext>(parentContext, parentState));
          _localctx = newContext;
          pushNewRecursionContext(newContext, startState, RuleExpression);
          setState(121);

          if (!(precpred(_ctx, 8))) throw FailedPredicateException(this, "precpred(_ctx, 8)");
          setState(122);
          match(FractalParser::TIMES);
          setState(123);
          expression(9);
          break;
        }

        case 2: {
          auto newContext = _tracker.createInstance<DIVIDE_EXPContext>(_tracker.createInstance<ExpressionContext>(parentContext, parentState));
          _localctx = newContext;
          pushNewRecursionContext(newContext, startState, RuleExpression);
          setState(124);

          if (!(precpred(_ctx, 7))) throw FailedPredicateException(this, "precpred(_ctx, 7)");
          setState(125);
          match(FractalParser::DIVIDE);
          setState(126);
          expression(8);
          break;
        }

        case 3: {
          auto newContext = _tracker.createInstance<PLUS_EXPContext>(_tracker.createInstance<ExpressionContext>(parentContext, parentState));
          _localctx = newContext;
          newContext->left = previousContext;
          pushNewRecursionContext(newContext, startState, RuleExpression);
          setState(127);

          if (!(precpred(_ctx, 6))) throw FailedPredicateException(this, "precpred(_ctx, 6)");
          setState(128);
          match(FractalParser::PLUS);
          setState(129);
          dynamic_cast<PLUS_EXPContext *>(_localctx)->right = expression(7);
          break;
        }

        case 4: {
          auto newContext = _tracker.createInstance<MINUS_EXPContext>(_tracker.createInstance<ExpressionContext>(parentContext, parentState));
          _localctx = newContext;
          pushNewRecursionContext(newContext, startState, RuleExpression);
          setState(130);

          if (!(precpred(_ctx, 5))) throw FailedPredicateException(this, "precpred(_ctx, 5)");
          setState(131);
          match(FractalParser::MINUS);
          setState(132);
          expression(6);
          break;
        }

        case 5: {
          auto newContext = _tracker.createInstance<POW_EXPContext>(_tracker.createInstance<ExpressionContext>(parentContext, parentState));
          _localctx = newContext;
          pushNewRecursionContext(newContext, startState, RuleExpression);
          setState(133);

          if (!(precpred(_ctx, 9))) throw FailedPredicateException(this, "precpred(_ctx, 9)");
          setState(134);
          match(FractalParser::POW);
          setState(135);
          n();
          break;
        }

        } 
      }
      setState(140);
      _errHandler->sync(this);
      alt = getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 8, _ctx);
    }
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }
  return _localctx;
}

//----------------- ConditionContext ------------------------------------------------------------------

FractalParser::ConditionContext::ConditionContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::ConditionContext::getRuleIndex() const {
  return FractalParser::RuleCondition;
}

void FractalParser::ConditionContext::copyFrom(ConditionContext *ctx) {
  ParserRuleContext::copyFrom(ctx);
}

//----------------- STOPS_CONDContext ------------------------------------------------------------------

FractalParser::ExpressionContext* FractalParser::STOPS_CONDContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::STOPS_CONDContext::STOPS() {
  return getToken(FractalParser::STOPS, 0);
}

FractalParser::STOPS_CONDContext::STOPS_CONDContext(ConditionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::STOPS_CONDContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitSTOPS_COND(this);
  else
    return visitor->visitChildren(this);
}
//----------------- COMP_CONDContext ------------------------------------------------------------------

std::vector<FractalParser::ExpressionContext *> FractalParser::COMP_CONDContext::expression() {
  return getRuleContexts<FractalParser::ExpressionContext>();
}

FractalParser::ExpressionContext* FractalParser::COMP_CONDContext::expression(size_t i) {
  return getRuleContext<FractalParser::ExpressionContext>(i);
}

tree::TerminalNode* FractalParser::COMP_CONDContext::GT() {
  return getToken(FractalParser::GT, 0);
}

tree::TerminalNode* FractalParser::COMP_CONDContext::LT() {
  return getToken(FractalParser::LT, 0);
}

tree::TerminalNode* FractalParser::COMP_CONDContext::EQUALS() {
  return getToken(FractalParser::EQUALS, 0);
}

FractalParser::COMP_CONDContext::COMP_CONDContext(ConditionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::COMP_CONDContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCOMP_COND(this);
  else
    return visitor->visitChildren(this);
}
//----------------- VANISHES_CONDContext ------------------------------------------------------------------

FractalParser::ExpressionContext* FractalParser::VANISHES_CONDContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::VANISHES_CONDContext::VANISHES_CONDContext(ConditionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::VANISHES_CONDContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitVANISHES_COND(this);
  else
    return visitor->visitChildren(this);
}
//----------------- ESCAPES_CONDContext ------------------------------------------------------------------

FractalParser::ExpressionContext* FractalParser::ESCAPES_CONDContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::ESCAPES_CONDContext::ESCAPES_CONDContext(ConditionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::ESCAPES_CONDContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitESCAPES_COND(this);
  else
    return visitor->visitChildren(this);
}
//----------------- COMB_CONDContext ------------------------------------------------------------------

std::vector<FractalParser::ConditionContext *> FractalParser::COMB_CONDContext::condition() {
  return getRuleContexts<FractalParser::ConditionContext>();
}

FractalParser::ConditionContext* FractalParser::COMB_CONDContext::condition(size_t i) {
  return getRuleContext<FractalParser::ConditionContext>(i);
}

tree::TerminalNode* FractalParser::COMB_CONDContext::OR() {
  return getToken(FractalParser::OR, 0);
}

tree::TerminalNode* FractalParser::COMB_CONDContext::AND() {
  return getToken(FractalParser::AND, 0);
}

tree::TerminalNode* FractalParser::COMB_CONDContext::XOR() {
  return getToken(FractalParser::XOR, 0);
}

FractalParser::COMB_CONDContext::COMB_CONDContext(ConditionContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::COMB_CONDContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitCOMB_COND(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::ConditionContext* FractalParser::condition() {
   return condition(0);
}

FractalParser::ConditionContext* FractalParser::condition(int precedence) {
  ParserRuleContext *parentContext = _ctx;
  size_t parentState = getState();
  FractalParser::ConditionContext *_localctx = _tracker.createInstance<ConditionContext>(_ctx, parentState);
  FractalParser::ConditionContext *previousContext = _localctx;
  size_t startState = 22;
  enterRecursionRule(_localctx, 22, FractalParser::RuleCondition, precedence);

    size_t _la = 0;

  auto onExit = finally([=] {
    unrollRecursionContexts(parentContext);
  });
  try {
    size_t alt;
    enterOuterAlt(_localctx, 1);
    setState(163);
    _errHandler->sync(this);
    switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 10, _ctx)) {
    case 1: {
      _localctx = _tracker.createInstance<COMP_CONDContext>(_localctx);
      _ctx = _localctx;
      previousContext = _localctx;

      setState(142);
      expression(0);
      setState(150);
      _errHandler->sync(this);
      switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 9, _ctx)) {
      case 1: {
        setState(143);
        match(FractalParser::GT);
        break;
      }

      case 2: {
        setState(144);
        match(FractalParser::LT);
        break;
      }

      case 3: {
        setState(145);
        match(FractalParser::GT);
        setState(146);
        match(FractalParser::EQUALS);
        break;
      }

      case 4: {
        setState(147);
        match(FractalParser::LT);
        setState(148);
        match(FractalParser::EQUALS);
        break;
      }

      case 5: {
        setState(149);
        match(FractalParser::EQUALS);
        break;
      }

      }
      setState(152);
      expression(0);
      break;
    }

    case 2: {
      _localctx = _tracker.createInstance<ESCAPES_CONDContext>(_localctx);
      _ctx = _localctx;
      previousContext = _localctx;
      setState(154);
      expression(0);
      setState(155);
      match(FractalParser::T__11);
      break;
    }

    case 3: {
      _localctx = _tracker.createInstance<VANISHES_CONDContext>(_localctx);
      _ctx = _localctx;
      previousContext = _localctx;
      setState(157);
      expression(0);
      setState(158);
      match(FractalParser::T__12);
      break;
    }

    case 4: {
      _localctx = _tracker.createInstance<STOPS_CONDContext>(_localctx);
      _ctx = _localctx;
      previousContext = _localctx;
      setState(160);
      expression(0);

      setState(161);
      match(FractalParser::STOPS);
      break;
    }

    }
    _ctx->stop = _input->LT(-1);
    setState(170);
    _errHandler->sync(this);
    alt = getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 11, _ctx);
    while (alt != 2 && alt != atn::ATN::INVALID_ALT_NUMBER) {
      if (alt == 1) {
        if (!_parseListeners.empty())
          triggerExitRuleEvent();
        previousContext = _localctx;
        auto newContext = _tracker.createInstance<COMB_CONDContext>(_tracker.createInstance<ConditionContext>(parentContext, parentState));
        _localctx = newContext;
        pushNewRecursionContext(newContext, startState, RuleCondition);
        setState(165);

        if (!(precpred(_ctx, 1))) throw FailedPredicateException(this, "precpred(_ctx, 1)");
        setState(166);
        _la = _input->LA(1);
        if (!(((((_la - 73) & ~ 0x3fULL) == 0) &&
          ((1ULL << (_la - 73)) & ((1ULL << (FractalParser::OR - 73))
          | (1ULL << (FractalParser::AND - 73))
          | (1ULL << (FractalParser::XOR - 73)))) != 0))) {
        _errHandler->recoverInline(this);
        }
        else {
          _errHandler->reportMatch(this);
          consume();
        }
        setState(167);
        condition(2); 
      }
      setState(172);
      _errHandler->sync(this);
      alt = getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 11, _ctx);
    }
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }
  return _localctx;
}

//----------------- If_thenContext ------------------------------------------------------------------

FractalParser::If_thenContext::If_thenContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::If_thenContext::getRuleIndex() const {
  return FractalParser::RuleIf_then;
}

void FractalParser::If_thenContext::copyFrom(If_thenContext *ctx) {
  ParserRuleContext::copyFrom(ctx);
}

//----------------- IF_THENContext ------------------------------------------------------------------

FractalParser::ConditionContext* FractalParser::IF_THENContext::condition() {
  return getRuleContext<FractalParser::ConditionContext>(0);
}

FractalParser::CommandContext* FractalParser::IF_THENContext::command() {
  return getRuleContext<FractalParser::CommandContext>(0);
}

FractalParser::IF_THENContext::IF_THENContext(If_thenContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::IF_THENContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitIF_THEN(this);
  else
    return visitor->visitChildren(this);
}
//----------------- IF_THEN_ELSEContext ------------------------------------------------------------------

FractalParser::ConditionContext* FractalParser::IF_THEN_ELSEContext::condition() {
  return getRuleContext<FractalParser::ConditionContext>(0);
}

std::vector<FractalParser::CommandContext *> FractalParser::IF_THEN_ELSEContext::command() {
  return getRuleContexts<FractalParser::CommandContext>();
}

FractalParser::CommandContext* FractalParser::IF_THEN_ELSEContext::command(size_t i) {
  return getRuleContext<FractalParser::CommandContext>(i);
}

FractalParser::IF_THEN_ELSEContext::IF_THEN_ELSEContext(If_thenContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::IF_THEN_ELSEContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitIF_THEN_ELSE(this);
  else
    return visitor->visitChildren(this);
}
FractalParser::If_thenContext* FractalParser::if_then() {
  If_thenContext *_localctx = _tracker.createInstance<If_thenContext>(_ctx, getState());
  enterRule(_localctx, 24, FractalParser::RuleIf_then);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(185);
    _errHandler->sync(this);
    switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 12, _ctx)) {
    case 1: {
      _localctx = dynamic_cast<If_thenContext *>(_tracker.createInstance<FractalParser::IF_THENContext>(_localctx));
      enterOuterAlt(_localctx, 1);
      setState(173);
      match(FractalParser::T__13);
      setState(174);
      condition(0);
      setState(175);
      match(FractalParser::T__14);
      setState(176);
      command();
      break;
    }

    case 2: {
      _localctx = dynamic_cast<If_thenContext *>(_tracker.createInstance<FractalParser::IF_THEN_ELSEContext>(_localctx));
      enterOuterAlt(_localctx, 2);
      setState(178);
      match(FractalParser::T__13);
      setState(179);
      condition(0);
      setState(180);
      match(FractalParser::T__14);
      setState(181);
      command();
      setState(182);
      match(FractalParser::T__15);
      setState(183);
      command();
      break;
    }

    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- LoopContext ------------------------------------------------------------------

FractalParser::LoopContext::LoopContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::LoopContext::getRuleIndex() const {
  return FractalParser::RuleLoop;
}

void FractalParser::LoopContext::copyFrom(LoopContext *ctx) {
  ParserRuleContext::copyFrom(ctx);
}

//----------------- LoopRepeatContext ------------------------------------------------------------------

FractalParser::NContext* FractalParser::LoopRepeatContext::n() {
  return getRuleContext<FractalParser::NContext>(0);
}

FractalParser::CommandContext* FractalParser::LoopRepeatContext::command() {
  return getRuleContext<FractalParser::CommandContext>(0);
}

FractalParser::LoopRepeatContext::LoopRepeatContext(LoopContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::LoopRepeatContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitLoopRepeat(this);
  else
    return visitor->visitChildren(this);
}
//----------------- LoopIterateOnContext ------------------------------------------------------------------

tree::TerminalNode* FractalParser::LoopIterateOnContext::ITERATE() {
  return getToken(FractalParser::ITERATE, 0);
}

FractalParser::ExpressionContext* FractalParser::LoopIterateOnContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::VariableContext* FractalParser::LoopIterateOnContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

FractalParser::ConditionContext* FractalParser::LoopIterateOnContext::condition() {
  return getRuleContext<FractalParser::ConditionContext>(0);
}

FractalParser::LoopIterateOnContext::LoopIterateOnContext(LoopContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::LoopIterateOnContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitLoopIterateOn(this);
  else
    return visitor->visitChildren(this);
}
//----------------- LoopDoContext ------------------------------------------------------------------

FractalParser::ConditionContext* FractalParser::LoopDoContext::condition() {
  return getRuleContext<FractalParser::ConditionContext>(0);
}

std::vector<FractalParser::CommandContext *> FractalParser::LoopDoContext::command() {
  return getRuleContexts<FractalParser::CommandContext>();
}

FractalParser::CommandContext* FractalParser::LoopDoContext::command(size_t i) {
  return getRuleContext<FractalParser::CommandContext>(i);
}

FractalParser::LoopDoContext::LoopDoContext(LoopContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::LoopDoContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitLoopDo(this);
  else
    return visitor->visitChildren(this);
}
//----------------- LoopIterateEmptyContext ------------------------------------------------------------------

tree::TerminalNode* FractalParser::LoopIterateEmptyContext::ITERATE() {
  return getToken(FractalParser::ITERATE, 0);
}

FractalParser::ExpressionContext* FractalParser::LoopIterateEmptyContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

FractalParser::ConditionContext* FractalParser::LoopIterateEmptyContext::condition() {
  return getRuleContext<FractalParser::ConditionContext>(0);
}

FractalParser::LoopIterateEmptyContext::LoopIterateEmptyContext(LoopContext *ctx) { copyFrom(ctx); }

antlrcpp::Any FractalParser::LoopIterateEmptyContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitLoopIterateEmpty(this);
  else
    return visitor->visitChildren(this);
}
FractalParser::LoopContext* FractalParser::loop() {
  LoopContext *_localctx = _tracker.createInstance<LoopContext>(_ctx, getState());
  enterRule(_localctx, 26, FractalParser::RuleLoop);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(213);
    _errHandler->sync(this);
    switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 14, _ctx)) {
    case 1: {
      _localctx = dynamic_cast<LoopContext *>(_tracker.createInstance<FractalParser::LoopDoContext>(_localctx));
      enterOuterAlt(_localctx, 1);
      setState(187);
      match(FractalParser::T__16);
      setState(189); 
      _errHandler->sync(this);
      _la = _input->LA(1);
      do {
        setState(188);
        command();
        setState(191); 
        _errHandler->sync(this);
        _la = _input->LA(1);
      } while ((((_la & ~ 0x3fULL) == 0) &&
        ((1ULL << _la) & ((1ULL << FractalParser::T__1)
        | (1ULL << FractalParser::T__3)
        | (1ULL << FractalParser::T__4)
        | (1ULL << FractalParser::T__5)
        | (1ULL << FractalParser::T__7)
        | (1ULL << FractalParser::T__8)
        | (1ULL << FractalParser::T__13)
        | (1ULL << FractalParser::T__16)
        | (1ULL << FractalParser::T__19)
        | (1ULL << FractalParser::T__32)
        | (1ULL << FractalParser::ITERATE))) != 0));
      setState(193);
      match(FractalParser::T__17);
      setState(194);
      condition(0);
      break;
    }

    case 2: {
      _localctx = dynamic_cast<LoopContext *>(_tracker.createInstance<FractalParser::LoopIterateOnContext>(_localctx));
      enterOuterAlt(_localctx, 2);
      setState(196);
      match(FractalParser::ITERATE);
      setState(197);
      expression(0);
      setState(198);
      match(FractalParser::T__18);
      setState(199);
      variable();
      setState(200);
      match(FractalParser::T__17);
      setState(201);
      condition(0);
      break;
    }

    case 3: {
      _localctx = dynamic_cast<LoopContext *>(_tracker.createInstance<FractalParser::LoopIterateEmptyContext>(_localctx));
      enterOuterAlt(_localctx, 3);
      setState(203);
      match(FractalParser::ITERATE);
      setState(204);
      expression(0);
      setState(205);
      match(FractalParser::T__17);
      setState(206);
      condition(0);
      break;
    }

    case 4: {
      _localctx = dynamic_cast<LoopContext *>(_tracker.createInstance<FractalParser::LoopRepeatContext>(_localctx));
      enterOuterAlt(_localctx, 4);
      setState(208);
      match(FractalParser::T__19);
      setState(209);
      n();
      setState(210);
      match(FractalParser::T__20);
      setState(211);
      command();
      break;
    }

    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- FlagnameContext ------------------------------------------------------------------

FractalParser::FlagnameContext::FlagnameContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::FlagnameContext::getRuleIndex() const {
  return FractalParser::RuleFlagname;
}

antlrcpp::Any FractalParser::FlagnameContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitFlagname(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::FlagnameContext* FractalParser::flagname() {
  FlagnameContext *_localctx = _tracker.createInstance<FlagnameContext>(_ctx, getState());
  enterRule(_localctx, 28, FractalParser::RuleFlagname);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(215);
    _la = _input->LA(1);
    if (!((((_la & ~ 0x3fULL) == 0) &&
      ((1ULL << _la) & ((1ULL << FractalParser::T__21)
      | (1ULL << FractalParser::T__22)
      | (1ULL << FractalParser::T__23))) != 0))) {
    _errHandler->recoverInline(this);
    }
    else {
      _errHandler->reportMatch(this);
      consume();
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- ColorContext ------------------------------------------------------------------

FractalParser::ColorContext::ColorContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::ColorContext::getRuleIndex() const {
  return FractalParser::RuleColor;
}

antlrcpp::Any FractalParser::ColorContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitColor(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::ColorContext* FractalParser::color() {
  ColorContext *_localctx = _tracker.createInstance<ColorContext>(_ctx, getState());
  enterRule(_localctx, 30, FractalParser::RuleColor);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(217);
    _la = _input->LA(1);
    if (!((((_la & ~ 0x3fULL) == 0) &&
      ((1ULL << _la) & ((1ULL << FractalParser::T__24)
      | (1ULL << FractalParser::T__25)
      | (1ULL << FractalParser::T__26)
      | (1ULL << FractalParser::T__27)
      | (1ULL << FractalParser::T__28)
      | (1ULL << FractalParser::T__29)
      | (1ULL << FractalParser::T__30)
      | (1ULL << FractalParser::T__31))) != 0))) {
    _errHandler->recoverInline(this);
    }
    else {
      _errHandler->reportMatch(this);
      consume();
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Color_commandContext ------------------------------------------------------------------

FractalParser::Color_commandContext::Color_commandContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

FractalParser::FlagnameContext* FractalParser::Color_commandContext::flagname() {
  return getRuleContext<FractalParser::FlagnameContext>(0);
}

FractalParser::ColorContext* FractalParser::Color_commandContext::color() {
  return getRuleContext<FractalParser::ColorContext>(0);
}

FractalParser::VariableContext* FractalParser::Color_commandContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

FractalParser::NContext* FractalParser::Color_commandContext::n() {
  return getRuleContext<FractalParser::NContext>(0);
}


size_t FractalParser::Color_commandContext::getRuleIndex() const {
  return FractalParser::RuleColor_command;
}

antlrcpp::Any FractalParser::Color_commandContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitColor_command(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Color_commandContext* FractalParser::color_command() {
  Color_commandContext *_localctx = _tracker.createInstance<Color_commandContext>(_ctx, getState());
  enterRule(_localctx, 32, FractalParser::RuleColor_command);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    setState(245);
    _errHandler->sync(this);
    switch (getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 15, _ctx)) {
    case 1: {
      enterOuterAlt(_localctx, 1);
      setState(219);
      match(FractalParser::T__32);
      setState(220);
      flagname();
      setState(221);
      match(FractalParser::T__33);
      setState(222);
      color();
      setState(223);
      match(FractalParser::T__34);
      break;
    }

    case 2: {
      enterOuterAlt(_localctx, 2);
      setState(225);
      match(FractalParser::T__32);
      setState(226);
      flagname();
      setState(227);
      match(FractalParser::T__34);
      break;
    }

    case 3: {
      enterOuterAlt(_localctx, 3);
      setState(229);
      match(FractalParser::T__32);
      setState(230);
      variable();
      setState(231);
      match(FractalParser::T__35);
      setState(232);
      color();
      setState(233);
      match(FractalParser::T__34);
      break;
    }

    case 4: {
      enterOuterAlt(_localctx, 4);
      setState(235);
      match(FractalParser::T__32);
      setState(236);
      variable();
      setState(237);
      match(FractalParser::T__35);
      setState(238);
      n();
      setState(239);
      match(FractalParser::T__34);
      break;
    }

    case 5: {
      enterOuterAlt(_localctx, 5);
      setState(241);
      match(FractalParser::T__32);
      setState(242);
      color();
      setState(243);
      match(FractalParser::T__34);
      break;
    }

    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Num_typeContext ------------------------------------------------------------------

FractalParser::Num_typeContext::Num_typeContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}


size_t FractalParser::Num_typeContext::getRuleIndex() const {
  return FractalParser::RuleNum_type;
}

antlrcpp::Any FractalParser::Num_typeContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitNum_type(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Num_typeContext* FractalParser::num_type() {
  Num_typeContext *_localctx = _tracker.createInstance<Num_typeContext>(_ctx, getState());
  enterRule(_localctx, 34, FractalParser::RuleNum_type);
  size_t _la = 0;

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(247);
    _la = _input->LA(1);
    if (!(_la == FractalParser::T__36

    || _la == FractalParser::T__37)) {
    _errHandler->recoverInline(this);
    }
    else {
      _errHandler->reportMatch(this);
      consume();
    }
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Probe_commandContext ------------------------------------------------------------------

FractalParser::Probe_commandContext::Probe_commandContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

FractalParser::Num_typeContext* FractalParser::Probe_commandContext::num_type() {
  return getRuleContext<FractalParser::Num_typeContext>(0);
}

FractalParser::CommandContext* FractalParser::Probe_commandContext::command() {
  return getRuleContext<FractalParser::CommandContext>(0);
}

FractalParser::VariableContext* FractalParser::Probe_commandContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}


size_t FractalParser::Probe_commandContext::getRuleIndex() const {
  return FractalParser::RuleProbe_command;
}

antlrcpp::Any FractalParser::Probe_commandContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitProbe_command(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Probe_commandContext* FractalParser::probe_command() {
  Probe_commandContext *_localctx = _tracker.createInstance<Probe_commandContext>(_ctx, getState());
  enterRule(_localctx, 36, FractalParser::RuleProbe_command);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    size_t alt;
    enterOuterAlt(_localctx, 1);
    setState(249);
    match(FractalParser::T__38);
    setState(250);
    num_type();

    setState(251);
    match(FractalParser::T__39);
    setState(253); 
    _errHandler->sync(this);
    alt = 1 + 1;
    do {
      switch (alt) {
        case 1 + 1: {
              setState(252);
              matchWildcard();
              break;
            }

      default:
        throw NoViableAltException(this);
      }
      setState(255); 
      _errHandler->sync(this);
      alt = getInterpreter<atn::ParserATNSimulator>()->adaptivePredict(_input, 16, _ctx);
    } while (alt != 1 && alt != atn::ATN::INVALID_ALT_NUMBER);
    setState(257);
    match(FractalParser::T__39);
    setState(259);
    match(FractalParser::T__5);
    setState(260);
    command();
    setState(261);
    match(FractalParser::T__40);
    setState(262);
    variable();
    setState(263);
    match(FractalParser::T__0);
    setState(264);
    match(FractalParser::T__6);
    setState(265);
    match(FractalParser::T__0);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

//----------------- Saddle_dropContext ------------------------------------------------------------------

FractalParser::Saddle_dropContext::Saddle_dropContext(ParserRuleContext *parent, size_t invokingState)
  : ParserRuleContext(parent, invokingState) {
}

FractalParser::VariableContext* FractalParser::Saddle_dropContext::variable() {
  return getRuleContext<FractalParser::VariableContext>(0);
}

tree::TerminalNode* FractalParser::Saddle_dropContext::EQUALS() {
  return getToken(FractalParser::EQUALS, 0);
}

tree::TerminalNode* FractalParser::Saddle_dropContext::LPAREN() {
  return getToken(FractalParser::LPAREN, 0);
}

FractalParser::ExpressionContext* FractalParser::Saddle_dropContext::expression() {
  return getRuleContext<FractalParser::ExpressionContext>(0);
}

tree::TerminalNode* FractalParser::Saddle_dropContext::RPAREN() {
  return getToken(FractalParser::RPAREN, 0);
}


size_t FractalParser::Saddle_dropContext::getRuleIndex() const {
  return FractalParser::RuleSaddle_drop;
}

antlrcpp::Any FractalParser::Saddle_dropContext::accept(tree::ParseTreeVisitor *visitor) {
  if (auto parserVisitor = dynamic_cast<FractalVisitor*>(visitor))
    return parserVisitor->visitSaddle_drop(this);
  else
    return visitor->visitChildren(this);
}

FractalParser::Saddle_dropContext* FractalParser::saddle_drop() {
  Saddle_dropContext *_localctx = _tracker.createInstance<Saddle_dropContext>(_ctx, getState());
  enterRule(_localctx, 38, FractalParser::RuleSaddle_drop);

  auto onExit = finally([=] {
    exitRule();
  });
  try {
    enterOuterAlt(_localctx, 1);
    setState(267);
    variable();
    setState(268);
    match(FractalParser::EQUALS);
    setState(269);
    match(FractalParser::T__41);
    setState(270);
    match(FractalParser::LPAREN);
    setState(271);
    expression(0);
    setState(272);
    match(FractalParser::RPAREN);
   
  }
  catch (RecognitionException &e) {
    _errHandler->reportError(this, e);
    _localctx->exception = std::current_exception();
    _errHandler->recover(this, _localctx->exception);
  }

  return _localctx;
}

bool FractalParser::sempred(RuleContext *context, size_t ruleIndex, size_t predicateIndex) {
  switch (ruleIndex) {
    case 10: return expressionSempred(dynamic_cast<ExpressionContext *>(context), predicateIndex);
    case 11: return conditionSempred(dynamic_cast<ConditionContext *>(context), predicateIndex);

  default:
    break;
  }
  return true;
}

bool FractalParser::expressionSempred(ExpressionContext *_localctx, size_t predicateIndex) {
  switch (predicateIndex) {
    case 0: return precpred(_ctx, 8);
    case 1: return precpred(_ctx, 7);
    case 2: return precpred(_ctx, 6);
    case 3: return precpred(_ctx, 5);
    case 4: return precpred(_ctx, 9);

  default:
    break;
  }
  return true;
}

bool FractalParser::conditionSempred(ConditionContext *_localctx, size_t predicateIndex) {
  switch (predicateIndex) {
    case 5: return precpred(_ctx, 1);

  default:
    break;
  }
  return true;
}

// Static vars and initialization.
std::vector<dfa::DFA> FractalParser::_decisionToDFA;
atn::PredictionContextCache FractalParser::_sharedContextCache;

// We own the ATN which in turn owns the ATN states.
atn::ATN FractalParser::_atn;
std::vector<uint16_t> FractalParser::_serializedATN;

std::vector<std::string> FractalParser::_ruleNames = {
  "script", "command", "n", "constant", "variable", "cpx_number_re", "cpx_number_im", 
  "atom", "cpx_function", "real_function", "expression", "condition", "if_then", 
  "loop", "flagname", "color", "color_command", "num_type", "probe_command", 
  "saddle_drop"
};

std::vector<std::string> FractalParser::_literalNames = {
  "", "'.'", "'set'", "'to'", "'default'", "'block'", "':'", "'end'", "'par'", 
  "'dyn'", "'reduce'", "'mod'", "'escapes'", "'vanishes'", "'if'", "'then'", 
  "'else'", "'do'", "'until'", "'on'", "'repeat'", "'times'", "'checkered'", 
  "'disc'", "'period 3 cycle'", "'red'", "'green'", "'blue'", "'omega'", 
  "'omegabar'", "'Purple'", "'White'", "'Orange'", "'['", "'|'", "']'", 
  "'is'", "'real'", "'integer'", "'probe'", "'\"'", "'report'", "'\u2206'", 
  "", "", "", "'stops'", "'pixel'", "'iterate'", "'exp'", "'cos'", "'sin'", 
  "'tan'", "'cosh'", "'sinh'", "'tanh'", "'re'", "'im'", "'bar'", "'arg'", 
  "'log'", "'sqrt'", "'arccos'", "'arcsin'", "'arctan'", "'^'", "'+'", "'-'", 
  "'*'", "'/'", "'='", "'>'", "'<'", "'or'", "'and'", "'xor'", "", "'('", 
  "')'"
};

std::vector<std::string> FractalParser::_symbolicNames = {
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
  "", "", "", "", "", "", "", "POS_INT", "NUMBER", "CPX_NUMBER_IM", "STOPS", 
  "PIXEL", "ITERATE", "EXP", "COS", "SIN", "TAN", "COSH", "SINH", "TANH", 
  "RE", "IM", "BAR", "ARG", "LOG", "SQRT", "ARCCOS", "ARCSIN", "ARCTAN", 
  "POW", "PLUS", "MINUS", "TIMES", "DIVIDE", "EQUALS", "GT", "LT", "OR", 
  "AND", "XOR", "VARIABLE", "LPAREN", "RPAREN", "WS", "COMMENT"
};

dfa::Vocabulary FractalParser::_vocabulary(_literalNames, _symbolicNames);

std::vector<std::string> FractalParser::_tokenNames;

FractalParser::Initializer::Initializer() {
	for (size_t i = 0; i < _symbolicNames.size(); ++i) {
		std::string name = _vocabulary.getLiteralName(i);
		if (name.empty()) {
			name = _vocabulary.getSymbolicName(i);
		}

		if (name.empty()) {
			_tokenNames.push_back("<INVALID>");
		} else {
      _tokenNames.push_back(name);
    }
	}

  _serializedATN = {
    0x3, 0x608b, 0xa72a, 0x8133, 0xb9ed, 0x417c, 0x3be7, 0x7786, 0x5964, 
    0x3, 0x52, 0x115, 0x4, 0x2, 0x9, 0x2, 0x4, 0x3, 0x9, 0x3, 0x4, 0x4, 
    0x9, 0x4, 0x4, 0x5, 0x9, 0x5, 0x4, 0x6, 0x9, 0x6, 0x4, 0x7, 0x9, 0x7, 
    0x4, 0x8, 0x9, 0x8, 0x4, 0x9, 0x9, 0x9, 0x4, 0xa, 0x9, 0xa, 0x4, 0xb, 
    0x9, 0xb, 0x4, 0xc, 0x9, 0xc, 0x4, 0xd, 0x9, 0xd, 0x4, 0xe, 0x9, 0xe, 
    0x4, 0xf, 0x9, 0xf, 0x4, 0x10, 0x9, 0x10, 0x4, 0x11, 0x9, 0x11, 0x4, 
    0x12, 0x9, 0x12, 0x4, 0x13, 0x9, 0x13, 0x4, 0x14, 0x9, 0x14, 0x4, 0x15, 
    0x9, 0x15, 0x3, 0x2, 0x3, 0x2, 0x3, 0x2, 0x6, 0x2, 0x2e, 0xa, 0x2, 0xd, 
    0x2, 0xe, 0x2, 0x2f, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 
    0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 
    0x6, 0x3, 0x3e, 0xa, 0x3, 0xd, 0x3, 0xe, 0x3, 0x3f, 0x3, 0x3, 0x3, 0x3, 
    0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 
    0x5, 0x3, 0x4b, 0xa, 0x3, 0x3, 0x4, 0x3, 0x4, 0x3, 0x5, 0x3, 0x5, 0x3, 
    0x5, 0x5, 0x5, 0x52, 0xa, 0x5, 0x3, 0x6, 0x3, 0x6, 0x3, 0x7, 0x3, 0x7, 
    0x3, 0x8, 0x3, 0x8, 0x3, 0x9, 0x3, 0x9, 0x5, 0x9, 0x5c, 0xa, 0x9, 0x3, 
    0xa, 0x3, 0xa, 0x3, 0xb, 0x3, 0xb, 0x3, 0xc, 0x3, 0xc, 0x5, 0xc, 0x64, 
    0xa, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 
    0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 
    0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 
    0x5, 0xc, 0x7a, 0xa, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 
    0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 
    0xc, 0x3, 0xc, 0x3, 0xc, 0x3, 0xc, 0x7, 0xc, 0x8b, 0xa, 0xc, 0xc, 0xc, 
    0xe, 0xc, 0x8e, 0xb, 0xc, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 
    0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x5, 0xd, 0x99, 0xa, 0xd, 
    0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 
    0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x3, 0xd, 0x5, 0xd, 0xa6, 0xa, 0xd, 0x3, 
    0xd, 0x3, 0xd, 0x3, 0xd, 0x7, 0xd, 0xab, 0xa, 0xd, 0xc, 0xd, 0xe, 0xd, 
    0xae, 0xb, 0xd, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 
    0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x3, 0xe, 0x5, 
    0xe, 0xbc, 0xa, 0xe, 0x3, 0xf, 0x3, 0xf, 0x6, 0xf, 0xc0, 0xa, 0xf, 0xd, 
    0xf, 0xe, 0xf, 0xc1, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 
    0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 
    0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 0x3, 0xf, 
    0x3, 0xf, 0x5, 0xf, 0xd8, 0xa, 0xf, 0x3, 0x10, 0x3, 0x10, 0x3, 0x11, 
    0x3, 0x11, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 
    0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 
    0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 
    0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 0x3, 0x12, 
    0x3, 0x12, 0x5, 0x12, 0xf8, 0xa, 0x12, 0x3, 0x13, 0x3, 0x13, 0x3, 0x14, 
    0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x6, 0x14, 0x100, 0xa, 0x14, 0xd, 0x14, 
    0xe, 0x14, 0x101, 0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 
    0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x3, 0x14, 0x3, 0x15, 0x3, 
    0x15, 0x3, 0x15, 0x3, 0x15, 0x3, 0x15, 0x3, 0x15, 0x3, 0x15, 0x3, 0x15, 
    0x3, 0x101, 0x4, 0x16, 0x18, 0x16, 0x2, 0x4, 0x6, 0x8, 0xa, 0xc, 0xe, 
    0x10, 0x12, 0x14, 0x16, 0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 
    0x28, 0x2, 0xa, 0x3, 0x2, 0x7, 0x8, 0x3, 0x2, 0x33, 0x3f, 0x3, 0x2, 
    0x40, 0x42, 0x3, 0x2, 0x44, 0x45, 0x3, 0x2, 0x4b, 0x4d, 0x3, 0x2, 0x18, 
    0x1a, 0x3, 0x2, 0x1b, 0x22, 0x3, 0x2, 0x27, 0x28, 0x2, 0x128, 0x2, 0x2d, 
    0x3, 0x2, 0x2, 0x2, 0x4, 0x4a, 0x3, 0x2, 0x2, 0x2, 0x6, 0x4c, 0x3, 0x2, 
    0x2, 0x2, 0x8, 0x51, 0x3, 0x2, 0x2, 0x2, 0xa, 0x53, 0x3, 0x2, 0x2, 0x2, 
    0xc, 0x55, 0x3, 0x2, 0x2, 0x2, 0xe, 0x57, 0x3, 0x2, 0x2, 0x2, 0x10, 
    0x5b, 0x3, 0x2, 0x2, 0x2, 0x12, 0x5d, 0x3, 0x2, 0x2, 0x2, 0x14, 0x5f, 
    0x3, 0x2, 0x2, 0x2, 0x16, 0x79, 0x3, 0x2, 0x2, 0x2, 0x18, 0xa5, 0x3, 
    0x2, 0x2, 0x2, 0x1a, 0xbb, 0x3, 0x2, 0x2, 0x2, 0x1c, 0xd7, 0x3, 0x2, 
    0x2, 0x2, 0x1e, 0xd9, 0x3, 0x2, 0x2, 0x2, 0x20, 0xdb, 0x3, 0x2, 0x2, 
    0x2, 0x22, 0xf7, 0x3, 0x2, 0x2, 0x2, 0x24, 0xf9, 0x3, 0x2, 0x2, 0x2, 
    0x26, 0xfb, 0x3, 0x2, 0x2, 0x2, 0x28, 0x10d, 0x3, 0x2, 0x2, 0x2, 0x2a, 
    0x2b, 0x5, 0x4, 0x3, 0x2, 0x2b, 0x2c, 0x7, 0x3, 0x2, 0x2, 0x2c, 0x2e, 
    0x3, 0x2, 0x2, 0x2, 0x2d, 0x2a, 0x3, 0x2, 0x2, 0x2, 0x2e, 0x2f, 0x3, 
    0x2, 0x2, 0x2, 0x2f, 0x2d, 0x3, 0x2, 0x2, 0x2, 0x2f, 0x30, 0x3, 0x2, 
    0x2, 0x2, 0x30, 0x3, 0x3, 0x2, 0x2, 0x2, 0x31, 0x32, 0x7, 0x4, 0x2, 
    0x2, 0x32, 0x33, 0x5, 0xa, 0x6, 0x2, 0x33, 0x34, 0x7, 0x5, 0x2, 0x2, 
    0x34, 0x35, 0x5, 0x16, 0xc, 0x2, 0x35, 0x4b, 0x3, 0x2, 0x2, 0x2, 0x36, 
    0x37, 0x7, 0x6, 0x2, 0x2, 0x37, 0x38, 0x5, 0xa, 0x6, 0x2, 0x38, 0x39, 
    0x7, 0x5, 0x2, 0x2, 0x39, 0x3a, 0x5, 0x16, 0xc, 0x2, 0x3a, 0x4b, 0x3, 
    0x2, 0x2, 0x2, 0x3b, 0x3d, 0x9, 0x2, 0x2, 0x2, 0x3c, 0x3e, 0x5, 0x4, 
    0x3, 0x2, 0x3d, 0x3c, 0x3, 0x2, 0x2, 0x2, 0x3e, 0x3f, 0x3, 0x2, 0x2, 
    0x2, 0x3f, 0x3d, 0x3, 0x2, 0x2, 0x2, 0x3f, 0x40, 0x3, 0x2, 0x2, 0x2, 
    0x40, 0x41, 0x3, 0x2, 0x2, 0x2, 0x41, 0x42, 0x7, 0x9, 0x2, 0x2, 0x42, 
    0x4b, 0x3, 0x2, 0x2, 0x2, 0x43, 0x4b, 0x5, 0x22, 0x12, 0x2, 0x44, 0x45, 
    0x7, 0xa, 0x2, 0x2, 0x45, 0x4b, 0x5, 0x4, 0x3, 0x2, 0x46, 0x47, 0x7, 
    0xb, 0x2, 0x2, 0x47, 0x4b, 0x5, 0x4, 0x3, 0x2, 0x48, 0x4b, 0x5, 0x1a, 
    0xe, 0x2, 0x49, 0x4b, 0x5, 0x1c, 0xf, 0x2, 0x4a, 0x31, 0x3, 0x2, 0x2, 
    0x2, 0x4a, 0x36, 0x3, 0x2, 0x2, 0x2, 0x4a, 0x3b, 0x3, 0x2, 0x2, 0x2, 
    0x4a, 0x43, 0x3, 0x2, 0x2, 0x2, 0x4a, 0x44, 0x3, 0x2, 0x2, 0x2, 0x4a, 
    0x46, 0x3, 0x2, 0x2, 0x2, 0x4a, 0x48, 0x3, 0x2, 0x2, 0x2, 0x4a, 0x49, 
    0x3, 0x2, 0x2, 0x2, 0x4b, 0x5, 0x3, 0x2, 0x2, 0x2, 0x4c, 0x4d, 0x7, 
    0x2d, 0x2, 0x2, 0x4d, 0x7, 0x3, 0x2, 0x2, 0x2, 0x4e, 0x52, 0x5, 0xc, 
    0x7, 0x2, 0x4f, 0x52, 0x5, 0xe, 0x8, 0x2, 0x50, 0x52, 0x5, 0x6, 0x4, 
    0x2, 0x51, 0x4e, 0x3, 0x2, 0x2, 0x2, 0x51, 0x4f, 0x3, 0x2, 0x2, 0x2, 
    0x51, 0x50, 0x3, 0x2, 0x2, 0x2, 0x52, 0x9, 0x3, 0x2, 0x2, 0x2, 0x53, 
    0x54, 0x7, 0x4e, 0x2, 0x2, 0x54, 0xb, 0x3, 0x2, 0x2, 0x2, 0x55, 0x56, 
    0x7, 0x2e, 0x2, 0x2, 0x56, 0xd, 0x3, 0x2, 0x2, 0x2, 0x57, 0x58, 0x7, 
    0x2f, 0x2, 0x2, 0x58, 0xf, 0x3, 0x2, 0x2, 0x2, 0x59, 0x5c, 0x5, 0x8, 
    0x5, 0x2, 0x5a, 0x5c, 0x5, 0xa, 0x6, 0x2, 0x5b, 0x59, 0x3, 0x2, 0x2, 
    0x2, 0x5b, 0x5a, 0x3, 0x2, 0x2, 0x2, 0x5c, 0x11, 0x3, 0x2, 0x2, 0x2, 
    0x5d, 0x5e, 0x9, 0x3, 0x2, 0x2, 0x5e, 0x13, 0x3, 0x2, 0x2, 0x2, 0x5f, 
    0x60, 0x9, 0x4, 0x2, 0x2, 0x60, 0x15, 0x3, 0x2, 0x2, 0x2, 0x61, 0x63, 
    0x8, 0xc, 0x1, 0x2, 0x62, 0x64, 0x9, 0x5, 0x2, 0x2, 0x63, 0x62, 0x3, 
    0x2, 0x2, 0x2, 0x63, 0x64, 0x3, 0x2, 0x2, 0x2, 0x64, 0x65, 0x3, 0x2, 
    0x2, 0x2, 0x65, 0x7a, 0x5, 0x10, 0x9, 0x2, 0x66, 0x67, 0x5, 0x12, 0xa, 
    0x2, 0x67, 0x68, 0x7, 0x4f, 0x2, 0x2, 0x68, 0x69, 0x5, 0x16, 0xc, 0x2, 
    0x69, 0x6a, 0x7, 0x50, 0x2, 0x2, 0x6a, 0x7a, 0x3, 0x2, 0x2, 0x2, 0x6b, 
    0x6c, 0x5, 0x14, 0xb, 0x2, 0x6c, 0x6d, 0x7, 0x4f, 0x2, 0x2, 0x6d, 0x6e, 
    0x5, 0x16, 0xc, 0x2, 0x6e, 0x6f, 0x7, 0x50, 0x2, 0x2, 0x6f, 0x7a, 0x3, 
    0x2, 0x2, 0x2, 0x70, 0x71, 0x7, 0xc, 0x2, 0x2, 0x71, 0x72, 0x5, 0xa, 
    0x6, 0x2, 0x72, 0x73, 0x7, 0xd, 0x2, 0x2, 0x73, 0x74, 0x5, 0x16, 0xc, 
    0x4, 0x74, 0x7a, 0x3, 0x2, 0x2, 0x2, 0x75, 0x76, 0x7, 0x4f, 0x2, 0x2, 
    0x76, 0x77, 0x5, 0x16, 0xc, 0x2, 0x77, 0x78, 0x7, 0x50, 0x2, 0x2, 0x78, 
    0x7a, 0x3, 0x2, 0x2, 0x2, 0x79, 0x61, 0x3, 0x2, 0x2, 0x2, 0x79, 0x66, 
    0x3, 0x2, 0x2, 0x2, 0x79, 0x6b, 0x3, 0x2, 0x2, 0x2, 0x79, 0x70, 0x3, 
    0x2, 0x2, 0x2, 0x79, 0x75, 0x3, 0x2, 0x2, 0x2, 0x7a, 0x8c, 0x3, 0x2, 
    0x2, 0x2, 0x7b, 0x7c, 0xc, 0xa, 0x2, 0x2, 0x7c, 0x7d, 0x7, 0x46, 0x2, 
    0x2, 0x7d, 0x8b, 0x5, 0x16, 0xc, 0xb, 0x7e, 0x7f, 0xc, 0x9, 0x2, 0x2, 
    0x7f, 0x80, 0x7, 0x47, 0x2, 0x2, 0x80, 0x8b, 0x5, 0x16, 0xc, 0xa, 0x81, 
    0x82, 0xc, 0x8, 0x2, 0x2, 0x82, 0x83, 0x7, 0x44, 0x2, 0x2, 0x83, 0x8b, 
    0x5, 0x16, 0xc, 0x9, 0x84, 0x85, 0xc, 0x7, 0x2, 0x2, 0x85, 0x86, 0x7, 
    0x45, 0x2, 0x2, 0x86, 0x8b, 0x5, 0x16, 0xc, 0x8, 0x87, 0x88, 0xc, 0xb, 
    0x2, 0x2, 0x88, 0x89, 0x7, 0x43, 0x2, 0x2, 0x89, 0x8b, 0x5, 0x6, 0x4, 
    0x2, 0x8a, 0x7b, 0x3, 0x2, 0x2, 0x2, 0x8a, 0x7e, 0x3, 0x2, 0x2, 0x2, 
    0x8a, 0x81, 0x3, 0x2, 0x2, 0x2, 0x8a, 0x84, 0x3, 0x2, 0x2, 0x2, 0x8a, 
    0x87, 0x3, 0x2, 0x2, 0x2, 0x8b, 0x8e, 0x3, 0x2, 0x2, 0x2, 0x8c, 0x8a, 
    0x3, 0x2, 0x2, 0x2, 0x8c, 0x8d, 0x3, 0x2, 0x2, 0x2, 0x8d, 0x17, 0x3, 
    0x2, 0x2, 0x2, 0x8e, 0x8c, 0x3, 0x2, 0x2, 0x2, 0x8f, 0x90, 0x8, 0xd, 
    0x1, 0x2, 0x90, 0x98, 0x5, 0x16, 0xc, 0x2, 0x91, 0x99, 0x7, 0x49, 0x2, 
    0x2, 0x92, 0x99, 0x7, 0x4a, 0x2, 0x2, 0x93, 0x94, 0x7, 0x49, 0x2, 0x2, 
    0x94, 0x99, 0x7, 0x48, 0x2, 0x2, 0x95, 0x96, 0x7, 0x4a, 0x2, 0x2, 0x96, 
    0x99, 0x7, 0x48, 0x2, 0x2, 0x97, 0x99, 0x7, 0x48, 0x2, 0x2, 0x98, 0x91, 
    0x3, 0x2, 0x2, 0x2, 0x98, 0x92, 0x3, 0x2, 0x2, 0x2, 0x98, 0x93, 0x3, 
    0x2, 0x2, 0x2, 0x98, 0x95, 0x3, 0x2, 0x2, 0x2, 0x98, 0x97, 0x3, 0x2, 
    0x2, 0x2, 0x99, 0x9a, 0x3, 0x2, 0x2, 0x2, 0x9a, 0x9b, 0x5, 0x16, 0xc, 
    0x2, 0x9b, 0xa6, 0x3, 0x2, 0x2, 0x2, 0x9c, 0x9d, 0x5, 0x16, 0xc, 0x2, 
    0x9d, 0x9e, 0x7, 0xe, 0x2, 0x2, 0x9e, 0xa6, 0x3, 0x2, 0x2, 0x2, 0x9f, 
    0xa0, 0x5, 0x16, 0xc, 0x2, 0xa0, 0xa1, 0x7, 0xf, 0x2, 0x2, 0xa1, 0xa6, 
    0x3, 0x2, 0x2, 0x2, 0xa2, 0xa3, 0x5, 0x16, 0xc, 0x2, 0xa3, 0xa4, 0x7, 
    0x30, 0x2, 0x2, 0xa4, 0xa6, 0x3, 0x2, 0x2, 0x2, 0xa5, 0x8f, 0x3, 0x2, 
    0x2, 0x2, 0xa5, 0x9c, 0x3, 0x2, 0x2, 0x2, 0xa5, 0x9f, 0x3, 0x2, 0x2, 
    0x2, 0xa5, 0xa2, 0x3, 0x2, 0x2, 0x2, 0xa6, 0xac, 0x3, 0x2, 0x2, 0x2, 
    0xa7, 0xa8, 0xc, 0x3, 0x2, 0x2, 0xa8, 0xa9, 0x9, 0x6, 0x2, 0x2, 0xa9, 
    0xab, 0x5, 0x18, 0xd, 0x4, 0xaa, 0xa7, 0x3, 0x2, 0x2, 0x2, 0xab, 0xae, 
    0x3, 0x2, 0x2, 0x2, 0xac, 0xaa, 0x3, 0x2, 0x2, 0x2, 0xac, 0xad, 0x3, 
    0x2, 0x2, 0x2, 0xad, 0x19, 0x3, 0x2, 0x2, 0x2, 0xae, 0xac, 0x3, 0x2, 
    0x2, 0x2, 0xaf, 0xb0, 0x7, 0x10, 0x2, 0x2, 0xb0, 0xb1, 0x5, 0x18, 0xd, 
    0x2, 0xb1, 0xb2, 0x7, 0x11, 0x2, 0x2, 0xb2, 0xb3, 0x5, 0x4, 0x3, 0x2, 
    0xb3, 0xbc, 0x3, 0x2, 0x2, 0x2, 0xb4, 0xb5, 0x7, 0x10, 0x2, 0x2, 0xb5, 
    0xb6, 0x5, 0x18, 0xd, 0x2, 0xb6, 0xb7, 0x7, 0x11, 0x2, 0x2, 0xb7, 0xb8, 
    0x5, 0x4, 0x3, 0x2, 0xb8, 0xb9, 0x7, 0x12, 0x2, 0x2, 0xb9, 0xba, 0x5, 
    0x4, 0x3, 0x2, 0xba, 0xbc, 0x3, 0x2, 0x2, 0x2, 0xbb, 0xaf, 0x3, 0x2, 
    0x2, 0x2, 0xbb, 0xb4, 0x3, 0x2, 0x2, 0x2, 0xbc, 0x1b, 0x3, 0x2, 0x2, 
    0x2, 0xbd, 0xbf, 0x7, 0x13, 0x2, 0x2, 0xbe, 0xc0, 0x5, 0x4, 0x3, 0x2, 
    0xbf, 0xbe, 0x3, 0x2, 0x2, 0x2, 0xc0, 0xc1, 0x3, 0x2, 0x2, 0x2, 0xc1, 
    0xbf, 0x3, 0x2, 0x2, 0x2, 0xc1, 0xc2, 0x3, 0x2, 0x2, 0x2, 0xc2, 0xc3, 
    0x3, 0x2, 0x2, 0x2, 0xc3, 0xc4, 0x7, 0x14, 0x2, 0x2, 0xc4, 0xc5, 0x5, 
    0x18, 0xd, 0x2, 0xc5, 0xd8, 0x3, 0x2, 0x2, 0x2, 0xc6, 0xc7, 0x7, 0x32, 
    0x2, 0x2, 0xc7, 0xc8, 0x5, 0x16, 0xc, 0x2, 0xc8, 0xc9, 0x7, 0x15, 0x2, 
    0x2, 0xc9, 0xca, 0x5, 0xa, 0x6, 0x2, 0xca, 0xcb, 0x7, 0x14, 0x2, 0x2, 
    0xcb, 0xcc, 0x5, 0x18, 0xd, 0x2, 0xcc, 0xd8, 0x3, 0x2, 0x2, 0x2, 0xcd, 
    0xce, 0x7, 0x32, 0x2, 0x2, 0xce, 0xcf, 0x5, 0x16, 0xc, 0x2, 0xcf, 0xd0, 
    0x7, 0x14, 0x2, 0x2, 0xd0, 0xd1, 0x5, 0x18, 0xd, 0x2, 0xd1, 0xd8, 0x3, 
    0x2, 0x2, 0x2, 0xd2, 0xd3, 0x7, 0x16, 0x2, 0x2, 0xd3, 0xd4, 0x5, 0x6, 
    0x4, 0x2, 0xd4, 0xd5, 0x7, 0x17, 0x2, 0x2, 0xd5, 0xd6, 0x5, 0x4, 0x3, 
    0x2, 0xd6, 0xd8, 0x3, 0x2, 0x2, 0x2, 0xd7, 0xbd, 0x3, 0x2, 0x2, 0x2, 
    0xd7, 0xc6, 0x3, 0x2, 0x2, 0x2, 0xd7, 0xcd, 0x3, 0x2, 0x2, 0x2, 0xd7, 
    0xd2, 0x3, 0x2, 0x2, 0x2, 0xd8, 0x1d, 0x3, 0x2, 0x2, 0x2, 0xd9, 0xda, 
    0x9, 0x7, 0x2, 0x2, 0xda, 0x1f, 0x3, 0x2, 0x2, 0x2, 0xdb, 0xdc, 0x9, 
    0x8, 0x2, 0x2, 0xdc, 0x21, 0x3, 0x2, 0x2, 0x2, 0xdd, 0xde, 0x7, 0x23, 
    0x2, 0x2, 0xde, 0xdf, 0x5, 0x1e, 0x10, 0x2, 0xdf, 0xe0, 0x7, 0x24, 0x2, 
    0x2, 0xe0, 0xe1, 0x5, 0x20, 0x11, 0x2, 0xe1, 0xe2, 0x7, 0x25, 0x2, 0x2, 
    0xe2, 0xf8, 0x3, 0x2, 0x2, 0x2, 0xe3, 0xe4, 0x7, 0x23, 0x2, 0x2, 0xe4, 
    0xe5, 0x5, 0x1e, 0x10, 0x2, 0xe5, 0xe6, 0x7, 0x25, 0x2, 0x2, 0xe6, 0xf8, 
    0x3, 0x2, 0x2, 0x2, 0xe7, 0xe8, 0x7, 0x23, 0x2, 0x2, 0xe8, 0xe9, 0x5, 
    0xa, 0x6, 0x2, 0xe9, 0xea, 0x7, 0x26, 0x2, 0x2, 0xea, 0xeb, 0x5, 0x20, 
    0x11, 0x2, 0xeb, 0xec, 0x7, 0x25, 0x2, 0x2, 0xec, 0xf8, 0x3, 0x2, 0x2, 
    0x2, 0xed, 0xee, 0x7, 0x23, 0x2, 0x2, 0xee, 0xef, 0x5, 0xa, 0x6, 0x2, 
    0xef, 0xf0, 0x7, 0x26, 0x2, 0x2, 0xf0, 0xf1, 0x5, 0x6, 0x4, 0x2, 0xf1, 
    0xf2, 0x7, 0x25, 0x2, 0x2, 0xf2, 0xf8, 0x3, 0x2, 0x2, 0x2, 0xf3, 0xf4, 
    0x7, 0x23, 0x2, 0x2, 0xf4, 0xf5, 0x5, 0x20, 0x11, 0x2, 0xf5, 0xf6, 0x7, 
    0x25, 0x2, 0x2, 0xf6, 0xf8, 0x3, 0x2, 0x2, 0x2, 0xf7, 0xdd, 0x3, 0x2, 
    0x2, 0x2, 0xf7, 0xe3, 0x3, 0x2, 0x2, 0x2, 0xf7, 0xe7, 0x3, 0x2, 0x2, 
    0x2, 0xf7, 0xed, 0x3, 0x2, 0x2, 0x2, 0xf7, 0xf3, 0x3, 0x2, 0x2, 0x2, 
    0xf8, 0x23, 0x3, 0x2, 0x2, 0x2, 0xf9, 0xfa, 0x9, 0x9, 0x2, 0x2, 0xfa, 
    0x25, 0x3, 0x2, 0x2, 0x2, 0xfb, 0xfc, 0x7, 0x29, 0x2, 0x2, 0xfc, 0xfd, 
    0x5, 0x24, 0x13, 0x2, 0xfd, 0xff, 0x7, 0x2a, 0x2, 0x2, 0xfe, 0x100, 
    0xb, 0x2, 0x2, 0x2, 0xff, 0xfe, 0x3, 0x2, 0x2, 0x2, 0x100, 0x101, 0x3, 
    0x2, 0x2, 0x2, 0x101, 0x102, 0x3, 0x2, 0x2, 0x2, 0x101, 0xff, 0x3, 0x2, 
    0x2, 0x2, 0x102, 0x103, 0x3, 0x2, 0x2, 0x2, 0x103, 0x104, 0x7, 0x2a, 
    0x2, 0x2, 0x104, 0x105, 0x3, 0x2, 0x2, 0x2, 0x105, 0x106, 0x7, 0x8, 
    0x2, 0x2, 0x106, 0x107, 0x5, 0x4, 0x3, 0x2, 0x107, 0x108, 0x7, 0x2b, 
    0x2, 0x2, 0x108, 0x109, 0x5, 0xa, 0x6, 0x2, 0x109, 0x10a, 0x7, 0x3, 
    0x2, 0x2, 0x10a, 0x10b, 0x7, 0x9, 0x2, 0x2, 0x10b, 0x10c, 0x7, 0x3, 
    0x2, 0x2, 0x10c, 0x27, 0x3, 0x2, 0x2, 0x2, 0x10d, 0x10e, 0x5, 0xa, 0x6, 
    0x2, 0x10e, 0x10f, 0x7, 0x48, 0x2, 0x2, 0x10f, 0x110, 0x7, 0x2c, 0x2, 
    0x2, 0x110, 0x111, 0x7, 0x4f, 0x2, 0x2, 0x111, 0x112, 0x5, 0x16, 0xc, 
    0x2, 0x112, 0x113, 0x7, 0x50, 0x2, 0x2, 0x113, 0x29, 0x3, 0x2, 0x2, 
    0x2, 0x13, 0x2f, 0x3f, 0x4a, 0x51, 0x5b, 0x63, 0x79, 0x8a, 0x8c, 0x98, 
    0xa5, 0xac, 0xbb, 0xc1, 0xd7, 0xf7, 0x101, 
  };

  atn::ATNDeserializer deserializer;
  _atn = deserializer.deserialize(_serializedATN);

  size_t count = _atn.getNumberOfDecisions();
  _decisionToDFA.reserve(count);
  for (size_t i = 0; i < count; i++) { 
    _decisionToDFA.emplace_back(_atn.getDecisionState(i), i);
  }
}

FractalParser::Initializer FractalParser::_init;
