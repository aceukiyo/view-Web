# This code calculates the factorial of a given number

def factorial(n):
    """
    This function takes a number as input and returns its factorial.
    """
    if n == 0 or n == 1:
        return 1
    else:
        result = n * factorial(n-1)
        return result

# Test the factorial function by calculating the factorial of 5
n = 5
factorial_result = factorial(n)
print(f"The factorial of {n} is {factorial_result}.")<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
