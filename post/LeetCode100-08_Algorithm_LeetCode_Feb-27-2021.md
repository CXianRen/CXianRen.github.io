### 题目:
+ 给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。假设环境不允许存储 64 位整数（有符号或无符号）。

### 解
```c++
class Solution {
public:
    int reverse(int x) {
        int res=0;
        while(x!=0){
            // 2,147,483,648 - 1 =2,147,483,647  2,147,483,64*10+7 
            // -2147483648  -214748364*10-8
            if(res>INT_MAX/10 || (res==214748364 && x%10>7))return 0;
            if(res<-214748364 || (res==-214748364 && x%10<-8)  )return 0; 
            res=res*10+(x%10);
            x/=10;
        }
        return res;
    }
};
```

### 思考:
> 对于一些常量： INT_MAX INT_MIN









