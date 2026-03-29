<!--
title: Introduction to RISC-V Vector Extension
date: 2026-01-10
category: RISC-V, Architecture, HPC
-->

# RISC-V RVV

The RISC-V Vector Extension (RVV) is transforming how we handle data-parallel operations on open ISAs.

Instead of fixed-width SIMD (like AVX/SSE), RVV uses a vector length agnostic approach. 

```assembly
vsetvli t0, a0, e32, m1, ta, ma
vle32.v v8, (a1)
```
This snippet configures the vector state and loads 32-bit elements!