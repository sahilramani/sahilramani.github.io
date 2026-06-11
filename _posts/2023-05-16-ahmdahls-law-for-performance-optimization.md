---
title: "Amdahl's Law for Performance Optimization"
categories:
  - Programming
tags:
  - performance
  - optimization
---

## What is Amdahl's Law?

Amdahl's Law, formulated by Gene Amdahl in 1967, puts a hard ceiling on the speedup you can get from parallelizing a program. Before you spend a week threading your code, it's worth five minutes with this formula to find out whether that week can possibly pay off.

## Understanding Amdahl's Law

The law gives the maximum speedup based on how much of the program can be parallelized:

```
Speedup = 1 / [(1 - P) + (P / N)]
```

where:

- Speedup: overall performance improvement
- P: proportion of the program that can be parallelized
- N: number of processors or threads available

## Key Implications

1. The serial portion sets the ceiling. If 30% of your program can't be parallelized, you'll never beat a 3.33x speedup, no matter how many cores you throw at it.
1. Optimize where the time goes. Speeding up a section that accounts for 5% of the runtime can never gain you more than 5%.
1. Parallelization and optimization compound. Shrinking the serial portion raises the ceiling for everything else.
1. More processors bring diminishing returns. Past a point, each added core contributes almost nothing.

## Applying Amdahl's Law for Performance Optimization

Profile first and find where the time actually goes. Parallelize the sections that dominate the runtime, using threads or task-based parallelism. For the serial sections, you're left with the classic tools: better algorithms, caching, better data structures, compiler optimizations. Then measure again, because the bottleneck moves after every change.

## Example: Image Processing Application

Consider an image processing application that applies a series of filters to images. It has three main tasks: image loading (T1), filtering (T2), and image saving (T3).

Profiling shows that 70% of the execution time goes to filtering (T2), which can be parallelized. The remaining 30% splits evenly between loading and saving, which are sequential.

With an eight-processor machine, Amdahl's Law gives:

```
Speedup = 1 / [(1 - 0.7) + (0.7 / 8)] = 1 / (0.3 + 0.0875) = 1 / 0.3875 = 2.58
```

A 2.58x speedup from parallelizing the filtering task. Note how far that is from 8x: the 30% serial portion dominates the result. To actually get the 2.58x, the filtering task needs an efficient parallel implementation (multi-threading or SIMD) with sensible data distribution and synchronization between processors, and the sequential loading and saving tasks are still worth optimizing on their own.

## Conclusion

Amdahl's Law won't optimize anything for you, but it tells you where optimization is worth your time. Run the numbers before you start threading.
