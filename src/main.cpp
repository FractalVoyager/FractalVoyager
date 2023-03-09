
// #include <../../../emsdk/emscripten/emscripten.h>
#include <math.h>
#include <stdint.h>
#include <complex.h>
#include<stdio.h>
#include <emscripten/emscripten.h>

/////// emcc -o mandlebrotCPP.js  main.cpp -O3  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free']" -s MODULARIZE=1 -s "EXPORT_NAME='loadModule'" -s ALLOW_MEMORY_GROWTH /////////
// emcc -o mandlebrotCPP.js  main.cpp -O3  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free', _genPixles]" -s MODULARIZE=1 -s "EXPORT_NAME='loadModule'" -s ALLOW_MEMORY_GROWTH

// https://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html

int mandlebrot(double x, double y);
int getIdx(int x, int y, int width, int color);

int julia(double zReP, double zImP, double cReP, double cImP);

// void orbit(double zReP, double zImP, double cReP, double cImP, double_t* p);


// same as julia but this one returns the orbit 
// void orbit(double zReP, double zImP, double cReP, double cImP, double_t *p) {

//   // will just be [re1, im1, re2, im2, ...] and can break it up in js
//   // double[128] orb;
//   std::complex<double> z(zReP, zImP);
//   std::complex<double> c(cReP, cImP);
//   for (int i = 1; i < 64; i++) {
//     // at i*2-2 and i*2-1
//     p[i*2-2] = real(z);
//     p[i*2-1] = imag(z);
//     std::complex<double> z2 = z*z + c;
//     if(abs(z2) > 4) {
//       return;
//     }
//     z = z2;
//   }
//   return;

// }

// maybe have the complex c passed in, might take some time to create these
// which is why it is slowing it down
int julia(double zReP, double zImP, double cReP, double cImP) {
    std::complex<double> z(zReP, zImP);
    std::complex<double> c(cReP, cImP);

  for (int i = 1; i < 256; i++) {
    std::complex<double> z2 = z*z + c;
    if(abs(z2) > 4) {
      return i;
    }
    z = z2;
  }
  return 0;

}

int mandlebrot(double x, double y)
{
  double c_r = x;
  double c_i = y;
  double z_r = 0.0;
  double z_i = 0.0;
  // 64 iterations

  for (int i = 1; i < 64; i++)
  {
    double z_r2 = (z_r * z_r) - (z_i * z_i) + c_r;
    z_i = (2 * z_r * z_i) + c_i;
    z_r = z_r2;
    if (((z_r * z_r) + (z_i * z_i)) > 4)
    {
      return i;
    }
  }
  return 0;
}

int getIdx(int x, int y, int width, int color)
{
  int red = y * (width * 4) + x * 4;
  return red + color;
}

// would be really nice to make this for loop parrell computing - for when I get back to school

extern "C" {
  EMSCRIPTEN_KEEPALIVE void genPixles(int type, double cRe, double cIm, double zRe, double zIm, double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr, double_t *p)
{
  // ptr is array
  // it will alreadly be the right size

  if(type == 2) {
    // draw orbit for julia set with cs given for given z value 
    // orbit(zRe, zIm, cRe, cIm, p);
  std::complex<double> z(zRe, zIm);
  std::complex<double> c(cRe, cIm);
  for (int i = 1; i < 64; i++) {
    // at i*2-2 and i*2-1
    p[i*2-2] = real(z);
    p[i*2-1] = imag(z);
    std::complex<double> z2 = z*z + c;
    if(abs(z2) > 4) {
      break;
    }
    z = z2;
  }


  }

  else {
      for (int x = 0; x < floor(newCanWidth); x++)
  {
    for (int y = 0; y < floor(newCanHeight); y++)
    {
      // double new_x = (((widthScale * x) + startX) - width / 2.) / (height / 2.) - .55;
      // double new_y = (((heightScale * y) + startY) - height / 2.) / (height / 2.);
      double new_x = (((widthScale * x) + startX) - width / 2.) / (height / 2.) - .55;
      double new_y = -(((heightScale * y) + startY) - height / 2.) / (height / 2.);


      // double new_x = (x - width / 2.) / (height / 2.) - 0.55;
      // double new_y = (y - height / 2.) / (height / 2.);
      int iterations;

      if(type == 0) {
        iterations = mandlebrot(new_x, new_y);
      } else if(type == 1) {
        iterations = julia(new_x, new_y, cRe, cIm);
      }

      

      ptr[getIdx(x, y, width, 0)] = iterations * 4;
      ptr[getIdx(x, y, width, 3)] = 255;

      //// imageSmoothingEnabled to false **** this might save time, and also make it
      // look less weird when you zoon in
    }
  }

  }


}

//   EMSCRIPTEN_KEEPALIVE void genJuliaPixles(double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr)
// {
//   // ptr is array
//   // it will alreadly be the right size

//   for (int x = 0; x < floor(newCanWidth); x++)
//   {
//     for (int y = 0; y < floor(newCanHeight); y++)
//     {
//       double new_x = (((widthScale * x) + startX) - width / 2.) / (height / 2.) - .55;
//       double new_y = (((heightScale * y) + startY) - height / 2.) / (height / 2.);

//       // double new_x = (x - width / 2.) / (height / 2.) - 0.55;
//       // double new_y = (y - height / 2.) / (height / 2.);

//       // still want to go through 

//       int iterations = mandlebrot(new_x, new_y);

//       ptr[getIdx(x, y, width, 1)] = iterations * 4;
//       ptr[getIdx(x, y, width, 3)] = 255;

//       //// imageSmoothingEnabled to false **** this might save time, and also make it
//       // look less weird when you zoon in
//     }
//   }
// }

}
