<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div style="margin-left: 320px;">
				<localeDropDown></localeDropDown>
			</div>
			<div class="ms-title">{{ t('view_app.login_text') }}</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">{{ t("buttons.login") }}</el-button>
				</div>
				<p class="login-tips"></p>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import useStore from '../../store/index';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { Md5 } from 'ts-md5';
import { useStorage } from "../../hooks/useStorage";
import { useI18n } from "../../hooks/useI18n";
import localeDropDown from "../../components/dropDowns/localeDropDown.vue";
//api
import { getLogin, getUserAuthority } from '../../api/apiPoint';
import '../../mock.js';
interface LoginInfo {
	username: string;
	password: string;
}
const { t } = useI18n();
const router = useRouter();
const { setStorage } = useStorage();
const param = reactive<LoginInfo>({
	username: 'jackson',
	password: 'Solution@123'
});
//const {data:authorityData} =await getUserAuthority(loginResponse.userId);

const rules: FormRules = {
	username: [
		{
			required: true,
			message: t("view_app.userNameMessage"),
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: t("view_app.passwordMessage"), trigger: 'blur' }]
};

const login = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
	console.log("the password is ", param.password, Md5.hashStr(param.password));
	
	const response: any = {isSuccess:true};
	console.log("1111",response)
	//await getLogin({ username: param.username, password: Md5.hashStr(param.password) });
	if (!formEl) return;
	await formEl.validate((valid: boolean) => {
		console.log("2222",response)
		if (valid && response.isSuccess) {
			ElMessage.success(t("view_app.loginSu"));
			setStorage('view_token', response.data.accessToken);
			router.push('/home');
		} else {
			ElMessage.error(t("view_app.loginFa"));
			return false;
		}
	},
	);
}
;
const usestore = useStore();
usestore.userTag.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-size: 100%;
	background: linear-gradient(to bottom, #002140, gray); /* 渐变深灰色背景 */
;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #f56c6c;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>