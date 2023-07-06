<template>
  <div class="login-container">
    <div class="container" id="login-box" ref="loginBox">
      <div class="form-container sign-up-container">
        <form>
          <h1>注册账户</h1>
          <div class="form-control">
            <input
              type="text"
              required
              maxlength="20"
              ref="username"
              v-model="reUsername"
              @input="debounce(testUsername)"
            />
            <label>
              <span style="transition-delay: 0ms">U</span
              ><span style="transition-delay: 50ms">s</span
              ><span style="transition-delay: 100ms">e</span
              ><span style="transition-delay: 150ms">r</span
              ><span style="transition-delay: 200ms">n</span
              ><span style="transition-delay: 250ms">a</span
              ><span style="transition-delay: 300ms">m</span
              ><span style="transition-delay: 350ms">e</span>
            </label>
            <div class="usernametip">请用手机号注册</div>
          </div>
          <div class="form-control">
            <input
              type="text"
              required
              maxlength="10"
              ref="studentid"
              v-model="reStudentID"
              @input="debounce(testStudentID)"
            />
            <label>
              <span style="transition-delay: 0ms">S</span
              ><span style="transition-delay: 50ms">t</span
              ><span style="transition-delay: 100ms">u</span
              ><span style="transition-delay: 150ms">d</span
              ><span style="transition-delay: 200ms">e</span
              ><span style="transition-delay: 250ms">n</span
              ><span style="transition-delay: 300ms">t</span
              ><span style="transition-delay: 350ms">I</span
              ><span style="transition-delay: 400ms">D</span>
            </label>
            <div class="usernametip">请填写有效学号</div>
          </div>
          <div class="form-control">
            <input
              type="password"
              required
              maxlength="20"
              ref="loginmm1"
              v-model="rePassWord"
              @input="debounce(testPassword)"
            />
            <label>
              <span style="transition-delay: 0ms">P</span
              ><span style="transition-delay: 50ms">a</span
              ><span style="transition-delay: 100ms">s</span
              ><span style="transition-delay: 150ms">s</span
              ><span style="transition-delay: 200ms">w</span
              ><span style="transition-delay: 250ms">o</span
              ><span style="transition-delay: 300ms">r</span
              ><span style="transition-delay: 350ms">d</span>
            </label>
            <div class="usernametip">密码8到20位</div>
          </div>
          <button @click="handleRegister">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>图书管理系统登录</h1>
          <div class="form-control login-margin">
            <input type="text" required v-model="loUsername" ref="loginzh" />
            <label>
              <span style="transition-delay: 0ms">U</span
              ><span style="transition-delay: 50ms">s</span
              ><span style="transition-delay: 100ms">e</span
              ><span style="transition-delay: 150ms">r</span
              ><span style="transition-delay: 200ms">n</span
              ><span style="transition-delay: 250ms">a</span
              ><span style="transition-delay: 300ms">m</span
              ><span style="transition-delay: 350ms">e</span>
            </label>
          </div>
          <div class="form-control login-margin">
            <input
              type="password"
              v-model="loPassword"
              required
              ref="loginmm"
            />
            <label>
              <span style="transition-delay: 0ms">P</span
              ><span style="transition-delay: 50ms">a</span
              ><span style="transition-delay: 100ms">s</span
              ><span style="transition-delay: 150ms">s</span
              ><span style="transition-delay: 200ms">w</span
              ><span style="transition-delay: 250ms">o</span
              ><span style="transition-delay: 300ms">r</span
              ><span style="transition-delay: 350ms">d</span>
            </label>
            <!-- <img @click="eyeChange" class="eye" :src="eyeSrc" alt="" /> -->
          </div>
          <input
            type="button"
            value="登录"
            @click.native="handleLogin"
            class="button"
          />
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？</h1>
            <p>点击开始属于你的图书之旅</p>
            <button
              class="ghost"
              id="signIn"
              ref="goLogin"
              @click="removeClass"
            >
              登录
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有账号?</h1>
            <p>立即注册加入我们，和我们一起开始阅读吧</p>
            <button class="ghost" id="signUp" @click="addClass">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { getCurrentInstance, ref } from "vue";
