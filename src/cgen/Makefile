CXX = em++
CC = emcc 

CXXFLAGS =  -O3 -msimd128 -std=c++17 -I ../../../ANTLR-cmake-Emscripten-starter/tools/antlr/cpp_runtime/runtime/src
HEADERS = myVisitor.h
SOURCES = $(wildcard *.cpp)
OBJECTS = $(SOURCES:%.cpp=%.o)

EMFLAGS =  -O3 -s NO_EXIT_RUNTIME=1 -s USE_GLFW=3 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s ALLOW_MEMORY_GROWTH -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap','allocateUTF8','UTF8ToString']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free','_cgen','_getCgen']" -s ENVIRONMENT='web' -s MODULARIZE=1 -s "EXPORT_NAME='createModule'" -msimd128
all: main.wasm

clean: 
	rm *.o 
	rm main.wasm
	rm main.mjs

main.wasm: $(OBJECTS) $(HEADERS)
	$(CC) $(EMFLAGS) -o main.mjs $(OBJECTS) libantlr4-runtime.a

%.o: $(HEADERS) %.cpp 
	$(CXX) $(CXXFLAGS) -c $*.cpp

.PHONY: clean all