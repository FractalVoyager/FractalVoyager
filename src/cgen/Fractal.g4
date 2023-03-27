// Grammar for Cody's Fractal Stream 1.0 
grammar Fractal;

script: (command '.')+;

command: 'set' variable 'to' expression #SET_TO_COM | 
        'default' variable 'to' expression #DEFAULT_TO_COM | // lets the value be edited isn params tab, so this one is useless for now, same as set
        ('block' | ':') (command)+ 'end' #BLOCK_COM | 
        color_command #COLOR_COM |
        'par' command #PAR_COM |
        'dyn' command #DYN_COM |
        if_then #IF_THEN_COM |
        loop #LOOP_COM // |
        // saddle_drop #SADDLE_DROP_COM
        ;

n : POS_INT ; 

constant: cpx_number_re | 
          cpx_number_im |
          n ;

variable : VARIABLE ;

cpx_number_re : NUMBER ;
cpx_number_im : CPX_NUMBER_IM ;

POS_INT : ('1'..'9') ('0'..'9')* ;

NUMBER : '.' ('0' .. '9')+ | ('0' .. '9')+ ('.' ('0' .. '9') +)?; // | 'i' | 'e' | 'pi' ;
CPX_NUMBER_IM: NUMBER 'i' | 'i';

atom : constant | variable ;

cpx_function : EXP | COS | SIN | TAN | COSH | SINH | TANH | RE | IM | BAR | ARG | LOG | SQRT ;
real_function : ARCCOS | ARCSIN | ARCTAN ;


expression: (PLUS | MINUS)? atom #SIGNED_ATOM_EXP | 
            expression POW n #POW_EXP | // second one has to be positive constant integer - feel like its almost a style choice wether to have this stuff caught here or in interpretation
            expression TIMES expression #TIMES_EXP |
            expression DIVIDE expression #DIVIDE_EXP |
            left=expression PLUS right=expression #PLUS_EXP |
            expression MINUS expression #MINUS_EXP |
            cpx_function LPAREN expression RPAREN #CPX_FCN_EXP|
            real_function LPAREN expression RPAREN #RE_FCN_EXP |
            'reduce' variable 'mod' expression #REDUCE_MOD_EXP |
            LPAREN expression RPAREN #PAREN_EXP
            ; 

// probably want to break up escapes, vanishes, and stops into lexemes, and have one rule or even lexer rule for all of them

condition : expression (GT | LT | GT EQUALS | LT EQUALS | EQUALS) expression #COMP_COND |
            expression 'escapes' #ESCAPES_COND |
            expression 'vanishes' #VANISHES_COND |
            expression (STOPS) #STOPS_COND |
            condition (OR | AND | XOR) condition #COMB_COND // will probably want tokens for or and xor
            ;

STOPS: 'stops';

if_then : 'if' condition 'then' command #IF_THEN |
          'if' condition 'then' command 'else' command #IF_THEN_ELSE
          ;

loop : 'do' (command)+ 'until' condition #LoopDo | // keep track of iterations here - something about this in the docs (for ANTLR... and fractal stream)
        ITERATE expression 'on' variable 'until' condition #LoopIterateOn |
        ITERATE expression 'until' condition #LoopIterateEmpty | // in this case, variable is taken to be z
        'repeat' n 'times' command #LoopRepeat; 

flagname: 'checkered' | 'disc' | 'period 3 cycle';

color : 'red' | 'green' | 'blue' | 'omega' | 'omegabar' | 'Purple' | 'White' | 'Orange';

color_command : '[' flagname '|' color ']' |
                '[' flagname ']' |
                '[' variable 'is' color ']' |
                '[' variable 'is' n ']' | 
                '[' color ']'
                ;

num_type : 'real' | 'integer' ;


// this needs more, can also do stuff like.... 
/*
set x to z.
iterate x - (x^3 - 1) / (3 * x^2) on x until x stops.
report x.


.
.
.
.
.

probe integer "Period Counter":
    set z to 0.
    repeat 1000 times:
        set z to z^2 + c.
    end.
    set w to z.
    set p to 0.
    do
        set z to z^2 + c.
        set p to p + 1.
    until z = w.
    report p.
end.
iterate z^2 + c until z escapes. 

// this is also valid, need to figure out what these probe commands really are



 */
probe_command : 'probe' num_type ('"'.+?'"') ':' command 'report' variable '.' 'end' '.' ; /// ?????? - probably want to make end and stuff tokens

saddle_drop : variable EQUALS '\u2206' LPAREN expression RPAREN ;

// TODO - pixel keyword



/* Lexer Rules */

PIXEL : 'pixel' ; /// TODO

ITERATE : 'iterate' ;

////// mathematic functions (like cos) //////

// functions of a complex vaiarable TODO may have to mode switching for complex/real
EXP : 'exp' ;
COS : 'cos' ;
SIN : 'sin' ;
TAN : 'tan' ;
COSH : 'cosh' ;
SINH : 'sinh' ;
TANH : 'tanh' ; 

// functions for manipulating complex numbers 
RE : 're' ;
IM : 'im' ;
BAR : 'bar' ;
ARG : 'arg' ; // TODO look back this is actually im(x)/re(x) so need to change parsing

// TODO add fixed branch cuts for complex numbers 
LOG : 'log' ;
SQRT : 'sqrt'; 

// real varables only 
ARCCOS : 'arccos' ;
ARCSIN : 'arcsin' ;
ARCTAN : 'arctan' ;

POW : '^' ;

// arthetmitic
PLUS : '+' ;
MINUS : '-' ;
TIMES : '*' ; // TODO maybe make it so it can be two things next to eachother here
DIVIDE : '/' ;
EQUALS : '=' ; 
GT : '>' ;
LT : '<' ; 

// condition stuff
OR: 'or';
AND: 'and';
XOR:  'xor';

VARIABLE : ('a' .. 'z')+ ;




LPAREN : '(' ;
RPAREN : ')' ;
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines


// comments were originally in parehthesis - this is way easier at least for now
COMMENT : '//' ~ [\r\n]* -> skip ;


