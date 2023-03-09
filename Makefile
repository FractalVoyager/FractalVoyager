./src/mandlebrotCPP.mjs: ./src/main.cpp
	emcc ./src/main.cpp -o ./src/mandlebrotCPP.mjs -O3  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free', _genPixles]" -s MODULARIZE=1 -s "EXPORT_NAME='createModule'" -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web'

