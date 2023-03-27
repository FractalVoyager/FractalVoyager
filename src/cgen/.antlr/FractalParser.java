// Generated from /Users/dakotabryan/SYE/c-gen/Fractal.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class FractalParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.9.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, POS_INT=43, NUMBER=44, CPX_NUMBER_IM=45, 
		STOPS=46, PIXEL=47, ITERATE=48, EXP=49, COS=50, SIN=51, TAN=52, COSH=53, 
		SINH=54, TANH=55, RE=56, IM=57, BAR=58, ARG=59, LOG=60, SQRT=61, ARCCOS=62, 
		ARCSIN=63, ARCTAN=64, POW=65, PLUS=66, MINUS=67, TIMES=68, DIVIDE=69, 
		EQUALS=70, GT=71, LT=72, OR=73, AND=74, XOR=75, VARIABLE=76, LPAREN=77, 
		RPAREN=78, WS=79, COMMENT=80;
	public static final int
		RULE_script = 0, RULE_command = 1, RULE_n = 2, RULE_constant = 3, RULE_variable = 4, 
		RULE_cpx_number_re = 5, RULE_cpx_number_im = 6, RULE_atom = 7, RULE_cpx_function = 8, 
		RULE_real_function = 9, RULE_expression = 10, RULE_condition = 11, RULE_if_then = 12, 
		RULE_loop = 13, RULE_flagname = 14, RULE_color = 15, RULE_color_command = 16, 
		RULE_num_type = 17, RULE_probe_command = 18, RULE_saddle_drop = 19;
	private static String[] makeRuleNames() {
		return new String[] {
			"script", "command", "n", "constant", "variable", "cpx_number_re", "cpx_number_im", 
			"atom", "cpx_function", "real_function", "expression", "condition", "if_then", 
			"loop", "flagname", "color", "color_command", "num_type", "probe_command", 
			"saddle_drop"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'.'", "'set'", "'to'", "'default'", "'block'", "':'", "'end'", 
			"'par'", "'dyn'", "'reduce'", "'mod'", "'escapes'", "'vanishes'", "'if'", 
			"'then'", "'else'", "'do'", "'until'", "'on'", "'repeat'", "'times'", 
			"'checkered'", "'disc'", "'period 3 cycle'", "'red'", "'green'", "'blue'", 
			"'omega'", "'omegabar'", "'Purple'", "'White'", "'Orange'", "'['", "'|'", 
			"']'", "'is'", "'real'", "'integer'", "'probe'", "'\"'", "'report'", 
			"'\u2206'", null, null, null, "'stops'", "'pixel'", "'iterate'", "'exp'", 
			"'cos'", "'sin'", "'tan'", "'cosh'", "'sinh'", "'tanh'", "'re'", "'im'", 
			"'bar'", "'arg'", "'log'", "'sqrt'", "'arccos'", "'arcsin'", "'arctan'", 
			"'^'", "'+'", "'-'", "'*'", "'/'", "'='", "'>'", "'<'", "'or'", "'and'", 
			"'xor'", null, "'('", "')'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, "POS_INT", "NUMBER", "CPX_NUMBER_IM", 
			"STOPS", "PIXEL", "ITERATE", "EXP", "COS", "SIN", "TAN", "COSH", "SINH", 
			"TANH", "RE", "IM", "BAR", "ARG", "LOG", "SQRT", "ARCCOS", "ARCSIN", 
			"ARCTAN", "POW", "PLUS", "MINUS", "TIMES", "DIVIDE", "EQUALS", "GT", 
			"LT", "OR", "AND", "XOR", "VARIABLE", "LPAREN", "RPAREN", "WS", "COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Fractal.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public FractalParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ScriptContext extends ParserRuleContext {
		public List<CommandContext> command() {
			return getRuleContexts(CommandContext.class);
		}
		public CommandContext command(int i) {
			return getRuleContext(CommandContext.class,i);
		}
		public ScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_script; }
	}

	public final ScriptContext script() throws RecognitionException {
		ScriptContext _localctx = new ScriptContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_script);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(43); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(40);
				command();
				setState(41);
				match(T__0);
				}
				}
				setState(45); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__1) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__7) | (1L << T__8) | (1L << T__13) | (1L << T__16) | (1L << T__19) | (1L << T__32) | (1L << ITERATE))) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CommandContext extends ParserRuleContext {
		public CommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_command; }
	 
		public CommandContext() { }
		public void copyFrom(CommandContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class BLOCK_COMContext extends CommandContext {
		public List<CommandContext> command() {
			return getRuleContexts(CommandContext.class);
		}
		public CommandContext command(int i) {
			return getRuleContext(CommandContext.class,i);
		}
		public BLOCK_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class DYN_COMContext extends CommandContext {
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public DYN_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class SET_TO_COMContext extends CommandContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public SET_TO_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class DEFAULT_TO_COMContext extends CommandContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public DEFAULT_TO_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class COLOR_COMContext extends CommandContext {
		public Color_commandContext color_command() {
			return getRuleContext(Color_commandContext.class,0);
		}
		public COLOR_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class IF_THEN_COMContext extends CommandContext {
		public If_thenContext if_then() {
			return getRuleContext(If_thenContext.class,0);
		}
		public IF_THEN_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class PAR_COMContext extends CommandContext {
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public PAR_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}
	public static class LOOP_COMContext extends CommandContext {
		public LoopContext loop() {
			return getRuleContext(LoopContext.class,0);
		}
		public LOOP_COMContext(CommandContext ctx) { copyFrom(ctx); }
	}

	public final CommandContext command() throws RecognitionException {
		CommandContext _localctx = new CommandContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_command);
		int _la;
		try {
			setState(72);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				_localctx = new SET_TO_COMContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(47);
				match(T__1);
				setState(48);
				variable();
				setState(49);
				match(T__2);
				setState(50);
				expression(0);
				}
				break;
			case T__3:
				_localctx = new DEFAULT_TO_COMContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(52);
				match(T__3);
				setState(53);
				variable();
				setState(54);
				match(T__2);
				setState(55);
				expression(0);
				}
				break;
			case T__4:
			case T__5:
				_localctx = new BLOCK_COMContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(57);
				_la = _input.LA(1);
				if ( !(_la==T__4 || _la==T__5) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(59); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(58);
					command();
					}
					}
					setState(61); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__1) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__7) | (1L << T__8) | (1L << T__13) | (1L << T__16) | (1L << T__19) | (1L << T__32) | (1L << ITERATE))) != 0) );
				setState(63);
				match(T__6);
				}
				break;
			case T__32:
				_localctx = new COLOR_COMContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(65);
				color_command();
				}
				break;
			case T__7:
				_localctx = new PAR_COMContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(66);
				match(T__7);
				setState(67);
				command();
				}
				break;
			case T__8:
				_localctx = new DYN_COMContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(68);
				match(T__8);
				setState(69);
				command();
				}
				break;
			case T__13:
				_localctx = new IF_THEN_COMContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(70);
				if_then();
				}
				break;
			case T__16:
			case T__19:
			case ITERATE:
				_localctx = new LOOP_COMContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(71);
				loop();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NContext extends ParserRuleContext {
		public TerminalNode POS_INT() { return getToken(FractalParser.POS_INT, 0); }
		public NContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_n; }
	}

	public final NContext n() throws RecognitionException {
		NContext _localctx = new NContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_n);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(74);
			match(POS_INT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ConstantContext extends ParserRuleContext {
		public Cpx_number_reContext cpx_number_re() {
			return getRuleContext(Cpx_number_reContext.class,0);
		}
		public Cpx_number_imContext cpx_number_im() {
			return getRuleContext(Cpx_number_imContext.class,0);
		}
		public NContext n() {
			return getRuleContext(NContext.class,0);
		}
		public ConstantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constant; }
	}

	public final ConstantContext constant() throws RecognitionException {
		ConstantContext _localctx = new ConstantContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_constant);
		try {
			setState(79);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				enterOuterAlt(_localctx, 1);
				{
				setState(76);
				cpx_number_re();
				}
				break;
			case CPX_NUMBER_IM:
				enterOuterAlt(_localctx, 2);
				{
				setState(77);
				cpx_number_im();
				}
				break;
			case POS_INT:
				enterOuterAlt(_localctx, 3);
				{
				setState(78);
				n();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VariableContext extends ParserRuleContext {
		public TerminalNode VARIABLE() { return getToken(FractalParser.VARIABLE, 0); }
		public VariableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variable; }
	}

	public final VariableContext variable() throws RecognitionException {
		VariableContext _localctx = new VariableContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_variable);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(81);
			match(VARIABLE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Cpx_number_reContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(FractalParser.NUMBER, 0); }
		public Cpx_number_reContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cpx_number_re; }
	}

	public final Cpx_number_reContext cpx_number_re() throws RecognitionException {
		Cpx_number_reContext _localctx = new Cpx_number_reContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_cpx_number_re);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(83);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Cpx_number_imContext extends ParserRuleContext {
		public TerminalNode CPX_NUMBER_IM() { return getToken(FractalParser.CPX_NUMBER_IM, 0); }
		public Cpx_number_imContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cpx_number_im; }
	}

	public final Cpx_number_imContext cpx_number_im() throws RecognitionException {
		Cpx_number_imContext _localctx = new Cpx_number_imContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_cpx_number_im);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(85);
			match(CPX_NUMBER_IM);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AtomContext extends ParserRuleContext {
		public ConstantContext constant() {
			return getRuleContext(ConstantContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public AtomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_atom; }
	}

	public final AtomContext atom() throws RecognitionException {
		AtomContext _localctx = new AtomContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_atom);
		try {
			setState(89);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case POS_INT:
			case NUMBER:
			case CPX_NUMBER_IM:
				enterOuterAlt(_localctx, 1);
				{
				setState(87);
				constant();
				}
				break;
			case VARIABLE:
				enterOuterAlt(_localctx, 2);
				{
				setState(88);
				variable();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Cpx_functionContext extends ParserRuleContext {
		public TerminalNode EXP() { return getToken(FractalParser.EXP, 0); }
		public TerminalNode COS() { return getToken(FractalParser.COS, 0); }
		public TerminalNode SIN() { return getToken(FractalParser.SIN, 0); }
		public TerminalNode TAN() { return getToken(FractalParser.TAN, 0); }
		public TerminalNode COSH() { return getToken(FractalParser.COSH, 0); }
		public TerminalNode SINH() { return getToken(FractalParser.SINH, 0); }
		public TerminalNode TANH() { return getToken(FractalParser.TANH, 0); }
		public TerminalNode RE() { return getToken(FractalParser.RE, 0); }
		public TerminalNode IM() { return getToken(FractalParser.IM, 0); }
		public TerminalNode BAR() { return getToken(FractalParser.BAR, 0); }
		public TerminalNode ARG() { return getToken(FractalParser.ARG, 0); }
		public TerminalNode LOG() { return getToken(FractalParser.LOG, 0); }
		public TerminalNode SQRT() { return getToken(FractalParser.SQRT, 0); }
		public Cpx_functionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cpx_function; }
	}

	public final Cpx_functionContext cpx_function() throws RecognitionException {
		Cpx_functionContext _localctx = new Cpx_functionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_cpx_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << EXP) | (1L << COS) | (1L << SIN) | (1L << TAN) | (1L << COSH) | (1L << SINH) | (1L << TANH) | (1L << RE) | (1L << IM) | (1L << BAR) | (1L << ARG) | (1L << LOG) | (1L << SQRT))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Real_functionContext extends ParserRuleContext {
		public TerminalNode ARCCOS() { return getToken(FractalParser.ARCCOS, 0); }
		public TerminalNode ARCSIN() { return getToken(FractalParser.ARCSIN, 0); }
		public TerminalNode ARCTAN() { return getToken(FractalParser.ARCTAN, 0); }
		public Real_functionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_real_function; }
	}

	public final Real_functionContext real_function() throws RecognitionException {
		Real_functionContext _localctx = new Real_functionContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_real_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(93);
			_la = _input.LA(1);
			if ( !(((((_la - 62)) & ~0x3f) == 0 && ((1L << (_la - 62)) & ((1L << (ARCCOS - 62)) | (1L << (ARCSIN - 62)) | (1L << (ARCTAN - 62)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class POW_EXPContext extends ExpressionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode POW() { return getToken(FractalParser.POW, 0); }
		public NContext n() {
			return getRuleContext(NContext.class,0);
		}
		public POW_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class TIMES_EXPContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode TIMES() { return getToken(FractalParser.TIMES, 0); }
		public TIMES_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class DIVIDE_EXPContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode DIVIDE() { return getToken(FractalParser.DIVIDE, 0); }
		public DIVIDE_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MINUS_EXPContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode MINUS() { return getToken(FractalParser.MINUS, 0); }
		public MINUS_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class SIGNED_ATOM_EXPContext extends ExpressionContext {
		public AtomContext atom() {
			return getRuleContext(AtomContext.class,0);
		}
		public TerminalNode PLUS() { return getToken(FractalParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(FractalParser.MINUS, 0); }
		public SIGNED_ATOM_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class PLUS_EXPContext extends ExpressionContext {
		public ExpressionContext left;
		public ExpressionContext right;
		public TerminalNode PLUS() { return getToken(FractalParser.PLUS, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public PLUS_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class REDUCE_MOD_EXPContext extends ExpressionContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public REDUCE_MOD_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class RE_FCN_EXPContext extends ExpressionContext {
		public Real_functionContext real_function() {
			return getRuleContext(Real_functionContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(FractalParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(FractalParser.RPAREN, 0); }
		public RE_FCN_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class PAREN_EXPContext extends ExpressionContext {
		public TerminalNode LPAREN() { return getToken(FractalParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(FractalParser.RPAREN, 0); }
		public PAREN_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class CPX_FCN_EXPContext extends ExpressionContext {
		public Cpx_functionContext cpx_function() {
			return getRuleContext(Cpx_functionContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(FractalParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(FractalParser.RPAREN, 0); }
		public CPX_FCN_EXPContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 20;
		enterRecursionRule(_localctx, 20, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(119);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case POS_INT:
			case NUMBER:
			case CPX_NUMBER_IM:
			case PLUS:
			case MINUS:
			case VARIABLE:
				{
				_localctx = new SIGNED_ATOM_EXPContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(97);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==PLUS || _la==MINUS) {
					{
					setState(96);
					_la = _input.LA(1);
					if ( !(_la==PLUS || _la==MINUS) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					}
				}

				setState(99);
				atom();
				}
				break;
			case EXP:
			case COS:
			case SIN:
			case TAN:
			case COSH:
			case SINH:
			case TANH:
			case RE:
			case IM:
			case BAR:
			case ARG:
			case LOG:
			case SQRT:
				{
				_localctx = new CPX_FCN_EXPContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(100);
				cpx_function();
				setState(101);
				match(LPAREN);
				setState(102);
				expression(0);
				setState(103);
				match(RPAREN);
				}
				break;
			case ARCCOS:
			case ARCSIN:
			case ARCTAN:
				{
				_localctx = new RE_FCN_EXPContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(105);
				real_function();
				setState(106);
				match(LPAREN);
				setState(107);
				expression(0);
				setState(108);
				match(RPAREN);
				}
				break;
			case T__9:
				{
				_localctx = new REDUCE_MOD_EXPContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(110);
				match(T__9);
				setState(111);
				variable();
				setState(112);
				match(T__10);
				setState(113);
				expression(2);
				}
				break;
			case LPAREN:
				{
				_localctx = new PAREN_EXPContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(115);
				match(LPAREN);
				setState(116);
				expression(0);
				setState(117);
				match(RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(138);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(136);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
					case 1:
						{
						_localctx = new TIMES_EXPContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(121);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(122);
						match(TIMES);
						setState(123);
						expression(9);
						}
						break;
					case 2:
						{
						_localctx = new DIVIDE_EXPContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(124);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(125);
						match(DIVIDE);
						setState(126);
						expression(8);
						}
						break;
					case 3:
						{
						_localctx = new PLUS_EXPContext(new ExpressionContext(_parentctx, _parentState));
						((PLUS_EXPContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(127);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(128);
						match(PLUS);
						setState(129);
						((PLUS_EXPContext)_localctx).right = expression(7);
						}
						break;
					case 4:
						{
						_localctx = new MINUS_EXPContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(130);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(131);
						match(MINUS);
						setState(132);
						expression(6);
						}
						break;
					case 5:
						{
						_localctx = new POW_EXPContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(133);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(134);
						match(POW);
						setState(135);
						n();
						}
						break;
					}
					} 
				}
				setState(140);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class ConditionContext extends ParserRuleContext {
		public ConditionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_condition; }
	 
		public ConditionContext() { }
		public void copyFrom(ConditionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class STOPS_CONDContext extends ConditionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode STOPS() { return getToken(FractalParser.STOPS, 0); }
		public STOPS_CONDContext(ConditionContext ctx) { copyFrom(ctx); }
	}
	public static class COMP_CONDContext extends ConditionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode GT() { return getToken(FractalParser.GT, 0); }
		public TerminalNode LT() { return getToken(FractalParser.LT, 0); }
		public TerminalNode EQUALS() { return getToken(FractalParser.EQUALS, 0); }
		public COMP_CONDContext(ConditionContext ctx) { copyFrom(ctx); }
	}
	public static class VANISHES_CONDContext extends ConditionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VANISHES_CONDContext(ConditionContext ctx) { copyFrom(ctx); }
	}
	public static class ESCAPES_CONDContext extends ConditionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ESCAPES_CONDContext(ConditionContext ctx) { copyFrom(ctx); }
	}
	public static class COMB_CONDContext extends ConditionContext {
		public List<ConditionContext> condition() {
			return getRuleContexts(ConditionContext.class);
		}
		public ConditionContext condition(int i) {
			return getRuleContext(ConditionContext.class,i);
		}
		public TerminalNode OR() { return getToken(FractalParser.OR, 0); }
		public TerminalNode AND() { return getToken(FractalParser.AND, 0); }
		public TerminalNode XOR() { return getToken(FractalParser.XOR, 0); }
		public COMB_CONDContext(ConditionContext ctx) { copyFrom(ctx); }
	}

	public final ConditionContext condition() throws RecognitionException {
		return condition(0);
	}

	private ConditionContext condition(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ConditionContext _localctx = new ConditionContext(_ctx, _parentState);
		ConditionContext _prevctx = _localctx;
		int _startState = 22;
		enterRecursionRule(_localctx, 22, RULE_condition, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(163);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				{
				_localctx = new COMP_CONDContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(142);
				expression(0);
				setState(150);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
				case 1:
					{
					setState(143);
					match(GT);
					}
					break;
				case 2:
					{
					setState(144);
					match(LT);
					}
					break;
				case 3:
					{
					setState(145);
					match(GT);
					setState(146);
					match(EQUALS);
					}
					break;
				case 4:
					{
					setState(147);
					match(LT);
					setState(148);
					match(EQUALS);
					}
					break;
				case 5:
					{
					setState(149);
					match(EQUALS);
					}
					break;
				}
				setState(152);
				expression(0);
				}
				break;
			case 2:
				{
				_localctx = new ESCAPES_CONDContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(154);
				expression(0);
				setState(155);
				match(T__11);
				}
				break;
			case 3:
				{
				_localctx = new VANISHES_CONDContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(157);
				expression(0);
				setState(158);
				match(T__12);
				}
				break;
			case 4:
				{
				_localctx = new STOPS_CONDContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(160);
				expression(0);
				{
				setState(161);
				match(STOPS);
				}
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(170);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new COMB_CONDContext(new ConditionContext(_parentctx, _parentState));
					pushNewRecursionContext(_localctx, _startState, RULE_condition);
					setState(165);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(166);
					_la = _input.LA(1);
					if ( !(((((_la - 73)) & ~0x3f) == 0 && ((1L << (_la - 73)) & ((1L << (OR - 73)) | (1L << (AND - 73)) | (1L << (XOR - 73)))) != 0)) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					setState(167);
					condition(2);
					}
					} 
				}
				setState(172);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class If_thenContext extends ParserRuleContext {
		public If_thenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_if_then; }
	 
		public If_thenContext() { }
		public void copyFrom(If_thenContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IF_THENContext extends If_thenContext {
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public IF_THENContext(If_thenContext ctx) { copyFrom(ctx); }
	}
	public static class IF_THEN_ELSEContext extends If_thenContext {
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public List<CommandContext> command() {
			return getRuleContexts(CommandContext.class);
		}
		public CommandContext command(int i) {
			return getRuleContext(CommandContext.class,i);
		}
		public IF_THEN_ELSEContext(If_thenContext ctx) { copyFrom(ctx); }
	}

	public final If_thenContext if_then() throws RecognitionException {
		If_thenContext _localctx = new If_thenContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_if_then);
		try {
			setState(185);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				_localctx = new IF_THENContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(173);
				match(T__13);
				setState(174);
				condition(0);
				setState(175);
				match(T__14);
				setState(176);
				command();
				}
				break;
			case 2:
				_localctx = new IF_THEN_ELSEContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(178);
				match(T__13);
				setState(179);
				condition(0);
				setState(180);
				match(T__14);
				setState(181);
				command();
				setState(182);
				match(T__15);
				setState(183);
				command();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LoopContext extends ParserRuleContext {
		public LoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_loop; }
	 
		public LoopContext() { }
		public void copyFrom(LoopContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class LoopRepeatContext extends LoopContext {
		public NContext n() {
			return getRuleContext(NContext.class,0);
		}
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public LoopRepeatContext(LoopContext ctx) { copyFrom(ctx); }
	}
	public static class LoopIterateOnContext extends LoopContext {
		public TerminalNode ITERATE() { return getToken(FractalParser.ITERATE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public LoopIterateOnContext(LoopContext ctx) { copyFrom(ctx); }
	}
	public static class LoopDoContext extends LoopContext {
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public List<CommandContext> command() {
			return getRuleContexts(CommandContext.class);
		}
		public CommandContext command(int i) {
			return getRuleContext(CommandContext.class,i);
		}
		public LoopDoContext(LoopContext ctx) { copyFrom(ctx); }
	}
	public static class LoopIterateEmptyContext extends LoopContext {
		public TerminalNode ITERATE() { return getToken(FractalParser.ITERATE, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public LoopIterateEmptyContext(LoopContext ctx) { copyFrom(ctx); }
	}

	public final LoopContext loop() throws RecognitionException {
		LoopContext _localctx = new LoopContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_loop);
		int _la;
		try {
			setState(213);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				_localctx = new LoopDoContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(187);
				match(T__16);
				setState(189); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(188);
					command();
					}
					}
					setState(191); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__1) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__7) | (1L << T__8) | (1L << T__13) | (1L << T__16) | (1L << T__19) | (1L << T__32) | (1L << ITERATE))) != 0) );
				setState(193);
				match(T__17);
				setState(194);
				condition(0);
				}
				break;
			case 2:
				_localctx = new LoopIterateOnContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(196);
				match(ITERATE);
				setState(197);
				expression(0);
				setState(198);
				match(T__18);
				setState(199);
				variable();
				setState(200);
				match(T__17);
				setState(201);
				condition(0);
				}
				break;
			case 3:
				_localctx = new LoopIterateEmptyContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(203);
				match(ITERATE);
				setState(204);
				expression(0);
				setState(205);
				match(T__17);
				setState(206);
				condition(0);
				}
				break;
			case 4:
				_localctx = new LoopRepeatContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(208);
				match(T__19);
				setState(209);
				n();
				setState(210);
				match(T__20);
				setState(211);
				command();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FlagnameContext extends ParserRuleContext {
		public FlagnameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_flagname; }
	}

	public final FlagnameContext flagname() throws RecognitionException {
		FlagnameContext _localctx = new FlagnameContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_flagname);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(215);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__21) | (1L << T__22) | (1L << T__23))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ColorContext extends ParserRuleContext {
		public ColorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_color; }
	}

	public final ColorContext color() throws RecognitionException {
		ColorContext _localctx = new ColorContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_color);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(217);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__24) | (1L << T__25) | (1L << T__26) | (1L << T__27) | (1L << T__28) | (1L << T__29) | (1L << T__30) | (1L << T__31))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Color_commandContext extends ParserRuleContext {
		public FlagnameContext flagname() {
			return getRuleContext(FlagnameContext.class,0);
		}
		public ColorContext color() {
			return getRuleContext(ColorContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public NContext n() {
			return getRuleContext(NContext.class,0);
		}
		public Color_commandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_color_command; }
	}

	public final Color_commandContext color_command() throws RecognitionException {
		Color_commandContext _localctx = new Color_commandContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_color_command);
		try {
			setState(245);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(219);
				match(T__32);
				setState(220);
				flagname();
				setState(221);
				match(T__33);
				setState(222);
				color();
				setState(223);
				match(T__34);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(225);
				match(T__32);
				setState(226);
				flagname();
				setState(227);
				match(T__34);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(229);
				match(T__32);
				setState(230);
				variable();
				setState(231);
				match(T__35);
				setState(232);
				color();
				setState(233);
				match(T__34);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(235);
				match(T__32);
				setState(236);
				variable();
				setState(237);
				match(T__35);
				setState(238);
				n();
				setState(239);
				match(T__34);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(241);
				match(T__32);
				setState(242);
				color();
				setState(243);
				match(T__34);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Num_typeContext extends ParserRuleContext {
		public Num_typeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_num_type; }
	}

	public final Num_typeContext num_type() throws RecognitionException {
		Num_typeContext _localctx = new Num_typeContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_num_type);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(247);
			_la = _input.LA(1);
			if ( !(_la==T__36 || _la==T__37) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Probe_commandContext extends ParserRuleContext {
		public Num_typeContext num_type() {
			return getRuleContext(Num_typeContext.class,0);
		}
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public Probe_commandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_probe_command; }
	}

	public final Probe_commandContext probe_command() throws RecognitionException {
		Probe_commandContext _localctx = new Probe_commandContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_probe_command);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			match(T__38);
			setState(250);
			num_type();
			{
			setState(251);
			match(T__39);
			setState(253); 
			_errHandler.sync(this);
			_alt = 1+1;
			do {
				switch (_alt) {
				case 1+1:
					{
					{
					setState(252);
					matchWildcard();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(255); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,16,_ctx);
			} while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(257);
			match(T__39);
			}
			setState(259);
			match(T__5);
			setState(260);
			command();
			setState(261);
			match(T__40);
			setState(262);
			variable();
			setState(263);
			match(T__0);
			setState(264);
			match(T__6);
			setState(265);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Saddle_dropContext extends ParserRuleContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public TerminalNode EQUALS() { return getToken(FractalParser.EQUALS, 0); }
		public TerminalNode LPAREN() { return getToken(FractalParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(FractalParser.RPAREN, 0); }
		public Saddle_dropContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_saddle_drop; }
	}

	public final Saddle_dropContext saddle_drop() throws RecognitionException {
		Saddle_dropContext _localctx = new Saddle_dropContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_saddle_drop);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(267);
			variable();
			setState(268);
			match(EQUALS);
			setState(269);
			match(T__41);
			setState(270);
			match(LPAREN);
			setState(271);
			expression(0);
			setState(272);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 10:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		case 11:
			return condition_sempred((ConditionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 8);
		case 1:
			return precpred(_ctx, 7);
		case 2:
			return precpred(_ctx, 6);
		case 3:
			return precpred(_ctx, 5);
		case 4:
			return precpred(_ctx, 9);
		}
		return true;
	}
	private boolean condition_sempred(ConditionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 5:
			return precpred(_ctx, 1);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3R\u0115\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\3\2\3\2\3\2\6\2.\n\2\r\2\16\2/\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\6\3>\n\3\r\3\16\3?\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3K\n\3\3\4\3\4\3\5\3\5\3\5\5\5R\n\5\3\6\3"+
		"\6\3\7\3\7\3\b\3\b\3\t\3\t\5\t\\\n\t\3\n\3\n\3\13\3\13\3\f\3\f\5\fd\n"+
		"\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\5\fz\n\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\7\f\u008b\n\f\f\f\16\f\u008e\13\f\3\r\3\r\3\r\3\r\3\r\3\r"+
		"\3\r\3\r\3\r\5\r\u0099\n\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r"+
		"\5\r\u00a6\n\r\3\r\3\r\3\r\7\r\u00ab\n\r\f\r\16\r\u00ae\13\r\3\16\3\16"+
		"\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\5\16\u00bc\n\16\3\17"+
		"\3\17\6\17\u00c0\n\17\r\17\16\17\u00c1\3\17\3\17\3\17\3\17\3\17\3\17\3"+
		"\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\5"+
		"\17\u00d8\n\17\3\20\3\20\3\21\3\21\3\22\3\22\3\22\3\22\3\22\3\22\3\22"+
		"\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22"+
		"\3\22\3\22\3\22\3\22\3\22\5\22\u00f8\n\22\3\23\3\23\3\24\3\24\3\24\3\24"+
		"\6\24\u0100\n\24\r\24\16\24\u0101\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3"+
		"\24\3\24\3\24\3\25\3\25\3\25\3\25\3\25\3\25\3\25\3\25\3\u0101\4\26\30"+
		"\26\2\4\6\b\n\f\16\20\22\24\26\30\32\34\36 \"$&(\2\n\3\2\7\b\3\2\63?\3"+
		"\2@B\3\2DE\3\2KM\3\2\30\32\3\2\33\"\3\2\'(\2\u0128\2-\3\2\2\2\4J\3\2\2"+
		"\2\6L\3\2\2\2\bQ\3\2\2\2\nS\3\2\2\2\fU\3\2\2\2\16W\3\2\2\2\20[\3\2\2\2"+
		"\22]\3\2\2\2\24_\3\2\2\2\26y\3\2\2\2\30\u00a5\3\2\2\2\32\u00bb\3\2\2\2"+
		"\34\u00d7\3\2\2\2\36\u00d9\3\2\2\2 \u00db\3\2\2\2\"\u00f7\3\2\2\2$\u00f9"+
		"\3\2\2\2&\u00fb\3\2\2\2(\u010d\3\2\2\2*+\5\4\3\2+,\7\3\2\2,.\3\2\2\2-"+
		"*\3\2\2\2./\3\2\2\2/-\3\2\2\2/\60\3\2\2\2\60\3\3\2\2\2\61\62\7\4\2\2\62"+
		"\63\5\n\6\2\63\64\7\5\2\2\64\65\5\26\f\2\65K\3\2\2\2\66\67\7\6\2\2\67"+
		"8\5\n\6\289\7\5\2\29:\5\26\f\2:K\3\2\2\2;=\t\2\2\2<>\5\4\3\2=<\3\2\2\2"+
		">?\3\2\2\2?=\3\2\2\2?@\3\2\2\2@A\3\2\2\2AB\7\t\2\2BK\3\2\2\2CK\5\"\22"+
		"\2DE\7\n\2\2EK\5\4\3\2FG\7\13\2\2GK\5\4\3\2HK\5\32\16\2IK\5\34\17\2J\61"+
		"\3\2\2\2J\66\3\2\2\2J;\3\2\2\2JC\3\2\2\2JD\3\2\2\2JF\3\2\2\2JH\3\2\2\2"+
		"JI\3\2\2\2K\5\3\2\2\2LM\7-\2\2M\7\3\2\2\2NR\5\f\7\2OR\5\16\b\2PR\5\6\4"+
		"\2QN\3\2\2\2QO\3\2\2\2QP\3\2\2\2R\t\3\2\2\2ST\7N\2\2T\13\3\2\2\2UV\7."+
		"\2\2V\r\3\2\2\2WX\7/\2\2X\17\3\2\2\2Y\\\5\b\5\2Z\\\5\n\6\2[Y\3\2\2\2["+
		"Z\3\2\2\2\\\21\3\2\2\2]^\t\3\2\2^\23\3\2\2\2_`\t\4\2\2`\25\3\2\2\2ac\b"+
		"\f\1\2bd\t\5\2\2cb\3\2\2\2cd\3\2\2\2de\3\2\2\2ez\5\20\t\2fg\5\22\n\2g"+
		"h\7O\2\2hi\5\26\f\2ij\7P\2\2jz\3\2\2\2kl\5\24\13\2lm\7O\2\2mn\5\26\f\2"+
		"no\7P\2\2oz\3\2\2\2pq\7\f\2\2qr\5\n\6\2rs\7\r\2\2st\5\26\f\4tz\3\2\2\2"+
		"uv\7O\2\2vw\5\26\f\2wx\7P\2\2xz\3\2\2\2ya\3\2\2\2yf\3\2\2\2yk\3\2\2\2"+
		"yp\3\2\2\2yu\3\2\2\2z\u008c\3\2\2\2{|\f\n\2\2|}\7F\2\2}\u008b\5\26\f\13"+
		"~\177\f\t\2\2\177\u0080\7G\2\2\u0080\u008b\5\26\f\n\u0081\u0082\f\b\2"+
		"\2\u0082\u0083\7D\2\2\u0083\u008b\5\26\f\t\u0084\u0085\f\7\2\2\u0085\u0086"+
		"\7E\2\2\u0086\u008b\5\26\f\b\u0087\u0088\f\13\2\2\u0088\u0089\7C\2\2\u0089"+
		"\u008b\5\6\4\2\u008a{\3\2\2\2\u008a~\3\2\2\2\u008a\u0081\3\2\2\2\u008a"+
		"\u0084\3\2\2\2\u008a\u0087\3\2\2\2\u008b\u008e\3\2\2\2\u008c\u008a\3\2"+
		"\2\2\u008c\u008d\3\2\2\2\u008d\27\3\2\2\2\u008e\u008c\3\2\2\2\u008f\u0090"+
		"\b\r\1\2\u0090\u0098\5\26\f\2\u0091\u0099\7I\2\2\u0092\u0099\7J\2\2\u0093"+
		"\u0094\7I\2\2\u0094\u0099\7H\2\2\u0095\u0096\7J\2\2\u0096\u0099\7H\2\2"+
		"\u0097\u0099\7H\2\2\u0098\u0091\3\2\2\2\u0098\u0092\3\2\2\2\u0098\u0093"+
		"\3\2\2\2\u0098\u0095\3\2\2\2\u0098\u0097\3\2\2\2\u0099\u009a\3\2\2\2\u009a"+
		"\u009b\5\26\f\2\u009b\u00a6\3\2\2\2\u009c\u009d\5\26\f\2\u009d\u009e\7"+
		"\16\2\2\u009e\u00a6\3\2\2\2\u009f\u00a0\5\26\f\2\u00a0\u00a1\7\17\2\2"+
		"\u00a1\u00a6\3\2\2\2\u00a2\u00a3\5\26\f\2\u00a3\u00a4\7\60\2\2\u00a4\u00a6"+
		"\3\2\2\2\u00a5\u008f\3\2\2\2\u00a5\u009c\3\2\2\2\u00a5\u009f\3\2\2\2\u00a5"+
		"\u00a2\3\2\2\2\u00a6\u00ac\3\2\2\2\u00a7\u00a8\f\3\2\2\u00a8\u00a9\t\6"+
		"\2\2\u00a9\u00ab\5\30\r\4\u00aa\u00a7\3\2\2\2\u00ab\u00ae\3\2\2\2\u00ac"+
		"\u00aa\3\2\2\2\u00ac\u00ad\3\2\2\2\u00ad\31\3\2\2\2\u00ae\u00ac\3\2\2"+
		"\2\u00af\u00b0\7\20\2\2\u00b0\u00b1\5\30\r\2\u00b1\u00b2\7\21\2\2\u00b2"+
		"\u00b3\5\4\3\2\u00b3\u00bc\3\2\2\2\u00b4\u00b5\7\20\2\2\u00b5\u00b6\5"+
		"\30\r\2\u00b6\u00b7\7\21\2\2\u00b7\u00b8\5\4\3\2\u00b8\u00b9\7\22\2\2"+
		"\u00b9\u00ba\5\4\3\2\u00ba\u00bc\3\2\2\2\u00bb\u00af\3\2\2\2\u00bb\u00b4"+
		"\3\2\2\2\u00bc\33\3\2\2\2\u00bd\u00bf\7\23\2\2\u00be\u00c0\5\4\3\2\u00bf"+
		"\u00be\3\2\2\2\u00c0\u00c1\3\2\2\2\u00c1\u00bf\3\2\2\2\u00c1\u00c2\3\2"+
		"\2\2\u00c2\u00c3\3\2\2\2\u00c3\u00c4\7\24\2\2\u00c4\u00c5\5\30\r\2\u00c5"+
		"\u00d8\3\2\2\2\u00c6\u00c7\7\62\2\2\u00c7\u00c8\5\26\f\2\u00c8\u00c9\7"+
		"\25\2\2\u00c9\u00ca\5\n\6\2\u00ca\u00cb\7\24\2\2\u00cb\u00cc\5\30\r\2"+
		"\u00cc\u00d8\3\2\2\2\u00cd\u00ce\7\62\2\2\u00ce\u00cf\5\26\f\2\u00cf\u00d0"+
		"\7\24\2\2\u00d0\u00d1\5\30\r\2\u00d1\u00d8\3\2\2\2\u00d2\u00d3\7\26\2"+
		"\2\u00d3\u00d4\5\6\4\2\u00d4\u00d5\7\27\2\2\u00d5\u00d6\5\4\3\2\u00d6"+
		"\u00d8\3\2\2\2\u00d7\u00bd\3\2\2\2\u00d7\u00c6\3\2\2\2\u00d7\u00cd\3\2"+
		"\2\2\u00d7\u00d2\3\2\2\2\u00d8\35\3\2\2\2\u00d9\u00da\t\7\2\2\u00da\37"+
		"\3\2\2\2\u00db\u00dc\t\b\2\2\u00dc!\3\2\2\2\u00dd\u00de\7#\2\2\u00de\u00df"+
		"\5\36\20\2\u00df\u00e0\7$\2\2\u00e0\u00e1\5 \21\2\u00e1\u00e2\7%\2\2\u00e2"+
		"\u00f8\3\2\2\2\u00e3\u00e4\7#\2\2\u00e4\u00e5\5\36\20\2\u00e5\u00e6\7"+
		"%\2\2\u00e6\u00f8\3\2\2\2\u00e7\u00e8\7#\2\2\u00e8\u00e9\5\n\6\2\u00e9"+
		"\u00ea\7&\2\2\u00ea\u00eb\5 \21\2\u00eb\u00ec\7%\2\2\u00ec\u00f8\3\2\2"+
		"\2\u00ed\u00ee\7#\2\2\u00ee\u00ef\5\n\6\2\u00ef\u00f0\7&\2\2\u00f0\u00f1"+
		"\5\6\4\2\u00f1\u00f2\7%\2\2\u00f2\u00f8\3\2\2\2\u00f3\u00f4\7#\2\2\u00f4"+
		"\u00f5\5 \21\2\u00f5\u00f6\7%\2\2\u00f6\u00f8\3\2\2\2\u00f7\u00dd\3\2"+
		"\2\2\u00f7\u00e3\3\2\2\2\u00f7\u00e7\3\2\2\2\u00f7\u00ed\3\2\2\2\u00f7"+
		"\u00f3\3\2\2\2\u00f8#\3\2\2\2\u00f9\u00fa\t\t\2\2\u00fa%\3\2\2\2\u00fb"+
		"\u00fc\7)\2\2\u00fc\u00fd\5$\23\2\u00fd\u00ff\7*\2\2\u00fe\u0100\13\2"+
		"\2\2\u00ff\u00fe\3\2\2\2\u0100\u0101\3\2\2\2\u0101\u0102\3\2\2\2\u0101"+
		"\u00ff\3\2\2\2\u0102\u0103\3\2\2\2\u0103\u0104\7*\2\2\u0104\u0105\3\2"+
		"\2\2\u0105\u0106\7\b\2\2\u0106\u0107\5\4\3\2\u0107\u0108\7+\2\2\u0108"+
		"\u0109\5\n\6\2\u0109\u010a\7\3\2\2\u010a\u010b\7\t\2\2\u010b\u010c\7\3"+
		"\2\2\u010c\'\3\2\2\2\u010d\u010e\5\n\6\2\u010e\u010f\7H\2\2\u010f\u0110"+
		"\7,\2\2\u0110\u0111\7O\2\2\u0111\u0112\5\26\f\2\u0112\u0113\7P\2\2\u0113"+
		")\3\2\2\2\23/?JQ[cy\u008a\u008c\u0098\u00a5\u00ac\u00bb\u00c1\u00d7\u00f7"+
		"\u0101";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}