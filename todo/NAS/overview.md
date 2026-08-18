

<!--  -->

NAS-BENCH MARK: [Link](https://www.nas.nasa.gov/software/npb.html)


Five kernels:
| Kernel | Name | Characteristics |
|--------|------|-----------------|
| IS | Integer Sort | Random memory access |
| EP | Embarrassingly Parallel | Minimal communication, compute-bound |
| CG | Conjugate Gradient | Irregular memory access and communication |
| MG | Multi-Grid | Multi-level grids, long/short-distance communication, memory intensive |
| FT | Fast Fourier Transform (3D) | All-to-all communication, communication intensive |


Three mini apps:
| Kernel | Name | Characteristics |
|--------|------|-----------------|
| BT | Block Tri-diagonal solver | Structured grid solver, moderate communication, memory intensive |
| SP | Scalar Penta-diagonal solver | Irregular memory access, multiple loop structures, memory bandwidth sensitive |
| LU | Lower-Upper Gauss-Seidel solver | Strong data dependency, iterative solver, synchronization intensive |