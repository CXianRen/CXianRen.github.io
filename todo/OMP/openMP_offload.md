
# offload

https://www.openmp.org/spec-html/5.0/openmpsu60.html


# 只使用target 会发生什么?
```cpp
  #pragma omp target teams distribute parallel for simd
  for (int i = 0; i < NX; i++) {
     vecC[i] = vecA[i] * vecB[i];
  }
```

+ 生成本机code

# 显然和 parallel 使用的话 需要加 single

# teams
在GPU 上映射成 thread block

# distribute 
把 loop iteration 分配给不同teams

# parallel 
每个team 内再创建线程 

# for 
分配 每个线程的任务

| 目标             | directive  |
| -------------- | ---------- |
| block mapping  | distribute |
| thread mapping | parallel   |
| vector mapping | simd       |


target      → 代码放到 GPU
teams       → 创建 blocks（grid）
distribute  → 把 iteration 切给 blocks
parallel    → 在 block 内启动 threads
for         → 把 iteration 分配给 threads
simd        → 一个 thread 内 vectorize


# 怎么选择 设备的
+ 有默认 (0)
+ 显示设置 pragma omp target device(1)

# 多设备 怎么分配
需要设置 对应的设备
omp_set_default_device(d);