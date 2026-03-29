<!--
title: Getting Started with CUDA Optimization
date: 2025-10-15
category: HPC, CUDA, Basics
-->

# Getting Started with CUDA Optimization

CUDA provides an incredible ecosystem for parallel computing. In this post, we'll explore some basic strategies like memory coalescing, shared memory usage, and warp-level primitives.

## Memory Coalescing
Ensuring threads in a warp access contiguous memory drastically improves bandwidth.

```cpp
__global__ void coalesced_kernel(float* out, float* in) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    out[idx] = in[idx];
}
```