import { defineComponent, getCurrentInstance, ref } from "vue";
import { ElNotification } from "element-plus";
import { fa } from "element-plus/es/locale/index.js";
import router from "../router";
export default defineComponent({
  setup() {
    const loUsername = ref<string>("");
    const loPassword = ref<string>("");
    const reUsername = ref<string>("");
    const rePassWord = ref<string>("");
    const reStudentID = ref<string>("");
    const reFlag = {
      flag1: false,
      flag2: false,
      flag3: false,
    };
    const { proxy, ctx } = getCurrentInstance();
    const _this = ctx;
    const addClass = () => {
      _this.$refs.loginBox.classList.add("right-panel-active");
      _this.$refs.loginmm1.value = "";
      _this.$refs.logincm.value = "";
      _this.$refs.username.value = "";
      _this.$refs.email.value = "";
      _this.eyeSrc = "/statics/close.png";
      _this.Logintype = "password";
      _this.eyeSrc1 = "/statics/close.png";
      _this.Logintype1 = "password";
    };
    const removeClass = () => {
      _this.$refs.loginBox.classList.remove("right-panel-active");
      _this.$refs.loginmm.value = "";
      _this.$refs.loginzh.value = "";
      _this.eyeSrc = "/statics/close.png";
      _this.Logintype = "password";
    };
    // let debounceFlag: boolean = true;
    // let timer: any = null;
    let timer: null | number = null;
    //防抖函数
    const debounce = (fn: Function) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.call(this, arguments);
        clearTimeout(timer!);
      }, 1000);
    };
    const testUsername = () => {
      const reg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
      console.log(reUsername.value);

      if (reg.test(reUsername.value)) {
        ElNotification({
          title: "该手机号合法！",
          type: "success",
          duration: 2000,
        });
        reFlag.flag1 = true;
      } else {
        ElNotification({
          title: "请输入正确的手机号码！",
          type: "error",
          duration: 2000,
        });
        reFlag.flag1 = false;
      }
    };
    const testStudentID = () => {
      const reg = /^\d{10}$/;

      if (reg.test(reStudentID.value)) {
        ElNotification({
          title: "该学号合法有效！",
          type: "success",
          duration: 2000,
        });
        reFlag.flag2 = true;
      } else {
        ElNotification({
          title: "该学号无效！",
          type: "error",
          duration: 2000,
        });
        reFlag.flag2 = false;
      }
    };
    const testPassword = () => {
      const reg = /^.{8,20}$/;

      if (reg.test(rePassWord.value)) {
        ElNotification({
          title: "该密码合法有效！",
          type: "success",
          duration: 2000,
        });
        reFlag.flag3 = true;
      } else {
        ElNotification({
          title: "密码必须在8~20位之间！",
          type: "error",
          duration: 2000,
        });
        reFlag.flag3 = false;
      }
    };
    const handleLogin = async (e: any) => {
      e.preventDefault();
      if (loPassword && loUsername) {
        await proxy.$http
          .get(
            `/user/login?username=${loUsername.value}&password=${loPassword.value}`
          )
          .then((res: any) => {
            console.log(res);

            if (res.data.code == 2) {
              ElNotification({
                title: "用户名或密码错误！",
                type: "error",
                duration: 2000,
              });
            } else if (res.data.code == 1) {
              ElNotification({
                title: "登录成功！",
                type: "success",
                duration: 2000,
              });
              window.localStorage.setItem("isLogin", "1");
              console.log(res.data);

              window.localStorage.setItem("auth", res.data.data.permission);
              window.localStorage.setItem("token", res.data.data.token);
              window.localStorage.setItem("userName", loUsername.value);
              router.replace("index");
            }
          })
          .catch((err: any) => {
            console.error(err);
          });
      }
    };
    const handleRegister = async (e: any) => {
      e.preventDefault();
      if (reFlag.flag1 && reFlag.flag2 && reFlag.flag3) {
        console.log();

        await proxy.$http
          .post(
            "/user/regist",
            {
              username: reUsername.value,
              password: rePassWord.value,
              studentid: reStudentID.value,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res: any) => {
            if (res.data.code == 2) {
              ElNotification({
                title: "该用户名已被注册！",
                type: "error",
                duration: 2000,
              });
            } else if (res.data.code == 1) {
              ElNotification({
                title: "注册成功！",
                type: "success",
                duration: 2000,
              });
              _this.$refs.goLogin.click();
            } else if (res.data.code == 0) {
              ElNotification({
                title: "您的账户无权限！",
                type: "error",
                duration: 2000,
              });
            }
          })
          .catch((err: any) => {
            console.error(err);
          });
      } else {
        ElNotification({
          title: "注册信息不正确!",
          type: "error",
          duration: 2000,
        });
      }
    };
    return {
      addClass,
      removeClass,
      reUsername,
      rePassWord,
      reStudentID,
      loPassword,
      loUsername,
      testUsername,
      debounce,
      testStudentID,
      handleLogin,
      testPassword,
      handleRegister,
    };
  },
});
</script>
<style lang="less" scoped>
@keyframes all {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scale {
  from {
    opacity: 0;
    transform: translate(-50%) scale(0.2);
  }

  to {
    opacity: 1;
    transform: translate(-50%) scale(1);
  }
}

.login-container {
  animation: all 1s;
  padding-top: 7%;
  width: 100%;
  height: 100%;

  .container {
    animation: scale 0.5s;
  }

  .sign-in-container {
    position: relative;

    .check {
      position: absolute;
      margin-top: 20px;
      width: 15px;
      height: 15px;
      border-radius: 2px;
      appearance: none;
      background-color: #bbb;
      transition: all 0.3s;
    }

    .relabel {
      position: absolute;
      left: 74px;
      bottom: 123px;
    }

    .check::before {
      content: "";
      position: absolute;
      border: solid #fff;
      display: block;
      width: 0.3em;
      height: 0.6em;
      border-width: 0 0.2em 0.2em 0;
      z-index: 1;
      opacity: 0;
      right: calc(50% - 0.15em);
      top: calc(50% - 0.35em);
      transform: rotate(0deg);
      transition: all 0.3s;
      transform-origin: center center;
    }

    .check:checked {
      animation: a 0.3s ease-in forwards;
      background-color: #409eff;
    }

    .check:checked::before {
      opacity: 1;
      transform: rotate(405deg);
    }

    @keyframes a {
      0% {
        opacity: 1;
        transform: scale(1) rotateY(0deg);
      }

      50% {
        opacity: 0;
        transform: scale(0.8) rotateY(180deg);
      }

      100% {
        opacity: 1;
        transform: scale(1) rotateY(360deg);
      }
    }
  }

  .veriImg {
    cursor: pointer;
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 120px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .usernametip {
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
    font-weight: 500;
  }

  .remember {
    position: absolute;
    top: 320px;
  }

  .eye {
    position: absolute;
    top: -4px;
    right: 0;
    width: 26px;
  }

  .form-control {
    // background-color: pink;
    position: relative;
    margin: 20px 0 20px;
    width: 290px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    padding: 2px;
    border-bottom: 2px #ccc solid;
    display: block;
    width: 100%;
    font-size: 14px;
    color: #333;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 0px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 14px;
    min-width: 5px;
    color: #ccc;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: lightblue;
    transform: translateY(-20px);
  }

  .lizi {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .login-margin {
    margin-top: 35px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
    margin-bottom: 20px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .container {
    z-index: 1000;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  .social-container a:hover {
    background-color: #eee;
  }

  .txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin: 10px 0;
  }

  .txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 3px;
    height: 35px;
  }

  .txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: 0.5s;
  }

  .txtb span::after {
    content: "";
    position: absolute;
    left: 0%;
    top: 100%;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg, #2c98db, #363795);
    transition: 0.5s;
  }

  .focus + span::before {
    top: -5px;
  }

  .focus + span::after {
    width: 100%;
  }

  .button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  .button:active {
    transform: scale(0.9);
  }

  .button:focus {
    outline: none;
  }

  button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  button:active {
    transform: scale(0.9);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background: transparent;
    border-color: #fff;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .form-container .button {
    margin-top: 20px;
    background: linear-gradient(120deg, #2c98db, #363795);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: 0.5s;
  }

  .form-container .button:hover {
    background-position: right;
  }

  .form-container button {
    margin-top: 20px;
    background: linear-gradient(120deg, #2c98db, #363795);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: 0.5s;
  }

  .form-container button:hover {
    background-position: right;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .sign-in-container form a {
    position: relative;
    left: 100px;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
  }

  .sign-up-container .button {
    margin-top: 20px;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .overlay {
    background-image: linear-gradient(120deg, #2c98db, #363795);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateY(0);
  }

  .overlay-left {
    transform: translateY(-20%);
  }

  .container.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .container.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  .container.container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .container.container.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  .container.container.right-panel-active .overlay-right {
    transform: translateY(20%);
  }

  .vericode-deactive {
    position: absolute;
    right: 0;
    top: -3px;
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    cursor: no-drop;
    background-color: #ccc;
    padding: 4px 12px;
  }

  .vericode-active {
    position: absolute;
    right: 0;
    top: -3px;
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    background-color: rgb(56, 168, 253);
    padding: 4px 12px;
  }

  .vericode-active:hover {
    background-color: rgb(91, 184, 255);
  }
}
</style>
