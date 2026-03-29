<!--
title: Tips for C++ Performance Tuning
date: 2026-02-28
category: C++, Programming
-->

# C++ Performance Tuning 101

When writing HPC software, every cycle matters.

1.  **Cache Locality:** Avoid random pointer chasing (linked lists). Use flat arrays (`std::vector`).
2.  **Branch Prediction:** Profile your code. Sort your data if filtering contains a strong branch bias.
3.  **Inlining:** Liberally use `inline` for small hot-path functions, but trust your compiler.

Happy coding!