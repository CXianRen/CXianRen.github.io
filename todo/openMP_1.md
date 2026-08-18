<!--
title: OMP-1: what is openMP?
date: 2026-03-31
category: OpenMP, Parallel-Programming
-->

All these series are aiming give you a view of 'A' question quirkly.

# What is openmp? 
This is openmp (Open Multi-Processing)
```cpp
// file name example_1.c
void f(){
    #pragam omp parallel for
    for(int i = 0; i <4; i++){
        printf("print: %d", i);
    }
}
```
Compile and run using following commands
```sh
clang -O0 -g -fopenmp example_1.c -o example_1
./example_1
```

you would get similar output as below.
```sh
```

# BUT What happen bebind the compiler?
How does "#pragma omp parallel for" converted your code?

Let see breakdown the compliation and runtime step by step.

First, w