// 최신 JS 문법 사용
import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del"; // 청소도구 설치
import ws from "gulp-webserver";

// task 하기 위해선 function을 eport하거나 const하면 된다.
/* 
    1. task는 모든 pug파일을 가지고 이것들을 가지고 다른 폴더에 집어 넣는게 하나의 task가 된다.
       그 전에 이 파일들을 HTML로 변경한 다음에 넣음 -> 이게 task
    2. scss 파일을 css로 변환할 수도 있다. 코드를 최소화한 다음에 -> task
    - 이런 task들을 묶을 수 있다.
      ex. dev라는 task가 이미지를 최적화하고, JS를 압축하고 모든 파일들을 한 폴더에 집어넣고 그 폴더를 브라우저에 출력 시키는 등
          -> 여러가지 task를 한번에 할 수 있다.(다양한 파트를 가진다.하나의 파트가 pug면 다른 파트는 scss 등...)
    - 할 일은 여러가지의 task를 묶어서 하나의 명령어나 여러 개의 명령어로 묶어서 사용하기
 */

// task 만들기 -> pug파일을 HTML파일로 바꾸기 -> gulp-pug 플러그인 사용
const routes = {
  pug: {
    watch: "src/**/*.pug", //모든 파일을 지켜보고 싶다는 뜻(이유는 depth가 깊은 곳도 변경사항을 알아야하기 때문)
    src: "src/*.pug", // (* 하나는 src에 있는 모든 pug파일을 html로 바꿈), /**/ -> 깊게 찾지 않는다. 즉, 지금은 index.pug만 html로 바꿈
    dest: "build", // 목적지(destination)
  },
};

// pipe란 하나의 흐름으로 만들어준다.
// 순서 - 1.routes에서 데이터 가져온다/2. pipe로 흐름을 만들어서 pug()에 넣어준다./3. 그 파일들을 dest에 저장시킨다.
// (export는 필요없다. package.json에서 쓸 command만 해주면 된다., export 안하면 console이나 package.json에서 사용 못함)
const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));
const clean = () => del(["build/"]); // 안에 확장자나 파일 이름을 넣는다.

// src를 찾고 그 src는 서버에서 보여주고 싶은 폴더 (우릭가 보여주고 싶은 폴더는 build)
const webserver = () => {
  gulp.src("build").pipe(ws({ livereload: true, open: true }));
}; // 파일을 저장하면 알아서 새로고침해줌, 브라우저에서 로컬호스트를 열고 path를 입력하면 알아서 이동함

const watch = () => {
  gulp.watch(routes.pug.watch, pug); // 어떤 걸 지켜볼 거냐, 어떤 task를 실행할 거냐
};

// 분리하기
const prepare = gulp.series([clean]);
const asset = gulp.series([pug]);
const postDev = gulp.series([webserver, watch]);

export const dev = gulp.series([prepare, asset, postDev]);
